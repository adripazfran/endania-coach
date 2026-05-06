import React, { useMemo, useState } from "react";

// ─── Constantes ──────────────────────────────────────────────────────────────

const MY_TEAM = "Endania FS";

const TEAM_A_STATS = {
  shotsOn: 9, shotsOff: 6, shotsPost: 2, goals: 3, shotsTotal: 17,
  recoveries: 18, losses: 11, transLoss: 4, lossAfterRecovery: 5, yellow: 2, red: 0,
};
const TEAM_B_STATS = {
  shotsOn: 8, shotsOff: 7, shotsPost: 1, goals: 2, shotsTotal: 16,
  recoveries: 14, losses: 13, transLoss: 5, lossAfterRecovery: 4, yellow: 3, red: 0,
};

const NAV_GROUPS = [
  {
    title: "REGISTRO", main: "registro",
    titleBg: "bg-lime-700 hover:bg-fuchsia-600", itemBg: "bg-lime-700/90 hover:bg-fuchsia-600",
    activeBg: "from-lime-500 to-emerald-700", accent: "from-lime-300 to-emerald-500",
    items: [
      { label: "Alta", icon: "+", main: "registro", sub: "Alta" },
      { label: "Editar", icon: "✎", main: "registro", sub: "Editar" },
    ],
  },
  {
    title: "BASE DE DATOS", main: "bd",
    titleBg: "bg-orange-700 hover:bg-cyan-700", itemBg: "bg-orange-700/90 hover:bg-cyan-700",
    activeBg: "from-orange-500 to-red-700", accent: "from-orange-300 to-red-500",
    items: [
      { label: "Informacion", icon: "◇", main: "bd", sub: "informacion" },
      { label: "Equipo", icon: "▤", main: "bd", sub: "equipo" },
      { label: "Entrenamientos", icon: "▥", main: "bd", sub: "entrenamientos" },
      { label: "Partidos", icon: "⚽", main: "bd", sub: "partidos" },
    ],
  },
  {
    title: "ANALISIS SESION", main: "session",
    titleBg: "bg-sky-700 hover:bg-yellow-600", itemBg: "bg-sky-700/90 hover:bg-yellow-600",
    activeBg: "from-sky-500 to-blue-700", accent: "from-sky-300 to-blue-600",
    items: [
      { label: "Analizar", icon: "◌", main: "session", sub: "Analizar" },
      { label: "Sesion de entreno", icon: "▦", main: "session", sub: "Sesion de entreno" },
    ],
  },
  {
    title: "PARTIDO OFFLINE", main: "offline",
    titleBg: "bg-red-700 hover:bg-lime-700", itemBg: "bg-red-700/90 hover:bg-lime-700",
    activeBg: "from-red-500 to-rose-800", accent: "from-red-400 to-rose-700",
    items: [
      { label: "Analisis video", icon: "▶", main: "offline", sub: "Analisis video" },
      { label: "Ficha scouting", icon: "▣", main: "offline", sub: "Ficha scouting" },
      { label: "Prepartido", icon: "⚑", main: "offline", sub: "Prepartido" },
      { label: "Recomendacion IA", icon: "◎", main: "offline", sub: "Recomendacion IA" },
    ],
  },
  {
    title: "PARTIDO LIVE", main: "live",
    titleBg: "bg-yellow-700 hover:bg-violet-700", itemBg: "bg-yellow-700/90 hover:bg-violet-700",
    activeBg: "from-yellow-500 to-amber-700", accent: "from-yellow-300 to-amber-500",
    items: [
      { label: "Directo", icon: "◉", main: "live", sub: "Directo" },
      { label: "Jugadoras", icon: "●", main: "live", sub: "Jugadoras" },
    ],
  },
];

const BASE_TEAMS = [
  { id: 1, name: MY_TEAM, category: "Senior", color: "Azul", logo: "EF", logoUrl: "" },
  { id: 2, name: "Poio Pescamar", category: "Senior", color: "Rojo", logo: "PP", logoUrl: "" },
  { id: 3, name: "Marin FS", category: "Senior", color: "Blanco", logo: "MF", logoUrl: "" },
  { id: 4, name: "Burela FS", category: "Senior", color: "Naranja", logo: "BF", logoUrl: "" },
  { id: 5, name: "Ourense FS", category: "Juvenil", color: "Verde", logo: "OF", logoUrl: "" },
  { id: 6, name: "Futsi Navalcarnero", category: "Senior", color: "Granate", logo: "FN", logoUrl: "" },
  { id: 7, name: "Sala Zaragoza", category: "Senior", color: "Rojo", logo: "SZ", logoUrl: "" },
  { id: 8, name: "Majadahonda FS", category: "Senior", color: "Azul", logo: "MA", logoUrl: "" },
  { id: 9, name: "Gran Canaria Claret", category: "Senior", color: "Amarillo", logo: "GC", logoUrl: "" },
  { id: 10, name: "Penya Esplugues", category: "Senior", color: "Azul", logo: "PE", logoUrl: "" },
  { id: 11, name: "AEM Lleida", category: "Senior", color: "Rojo", logo: "AL", logoUrl: "" },
  { id: 12, name: "Granada FS", category: "Senior", color: "Granate", logo: "GF", logoUrl: "" },
  { id: 13, name: "Roldán FS", category: "Senior", color: "Azul", logo: "RF", logoUrl: "" },
  { id: 14, name: "Tenerife CajaSiete", category: "Senior", color: "Azul", logo: "TC", logoUrl: "" },
  { id: 15, name: "Futbol Emotion Zaragoza", category: "Senior", color: "Morado", logo: "FE", logoUrl: "" },
];

const BASE_PLAYERS = [
  { id: 1, team: MY_TEAM, dorsal: 1, name: "Paula", surname: "Vazquez Rios", pos: "Portera", birthDate: "1999-02-14", photo: "PV", starter: true, seconds: 1180 },
  { id: 2, team: MY_TEAM, dorsal: 4, name: "Noa", surname: "Santos Lago", pos: "Cierre", birthDate: "2002-06-03", photo: "NS", starter: true, seconds: 1062 },
  { id: 3, team: MY_TEAM, dorsal: 6, name: "Lara", surname: "Fernandez Castro", pos: "Ala", birthDate: "2004-09-18", photo: "LF", starter: true, seconds: 1000 },
  { id: 4, team: MY_TEAM, dorsal: 8, name: "Iria", surname: "Mendez Paz", pos: "Ala", birthDate: "2001-01-27", photo: "IM", starter: true, seconds: 907 },
  { id: 5, team: MY_TEAM, dorsal: 10, name: "Sara", surname: "Lopez Rey", pos: "Pivot", birthDate: "1997-11-06", photo: "SL", starter: true, seconds: 892 },
  { id: 6, team: MY_TEAM, dorsal: 11, name: "Marta", surname: "Costa Vidal", pos: "Universal", birthDate: "2003-04-21", photo: "MC", starter: false, seconds: 644 },
  { id: 7, team: MY_TEAM, dorsal: 12, name: "Julia", surname: "Pereira Nogueira", pos: "Ala", birthDate: "2005-08-12", photo: "JP", starter: false, seconds: 610 },
  { id: 8, team: MY_TEAM, dorsal: 13, name: "Ana", surname: "Rivas Pena", pos: "Cierre", birthDate: "2000-12-30", photo: "AR", starter: false, seconds: 534 },
  { id: 9, team: MY_TEAM, dorsal: 14, name: "Elena", surname: "Martinez Vila", pos: "Portera", birthDate: "2004-03-09", photo: "EM", starter: false, seconds: 420 },
  { id: 10, team: MY_TEAM, dorsal: 15, name: "Claudia", surname: "Barreiro Mosquera", pos: "Ala", birthDate: "2002-10-16", photo: "CB", starter: false, seconds: 502 },
  { id: 11, team: MY_TEAM, dorsal: 17, name: "Nerea", surname: "Soto Iglesias", pos: "Pivot", birthDate: "1998-05-24", photo: "NI", starter: false, seconds: 476 },
  { id: 12, team: MY_TEAM, dorsal: 18, name: "Ainhoa", surname: "Pazos Calvo", pos: "Ala", birthDate: "2003-12-02", photo: "AP", starter: false, seconds: 390 },
  { id: 13, team: MY_TEAM, dorsal: 21, name: "Lucia", surname: "Dominguez Ferreiro", pos: "Cierre", birthDate: "2001-08-29", photo: "LD", starter: false, seconds: 455 },
  { id: 14, team: MY_TEAM, dorsal: 23, name: "Alba", surname: "Rial Gomez", pos: "Universal", birthDate: "2000-04-05", photo: "AG", starter: false, seconds: 360 },
  { id: 15, team: "Poio Pescamar", dorsal: 3, name: "Carmen", surname: "Lago Vila", pos: "Cierre", birthDate: "1998-07-14", photo: "CL", starter: true, seconds: 900 },
  { id: 16, team: "Marin FS", dorsal: 9, name: "Uxia", surname: "Paz Santos", pos: "Pivot", birthDate: "2001-05-11", photo: "UP", starter: true, seconds: 820 },
];

const SEASONS = [
  { label: "Temporada 23/24", hasData: false },
  { label: "Temporada 24/25", hasData: false },
  { label: "Temporada 25/26", hasData: true },
];

const BASE_MATCHES = [
  { id: 1, date: "2026-04-20", type: "Liga", teams: [MY_TEAM, "Poio Pescamar"], a: TEAM_A_STATS, b: TEAM_B_STATS },
  { id: 2, date: "2026-04-13", type: "Copa", teams: [MY_TEAM, "Marin FS"], a: { ...TEAM_A_STATS, goals: 4, shotsTotal: 18 }, b: { ...TEAM_B_STATS, goals: 1, recoveries: 12 } },
  { id: 3, date: "2026-04-06", type: "Liga", teams: ["Burela FS", MY_TEAM], a: { ...TEAM_A_STATS, shotsOn: 10, goals: 5 }, b: { ...TEAM_B_STATS, goals: 2, yellow: 1 } },
  { id: 4, date: "2026-03-28", type: "Playoff", teams: ["Ourense FS", MY_TEAM], a: { ...TEAM_B_STATS, losses: 15 }, b: { ...TEAM_A_STATS, recoveries: 19, transLoss: 3 } },
  { id: 5, date: "2026-03-21", type: "Liga", teams: ["Futsi Navalcarnero", MY_TEAM], a: { ...TEAM_A_STATS, goals: 3, yellow: 4 }, b: { ...TEAM_B_STATS, goals: 2, shotsPost: 3 } },
  { id: 6, date: "2026-05-09", type: "Liga", teams: [MY_TEAM, "Burela FS"], a: { ...TEAM_A_STATS, goals: 2, shotsTotal: 15 }, b: { ...TEAM_B_STATS, goals: 2 } },
  { id: 7, date: "2026-05-16", type: "Liga", teams: [MY_TEAM, "Ourense FS"], a: { ...TEAM_A_STATS, goals: 4, recoveries: 21 }, b: { ...TEAM_B_STATS, goals: 1 } },
];

