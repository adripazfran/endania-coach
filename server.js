// server.js — API local con arquitectura de proveedores intercambiables.
//
// El proveedor se elige con la variable de entorno AI_PROVIDER:
//   AI_PROVIDER=gemini   (por defecto · GRATIS con free tier)
//   AI_PROVIDER=claude   (Anthropic, de pago)
//
// Cambiar de proveedor = cambiar 1 línea en .env y reiniciar el servidor.

import express  from "express";
import multer   from "multer";
import dotenv   from "dotenv";

import { GoogleGenAI } from "@google/genai";
import Anthropic       from "@anthropic-ai/sdk";

// override:true para que .env tenga prioridad sobre variables de entorno preexistentes
// (algunas terminales como Claude Desktop ya tienen ANTHROPIC_API_KEY="" configurado).
dotenv.config({ override: true });

// ─── Config ────────────────────────────────────────────────────────────────
const PROVIDER     = process.env.AI_PROVIDER  || "gemini";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-5";
const PORT         = process.env.PORT         || 3001;

// ─── Validación de claves según proveedor ──────────────────────────────────
if (PROVIDER === "gemini" && !process.env.GEMINI_API_KEY) {
  console.error("⛔  Falta GEMINI_API_KEY en .env (consíguela en https://aistudio.google.com/apikey)");
  process.exit(1);
}
if (PROVIDER === "claude" && !process.env.ANTHROPIC_API_KEY) {
  console.error("⛔  Falta ANTHROPIC_API_KEY en .env");
  process.exit(1);
}

// ─── Clientes (lazy) ───────────────────────────────────────────────────────
const gemini    = process.env.GEMINI_API_KEY    ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })    : null;
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

// ─── Prompts compartidos ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un analista experto en planificación de entrenamiento de fútbol sala femenino.
Tu tarea es leer un PDF con un plan de sesión y devolver un análisis estructurado en JSON.

REGLAS:
- Responde SOLO con un JSON válido, sin markdown, sin texto antes ni después.
- Si un dato no aparece explícito en el PDF, infiere el valor más razonable.
- UA (Unidades de carga arbitrarias) = suma de (duración × RPE) de todas las tareas.
- Rangos por día del microciclo (referencia):
    MD-5: 280-360 UA · MD-4: 300-380 UA · MD-3: 280-420 UA · MD-2: 240-320 UA · MD-1: 140-200 UA · MD+1: 100-160 UA · MD+2: 130-200 UA · MD: 70-110 UA`;

const userPromptFor = (goals, condicionantes) => `CONTEXTO:
- Objetivos declarados por el entrenador: ${goals}
- Condicionantes: ${condicionantes}