const BASE_TRAININGS = [
  { id: 1, date: "2026-04-27", title: "MD+1 Recuperacion", ua: 126, realMinutes: 31, avgRpe: 2.8 },
  { id: 2, date: "2026-04-28", title: "MD-4 Desarrollo ofensivo", ua: 304, realMinutes: 59, avgRpe: 5.2 },
  { id: 3, date: "2026-04-30", title: "MD-2 ABP y finalizacion", ua: 258, realMinutes: 51, avgRpe: 5.1 },
  { id: 4, date: "2026-05-01", title: "MD-1 Activacion", ua: 158, realMinutes: 34, avgRpe: 4.6 },
  { id: 5, date: "2026-05-04", title: "MD+1 Regenerativo", ua: 118, realMinutes: 29, avgRpe: 2.4 },
  { id: 6, date: "2026-05-05", title: "MD-4 Defensa media pista", ua: 326, realMinutes: 62, avgRpe: 5.4 },
  { id: 7, date: "2026-05-07", title: "MD-2 Transiciones", ua: 352, realMinutes: 64, avgRpe: 5.7 },
  { id: 8, date: "2026-05-08", title: "MD-1 Estrategia", ua: 172, realMinutes: 37, avgRpe: 4.7 },
  { id: 9, date: "2026-05-11", title: "MD+1 Compensatorio", ua: 142, realMinutes: 33, avgRpe: 3.1 },
  { id: 10, date: "2026-05-12", title: "MD-4 Ataque posicional", ua: 344, realMinutes: 66, avgRpe: 5.2 },
  { id: 11, date: "2026-05-14", title: "MD-2 Porteras y ABP", ua: 286, realMinutes: 54, avgRpe: 5.3 },
  { id: 12, date: "2026-05-15", title: "MD-1 Activacion competitiva", ua: 166, realMinutes: 36, avgRpe: 4.6 },
];

const CATEGORY_OPTIONS = ["Senior", "Juvenil", "Cadete", "Infantil", "Alevin", "Benjamines"];
const POSITIONS = ["Portera", "Cierre", "Ala", "Pivot", "Universal"];
const SAMPLE_OPTIONS = ["Ultimo partido", "Ultimos 5 partidos", "Ultimos 10 partidos", "Todos"];
const WARMUP_OPTIONS = ["Movilidad", "Tecnica individual", "Ludico", "Tarea jugada", "Preventivo"];
const MAIN_TASK_OPTIONS = ["Ataque", "Defensa", "ABP", "Situaciones especiales", "6m", "10m", "Ludico"];
const COOLDOWN_OPTIONS = ["Estiramientos pasivos", "Estiramientos dinamicos", "CORE", "Movilidad de cadera", "Roller", "Otros"];
const DIMENSION_OPTIONS = ["5", "10", "15", "20", "40"];

const CONSIGNAS = {
  Ataque: ["SP", "AP", "PIV", "2P", "TO", "FIN"],
  Defensa: ["PA", "BM", "DP", "TD", "DI", "DC"],
  ABP: ["BCO", "BMO", "CO", "FO", "BCD", "BMD", "CD", "FD"],
  Porteros: ["JP", "1x1", "INC", "PAR", "SL", "PJ"],
  "Situaciones especiales": ["5x4", "4x5", "4x3", "3x4"],
};

const LABELS = {
  SP: "Salida de presion", AP: "Ataque posicional", PIV: "Juego con pivot",
  "2P": "Segundo palo", TO: "Transicion ofensiva", FIN: "Finalizacion",
  PA: "Presion alta", BM: "Media pista", DP: "Defensa de pivot",
  TD: "Transicion defensiva", DI: "Defensa individual", DC: "Defensa con cambios",
  BCO: "Banda cercana ofensiva", BMO: "Banda media ofensiva", CO: "Corner ofensivo",
  FO: "Falta ofensiva", BCD: "Banda cercana defensiva", BMD: "Banda media defensiva",
  CD: "Corner defensivo", FD: "Falta defensiva", JP: "Juego de pies",
  "1x1": "Uno contra uno", INC: "Incorporacion", PAR: "Parada",
  SL: "Saque largo", PJ: "Portera-jugadora", "5x4": "Ataque 5x4",
  "4x5": "Defensa 4x5", "4x3": "Superioridad 4x3", "3x4": "Inferioridad 3x4",
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

function cn(...classes) { return classes.filter(Boolean).join(" "); }

function safeNum(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function initials(name) {
  return String(name).split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function playerName(player) { return `${player.name || ""} ${player.surname || ""}`.trim(); }

function calculateAge(birthDate) {
  if (!birthDate) return "";
  const today = new Date();
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return "";
  let age = today.getFullYear() - birth.getFullYear();
  const pending = today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  return pending ? age - 1 : age;
}

function getMatchesForTeam(matches, teamName) {
  return matches.filter((m) => m.teams.includes(teamName));
}

function getMatchStats(match, teamName) {
  return match.teams[0] === teamName ? match.a : match.b;
}

function filterDatabase(matches, teamName, scope) {
  const filtered = [...getMatchesForTeam(matches, teamName)].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );
  if (scope === "Ultimo partido") return filtered.slice(0, 1);
  if (scope === "Ultimos 5 partidos") return filtered.slice(0, 5);
  if (scope === "Ultimos 10 partidos") return filtered.slice(0, 10);
  return filtered;
}

function averageStats(matches, teamName) {
  if (!matches.length) return null;
  const avg = {};
  Object.keys(TEAM_A_STATS).forEach((key) => {
    avg[key] = Math.round(
      matches.reduce((sum, m) => sum + safeNum(getMatchStats(m, teamName)[key]), 0) / matches.length
    );
  });
  return avg;
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds || 0));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

let _taskIdCounter = 0;
function buildTask(type, dimX, dimY, estimatedTime, realTime, rpe) {
  return {
    id: `task-${++_taskIdCounter}`,
    type, dimX: String(dimX), dimY: String(dimY),
    estimatedTime: String(estimatedTime), realTime: String(realTime), rpe: String(rpe),
  };
}

function validRpe(value) {
  if (String(value).trim() === "") return "";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "";
  if (parsed < 1 || parsed > 10) return null;
  return String(parsed);
}

function taskUA(task) {
  const parsedRpe = validRpe(task.rpe);
  return parsedRpe === null || parsedRpe === "" ? 0 : safeNum(task.realTime) * safeNum(parsedRpe);
}

function sumTasks(tasks, key) { return tasks.reduce((sum, t) => sum + safeNum(t[key]), 0); }

function averageRpe(tasks) {
  const valid = tasks.filter((t) => validRpe(t.rpe) !== "" && validRpe(t.rpe) !== null);
  if (!valid.length) return 0;
  return Number((valid.reduce((sum, t) => sum + safeNum(t.rpe), 0) / valid.length).toFixed(1));
}

function blockSummary(tasks) {
  return {
    estimated: sumTasks(tasks, "estimatedTime"),
    real: sumTasks(tasks, "realTime"),
    ua: tasks.reduce((sum, t) => sum + taskUA(t), 0),
    avgRpe: averageRpe(tasks),
  };
}

function toDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inDateRange(item, start, end) {
  const date = toDate(item.date);
  const startDate = start ? toDate(start) : null;
  const endDate = end ? toDate(end) : null;
  if (!date) return false;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function getOpponent(match, teamName) {
  return match.teams.find((t) => t !== teamName) || "Rival";
}

function getResult(match, teamName) {
  const my = getMatchStats(match, teamName);
  const rival = match.teams[0] === teamName ? match.b : match.a;
  return `${my.goals}-${rival.goals}`;
}

function getWeekDays(anchorDate) {
  const base = toDate(anchorDate) || new Date();
  const day = base.getDay() === 0 ? 6 : base.getDay() - 1;
  const monday = new Date(base);
  monday.setDate(base.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

function trainingSummaryForDate(trainings, date) {
  const items = trainings.filter((t) => t.date === date);
  return {
    ua: items.reduce((sum, t) => sum + safeNum(t.ua), 0),
    minutes: items.reduce((sum, t) => sum + safeNum(t.realMinutes), 0),
    items,
  };
}

// Deriva porcentajes reales de las estadísticas del equipo
function deriveReportPercentages(stats) {
  const total = Math.max(stats.shotsTotal, 1);
  const ballTotal = Math.max(stats.recoveries + stats.losses, 1);

  const onPct = Math.max(0, Math.round((stats.shotsOn / total) * 100));
  const offPct = Math.max(0, Math.round((stats.shotsOff / total) * 100));
  const postPct = Math.max(0, Math.round((stats.shotsPost / total) * 100));
  const goalPct = Math.max(0, 100 - onPct - offPct - postPct);

  const recPct = Math.round((stats.recoveries / ballTotal) * 100);
  const lossPct = 100 - recPct;

  const transLossPct = Math.round((stats.transLoss / Math.max(stats.losses, 1)) * 100);
  const lossAfterRecPct = 100 - transLossPct;

  const convPct = Math.round((stats.goals / Math.max(stats.shotsOn, 1)) * 100);

  return [
    {
      title: "Tiros", total: stats.shotsTotal, color: "from-emerald-500 to-teal-600",
      items: [
        { label: "A porteria", value: onPct },
        { label: "Fuera", value: offPct },
        { label: "Al palo", value: postPct },
        { label: "Gol", value: goalPct },
      ],
    },
    {
      title: "Posesion", total: ballTotal, color: "from-sky-500 to-blue-600",
      items: [
        { label: "Recuperaciones", value: recPct },
        { label: "Perdidas", value: lossPct },
      ],
    },
    {
      title: "Transiciones", total: stats.losses, color: "from-violet-500 to-fuchsia-600",
      items: [
        { label: "Trans. perdida", value: transLossPct },
        { label: "Perd. tras rec.", value: lossAfterRecPct },
      ],
    },
    {
      title: "Eficacia", total: stats.goals, color: "from-amber-400 to-orange-500",
      items: [
        { label: "Conversion gol", value: convPct },
        { label: "Sin gol", value: 100 - convPct },
      ],
    },
  ];
}

// Distribuye los tiros del equipo en 3 zonas de forma proporcional
function distributeAcrossZones(stats) {
  const props = [0.15, 0.35, 0.50];
  return props.map((p, i) => ({
    zone: `Zona ${i + 1}`,
    on: Math.round(stats.shotsOn * p),
    off: Math.round(stats.shotsOff * p),
    post: Math.round(stats.shotsPost * p),
    goal: Math.round(stats.goals * p),
  }));
}

// Calcula la intensidad de cada zona del mapa de calor según las stats
function deriveHeatZones(stats) {
  const raw = [
    stats.recoveries,
    stats.shotsOff + stats.shotsPost,
    stats.shotsOn,
    stats.goals,
  ];
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  const pcts = raw.map((v) => Math.max(1, Math.round((v / sum) * 100)));
  return [
    { label: "Creacion", value: pcts[0], x: 6, y: 8, w: 16, h: 84, c: "rgba(14,165,233,0.32)" },
    { label: "Elab. izq.", value: pcts[1], x: 24, y: 8, w: 52, h: 40, c: "rgba(245,158,11,0.42)" },
    { label: "Elab. der.", value: pcts[2], x: 24, y: 52, w: 52, h: 40, c: "rgba(239,68,68,0.45)" },
    { label: "Finalizacion", value: pcts[3], x: 78, y: 8, w: 16, h: 84, c: "rgba(34,197,94,0.38)" },
  ];
}

// FIX: solo corre en desarrollo
if (import.meta.env.DEV) {
  function runSelfTests() {
    console.assert(filterDatabase(BASE_MATCHES, MY_TEAM, "Ultimos 5 partidos").length <= 5, "Filtro ultimos 5");
    console.assert(initials("Endania FS") === "EF", "Iniciales correctas");
    console.assert(BASE_PLAYERS.filter((p) => p.team === MY_TEAM).length === 14, "14 jugadoras");
    console.assert(validRpe(1) === "1" && validRpe(10) === "10" && validRpe(11) === null && validRpe(0) === null, "RPE 1-10");
    console.assert(blockSummary([buildTask("Test", 10, 10, 5, 8, 4)]).ua === 32, "UA correcto");
    console.assert(getResult(BASE_MATCHES[0], MY_TEAM) === "3-2", "Resultado correcto");
  }
  runSelfTests();
}

// ─── Componentes base ─────────────────────────────────────────────────────────

function Card({ children, className = "" }) {
  return (
    <section className={cn("rounded-3xl border border-white/80 bg-white shadow-sm ring-1 ring-slate-100", className)}>
      {children}
    </section>
  );
}

function Button({ children, active = false, variant = "solid", className = "", ...props }) {
  const mode = active
    ? "border-violet-400 bg-violet-100 text-violet-900"
    : variant === "soft"
    ? "border-slate-200 bg-white text-slate-700 hover:bg-violet-50"
    : "border-violet-500 bg-violet-500 text-white hover:bg-violet-600";
  return (
    <button type="button" className={cn("rounded-2xl border px-4 py-2 text-sm font-bold transition", mode, className)} {...props}>
      {children}
    </button>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="w-full text-center">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

function MiniInput({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <label className="block text-center">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <input
        type={type} value={value} readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-2xl border border-slate-200 px-3 py-2 text-center text-sm outline-none focus:border-slate-500",
          readOnly && "bg-slate-50 text-slate-400"
        )}
      />
    </label>
  );
}

// FIX: acepta { value, label }[] además de string[]
function SelectBox({ label, value, onChange, options }) {
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  return (
    <label className="block text-center">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none focus:border-slate-500"
      >
        {normalized.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function TextAreaBlock({ title, value, onChange, placeholder = "Escribe aqui..." }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center">
      <p className="mb-2 text-sm font-black text-slate-900">{title}</p>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)}
        rows={5} placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-center text-sm outline-none focus:border-slate-500"
      />
    </div>
  );
}

function LogoChip({ name, logo, logoUrl }) {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      {logoUrl
        ? <img src={logoUrl} className="h-12 w-12 rounded-2xl object-cover" alt={name} />
        : <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white">{logo || initials(name)}</div>
      }
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Equipo</p>
        <p className="font-black text-slate-950">{name}</p>
      </div>
    </div>
  );
}

function PlayerAvatar({ player, size = "h-10 w-10" }) {
  if (player.photoUrl) {
    return <img src={player.photoUrl} className={cn("shrink-0 rounded-xl object-cover", size)} alt={playerName(player)} />;
  }
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white", size)}>
      {player.photo || initials(playerName(player))}
    </div>
  );
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <Card className="p-8 text-center">
          <p className="text-2xl font-black text-rose-600">Error en este panel</p>
          <p className="mt-2 text-sm text-slate-500">{String(this.state.error)}</p>
          <Button className="mt-4" onClick={() => this.setState({ error: null })}>Reintentar</Button>
        </Card>
      );
    }
    return this.props.children;
  }
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ mainTab, offlineTab, liveTab, regTab, dbView, sessionTab, goTo,
  selectedSeason, setSelectedSeason, visualFocusGroup, setVisualFocusGroup, onLogout,
  onOpenSettings, userName = "Usuario", userRole = "Entrenador" }) {

  const [openGroups, setOpenGroups] = useState({});
  // FIX: confirmación en UI en lugar de alert()
  const [confirmLogout, setConfirmLogout] = useState(false);

  const isActive = (item) =>
    item.main === mainTab &&
    ((item.main === "offline" && offlineTab === item.sub) ||
      (item.main === "live" && liveTab === item.sub) ||
      (item.main === "registro" && regTab === item.sub) ||
      (item.main === "bd" && dbView === item.sub) ||
      (item.main === "session" && sessionTab === item.sub));

  const handleGroupClick = (group) => {
    setVisualFocusGroup((c) => c === group.title ? "" : group.title);
    setOpenGroups((c) => ({ ...c, [group.title]: !c[group.title] }));
  };

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className="sticky top-0 flex h-screen w-[286px] shrink-0 flex-col overflow-y-auto bg-gradient-to-b from-[#061a3f] via-[#08285f] to-[#031126] px-4 py-5 text-yellow-100 shadow-2xl"
    >
      {/* Logo */}
      <div className="mb-4 flex items-center gap-3 rounded-[28px] border border-blue-300/20 bg-blue-950/45 px-3 py-3 shadow-inner">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-yellow-300/35 bg-yellow-300/12 text-2xl font-black text-yellow-300 shadow-lg">EC</div>
        <div>
          <p className="text-2xl font-black leading-6 tracking-tight text-yellow-300">ENDANIA</p>
          <p className="text-lg font-black leading-5 text-yellow-100">COACH</p>
        </div>
      </div>

      {/* Temporada */}
      <div className="mb-5 rounded-2xl border border-blue-300/20 bg-blue-950/55 p-3 text-sm font-bold text-blue-100">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-blue-100/70">Temporada</span>
          <select
            value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full rounded-2xl border border-yellow-300/25 bg-blue-900/80 px-3 py-2 text-sm font-black text-yellow-200 outline-none focus:border-yellow-300"
          >
            {SEASONS.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
          </select>
        </label>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4">
        {NAV_GROUPS.map((group) => {
          const isOpen = Boolean(openGroups[group.title]);
          const isMuted = visualFocusGroup !== "" && visualFocusGroup !== group.title;
          return (
            <div key={group.title} className={cn(
              "rounded-[26px] border border-white/15 p-3 shadow-inner transition",
              isMuted ? "bg-slate-900/30" : "bg-yellow-900/20"
            )}>
              <button type="button" onClick={() => handleGroupClick(group)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border border-white/20 px-3 py-3 text-left transition",
                  isMuted
                    ? "bg-slate-700/60"
                    : visualFocusGroup === group.title
                    ? "bg-yellow-400/90 shadow-lg shadow-yellow-900/40"
                    : "bg-yellow-600/70 hover:bg-yellow-500/80"
                )}>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "h-8 w-1.5 rounded-full bg-gradient-to-b",
                    isMuted ? "from-slate-600 to-slate-700" : "from-blue-400 to-indigo-500"
                  )} />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white">{group.title}</p>
                </div>
                <span className={cn("rounded-full border border-white/20 bg-white/15 px-2 py-1 text-xs font-black text-white transition", isOpen ? "rotate-180" : "")}>⌄</span>
              </button>
              {isOpen && (
                <div className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <button key={`${item.main}-${item.sub}`} type="button"
                      onClick={() => { setVisualFocusGroup(group.title); goTo(item); }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm font-black text-white transition",
                        isActive(item)
                          ? "border-white/60 bg-yellow-400/90 shadow-md"
                          : isMuted
                          ? "border-white/10 bg-slate-800/60"
                          : "border-white/20 bg-yellow-700/50 hover:bg-yellow-600/70"
                      )}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Usuario */}
      <div className="mt-6 rounded-2xl border border-blue-300/20 bg-blue-950/55 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-blue-100">{userName}</p>
            <p className="text-xs font-semibold text-blue-100/70">{userRole}</p>
          </div>
          <button type="button" onClick={() => onOpenSettings?.()}
            title="Ajustes de cuenta"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-base text-white transition hover:bg-yellow-500/60 hover:border-yellow-300/40">
            ⚙️
          </button>
        </div>
        {confirmLogout ? (
          <div className="mt-2 rounded-xl border border-red-300/30 bg-red-950/40 p-2 text-center">
            <p className="mb-1.5 text-xs font-bold text-red-200">¿Cerrar sesion?</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setConfirmLogout(false)}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 py-1 text-[10px] font-black text-white hover:bg-white/20">
                Cancelar
              </button>
              <button type="button" onClick={onLogout}
                className="flex-1 rounded-lg bg-red-500 py-1 text-[10px] font-black text-white hover:bg-red-400">
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmLogout(true)}
            className="mt-2 rounded-lg border border-red-300/30 bg-red-500/70 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white/90 transition hover:bg-red-500">
            Cerrar sesion
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── Componentes de visualización ─────────────────────────────────────────────

function StatsGrid({ team, stats }) {
  const items = [
    ["Tiros a porteria", stats.shotsOn], ["Tiros fuera", stats.shotsOff],
    ["Tiros al palo", stats.shotsPost], ["Goles", stats.goals],
    ["Tiros totales", stats.shotsTotal], ["Recuperaciones", stats.recoveries],
    ["Perdidas", stats.losses], ["Transicion tras perdida", stats.transLoss],
    ["Perdida tras recuperacion", stats.lossAfterRecovery],
    ["Amarillas", stats.yellow], ["Rojas", stats.red],
  ];
  return (
    <Card className="p-4">
      <div className="mb-4"><LogoChip name={team} /></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {items.map(([label, value]) => (
          <div key={label} className="flex h-24 flex-col items-center justify-center rounded-2xl bg-sky-50 p-3 text-center">
            <p className="text-[11px] font-bold uppercase text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// FIX: porcentajes derivados de las stats reales
function PercentageReport({ teamName, stats }) {
  const sections = deriveReportPercentages(stats);
  return (
    <Card className="p-5">
      <div className="mb-4 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-slate-500">Ficha de informe</p>
        <h3 className="text-xl font-black text-slate-950">Distribucion estadistica · {teamName}</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-white bg-slate-50 p-4 shadow-sm">
            <div className={cn("mb-4 rounded-3xl bg-gradient-to-br p-4 text-white", section.color)}>
              <p className="text-sm font-black uppercase tracking-wide text-white/85">{section.title}</p>
              <p className="mt-2 text-3xl font-black">{section.total}</p>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-xs font-black text-slate-600">
                    <span>{item.label}</span><span>{item.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white">
                    <div className={cn("h-full rounded-full bg-gradient-to-r", section.color)} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// FIX: intensidad de zonas calculada desde stats reales
function HeatMap({ teamName, stats }) {
  const zones = deriveHeatZones(stats);
  return (
    <Card className="space-y-4 p-4">
      <div className="text-center">
        <p className="text-sm font-black text-slate-900">Mapa de calor</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">{teamName}</p>
      </div>
      <div className="relative h-72 overflow-hidden rounded-[30px] border-2 border-emerald-300 bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 shadow-inner">
        <div className="absolute inset-3 rounded-[26px] border-2 border-white/90" />
        <div className="absolute inset-y-3 left-1/2 w-[2px] -translate-x-1/2 bg-white/90" />
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90" />
        <div className="absolute left-[3%] top-[24%] h-[52%] w-[12%] rounded-r-[26px] border-2 border-white/90" />
        <div className="absolute right-[3%] top-[24%] h-[52%] w-[12%] rounded-l-[26px] border-2 border-white/90" />
        <div className="absolute left-[6%] top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 shadow-md">
          <span className="text-lg">🧤</span>
          <span className="text-base font-black text-cyan-700">→</span>
        </div>
        {zones.map((zone) => (
          <div key={zone.label}
            className="absolute z-10 flex flex-col items-center justify-center rounded-[24px] border border-white/70 px-2 text-center text-[11px] font-black text-slate-900 shadow-md"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%`, backgroundColor: zone.c }}>
            <span>{zone.label}</span>
            <span className="mt-1 text-base">{zone.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// FIX: distribución de tiros calculada desde stats reales
function ZoneMap({ title, stats }) {
  const zones = distributeAcrossZones(stats);
  return (
    <Card className="p-4">
      <p className="mb-3 text-center text-sm font-black text-slate-900">{title}</p>
      <div className="grid grid-cols-3 overflow-hidden rounded-3xl border-2 border-emerald-200 bg-emerald-50/80">
        {zones.map((zone) => (
          <div key={zone.zone} className="min-h-[210px] border-r border-white/90 p-3 text-center last:border-r-0">
            <div className="mb-3 rounded-2xl bg-white/80 p-3 shadow-sm">
              <p className="text-sm font-black text-slate-950">{zone.zone}</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{zone.on + zone.off + zone.post + zone.goal}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="rounded-xl bg-emerald-100 p-2">Porteria<br /><span className="text-lg">{zone.on}</span></div>
              <div className="rounded-xl bg-rose-100 p-2">Fuera<br /><span className="text-lg">{zone.off}</span></div>
              <div className="rounded-xl bg-amber-100 p-2">Palo<br /><span className="text-lg">{zone.post}</span></div>
              <div className="rounded-xl bg-blue-100 p-2">Gol<br /><span className="text-lg">{zone.goal}</span></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ConsignaBox({ title, selected, onToggle, className = "" }) {
  const options = CONSIGNAS[title] || [];
  return (
    <Card className={cn("p-4 transition hover:-translate-y-0.5 hover:shadow-lg", className)}>
      <p className="mb-3 text-center text-sm font-black text-slate-950">{title}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((code) => {
          const active = selected.includes(code);
          return (
            <button key={code} type="button" onClick={() => onToggle(title, code)}
              className={cn("rounded-2xl border px-3 py-2 text-left text-xs transition",
                active ? "border-slate-950 bg-slate-950 text-white shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50")}>
              <span className="block font-black">{code}</span>
              <span>{LABELS[code] || code}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function MetricByTasksDashboard({ title, subtitle, warmupTasks, mainTasks, cooldownTasks, metric = "load" }) {
  const groups = [
    { title: "Calentamiento", color: "from-amber-400 to-orange-500", soft: "bg-amber-100/70", border: "border-amber-300", tasks: warmupTasks },
    { title: "Parte principal", color: "from-emerald-500 to-teal-600", soft: "bg-emerald-100/70", border: "border-emerald-300", tasks: mainTasks },
    { title: "Vuelta a la calma", color: "from-sky-500 to-blue-600", soft: "bg-sky-100/70", border: "border-sky-300", tasks: cooldownTasks },
  ];
  const getValue = (task) => metric === "time" ? safeNum(task.realTime) : taskUA(task);
  const unit = metric === "time" ? "'" : " UA";
  const circleLabel = metric === "time" ? "Tiempo total" : "Carga total";
  const maxTask = Math.max(...groups.flatMap((g) => g.tasks.map((t) => getValue(t))), 1);
  return (
    <Card className="p-5">
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="mt-6 space-y-5">
        {groups.map((group) => {
          const total = group.tasks.reduce((sum, t) => sum + getValue(t), 0);
          return (
            <div key={group.title} className={cn("rounded-3xl border p-4", group.soft, group.border)}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[170px_1fr]">
                <div className="flex items-center justify-center text-center">
                  <div>
                    <div className={cn("mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg", group.color)}>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/75">{circleLabel}</p>
                        <p className="text-3xl font-black">{total}{metric === "time" ? "'" : ""}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-base font-black text-slate-950">{group.title}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* FIX: key estable usando task.id */}
                  {group.tasks.map((task, index) => {
                    const value = getValue(task);
                    const width = (value / maxTask) * 100;
                    return (
                      <div key={task.id} className="rounded-2xl border border-white/90 bg-white p-3 text-center shadow-sm">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="flex-1 truncate text-sm font-black text-slate-800">{index + 1}. {task.type}</span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-950">{value}{unit}</span>
                        </div>
                        <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                          <div className={cn("h-full rounded-full bg-gradient-to-r", group.color)} style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function TaskLine({ title, options, value, onChange, tint = "bg-white", accent = "border-slate-200" }) {
  const ua = taskUA(value);
  return (
    <div className={cn("grid grid-cols-1 gap-3 rounded-3xl border p-4 text-center shadow-sm md:grid-cols-[1.15fr_0.8fr_0.8fr_0.8fr_0.7fr_0.9fr] md:items-end", tint, accent)}>
      <SelectBox label={title} value={value.type} onChange={(next) => onChange({ ...value, type: next })} options={options} />
      <label className="block text-center">
        <span className="mb-1 block text-center text-xs font-bold uppercase tracking-wide text-slate-500">Dimensiones (M)</span>
        <div className="grid grid-cols-2 gap-2">
          <select value={value.dimX} onChange={(e) => onChange({ ...value, dimX: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-2 py-2 text-center text-sm outline-none focus:border-slate-500">
            {DIMENSION_OPTIONS.map((o) => <option key={`x-${o}`} value={o}>{o}</option>)}
          </select>
          <select value={value.dimY} onChange={(e) => onChange({ ...value, dimY: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-2 py-2 text-center text-sm outline-none focus:border-slate-500">
            {DIMENSION_OPTIONS.map((o) => <option key={`y-${o}`} value={o}>{o}</option>)}
          </select>
        </div>
      </label>
      <MiniInput label="T. estimado" type="number" value={value.estimatedTime} onChange={(next) => onChange({ ...value, estimatedTime: next })} />
      <MiniInput label="T. real" type="number" value={value.realTime} onChange={(next) => onChange({ ...value, realTime: next })} />
      <label className="block text-center">
        <span className="mb-1 block text-center text-xs font-bold uppercase tracking-wide text-slate-500">RPE</span>
        <input type="number" min="1" max="10" value={value.rpe}
          onChange={(e) => { const next = validRpe(e.target.value); if (next !== null) onChange({ ...value, rpe: next }); }}
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-center text-sm outline-none focus:border-slate-500" />
      </label>
      <div className="rounded-2xl border border-violet-200 bg-violet-50 px-3 py-2 text-center">
        <p className="text-[10px] font-black uppercase tracking-wide text-violet-500">UA tarea</p>
        <p className="text-xl font-black text-violet-950">{ua}</p>
      </div>
    </div>
  );
}

function TrainingBlock({ title, options, values, setValues, wrapperClass, lineClass, accent, summaryClass }) {
  const summary = blockSummary(values);
  return (
    <Card className={cn("p-5 ring-2", wrapperClass)}>
      <SectionTitle title={title} />
      <div className="mt-5 space-y-3">
        {/* FIX: key estable usando task.id */}
        {values.map((task, index) => (
          <TaskLine key={task.id} title={`Linea ${index + 1}`} options={options} value={task}
            tint={lineClass} accent={accent}
            onChange={(next) => setValues((c) => c.map((item, i) => i === index ? next : item))} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[["Tiempo estimado", `${summary.estimated}'`], ["Tiempo real", `${summary.real}'`],
          ["Media RPE", summary.avgRpe || "—"], ["Carga UA", summary.ua]].map(([label, val]) => (
          <div key={label} className={cn("rounded-3xl p-4 text-center", summaryClass)}>
            <p className="text-xs font-black uppercase tracking-wide">{label}</p>
            <p className="mt-2 text-3xl font-black">{val}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MicrocycleChart({ trainings, matches, teamName, anchorDate }) {
  const days = getWeekDays(anchorDate);
  const maxUA = Math.max(...days.map((d) => trainingSummaryForDate(trainings, d).ua), 1);
  const maxMin = Math.max(...days.map((d) => trainingSummaryForDate(trainings, d).minutes), 1);
  const labels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  return (
    <Card className="p-5">
      <SectionTitle title="Microciclo lunes-domingo" subtitle="Carga total UA, minutaje real y partido si existe esa semana." />
      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-7">
        {days.map((date, index) => {
          const summary = trainingSummaryForDate(trainings, date);
          const dayMatches = matches.filter((m) => m.date === date && m.teams.includes(teamName));
          return (
            <div key={date} className="rounded-3xl border border-slate-200 bg-white p-3 text-center shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">{labels[index]}</p>
              <p className="mt-1 text-xs font-bold text-slate-400">{date.slice(5)}</p>
              <div className="mt-4 flex h-36 items-end justify-center gap-2">
                <div className="flex h-full w-10 items-end rounded-full bg-violet-50">
                  <div className="w-full rounded-full bg-gradient-to-t from-violet-600 to-fuchsia-400"
                    style={{ height: `${Math.max(8, (summary.ua / maxUA) * 100)}%` }} />
                </div>
                <div className="flex h-full w-10 items-end rounded-full bg-cyan-50">
                  <div className="w-full rounded-full bg-gradient-to-t from-cyan-600 to-sky-300"
                    style={{ height: `${Math.max(8, (summary.minutes / maxMin) * 100)}%` }} />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black">
                <div className="rounded-2xl bg-violet-50 p-2 text-violet-800">{summary.ua} UA</div>
                <div className="rounded-2xl bg-cyan-50 p-2 text-cyan-800">{summary.minutes}'</div>
              </div>
              {summary.items.length
                ? <p className="mt-2 rounded-2xl bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{summary.items.length} entreno</p>
                : <p className="mt-2 rounded-2xl bg-slate-50 px-2 py-1 text-xs font-bold text-slate-400">Sin entreno</p>}
              {dayMatches.map((match) => (
                <div key={match.id} className="mt-2 rounded-2xl bg-amber-100 px-2 py-2 text-xs font-black text-amber-900">
                  vs {getOpponent(match, teamName)}<br />{getResult(match, teamName)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────

function OfflineVideoPanel({ consignas, setConsignas, fileName, setFileName, progress, setProgress, focus, setFocus }) {
  const toggleConsigna = (group, code) =>
    setConsignas((c) => {
      const sel = c[group] || [];
      return { ...c, [group]: sel.includes(code) ? sel.filter((x) => x !== code) : [...sel, code] };
    });
  const activeConsignas = Object.values(consignas).flat().length;
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-gradient-to-br from-violet-700 via-purple-600 to-cyan-500 p-6 text-white">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">🎥</div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100/80">Analisis de video</p>
                <h2 className="text-2xl font-black">Panel de control</h2>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/85">Configura consignas y archivo para analizar el partido.</p>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-3xl border border-white/28 bg-white/18 p-4"><p className="text-[11px] font-black uppercase tracking-wide text-white/82">Equipos</p><p className="mt-2 text-3xl font-black">2</p></div>
              <div className="rounded-3xl border border-white/28 bg-white/18 p-4"><p className="text-[11px] font-black uppercase tracking-wide text-white/82">Consignas</p><p className="mt-2 text-3xl font-black">{activeConsignas}</p></div>
              <div className="rounded-3xl border border-white/28 bg-white/18 p-4"><p className="text-[11px] font-black uppercase tracking-wide text-white/82">Partido</p><p className="mt-2 truncate text-sm font-bold text-white/95">{fileName || "Pendiente"}</p></div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:bg-cyan-50">
                Examinar partido
                <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; setFileName(f ? f.name : ""); setProgress(0); }} />
              </label>
              <span className="truncate text-sm font-bold text-white/80">{fileName || "Ningun partido seleccionado"}</span>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="rounded-3xl border border-slate-200 bg-violet-50/45 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Estado</p><p className="text-lg font-black text-slate-950">Progreso de analisis</p></div>
                <div className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-black text-cyan-700">{progress}%</div>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-violet-100">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-700" style={{ width: `${progress}%` }} />
              </div>
              <Button className="mt-5 w-full rounded-2xl py-3" onClick={() => setProgress((v) => Math.min(100, v + 25))}>Analizar</Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <SectionTitle title="Consignas" />
          <div className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-700">Activas: {activeConsignas}</div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Ataque", "Defensa", "Situaciones especiales"].map((g) => (
            <ConsignaBox key={g} title={g} selected={consignas[g] || []} onToggle={toggleConsigna} />
          ))}
          <ConsignaBox title="ABP" selected={consignas["ABP"] || []} onToggle={toggleConsigna} className="md:col-span-1 xl:col-span-2" />
          <ConsignaBox title="Porteros" selected={consignas["Porteros"] || []} onToggle={toggleConsigna} />
        </div>
        <div className="mt-5">
          <TextAreaBlock title="Agregar informacion extra" value={focus} onChange={setFocus} />
        </div>
      </Card>
    </div>
  );
}

// FIX: ScoutingPanel usa stats reales del partido seleccionado
function ScoutingPanel({ matches, scoutMatchId, setScoutMatchId, saveScouting }) {
  const match = matches.find((m) => m.id === scoutMatchId) || matches[0];
  if (!match) return <Card className="p-6 text-center text-sm text-slate-500">Sin partidos disponibles.</Card>;

  const teamA = match.teams[0];
  const teamB = match.teams[1];
  const statsA = match.a;
  const statsB = match.b;

  const matchOptions = matches.map((m) => ({
    value: String(m.id),
    label: `${m.date} · ${m.teams[0]} vs ${m.teams[1]} (${m.type})`,
  }));

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          <SelectBox label="Partido analizado" value={String(scoutMatchId)} onChange={(v) => setScoutMatchId(Number(v))} options={matchOptions} />
          <div className="flex items-end justify-center">
            <Button onClick={saveScouting}>Guardar en Base de Datos</Button>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <StatsGrid team={teamA} stats={statsA} />
        <StatsGrid team={teamB} stats={statsB} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PercentageReport teamName={teamA} stats={statsA} />
        <PercentageReport teamName={teamB} stats={statsB} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <HeatMap teamName={teamA} stats={statsA} />
        <HeatMap teamName={teamB} stats={statsB} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ZoneMap title={`${teamA} · Tiros`} stats={statsA} />
        <ZoneMap title={`${teamB} · Tiros`} stats={statsB} />
      </div>
    </div>
  );
}

// FIX: PreMatchPanel con estado real en los selects y notas editables
function PreMatchPanel({ teams }) {
  const teamNames = teams.map((t) => t.name);
  const [team1, setTeam1] = useState(teamNames[0] || MY_TEAM);
  const [team2, setTeam2] = useState(teamNames[1] || "Rival");
  const [myNotes, setMyNotes] = useState("");
  const [rivalNotes, setRivalNotes] = useState("");
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionTitle title="Prepartido" subtitle="Escoge equipos y prepara el plan de partido." />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectBox label="Equipo 1" value={team1} onChange={setTeam1} options={teamNames.length ? teamNames : [MY_TEAM]} />
          <SelectBox label="Equipo 2" value={team2} onChange={setTeam2} options={teamNames.length ? teamNames : ["Rival"]} />
          <div className="flex items-end justify-center"><Button>Generar plan</Button></div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TextAreaBlock title={`Mi equipo · ${team1}`} value={myNotes} onChange={setMyNotes} placeholder="Plan de partido, consignas, disposicion..." />
        <TextAreaBlock title={`Rival · ${team2}`} value={rivalNotes} onChange={setRivalNotes} placeholder="Puntos debiles, consignas defensivas..." />
      </div>
    </div>
  );
}

function RecommendationPanel() {
  const ideas = ["Reducir perdidas interiores", "Atacar segundo palo", "Preparar ABP"];
  return (
    <Card className="p-5">
      <SectionTitle title="Recomendacion IA" subtitle="Sintesis global del analisis." />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {ideas.map((idea, i) => (
          <div key={idea} className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 p-5 text-center text-white shadow-lg">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">Prioridad {i + 1}</p>
            <h3 className="mt-2 text-lg font-black">{idea}</h3>
            <p className="mt-3 text-sm leading-6 text-white/95">Recomendacion operativa para el proximo bloque de trabajo.</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// FIX: LivePanel con estado real para el DAFO
function LivePanel({ liveTab, players }) {
  const [dafoBoth, setDafoBoth] = useState({ mine: "", rival: "" });

  if (liveTab === "Directo") {
    return (
      <div className="space-y-6">
        <Card className="p-5">
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="soft">Nota teclado</Button>
            <Button variant="soft">Audio</Button>
            <Button>Live</Button>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <TextAreaBlock title="DAFO · Mi equipo" value={dafoBoth.mine} onChange={(v) => setDafoBoth((c) => ({ ...c, mine: v }))} placeholder="Fortalezas, debilidades, oportunidades, amenazas..." />
          <TextAreaBlock title="DAFO · Rival" value={dafoBoth.rival} onChange={(v) => setDafoBoth((c) => ({ ...c, rival: v }))} placeholder="Fortalezas, debilidades, oportunidades, amenazas..." />
        </div>
      </div>
    );
  }

  return (
    <Card className="p-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {players.map((player) => (
          <div key={player.id} className={cn("rounded-3xl border p-4 text-center", player.starter ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white")}>
            <div className="flex items-center justify-center gap-3">
              <PlayerAvatar player={player} size="h-12 w-12" />
              <div>
                <p className="font-black text-slate-950">{player.name}</p>
                <p className="text-sm text-slate-500">{player.pos}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">Tiempo: {formatTime(player.seconds)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// MY_TEAM siempre primero en cualquier lista de equipos
function sortedTeamsList(teams) {
  return [...teams].sort((a, b) => {
    if (a.name === MY_TEAM) return -1;
    if (b.name === MY_TEAM) return 1;
    return 0;
  });
}

function PhotoUpload({ photoUrl, onChange, label = "Foto", emptyText = "Sin foto", btnText, size = "h-16 w-16" }) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(String(ev.target?.result || ""));
    reader.readAsDataURL(file);
  };
  const uploadLabel = btnText || (photoUrl ? "Cambiar" : "Subir");
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      {photoUrl
        ? <img src={photoUrl} className={cn("rounded-xl object-cover ring-2 ring-violet-300", size)} alt={label} />
        : <div className={cn("flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 text-xs font-bold", size)}>{emptyText}</div>
      }
      <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-violet-50 hover:border-violet-300 transition">
        {uploadLabel}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  );
}

function RegistryPanel({ regTab, players, setPlayers, teams, setTeams }) {
  const emptyPlayer = { team: MY_TEAM, dorsal: "", name: "", surname: "", pos: "Ala", birthDate: "", photo: "", photoUrl: "" };
  const emptyTeam = { name: "", category: "Senior", color: "Azul", logo: "", logoUrl: "" };
  const [playerForm, setPlayerForm] = useState(emptyPlayer);
  const [teamForm, setTeamForm] = useState(emptyTeam);
  // Editar tab state
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [teamEditForm, setTeamEditForm] = useState({});
  const [playerEditForms, setPlayerEditForms] = useState({});

  const orderedTeams = sortedTeamsList(teams);
  const teamNames = orderedTeams.map((t) => t.name);
  const endaniaPlayers = players.filter((p) => p.team === MY_TEAM);

  // ── Alta handlers ──
  const savePlayer = () => {
    if (!playerForm.name || !playerForm.dorsal || !playerForm.birthDate) return;
    setPlayers((c) => [...c, {
      id: Date.now(), ...playerForm,
      dorsal: safeNum(playerForm.dorsal),
      photo: playerForm.photo || initials(`${playerForm.name} ${playerForm.surname}`),
      starter: false, seconds: 0,
    }]);
    setPlayerForm(emptyPlayer);
  };
  const saveTeam = () => {
    if (!teamForm.name) return;
    setTeams((c) => [...c, { id: Date.now(), ...teamForm, logo: teamForm.logo || initials(teamForm.name) }]);
    setTeamForm(emptyTeam);
  };

  // ── Editar handlers ──
  const startEditTeam = (team) => {
    setEditingTeamId(team.id);
    setTeamEditForm({ ...team });
    const teamPlayers = players.filter((p) => p.team === team.name);
    const forms = {};
    teamPlayers.forEach((p) => { forms[p.id] = { ...p, dorsal: String(p.dorsal) }; });
    setPlayerEditForms(forms);
  };
  const saveAllEdits = () => {
    setTeams((c) => c.map((t) => t.id === editingTeamId ? { ...t, ...teamEditForm, logo: teamEditForm.logo || initials(teamEditForm.name), logoUrl: teamEditForm.logoUrl || "" } : t));
    setPlayers((c) => c.map((p) => playerEditForms[p.id]
      ? { ...p, ...playerEditForms[p.id], dorsal: safeNum(playerEditForms[p.id].dorsal), photo: playerEditForms[p.id].photo || initials(`${playerEditForms[p.id].name} ${playerEditForms[p.id].surname}`) }
      : p
    ));
    setEditingTeamId(null);
  };
  const cancelAllEdits = () => setEditingTeamId(null);

  // Función (no componente) para evitar que React desmonte los inputs al rerender
  const renderPlayerForm = (form, setForm) => (
    <div className="flex gap-4 items-start">
      <div className="shrink-0">
        <PhotoUpload
          photoUrl={form.photoUrl || ""}
          onChange={(url) => setForm((c) => ({ ...c, photoUrl: url }))}
          size="h-28 w-28"
        />
        {form.birthDate && (
          <p className="mt-1 text-center text-xs font-bold text-slate-400">{calculateAge(form.birthDate)} años</p>
        )}
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3">
        <SelectBox label="Equipo" value={form.team} onChange={(v) => setForm((c) => ({ ...c, team: v }))} options={teamNames.length ? teamNames : [MY_TEAM]} />
        <MiniInput label="Dorsal" value={form.dorsal} onChange={(v) => setForm((c) => ({ ...c, dorsal: v }))} />
        <MiniInput label="Nombre" value={form.name} onChange={(v) => setForm((c) => ({ ...c, name: v }))} />
        <MiniInput label="Apellidos" value={form.surname} onChange={(v) => setForm((c) => ({ ...c, surname: v }))} />
        <SelectBox label="Posicion" value={form.pos} onChange={(v) => setForm((c) => ({ ...c, pos: v }))} options={POSITIONS} />
        <MiniInput label="Nacimiento" type="date" value={form.birthDate} onChange={(v) => setForm((c) => ({ ...c, birthDate: v }))} />
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // PESTAÑA ALTA
  // ══════════════════════════════════════════════
  if (regTab === "Alta") return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ── Izquierda: Alta de equipo ── */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-white/75">Nuevo equipo</p>
              <h3 className="text-xl font-black text-white">Alta de equipo</h3>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <PhotoUpload
                    photoUrl={teamForm.logoUrl}
                    onChange={(url) => setTeamForm((c) => ({ ...c, logoUrl: url }))}
                    label="Logo"
                    emptyText="Sin logo"
                    size="h-20 w-20"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <MiniInput label="Nombre del equipo" value={teamForm.name} onChange={(v) => setTeamForm((c) => ({ ...c, name: v }))} />
                    <MiniInput label="Siglas" value={teamForm.logo} onChange={(v) => setTeamForm((c) => ({ ...c, logo: v }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SelectBox label="Categoria" value={teamForm.category} onChange={(v) => setTeamForm((c) => ({ ...c, category: v }))} options={CATEGORY_OPTIONS} />
                    <MiniInput label="Color principal" value={teamForm.color} onChange={(v) => setTeamForm((c) => ({ ...c, color: v }))} />
                  </div>
                </div>
              </div>
              <button type="button" onClick={saveTeam}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-black text-white shadow-md transition hover:from-emerald-400 hover:to-teal-500">
                + Guardar equipo
              </button>
            </div>
          </div>

          {/* Equipos dados de alta */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-slate-900">Equipos registrados</h4>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{orderedTeams.length} equipos</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {orderedTeams.length ? orderedTeams.map((team) => {
                const count = players.filter((p) => p.team === team.name).length;
                const isMine = team.name === MY_TEAM;
                return (
                  <div key={team.id} className={cn("flex items-center gap-3 px-5 py-3", isMine && "bg-emerald-50/60")}>
                    {team.logoUrl
                      ? <img src={team.logoUrl} className="h-10 w-10 rounded-xl object-cover shrink-0" alt={team.name} />
                      : <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">{team.logo || initials(team.name)}</div>
                    }
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 truncate">
                        {isMine && <span className="mr-1 text-amber-500">★</span>}
                        {team.name}
                      </p>
                      <p className="text-xs text-slate-500">{team.category} · {team.color}</p>
                    </div>
                    <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-black text-slate-600">{count} jug.</span>
                  </div>
                );
              }) : <p className="px-5 py-4 text-sm text-slate-400">Sin equipos aún.</p>}
            </div>
          </div>
        </div>

        {/* ── Derecha: Alta de jugadora ── */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-white/75">Nueva jugadora</p>
              <h3 className="text-xl font-black text-white">Alta de jugadora</h3>
            </div>
            <div className="space-y-4 p-5">
              {renderPlayerForm(playerForm, setPlayerForm)}
              <button type="button" onClick={savePlayer}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-3 text-sm font-black text-white shadow-md transition hover:from-violet-400 hover:to-fuchsia-500">
                + Guardar jugadora
              </button>
            </div>
          </div>

          {/* Jugadoras de Endania */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-slate-900">
                  <span className="mr-1 text-amber-500">★</span>{MY_TEAM}
                </h4>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">{endaniaPlayers.length} jugadoras</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50 max-h-96 overflow-y-auto">
              {endaniaPlayers.length ? endaniaPlayers.map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <PlayerAvatar player={p} size="h-10 w-10" />
                  <span className="w-8 text-center text-xs font-black text-slate-500">#{p.dorsal}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{playerName(p)}</p>
                    <p className="text-xs text-slate-400">{p.pos} · {calculateAge(p.birthDate)} años</p>
                  </div>
                  {p.starter && <span className="rounded-lg bg-cyan-100 px-2 py-0.5 text-[10px] font-black text-cyan-700">Titular</span>}
                </div>
              )) : <p className="px-5 py-4 text-sm text-slate-400">Sin jugadoras registradas.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // PESTAÑA EDITAR
  // ══════════════════════════════════════════════
  const editingTeam = teams.find((t) => t.id === editingTeamId);
  const editingTeamPlayers = editingTeam ? players.filter((p) => p.team === editingTeam.name) : [];

  return (
    <div className="space-y-6">
      {editingTeamId && editingTeam ? (
        /* ── Vista de edición de un equipo ── */
        <div className="space-y-5">
          {/* Botón guardar sticky arriba */}
          <div className="flex items-center justify-between rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 shadow-sm">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-600">Editando</p>
              <p className="text-lg font-black text-slate-950">{editingTeam.name}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={cancelAllEdits}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
                Cancelar
              </button>
              <button type="button" onClick={saveAllEdits}
                className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-black text-white shadow-md transition hover:from-emerald-400 hover:to-teal-500">
                Guardar cambios
              </button>
            </div>
          </div>

          {/* Datos del equipo */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-white/60">Info del equipo</p>
              <h3 className="text-lg font-black text-white">{editingTeam.name}</h3>
            </div>
            <div className="flex gap-4 items-start p-5">
              <div className="shrink-0">
                <PhotoUpload
                  photoUrl={teamEditForm.logoUrl || ""}
                  onChange={(url) => setTeamEditForm((c) => ({ ...c, logoUrl: url }))}
                  label="Logo"
                  emptyText="Sin logo"
                  size="h-20 w-20"
                />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MiniInput label="Nombre" value={teamEditForm.name || ""} onChange={(v) => setTeamEditForm((c) => ({ ...c, name: v }))} />
                <MiniInput label="Siglas" value={teamEditForm.logo || ""} onChange={(v) => setTeamEditForm((c) => ({ ...c, logo: v }))} />
                <SelectBox label="Categoria" value={teamEditForm.category || "Senior"} onChange={(v) => setTeamEditForm((c) => ({ ...c, category: v }))} options={CATEGORY_OPTIONS} />
                <MiniInput label="Color" value={teamEditForm.color || ""} onChange={(v) => setTeamEditForm((c) => ({ ...c, color: v }))} />
              </div>
            </div>
          </div>

          {/* Jugadoras del equipo */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-slate-900">Jugadoras de {editingTeam.name}</h4>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">{editingTeamPlayers.length} jugadoras</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {editingTeamPlayers.length ? editingTeamPlayers.map((player) => {
                const form = playerEditForms[player.id] || { ...player, dorsal: String(player.dorsal) };
                const update = (field, val) => setPlayerEditForms((c) => ({ ...c, [player.id]: { ...form, [field]: val } }));
                return (
                  <div key={player.id} className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <PlayerAvatar player={{ ...player, photoUrl: form.photoUrl }} size="h-12 w-12" />
                      <div className="flex-1">
                        <p className="font-black text-slate-900">{playerName(player)}</p>
                        <p className="text-xs text-slate-400">#{player.dorsal} · {player.pos}</p>
                      </div>
                      <PhotoUpload photoUrl={form.photoUrl || ""} onChange={(url) => update("photoUrl", url)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                      <MiniInput label="Nombre" value={form.name} onChange={(v) => update("name", v)} />
                      <MiniInput label="Apellidos" value={form.surname} onChange={(v) => update("surname", v)} />
                      <MiniInput label="Dorsal" value={form.dorsal} onChange={(v) => update("dorsal", v)} />
                      <SelectBox label="Posicion" value={form.pos} onChange={(v) => update("pos", v)} options={POSITIONS} />
                      <MiniInput label="Nacimiento" type="date" value={form.birthDate} onChange={(v) => update("birthDate", v)} />
                    </div>
                  </div>
                );
              }) : <p className="px-5 py-4 text-sm text-slate-400">Sin jugadoras en este equipo.</p>}
            </div>
          </div>
        </div>
      ) : (
        /* ── Grid de equipos con lápiz ── */
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-slate-50/60 px-5 py-4">
            <p className="text-center text-sm font-bold text-slate-500">Pulsa el lápiz de un equipo para editar su información y jugadoras</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orderedTeams.length ? orderedTeams.map((team) => {
              const count = players.filter((p) => p.team === team.name).length;
              const isMine = team.name === MY_TEAM;
              return (
                <div key={team.id} className={cn(
                  "overflow-hidden rounded-3xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                  isMine ? "border-amber-200 bg-white" : "border-slate-100 bg-white"
                )}>
                  <div className={cn("px-5 py-4", isMine ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-slate-600 to-slate-800")}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {team.logoUrl
                          ? <img src={team.logoUrl} className="h-11 w-11 rounded-xl object-cover" alt={team.name} />
                          : <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-sm font-black text-white">{team.logo || initials(team.name)}</div>
                        }
                        <div>
                          <p className="font-black text-white">
                            {isMine && <span className="mr-1">★</span>}{team.name}
                          </p>
                          <p className="text-xs font-semibold text-white/70">{team.category}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => startEditTeam(team)}
                        title="Editar equipo"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-base text-white transition hover:bg-white/35">
                        ✏️
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                    <div className="py-3">
                      <p className="text-[10px] font-black uppercase text-slate-400">Color</p>
                      <p className="mt-0.5 text-sm font-black text-slate-700">{team.color}</p>
                    </div>
                    <div className="py-3">
                      <p className="text-[10px] font-black uppercase text-slate-400">Jugadoras</p>
                      <p className="mt-0.5 text-xl font-black text-slate-900">{count}</p>
                    </div>
                    <div className="py-3">
                      <p className="text-[10px] font-black uppercase text-slate-400">Categoria</p>
                      <p className="mt-0.5 text-[11px] font-black text-slate-600">{team.category}</p>
                    </div>
                  </div>
                </div>
              );
            }) : <p className="text-sm text-slate-400">Sin equipos registrados.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function SessionAnalysisPanel({ sessionFile, setSessionFile, sessionGoals, setSessionGoals, sessionProgress, setSessionProgress }) {
  const hasFile = Boolean(sessionFile);
  const hasGoals = sessionGoals.trim().length > 8;
  const analysisReady = hasFile && hasGoals;
  const blocks = [
    { title: "Coherencia objetivo-contenido", icon: "🎯", text: "Cruce entre objetivos, tareas, duracion, densidad y demandas condicionales." },
    { title: "Carga esperada", icon: "📈", text: "Estimacion de volumen, intensidad, complejidad decisional y pausas." },
    { title: "Estructura", icon: "🧩", text: "Revision de calentamiento, parte principal, progresion y vuelta a la calma." },
    { title: "Alertas", icon: "⚠️", text: "Deteccion de consignas, roles, porteras, ABP, feedback y tiempos." },
  ];
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-gradient-to-br from-cyan-700 via-blue-700 to-slate-900 p-6 text-white">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">📋</div>
              <div><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100/80">Analisis de sesion</p><h2 className="text-2xl font-black">Entrenamiento</h2></div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/85">Sube una imagen o PDF y escribe los objetivos para cruzar contenido, carga y metodologia.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:bg-cyan-50">
                Subir foto o PDF
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; setSessionFile(f ? f.name : ""); setSessionProgress(f ? 35 : 0); }} />
              </label>
              <span className="truncate text-sm font-bold text-white/80">{sessionFile || "Ningun archivo seleccionado"}</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-3xl border border-white/20 bg-white/15 p-4"><p className="text-[11px] font-black uppercase text-white/70">Archivo</p><p className="mt-2 text-2xl font-black">{hasFile ? "OK" : "—"}</p></div>
              <div className="rounded-3xl border border-white/20 bg-white/15 p-4"><p className="text-[11px] font-black uppercase text-white/70">Objetivos</p><p className="mt-2 text-2xl font-black">{hasGoals ? "OK" : "—"}</p></div>
              <div className="rounded-3xl border border-white/20 bg-white/15 p-4"><p className="text-[11px] font-black uppercase text-white/70">Analisis</p><p className="mt-2 text-2xl font-black">{sessionProgress}%</p></div>
            </div>
          </div>
          <div className="bg-white p-6">
            <TextAreaBlock title="Objetivos de la sesion escritos por el entrenador" value={sessionGoals} onChange={setSessionGoals} placeholder="Ejemplo: mejorar salida de presion..." />
            <div className="mt-5 rounded-3xl border border-slate-200 bg-cyan-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-black uppercase tracking-wide text-slate-500">Estado del analisis</p>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-black text-cyan-800">{sessionProgress}%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" style={{ width: `${sessionProgress}%` }} />
              </div>
              <Button className="mt-5 w-full" onClick={() => setSessionProgress((v) => Math.min(100, analysisReady ? v + 35 : v + 15))}>Analizar sesion</Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {blocks.map((b) => (
          <Card key={b.title} className="p-5 text-center">
            <div className="mb-3 text-3xl">{b.icon}</div>
            <p className="text-sm font-black text-slate-950">{b.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{b.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TrainingSessionPanel({ onSaveTraining }) {
  const [sessionDate, setSessionDate] = useState("2026-05-16");
  const [saveMessage, setSaveMessage] = useState("");
  const [warmupRows, setWarmupRows] = useState([
    buildTask("Movilidad", 10, 10, 6, 6, 2),
    buildTask("Tecnica individual", 20, 10, 8, 9, 3),
    buildTask("Preventivo", 10, 5, 7, 7, 2),
  ]);
  const [mainRows, setMainRows] = useState([
    buildTask("Ataque", 40, 20, 12, 13, 6), buildTask("Defensa", 40, 20, 12, 11, 7),
    buildTask("ABP", 20, 20, 8, 9, 5), buildTask("Situaciones especiales", 40, 20, 10, 10, 7),
    buildTask("6m", 20, 20, 6, 7, 6), buildTask("10m", 20, 20, 6, 6, 5),
    buildTask("Ludico", 20, 20, 8, 8, 4),
  ]);
  const [cooldownRows, setCooldownRows] = useState([
    buildTask("Estiramientos pasivos", 5, 5, 4, 5, 1),
    buildTask("CORE", 10, 10, 5, 6, 3),
    buildTask("Roller", 5, 5, 4, 4, 1),
  ]);

  const allRows = [...warmupRows, ...mainRows, ...cooldownRows];
  const globalSummary = blockSummary(allRows);

  const saveTraining = () => {
    const newTraining = { id: Date.now(), date: sessionDate, title: "Sesion de entreno", ua: globalSummary.ua, realMinutes: globalSummary.real, avgRpe: globalSummary.avgRpe };
    onSaveTraining(newTraining);
    setSaveMessage(`Sesion guardada · ${sessionDate}`);
  };

  return (
    <div className="space-y-6 text-center">
      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-sky-700 via-cyan-600 to-emerald-500 p-6 text-center text-white">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/75">Sesion de entreno</p>
          <h2 className="mt-1 text-2xl font-black">Registro de tareas y carga</h2>
          <p className="mt-2 text-sm font-semibold text-white/85">Fecha, guardado de sesion y datos listos para ubicarse en el microciclo semanal.</p>
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-3 rounded-3xl border border-white/20 bg-white/15 p-4 md:grid-cols-[1fr_auto]">
            <label className="block text-center">
              <span className="mb-1 block text-xs font-black uppercase tracking-wide text-white/75">Fecha de la sesion</span>
              <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
                className="w-full rounded-2xl border border-white/30 bg-white px-3 py-2 text-center text-sm font-black text-slate-950 outline-none" />
            </label>
            <div className="flex flex-col justify-end">
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={saveTraining}>Guardar sesion de entreno</Button>
            </div>
          </div>
          {saveMessage && <p className="mt-3 text-sm font-black text-emerald-100">{saveMessage}</p>}
        </div>
      </Card>
      <TrainingBlock title="Calentamiento" options={WARMUP_OPTIONS} values={warmupRows} setValues={setWarmupRows} wrapperClass="border-2 border-amber-300 bg-amber-100/80 ring-amber-200" lineClass="bg-white" accent="border-amber-200" summaryClass="bg-amber-200 text-amber-950" />
      <TrainingBlock title="Parte principal" options={MAIN_TASK_OPTIONS} values={mainRows} setValues={setMainRows} wrapperClass="border-2 border-emerald-300 bg-emerald-100/80 ring-emerald-200" lineClass="bg-white" accent="border-emerald-200" summaryClass="bg-emerald-200 text-emerald-950" />
      <TrainingBlock title="Vuelta a la calma" options={COOLDOWN_OPTIONS} values={cooldownRows} setValues={setCooldownRows} wrapperClass="border-2 border-sky-300 bg-sky-100/80 ring-sky-200" lineClass="bg-white" accent="border-sky-200" summaryClass="bg-sky-200 text-sky-950" />
      <Card className="p-5">
        <SectionTitle title="Resumen de carga de la sesion" subtitle="Totales automaticos de toda la sesion." />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-violet-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-violet-500">Carga UA sesion</p><p className="mt-2 text-3xl font-black text-violet-950">{globalSummary.ua}</p></div>
          <div className="rounded-3xl bg-rose-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-rose-500">Media RPE</p><p className="mt-2 text-3xl font-black text-rose-950">{globalSummary.avgRpe || "—"}</p></div>
          <div className="rounded-3xl bg-amber-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-amber-600">Minutaje estimado</p><p className="mt-2 text-3xl font-black text-amber-950">{globalSummary.estimated}'</p></div>
          <div className="rounded-3xl bg-cyan-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-cyan-600">Minutaje real</p><p className="mt-2 text-3xl font-black text-cyan-950">{globalSummary.real}'</p></div>
        </div>
      </Card>
      <MetricByTasksDashboard title="Minutaje por partes y tareas" subtitle="Minutos reales por bloque y tarea." warmupTasks={warmupRows} mainTasks={mainRows} cooldownTasks={cooldownRows} metric="time" />
      <MetricByTasksDashboard title="Carga por tareas" subtitle="Donde se concentra la carga en la sesion." warmupTasks={warmupRows} mainTasks={mainRows} cooldownTasks={cooldownRows} metric="load" />
    </div>
  );
}

function DatabaseSummary({ teamName, stats }) {
  if (!stats) return <Card className="p-6 text-center text-sm text-slate-500">No hay partidos con los filtros seleccionados.</Card>;
  return (
    <div className="space-y-4">
      <StatsGrid team={teamName} stats={stats} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <HeatMap teamName={teamName} stats={stats} />
        <PercentageReport teamName={teamName} stats={stats} />
      </div>
    </div>
  );
}

function DatabaseTeamPanel({ teamName, players, matches }) {
  const teamPlayers = players.filter((p) => p.team === teamName);
  const teamMatches = getMatchesForTeam(matches, teamName);
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card className="p-5">
        <SectionTitle title="Jugadoras registradas" subtitle={`${teamPlayers.length} jugadoras`} />
        <div className="mt-4 space-y-3">
          {teamPlayers.length ? teamPlayers.map((p) => (
            <div key={p.id} className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-center text-sm md:grid-cols-6 md:items-center">
              <PlayerAvatar player={p} size="h-12 w-12" />
              <div className="font-black text-slate-950">#{p.dorsal}</div>
              <div className="font-bold text-slate-800 md:col-span-2">{playerName(p)}</div>
              <div className="text-slate-500">{p.pos}</div>
              <div className="font-bold text-slate-600">{calculateAge(p.birthDate)} años</div>
            </div>
          )) : <p className="text-center text-sm text-slate-500">Sin jugadoras.</p>}
        </div>
      </Card>
      <Card className="p-5">
        <SectionTitle title="Partidos analizados" subtitle={`${teamMatches.length} partidos`} />
        <div className="mt-4 space-y-3">
          {teamMatches.length ? teamMatches.map((m) => (
            <div key={m.id} className="grid grid-cols-3 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-center text-sm">
              <div className="font-black text-slate-950">{m.date}</div>
              <div className="font-bold text-slate-800">{m.teams[0]} vs {m.teams[1]}</div>
              <div className="font-bold text-slate-600">{m.type}</div>
            </div>
          )) : <p className="text-center text-sm text-slate-500">Sin partidos.</p>}
        </div>
      </Card>
    </div>
  );
}

function TrainingsDatabasePanel({ trainings, matches, teamName }) {
  const [startDate, setStartDate] = useState("2026-05-01");
  const [endDate, setEndDate] = useState("2026-05-31");
  const filteredAll = sortByDateDesc(trainings.filter((t) => inDateRange(t, startDate, endDate)));
  const filtered = filteredAll.slice(0, 10);
  const anchor = filtered[0]?.date || endDate;
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionTitle title="Base de datos · Entrenamientos" subtitle="Ultimos 10 entrenamientos del rango seleccionado." />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MiniInput label="Desde" type="date" value={startDate} onChange={setStartDate} />
          <MiniInput label="Hasta" type="date" value={endDate} onChange={setEndDate} />
          <div className="flex items-end justify-center">
            <div className="rounded-3xl bg-emerald-50 px-5 py-3 text-center">
              <p className="text-xs font-black uppercase text-emerald-600">Entrenos visibles</p>
              <p className="text-2xl font-black text-emerald-950">{filtered.length}</p>
            </div>
          </div>
        </div>
      </Card>
      <MicrocycleChart trainings={filteredAll} matches={matches} teamName={teamName} anchorDate={anchor} />
      <Card className="p-5">
        <SectionTitle title="Listado de entrenamientos" subtitle="Solo se muestran los 10 ultimos del rango." />
        <div className="mt-4 space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="grid grid-cols-1 gap-3 rounded-3xl border border-slate-100 bg-white p-4 text-center shadow-sm md:grid-cols-5 md:items-center">
              <div className="font-black text-slate-950">{t.date}</div>
              <div className="font-bold text-slate-700 md:col-span-2">{t.title}</div>
              <div className="rounded-2xl bg-violet-50 p-2 font-black text-violet-900">{t.ua} UA</div>
              <div className="rounded-2xl bg-cyan-50 p-2 font-black text-cyan-900">{t.realMinutes}'</div>
            </div>
          ))}
          {!filtered.length && <p className="text-sm text-slate-500">Sin entrenamientos en el rango seleccionado.</p>}
        </div>
      </Card>
    </div>
  );
}

function MatchesDatabasePanel({ matches, teamName }) {
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-05-31");
  const leagueMatches = sortByDateDesc(
    matches.filter((m) => m.type === "Liga" && m.teams.includes(teamName) && inDateRange(m, startDate, endDate))
  ).slice(0, 10);
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionTitle title="Base de datos · Partidos" subtitle="Partidos de liga analizados, con calendario para segmentar." />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MiniInput label="Desde" type="date" value={startDate} onChange={setStartDate} />
          <MiniInput label="Hasta" type="date" value={endDate} onChange={setEndDate} />
          <div className="flex items-end justify-center">
            <div className="rounded-3xl bg-orange-50 px-5 py-3 text-center">
              <p className="text-xs font-black uppercase text-orange-600">Partidos visibles</p>
              <p className="text-2xl font-black text-orange-950">{leagueMatches.length}</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="space-y-4">
        {leagueMatches.map((m) => {
          const stats = getMatchStats(m, teamName);
          return (
            <Card key={m.id} className="p-5">
              <div className="mb-4 grid grid-cols-1 gap-3 text-center md:grid-cols-4 md:items-center">
                <div className="font-black text-slate-950">{m.date}</div>
                <div className="font-black text-slate-800 md:col-span-2">{teamName} vs {getOpponent(m, teamName)}</div>
                <div className="rounded-2xl bg-orange-100 px-3 py-2 font-black text-orange-900">{getResult(m, teamName)}</div>
              </div>
              <StatsGrid team={teamName} stats={stats} />
            </Card>
          );
        })}
        {!leagueMatches.length && <Card className="p-6 text-center text-sm text-slate-500">Sin partidos de liga en el rango seleccionado.</Card>}
      </div>
    </div>
  );
}

function DatabasePanel({ teams, players, matches, trainings, dbTeam, setDbTeam, dbScope, setDbScope, dbStats, dbView, setDbView }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.length ? teams.map((team) => (
          <button key={team.id} type="button" onClick={() => setDbTeam(team.name)}
            className={cn("rounded-3xl border bg-white p-4 text-center shadow-sm transition", dbTeam === team.name ? "ring-4 ring-amber-300" : "")}>
            <LogoChip name={team.name} logo={team.logo} logoUrl={team.logoUrl} />
          </button>
        )) : <Card className="p-6 text-center text-sm text-slate-500">No hay equipos en esta temporada.</Card>}
      </div>
      <Card className="p-4">
        <div className="flex flex-wrap justify-center gap-2">
          {[["informacion", "Informacion"], ["equipo", "Equipo"], ["entrenamientos", "Entrenamientos"], ["partidos", "Partidos"]].map(([key, label]) => (
            <Button key={key} active={dbView === key} variant="soft" onClick={() => setDbView(key)}>{label}</Button>
          ))}
        </div>
      </Card>
      {dbView === "informacion" && (
        <div className="space-y-4">
          <Card className="p-4"><SelectBox label="Filtro · Muestra" value={dbScope} onChange={setDbScope} options={SAMPLE_OPTIONS} /></Card>
          <DatabaseSummary teamName={dbTeam} stats={dbStats} />
        </div>
      )}
      {dbView === "equipo" && <DatabaseTeamPanel teamName={dbTeam} players={players} matches={matches} />}
      {dbView === "entrenamientos" && <TrainingsDatabasePanel trainings={trainings} matches={matches} teamName={dbTeam} />}
      {dbView === "partidos" && <MatchesDatabasePanel matches={matches} teamName={dbTeam} />}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [mainTab, setMainTab] = useState("registro");
  const [offlineTab, setOfflineTab] = useState("Analisis video");
  const [liveTab, setLiveTab] = useState("Directo");
  const [sessionTab, setSessionTab] = useState("Analizar");
  const [regTab, setRegTab] = useState("Alta");
  const [teams, setTeams] = useState(BASE_TEAMS);
  const [players, setPlayers] = useState(BASE_PLAYERS);
  const [matches, setMatches] = useState(BASE_MATCHES);
  const [trainings, setTrainings] = useState(BASE_TRAININGS);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(35);
  const [sessionFile, setSessionFile] = useState("");
  const [sessionProgress, setSessionProgress] = useState(0);
  const [sessionGoals, setSessionGoals] = useState("Mejorar la salida de presion, conectar con pivot y finalizar ataques con ocupacion de segundo palo.");
  const [focus, setFocus] = useState("Detectar patrones de ataque, defensa, ABP y situaciones especiales.");
  const [consignas, setConsignas] = useState({ Ataque: [], Defensa: [], ABP: [], Porteros: [], "Situaciones especiales": [] });
  const [dbTeam, setDbTeam] = useState(MY_TEAM);
  const [dbScope, setDbScope] = useState("Ultimos 5 partidos");
  const [dbView, setDbView] = useState("informacion");
  const [selectedSeason, setSelectedSeason] = useState("Temporada 25/26");
  const [visualFocusGroup, setVisualFocusGroup] = useState("");
  const [scoutMatchId, setScoutMatchId] = useState(BASE_MATCHES[0].id);
  const [loggedOut, setLoggedOut] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState("Adrian");
  const [userRole, setUserRole] = useState("Administrador");

  const selectedSeasonInfo = SEASONS.find((s) => s.label === selectedSeason) || SEASONS[2];
  const seasonHasData = selectedSeasonInfo.hasData;
  const seasonPlayers = seasonHasData ? players : [];
  const seasonMatches = seasonHasData ? matches : [];
  const seasonTrainings = seasonHasData ? trainings : [];
  const seasonTeams = seasonHasData ? teams : [];

  const dbMatches = useMemo(() => filterDatabase(seasonMatches, dbTeam, dbScope), [seasonMatches, dbTeam, dbScope]);
  const dbStats = useMemo(() => averageStats(dbMatches, dbTeam), [dbMatches, dbTeam]);

  const saveScouting = () => {
    const match = matches.find((m) => m.id === scoutMatchId);
    if (!match) return;
    setMatches((c) => {
      if (c.some((m) => m.id === match.id)) return c;
      return [{ ...match, id: Date.now() }, ...c];
    });
    setDbTeam(match.teams[0]);
    setMainTab("bd");
    setDbView("partidos");
  };

  const goTo = (item) => {
    setMainTab(item.main);
    if (item.main === "offline") setOfflineTab(item.sub);
    if (item.main === "live") setLiveTab(item.sub);
    if (item.main === "registro") setRegTab(item.sub);
    if (item.main === "bd") setDbView(item.sub);
    if (item.main === "session") setSessionTab(item.sub);
  };

  const currentTitle =
    mainTab === "offline" ? offlineTab :
    mainTab === "session" ? sessionTab :
    mainTab === "live" ? liveTab :
    mainTab === "registro" ? regTab :
    dbView === "informacion" ? "Base de Datos · Informacion" :
    dbView === "equipo" ? "Base de Datos · Equipo" :
    dbView === "entrenamientos" ? "Base de Datos · Entrenamientos" :
    "Base de Datos · Partidos";

  if (loggedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#061a3f] to-[#031126]">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-10 text-center text-white">
          <p className="text-3xl font-black">👋 Hasta luego</p>
          <p className="mt-2 text-sm font-semibold text-white/70">Sesion cerrada correctamente.</p>
          <Button className="mt-6" onClick={() => setLoggedOut(false)}>Volver a entrar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-cyan-50/35 text-slate-900">
      {/* Modal de ajustes */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
          <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#061a3f] to-[#08285f] px-6 py-5 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-yellow-300/70">Cuenta</p>
                  <h2 className="text-xl font-black text-white">Ajustes</h2>
                </div>
                <button type="button" onClick={() => setShowSettings(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20">
                  ✕
                </button>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-white">
                  {initials(userName)}
                </div>
                <div>
                  <p className="font-black text-slate-900">{userName}</p>
                  <p className="text-sm text-slate-500">{userRole}</p>
                </div>
              </div>
              <div className="space-y-3">
                <MiniInput label="Nombre de usuario" value={userName} onChange={setUserName} />
                <SelectBox label="Rol" value={userRole} onChange={setUserRole}
                  options={["Administrador", "Entrenador", "Ayudante", "Analista"]} />
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 text-xs font-black uppercase tracking-wide text-slate-400">Equipo principal</p>
                <p className="font-black text-slate-900">⭐ {MY_TEAM}</p>
              </div>
              <button type="button" onClick={() => setShowSettings(false)}
                className="w-full rounded-2xl bg-gradient-to-r from-[#061a3f] to-[#08285f] py-3 text-sm font-black text-white transition hover:from-blue-900 hover:to-blue-800">
                Guardar ajustes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-screen">
        <Sidebar
          mainTab={mainTab} offlineTab={offlineTab} liveTab={liveTab}
          regTab={regTab} dbView={dbView} sessionTab={sessionTab}
          goTo={goTo} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}
          visualFocusGroup={visualFocusGroup} setVisualFocusGroup={setVisualFocusGroup}
          onLogout={() => setLoggedOut(true)}
          onOpenSettings={() => setShowSettings(true)}
          userName={userName}
          userRole={userRole}
        />
        <main onClick={() => setVisualFocusGroup("")} className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <header className="rounded-[32px] border border-white/80 bg-white/90 p-6 text-center shadow-sm backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-600">Endania Coach</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{currentTitle}</h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">Panel de analisis de rendimiento y scouting</p>
            </header>

            <ErrorBoundary>
              {mainTab === "offline" && (
                <div className="space-y-6">
                  {offlineTab === "Analisis video" && <OfflineVideoPanel consignas={consignas} setConsignas={setConsignas} fileName={fileName} setFileName={setFileName} progress={progress} setProgress={setProgress} focus={focus} setFocus={setFocus} />}
                  {offlineTab === "Ficha scouting" && <ScoutingPanel matches={seasonMatches} scoutMatchId={scoutMatchId} setScoutMatchId={setScoutMatchId} saveScouting={saveScouting} />}
                  {offlineTab === "Prepartido" && <PreMatchPanel teams={seasonTeams} />}
                  {offlineTab === "Recomendacion IA" && <RecommendationPanel />}
                </div>
              )}
              {mainTab === "session" && sessionTab === "Analizar" && <SessionAnalysisPanel sessionFile={sessionFile} setSessionFile={setSessionFile} sessionGoals={sessionGoals} setSessionGoals={setSessionGoals} sessionProgress={sessionProgress} setSessionProgress={setSessionProgress} />}
              {mainTab === "session" && sessionTab === "Sesion de entreno" && <TrainingSessionPanel onSaveTraining={(t) => setTrainings((c) => [t, ...c])} />}
              {mainTab === "live" && <LivePanel liveTab={liveTab} players={seasonPlayers} />}
              {mainTab === "registro" && <RegistryPanel regTab={regTab} players={seasonPlayers} setPlayers={setPlayers} teams={seasonTeams} setTeams={setTeams} />}
              {mainTab === "bd" && <DatabasePanel teams={seasonTeams} players={seasonPlayers} matches={seasonMatches} trainings={seasonTrainings} dbTeam={dbTeam} setDbTeam={setDbTeam} dbScope={dbScope} setDbScope={setDbScope} dbStats={dbStats} dbView={dbView} setDbView={setDbView} />}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