Devuelve EXCLUSIVAMENTE un JSON con esta estructura:
{
  "date": "YYYY-MM-DD (fecha de la sesión, hoy si no aparece)",
  "md": "MD-3 / MD-4 / etc",
  "title": "título corto",
  "jugadoras": número,
  "objetivos": ["objetivo 1", "objetivo 2", "objetivo 3"],
  "tareas": [
    {"nombre":"...", "bloque":"Calentamiento|Principal|Vuelta a calma", "min":N, "rpe":1-10, "capacidad":"Técnica|Táctica|Física|Cognitiva|Emocional"}
  ],
  "cobertura": [
    {"obj":"...", "cubierto":true|false, "tareas":["..."], "icon":"✅|❌"}
  ],
  "timeBlocks": [
    {"label":"Calentamiento", "min":N, "pct":N, "color":"#06b6d4"},
    {"label":"Parte principal", "min":N, "pct":N, "color":"#3b82f6"},
    {"label":"Vuelta a calma", "min":N, "pct":N, "color":"#8b5cf6"}
  ],
  "radar": [
    {"dim":"Técnica","val":0-10,"nota":"..."},
    {"dim":"Táctica","val":0-10,"nota":"..."},
    {"dim":"Física","val":0-10,"nota":"..."},
    {"dim":"Cognitiva","val":0-10,"nota":"..."},
    {"dim":"Emocional","val":0-10,"nota":"..."}
  ],
  "carga": {"uaMin":N, "uaMax":N, "rpeEstimado":N.N, "mdRango":"MD-X → rango esperado AAA–BBB UA", "enRango":true|false},
  "alertas": [
    {"tipo":"❌ Objetivo sin tarea|⚠️ ...|💡 Sugerencia|✅ ...", "msg":"...", "color":"bg-rose-50 border-rose-300 text-rose-900|bg-amber-50 border-amber-300 text-amber-900|bg-sky-50 border-sky-300 text-sky-900|bg-emerald-50 border-emerald-300 text-emerald-900"}
  ],
  "coherencia": {"score":0-100, "label":"Alta|Media|Baja", "color":"bg-emerald-500|bg-amber-500|bg-rose-500", "comentario":"..."},
  "recomendacion": "recomendación práctica para la siguiente sesión"
}`;

// ─── Helpers ──────────────────────────────────────────────────────────────
function extractJson(text) {
  let str = (text || "").trim();
  const fence = str.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) str = fence[1].trim();
  return JSON.parse(str);
}

// ─── Implementación: Gemini ───────────────────────────────────────────────
async function analyzePdfWithGemini(buffer, goals, condicionantes) {
  const base64 = buffer.toString("base64");
  const userPrompt = userPromptFor(goals, condicionantes);

  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      { role: "user", parts: [
        { inlineData: { mimeType: "application/pdf", data: base64 } },
        { text: userPrompt },
      ] },
    ],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });

  const text     = response.text || "";
  const usage    = response.usageMetadata || {};
  const inTok    = usage.promptTokenCount     || 0;
  const outTok   = usage.candidatesTokenCount || 0;

  // Tarifa Gemini 2.0 Flash (pago): $0.10/M input · $0.40/M output (orientativo)
  const costUsd  = (inTok * 0.10 / 1_000_000) + (outTok * 0.40 / 1_000_000);

  return {
    analysis: extractJson(text),
    provider: `gemini · ${GEMINI_MODEL}`,
    usage: { input_tokens: inTok, output_tokens: outTok },
    costUsd,
    freeTier: true, // si tu key es de free tier, esto es 0 €. El costUsd es la referencia de pago.
  };
}

// ─── Implementación: Claude ───────────────────────────────────────────────
async function analyzePdfWithClaude(buffer, goals, condicionantes) {
  const base64 = buffer.toString("base64");
  const userPrompt = userPromptFor(goals, condicionantes);

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{
      role: "user",
      content: [
        { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
        { type: "text", text: userPrompt },
      ],
    }],
  });

  const text    = message.content.find(c => c.type === "text")?.text || "";
  const usage   = message.usage;
  // Tarifa Claude Sonnet 4.5: $3/M input · $15/M output
  const costUsd = (usage.input_tokens * 3 / 1_000_000) + (usage.output_tokens * 15 / 1_000_000);

  return {
    analysis: extractJson(text),
    provider: `claude · ${CLAUDE_MODEL}`,
    usage,
    costUsd,
    freeTier: false,
  };
}

// ─── Router ────────────────────────────────────────────────────────────────
async function analyzePdf({ buffer, goals, condicionantes }) {
  if (PROVIDER === "gemini") return analyzePdfWithGemini(buffer, goals, condicionantes);
  if (PROVIDER === "claude") return analyzePdfWithClaude(buffer, goals, condicionantes);
  throw new Error(`Proveedor desconocido: ${PROVIDER} (usa "gemini" o "claude")`);
}

// ─── Express ──────────────────────────────────────────────────────────────
const app    = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
app.use(express.json({ limit: "30mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, provider: PROVIDER, model: PROVIDER === "gemini" ? GEMINI_MODEL : CLAUDE_MODEL }));

app.post("/api/analyze-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Falta el archivo." });
    if (!req.file.mimetype.includes("pdf")) {
      return res.status(400).json({ error: "El archivo debe ser un PDF." });
    }
    const goals          = req.body.goals          || "(no especificados)";
    const condicionantes = req.body.condicionantes || "(no especificados)";

    console.log(`[analyze-pdf] ${req.file.originalname} (${(req.file.size/1024).toFixed(0)} KB) · provider=${PROVIDER}`);

    const result = await analyzePdf({ buffer: req.file.buffer, goals, condicionantes });

    console.log(`[analyze-pdf] OK · ${result.provider} · in=${result.usage.input_tokens} out=${result.usage.output_tokens} ≈ $${result.costUsd.toFixed(4)}${result.freeTier ? " (free tier)" : ""}`);
    res.json(result);
  } catch (err) {
    console.error("[analyze-pdf] ERROR:", err);
    res.status(500).json({ error: err.message || "Error interno." });
  }
});

app.listen(PORT, () => {
  console.log(`✅  API en http://localhost:${PORT}`);
  console.log(`   Proveedor: ${PROVIDER} · Modelo: ${PROVIDER === "gemini" ? GEMINI_MODEL : CLAUDE_MODEL}`);
});
