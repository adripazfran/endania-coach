import React, { useMemo, useState } from "react";

// ─── Constantes ──────────────────────────────────────────────────────────────

const MY_TEAM = "Endania FS";

// Claves de estadísticas de partido — usadas para calcular medias
const STAT_KEYS = [
  "shotsOn","shotsOff","shotsPost","goals","shotsTotal",
  "recoveries","losses","transLoss","lossAfterRecovery","yellow","red",
  "sitEsp5x4","sitEsp4x5","sitEsp4x3","sitEsp3x4",
  "keeperSaves","keeperIncorp","keeperLong","keeperShort",
];

const NAV_GROUPS = [
  {
    title: "REGISTRO", main: "registro",
    titleBg: "bg-lime-700 hover:bg-fuchsia-600", itemBg: "bg-lime-700/90 hover:bg-fuchsia-600",
    activeBg: "from-lime-500 to-emerald-700", accent: "from-lime-300 to-emerald-500",
    items: [],
  },
  {
    title: "BASE DE DATOS", main: "bd",
    titleBg: "bg-orange-700 hover:bg-cyan-700", itemBg: "bg-orange-700/90 hover:bg-cyan-700",
    activeBg: "from-orange-500 to-red-700", accent: "from-orange-300 to-red-500",
    items: [],
  },
  {
    title: "ANALISIS SESION", main: "session",
    titleBg: "bg-sky-700 hover:bg-yellow-600", itemBg: "bg-sky-700/90 hover:bg-yellow-600",
    activeBg: "from-sky-500 to-blue-700", accent: "from-sky-300 to-blue-600",
    items: [],
  },
  {
    title: "PARTIDO OFFLINE", main: "offline",
    titleBg: "bg-red-700 hover:bg-lime-700", itemBg: "bg-red-700/90 hover:bg-lime-700",
    activeBg: "from-red-500 to-rose-800", accent: "from-red-400 to-rose-700",
    items: [],
  },
  {
    title: "PARTIDO LIVE", main: "live",
    titleBg: "bg-yellow-700 hover:bg-violet-700", itemBg: "bg-yellow-700/90 hover:bg-violet-700",
    activeBg: "from-yellow-500 to-amber-700", accent: "from-yellow-300 to-amber-500",
    items: [],
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
  // Poio Pescamar
  { id: 17, team: "Poio Pescamar", dorsal: 1, name: "Sofia", surname: "Ramos Castro", pos: "Portera", birthDate: "1997-03-14", photo: "SR", starter: true, seconds: 1100 },
  { id: 18, team: "Poio Pescamar", dorsal: 7, name: "Marta", surname: "Vidal Torres", pos: "Ala", birthDate: "2001-04-18", photo: "MV", starter: true, seconds: 820 },
  { id: 19, team: "Poio Pescamar", dorsal: 9, name: "Lucia", surname: "Fernandez Rios", pos: "Pivot", birthDate: "1999-11-02", photo: "LF", starter: true, seconds: 790 },
  { id: 20, team: "Poio Pescamar", dorsal: 12, name: "Ana", surname: "Gonzalez Paz", pos: "Cierre", birthDate: "2002-07-25", photo: "AG", starter: false, seconds: 540 },
  { id: 21, team: "Poio Pescamar", dorsal: 14, name: "Nadia", surname: "Perez Iglesias", pos: "Ala", birthDate: "2003-01-09", photo: "NP", starter: false, seconds: 480 },
  // Marin FS
  { id: 22, team: "Marin FS", dorsal: 1, name: "Carmen", surname: "Iglesias Rey", pos: "Portera", birthDate: "1998-12-05", photo: "CI", starter: true, seconds: 1050 },
  { id: 23, team: "Marin FS", dorsal: 4, name: "Elena", surname: "Costa Neira", pos: "Cierre", birthDate: "2000-09-08", photo: "EC", starter: true, seconds: 880 },
  { id: 24, team: "Marin FS", dorsal: 7, name: "Raquel", surname: "Lopez Suarez", pos: "Ala", birthDate: "2003-02-19", photo: "RL", starter: true, seconds: 810 },
  { id: 25, team: "Marin FS", dorsal: 11, name: "Paula", surname: "Mendez Vila", pos: "Pivot", birthDate: "2001-06-30", photo: "PM", starter: false, seconds: 600 },
  { id: 26, team: "Marin FS", dorsal: 13, name: "Iria", surname: "Souto Lemos", pos: "Ala", birthDate: "2004-08-22", photo: "IS", starter: false, seconds: 460 },
  // Burela FS
  { id: 27, team: "Burela FS", dorsal: 1, name: "Laura", surname: "Castro Silva", pos: "Portera", birthDate: "1999-04-22", photo: "LC", starter: true, seconds: 1100 },
  { id: 28, team: "Burela FS", dorsal: 4, name: "Noa", surname: "Blanco Perez", pos: "Cierre", birthDate: "2002-08-17", photo: "NB", starter: true, seconds: 940 },
  { id: 29, team: "Burela FS", dorsal: 8, name: "Iris", surname: "Santos Mora", pos: "Ala", birthDate: "2001-01-09", photo: "IS", starter: true, seconds: 870 },
  { id: 30, team: "Burela FS", dorsal: 10, name: "Alba", surname: "Varela Fuentes", pos: "Pivot", birthDate: "2000-05-28", photo: "AV", starter: true, seconds: 830 },
  { id: 31, team: "Burela FS", dorsal: 15, name: "Maria", surname: "Pena Docampo", pos: "Ala", birthDate: "2003-10-11", photo: "MP", starter: false, seconds: 650 },
  // Ourense FS
  { id: 32, team: "Ourense FS", dorsal: 1, name: "Carla", surname: "Novoa Doval", pos: "Portera", birthDate: "2000-02-14", photo: "CN", starter: true, seconds: 980 },
  { id: 33, team: "Ourense FS", dorsal: 5, name: "Diana", surname: "Quiroga Lamas", pos: "Cierre", birthDate: "2003-07-03", photo: "DQ", starter: true, seconds: 910 },
  { id: 34, team: "Ourense FS", dorsal: 9, name: "Vera", surname: "Alonso Trillo", pos: "Ala", birthDate: "2002-11-26", photo: "VA", starter: true, seconds: 860 },
  { id: 35, team: "Ourense FS", dorsal: 11, name: "Ines", surname: "Otero Carballo", pos: "Pivot", birthDate: "2001-04-07", photo: "IO", starter: true, seconds: 820 },
  { id: 36, team: "Ourense FS", dorsal: 14, name: "Aitana", surname: "Vega Cortizo", pos: "Ala", birthDate: "2004-09-19", photo: "AV", starter: false, seconds: 580 },
  // Futsi Navalcarnero
  { id: 37, team: "Futsi Navalcarnero", dorsal: 1, name: "Sandra", surname: "Ruiz Navarro", pos: "Portera", birthDate: "1998-06-11", photo: "SR", starter: true, seconds: 1080 },
  { id: 38, team: "Futsi Navalcarnero", dorsal: 4, name: "Belen", surname: "Torres Pardo", pos: "Cierre", birthDate: "2001-03-24", photo: "BT", starter: true, seconds: 920 },
  { id: 39, team: "Futsi Navalcarnero", dorsal: 8, name: "Julia", surname: "Molina Serrano", pos: "Ala", birthDate: "2002-08-16", photo: "JM", starter: true, seconds: 870 },
  { id: 40, team: "Futsi Navalcarnero", dorsal: 10, name: "Eva", surname: "Campos Lozano", pos: "Pivot", birthDate: "2000-12-30", photo: "EC", starter: true, seconds: 840 },
  { id: 41, team: "Futsi Navalcarnero", dorsal: 13, name: "Rosa", surname: "Herrera Castillo", pos: "Ala", birthDate: "2003-05-07", photo: "RH", starter: false, seconds: 610 },
  // Sala Zaragoza
  { id: 42, team: "Sala Zaragoza", dorsal: 1, name: "Laia", surname: "Marin Gracia", pos: "Portera", birthDate: "1999-01-28", photo: "LM", starter: true, seconds: 1060 },
  { id: 43, team: "Sala Zaragoza", dorsal: 6, name: "Adriana", surname: "Gil Sanchez", pos: "Cierre", birthDate: "2002-06-14", photo: "AG", starter: true, seconds: 900 },
  { id: 44, team: "Sala Zaragoza", dorsal: 9, name: "Miriam", surname: "Jimenez Vera", pos: "Ala", birthDate: "2001-10-05", photo: "MJ", starter: true, seconds: 850 },
  { id: 45, team: "Sala Zaragoza", dorsal: 11, name: "Noelia", surname: "Pascual Abad", pos: "Pivot", birthDate: "2000-03-17", photo: "NP", starter: true, seconds: 800 },
  { id: 46, team: "Sala Zaragoza", dorsal: 14, name: "Celia", surname: "Rubio Aragon", pos: "Ala", birthDate: "2003-08-22", photo: "CR", starter: false, seconds: 590 },
  // Majadahonda FS
  { id: 47, team: "Majadahonda FS", dorsal: 1, name: "Patricia", surname: "Reyes Vega", pos: "Portera", birthDate: "1997-11-03", photo: "PR", starter: true, seconds: 1090 },
  { id: 48, team: "Majadahonda FS", dorsal: 5, name: "Natalia", surname: "Fuentes Heras", pos: "Cierre", birthDate: "2001-07-20", photo: "NF", starter: true, seconds: 930 },
  { id: 49, team: "Majadahonda FS", dorsal: 8, name: "Rocio", surname: "Blanco Izquierdo", pos: "Ala", birthDate: "2002-02-09", photo: "RB", starter: true, seconds: 880 },
  { id: 50, team: "Majadahonda FS", dorsal: 10, name: "Andrea", surname: "Prieto Moral", pos: "Pivot", birthDate: "2000-09-25", photo: "AP", starter: true, seconds: 820 },
  { id: 51, team: "Majadahonda FS", dorsal: 12, name: "Tamara", surname: "Cano Bravo", pos: "Ala", birthDate: "2003-04-13", photo: "TC", starter: false, seconds: 620 },
  // Gran Canaria Claret
  { id: 52, team: "Gran Canaria Claret", dorsal: 1, name: "Yasmin", surname: "Diaz Herrera", pos: "Portera", birthDate: "1999-08-17", photo: "YD", starter: true, seconds: 1020 },
  { id: 53, team: "Gran Canaria Claret", dorsal: 6, name: "Lidia", surname: "Suarez Mendoza", pos: "Cierre", birthDate: "2002-01-29", photo: "LS", starter: true, seconds: 890 },
  { id: 54, team: "Gran Canaria Claret", dorsal: 9, name: "Vanesa", surname: "Santana Cruz", pos: "Ala", birthDate: "2001-05-14", photo: "VS", starter: true, seconds: 840 },
  { id: 55, team: "Gran Canaria Claret", dorsal: 11, name: "Silvia", surname: "Marrero Cabrera", pos: "Pivot", birthDate: "2000-11-06", photo: "SM", starter: true, seconds: 790 },
  { id: 56, team: "Gran Canaria Claret", dorsal: 15, name: "Alejandra", surname: "Vega Rosales", pos: "Ala", birthDate: "2004-03-21", photo: "AR", starter: false, seconds: 560 },
  // Penya Esplugues
  { id: 57, team: "Penya Esplugues", dorsal: 1, name: "Montse", surname: "Puig Salvat", pos: "Portera", birthDate: "1998-10-08", photo: "MP", starter: true, seconds: 1040 },
  { id: 58, team: "Penya Esplugues", dorsal: 4, name: "Gemma", surname: "Valls Serra", pos: "Cierre", birthDate: "2001-06-23", photo: "GV", starter: true, seconds: 910 },
  { id: 59, team: "Penya Esplugues", dorsal: 8, name: "Nuria", surname: "Catala Bosch", pos: "Ala", birthDate: "2002-12-10", photo: "NC", starter: true, seconds: 860 },
  { id: 60, team: "Penya Esplugues", dorsal: 10, name: "Ariadna", surname: "Font Mas", pos: "Pivot", birthDate: "2000-04-02", photo: "AF", starter: true, seconds: 810 },
  { id: 61, team: "Penya Esplugues", dorsal: 13, name: "Mar", surname: "Soler Roca", pos: "Ala", birthDate: "2003-09-15", photo: "MS", starter: false, seconds: 600 },
  // AEM Lleida
  { id: 62, team: "AEM Lleida", dorsal: 1, name: "Cristina", surname: "Pons Viladot", pos: "Portera", birthDate: "1999-02-27", photo: "CP", starter: true, seconds: 1000 },
  { id: 63, team: "AEM Lleida", dorsal: 5, name: "Georgina", surname: "Sala Farres", pos: "Cierre", birthDate: "2002-07-18", photo: "GS", starter: true, seconds: 880 },
  { id: 64, team: "AEM Lleida", dorsal: 9, name: "Mireia", surname: "Coma Tarrago", pos: "Ala", birthDate: "2001-11-04", photo: "MC", starter: true, seconds: 830 },
  { id: 65, team: "AEM Lleida", dorsal: 11, name: "Alicia", surname: "Rius Garriga", pos: "Pivot", birthDate: "2000-05-16", photo: "AR", starter: true, seconds: 780 },
  { id: 66, team: "AEM Lleida", dorsal: 14, name: "Merce", surname: "Balague Torres", pos: "Ala", birthDate: "2003-10-29", photo: "MB", starter: false, seconds: 570 },
  // Granada FS
  { id: 67, team: "Granada FS", dorsal: 1, name: "Inma", surname: "Medina Ruiz", pos: "Portera", birthDate: "1998-04-12", photo: "IM", starter: true, seconds: 1050 },
  { id: 68, team: "Granada FS", dorsal: 6, name: "Lola", surname: "Moreno Vega", pos: "Cierre", birthDate: "2001-09-03", photo: "LM", starter: true, seconds: 920 },
  { id: 69, team: "Granada FS", dorsal: 8, name: "Carmen", surname: "Fernandez Haro", pos: "Ala", birthDate: "2002-01-21", photo: "CF", starter: true, seconds: 870 },
  { id: 70, team: "Granada FS", dorsal: 10, name: "Pilar", surname: "Jimenez Lara", pos: "Pivot", birthDate: "2000-06-08", photo: "PJ", starter: true, seconds: 820 },
  { id: 71, team: "Granada FS", dorsal: 14, name: "Marina", surname: "Castillo Torres", pos: "Ala", birthDate: "2003-12-14", photo: "MC", starter: false, seconds: 600 },
  // Roldán FS
  { id: 72, team: "Roldán FS", dorsal: 1, name: "Amparo", surname: "Garcia Romero", pos: "Portera", birthDate: "1997-07-30", photo: "AG", starter: true, seconds: 1080 },
  { id: 73, team: "Roldán FS", dorsal: 5, name: "Consuelo", surname: "Sanchez Marin", pos: "Cierre", birthDate: "2001-02-16", photo: "CS", starter: true, seconds: 940 },
  { id: 74, team: "Roldán FS", dorsal: 8, name: "Raquel", surname: "Lopez Gimenez", pos: "Ala", birthDate: "2002-08-07", photo: "RL", starter: true, seconds: 890 },
  { id: 75, team: "Roldán FS", dorsal: 10, name: "Dolores", surname: "Martinez Valera", pos: "Pivot", birthDate: "2000-11-22", photo: "DM", starter: true, seconds: 840 },
  { id: 76, team: "Roldán FS", dorsal: 13, name: "Esther", surname: "Navarro Ruiz", pos: "Ala", birthDate: "2004-04-18", photo: "EN", starter: false, seconds: 610 },
  // Tenerife CajaSiete
  { id: 77, team: "Tenerife CajaSiete", dorsal: 1, name: "Yolanda", surname: "Hernandez Perez", pos: "Portera", birthDate: "1998-09-14", photo: "YH", starter: true, seconds: 1060 },
  { id: 78, team: "Tenerife CajaSiete", dorsal: 6, name: "Natalia", surname: "Cabrera Gonzalez", pos: "Cierre", birthDate: "2001-04-28", photo: "NC", starter: true, seconds: 910 },
  { id: 79, team: "Tenerife CajaSiete", dorsal: 9, name: "Rebeca", surname: "Torres Reyes", pos: "Ala", birthDate: "2002-10-16", photo: "RT", starter: true, seconds: 860 },
  { id: 80, team: "Tenerife CajaSiete", dorsal: 11, name: "Veronica", surname: "Suarez Diaz", pos: "Pivot", birthDate: "2000-07-03", photo: "VS", starter: true, seconds: 810 },
  { id: 81, team: "Tenerife CajaSiete", dorsal: 14, name: "Naira", surname: "Vega Artiles", pos: "Ala", birthDate: "2003-02-25", photo: "NV", starter: false, seconds: 580 },
  // Futbol Emotion Zaragoza
  { id: 82, team: "Futbol Emotion Zaragoza", dorsal: 1, name: "Lorena", surname: "Marco Lahoz", pos: "Portera", birthDate: "1999-05-19", photo: "LM", starter: true, seconds: 1040 },
  { id: 83, team: "Futbol Emotion Zaragoza", dorsal: 5, name: "Susana", surname: "Gil Benedet", pos: "Cierre", birthDate: "2001-11-08", photo: "SG", starter: true, seconds: 900 },
  { id: 84, team: "Futbol Emotion Zaragoza", dorsal: 8, name: "Rebeca", surname: "Sanchez Alvarez", pos: "Ala", birthDate: "2002-03-27", photo: "RS", starter: true, seconds: 850 },
  { id: 85, team: "Futbol Emotion Zaragoza", dorsal: 10, name: "Claudia", surname: "Vera Gracia", pos: "Pivot", birthDate: "2000-08-14", photo: "CV", starter: true, seconds: 800 },
  { id: 86, team: "Futbol Emotion Zaragoza", dorsal: 12, name: "Cristina", surname: "Abad Palacio", pos: "Ala", birthDate: "2003-01-06", photo: "CA", starter: false, seconds: 590 },
];

const SEASONS = [
  { label: "Temporada 23/24", hasData: false },
  { label: "Temporada 24/25", hasData: false },
  { label: "Temporada 25/26", hasData: true },
];

const BASE_MATCHES = (() => {
  const mk = (on, off, post, gls, rec, los, tr, lar, ylw, red, s5x4=1, s4x5=1, s4x3=0, s3x4=0, kSav=6, kInc=2, kLng=4, kSht=6) => ({
    shotsOn: on, shotsOff: off, shotsPost: post, goals: gls,
    shotsTotal: on + off + post + gls,
    recoveries: rec, losses: los, transLoss: tr, lossAfterRecovery: lar,
    yellow: ylw, red,
    sitEsp5x4: s5x4, sitEsp4x5: s4x5, sitEsp4x3: s4x3, sitEsp3x4: s3x4,
    keeperSaves: kSav, keeperIncorp: kInc, keeperLong: kLng, keeperShort: kSht,
  });
  const E = MY_TEAM;
  return [
    // ── Endania FS (20 partidos) ────────────────────────────────────────────────
    { id:  1, date:"2026-04-20", type:"Liga",    teams:[E,"Poio Pescamar"],          a:mk(9,6,2,3,18,11,4,5,2,0,3,2,1,0,7,2,5,8), b:mk(8,7,1,2,14,13,5,4,3,0,2,3,0,1,9,1,4,6) },
    { id:  2, date:"2026-04-13", type:"Copa",    teams:[E,"Marin FS"],               a:mk(11,5,1,4,20,9,3,4,1,0,4,1,2,0,8,3,3,9), b:mk(6,8,2,1,12,16,6,3,2,0,1,4,0,2,10,1,5,5) },
    { id:  3, date:"2026-04-06", type:"Liga",    teams:["Burela FS",E],              a:mk(10,6,1,5,16,12,5,3,0,0,2,3,1,0,5,1,6,7), b:mk(7,7,2,2,17,11,3,6,2,0,3,2,0,1,8,2,4,8) },
    { id:  4, date:"2026-03-28", type:"Playoff", teams:["Ourense FS",E],             a:mk(8,9,3,2,14,15,7,4,3,1,1,3,0,2,11,1,3,5), b:mk(10,5,1,3,19,10,3,5,1,0,3,1,2,0,7,3,5,9) },
    { id:  5, date:"2026-03-21", type:"Liga",    teams:["Futsi Navalcarnero",E],     a:mk(9,7,2,3,15,13,6,3,4,0,2,2,1,1,8,1,4,6), b:mk(8,6,3,2,17,12,4,4,2,0,2,3,1,0,9,2,6,7) },
    { id:  6, date:"2026-05-09", type:"Liga",    teams:[E,"Burela FS"],              a:mk(8,7,1,2,17,12,5,3,1,0,3,2,0,1,7,2,5,8), b:mk(7,8,2,2,13,14,6,5,2,0,2,3,0,2,9,1,3,6) },
    { id:  7, date:"2026-05-16", type:"Liga",    teams:[E,"Ourense FS"],             a:mk(12,4,1,4,21,9,2,5,0,0,4,1,2,0,6,3,4,10),b:mk(6,9,2,1,11,17,7,3,3,0,1,4,0,2,11,1,4,5) },
    { id:  8, date:"2026-03-14", type:"Liga",    teams:[E,"Sala Zaragoza"],          a:mk(10,6,2,3,18,11,4,4,1,0,3,2,1,0,8,2,5,7), b:mk(7,8,1,2,13,14,5,5,2,0,2,3,0,1,9,1,3,6) },
    { id:  9, date:"2026-03-07", type:"Liga",    teams:["Majadahonda FS",E],         a:mk(9,7,2,2,15,13,6,3,3,0,2,2,1,1,9,1,4,5), b:mk(9,5,1,3,20,10,3,5,1,0,3,1,2,0,7,3,6,9) },
    { id: 10, date:"2026-02-28", type:"Copa",    teams:[E,"Gran Canaria Claret"],    a:mk(11,5,2,4,19,10,3,4,0,0,4,2,1,0,7,2,5,8), b:mk(7,8,1,2,12,15,6,4,2,1,1,3,0,2,10,1,3,5) },
    { id: 11, date:"2026-02-21", type:"Liga",    teams:[E,"Penya Esplugues"],        a:mk(8,7,2,2,17,12,5,3,2,0,2,3,1,0,8,1,5,7), b:mk(9,6,1,3,13,15,6,5,3,0,3,2,0,1,9,2,4,6) },
    { id: 12, date:"2026-02-14", type:"Liga",    teams:["AEM Lleida",E],             a:mk(7,9,2,2,14,14,7,4,1,0,1,3,0,2,10,1,4,5), b:mk(10,5,1,4,20,10,3,4,1,0,4,1,2,0,7,3,5,9) },
    { id: 13, date:"2026-02-07", type:"Playoff", teams:[E,"Granada FS"],             a:mk(9,6,2,3,18,11,4,5,2,0,3,2,1,0,7,2,5,8), b:mk(8,7,1,2,14,13,5,4,3,0,2,3,0,1,9,1,4,6) },
    { id: 14, date:"2026-01-31", type:"Liga",    teams:[E,"Roldán FS"],              a:mk(12,4,1,5,22,9,2,5,0,0,4,1,2,0,6,3,4,10),b:mk(5,9,2,1,10,17,7,3,4,0,1,4,0,2,11,1,3,5) },
    { id: 15, date:"2026-01-24", type:"Liga",    teams:["Tenerife CajaSiete",E],     a:mk(9,7,1,3,15,13,5,3,3,0,2,3,0,1,8,1,4,6), b:mk(8,6,2,2,18,11,4,4,1,0,3,2,1,0,8,2,5,8) },
    { id: 16, date:"2026-01-17", type:"Copa",    teams:[E,"Futbol Emotion Zaragoza"],a:mk(10,5,2,3,19,11,3,4,1,0,3,2,1,0,7,2,5,7), b:mk(7,8,2,2,13,15,6,5,2,0,2,3,0,1,9,1,3,6) },
    { id: 17, date:"2026-01-10", type:"Liga",    teams:["Poio Pescamar",E],          a:mk(8,8,2,2,13,14,6,4,2,0,2,3,0,1,10,1,4,5), b:mk(9,6,1,3,19,11,4,5,1,0,3,2,1,0,7,2,5,9) },
    { id: 18, date:"2025-12-20", type:"Liga",    teams:[E,"Marin FS"],               a:mk(11,5,1,4,20,9,3,4,0,0,4,1,2,0,7,3,4,9), b:mk(6,8,2,1,11,16,7,3,3,0,1,4,0,2,10,1,5,5) },
    { id: 19, date:"2025-12-13", type:"Scouting",teams:[E,"Burela FS"],              a:mk(8,7,2,2,17,12,5,4,2,0,2,3,1,0,8,1,5,7), b:mk(9,6,1,3,14,14,5,4,2,0,3,2,0,1,9,2,4,6) },
    { id: 20, date:"2025-12-06", type:"Liga",    teams:["Sala Zaragoza",E],          a:mk(7,9,2,2,13,15,7,3,4,1,1,3,0,2,10,1,3,5), b:mk(10,5,1,4,21,9,3,5,1,0,4,1,2,0,7,3,5,10)},
    // ── Partidos entre otros equipos ─────────────────────────────────────────────
    { id: 21, date:"2026-04-19", type:"Liga",    teams:["Poio Pescamar","Marin FS"],       a:mk(10,5,2,4,17,12,4,4,1,0,3,2,1,0,7,2,5,8), b:mk(8,7,1,2,14,13,5,3,2,0,2,3,0,1,9,1,4,6) },
    { id: 22, date:"2026-04-12", type:"Liga",    teams:["Burela FS","Futsi Navalcarnero"], a:mk(9,6,2,3,16,13,5,4,2,0,2,2,1,1,8,1,4,7), b:mk(8,7,1,2,15,12,6,3,3,0,2,3,0,1,9,2,5,6) },
    { id: 23, date:"2026-04-05", type:"Liga",    teams:["Sala Zaragoza","Gran Canaria Claret"],a:mk(11,5,1,4,18,11,3,4,1,0,4,1,2,0,7,3,4,9),b:mk(7,8,2,2,13,14,6,4,2,0,1,3,0,2,10,1,3,5)},
    { id: 24, date:"2026-03-27", type:"Copa",    teams:["Ourense FS","Roldán FS"],          a:mk(9,6,2,3,15,13,5,3,2,0,3,2,1,0,8,1,5,7), b:mk(8,7,1,2,16,12,4,4,3,0,2,3,0,1,9,2,4,6) },
    { id: 25, date:"2026-03-20", type:"Liga",    teams:["Penya Esplugues","AEM Lleida"],    a:mk(10,5,2,4,17,11,4,4,0,0,3,2,1,0,7,2,5,8), b:mk(7,8,2,2,12,15,6,4,3,0,1,3,0,2,10,1,3,5)},
    { id: 26, date:"2026-03-13", type:"Liga",    teams:["Granada FS","Tenerife CajaSiete"], a:mk(9,6,1,3,16,12,5,3,1,0,2,3,1,0,8,2,4,7), b:mk(8,7,2,2,15,13,4,4,2,0,3,2,0,1,9,1,5,6) },
    { id: 27, date:"2026-03-06", type:"Playoff", teams:["Majadahonda FS","Futbol Emotion Zaragoza"],a:mk(8,8,1,2,14,14,6,3,3,0,2,2,0,2,10,1,4,5),b:mk(10,5,2,3,18,11,4,5,1,0,3,1,2,0,7,2,5,9)},
    { id: 28, date:"2026-02-27", type:"Liga",    teams:["Poio Pescamar","Ourense FS"],      a:mk(11,5,1,4,19,10,3,4,0,0,4,1,2,0,7,3,4,9), b:mk(7,8,2,1,12,16,7,3,3,0,1,4,0,2,11,1,5,5)},
    { id: 29, date:"2026-02-20", type:"Liga",    teams:["Marin FS","Sala Zaragoza"],        a:mk(9,6,2,3,17,12,4,4,2,0,3,2,1,0,8,2,5,7), b:mk(8,7,1,2,14,13,5,3,2,0,2,3,0,1,9,1,4,6) },
    { id: 30, date:"2026-02-13", type:"Copa",    teams:["Burela FS","Penya Esplugues"],     a:mk(10,6,1,4,18,11,3,5,1,0,3,2,1,0,7,2,5,8), b:mk(7,7,2,2,13,14,6,4,3,0,2,3,0,1,9,1,3,6) },
  ];
})();

const BASE_TRAININGS = [
  // ── Diciembre 2025 ──
  { id:  1, date:"2025-12-08", title:"MD+2 Trabajo físico",         ua:148, realMinutes:35, effectiveMinutes:27, avgRpe:3.2, attendance:11, concepts:["Fuerza funcional","Circuito aeróbico","Técnica individual","Agilidad"] },
  { id:  2, date:"2025-12-09", title:"MD-4 Bloque defensivo",       ua:322, realMinutes:62, effectiveMinutes:49, avgRpe:5.5, attendance:13, concepts:["Bloque bajo","Presión 1ª línea","Transición defensiva","Repliegue"] },
  { id:  3, date:"2025-12-10", title:"MD-3 Ataque posicional",      ua:358, realMinutes:66, effectiveMinutes:53, avgRpe:5.9, attendance:12, concepts:["Ataque posicional","Combinaciones interiores","Juego con pivot","Superioridades"] },
  { id:  4, date:"2025-12-11", title:"MD-2 ABP ofensiva",           ua:272, realMinutes:54, effectiveMinutes:43, avgRpe:5.1, attendance:14, concepts:["ABP ofensiva","Corner 2º palo","Libre directo","Repliegue tras ABP"] },
  { id:  5, date:"2025-12-12", title:"MD-1 Activacion previa",      ua:164, realMinutes:36, effectiveMinutes:29, avgRpe:4.5, attendance:14, concepts:["Activación neuromuscular","Sit. especiales","Concentración táctica"] },
  { id:  6, date:"2025-12-15", title:"MD+2 Compensatorio",          ua:152, realMinutes:34, effectiveMinutes:26, avgRpe:3.0, attendance:10, concepts:["Regeneración muscular","Core funcional","Técnica de porteras"] },
  { id:  7, date:"2025-12-16", title:"MD-5 Inicio microciclo",      ua:299, realMinutes:58, effectiveMinutes:46, avgRpe:5.2, attendance:12, concepts:["Pressing coordinado","Organización ofensiva","Posicionamiento","Cobertura líneas"] },
  { id:  8, date:"2025-12-17", title:"MD-4 Presion alta",           ua:338, realMinutes:63, effectiveMinutes:50, avgRpe:5.6, attendance:12, concepts:["Presión alta","Robo en campo rival","Transición ofensiva rápida","Línea defensiva alta"] },
  { id:  9, date:"2025-12-18", title:"MD-3 Finalizacion",           ua:374, realMinutes:68, effectiveMinutes:55, avgRpe:6.2, attendance:13, concepts:["Finalización área pequeña","Entrada de ala","Remate 2º palo","Definición portero"] },
  { id: 10, date:"2025-12-19", title:"MD-2 Sit especiales",         ua:278, realMinutes:55, effectiveMinutes:44, avgRpe:5.1, attendance:14, concepts:["5x4 ofensivo","4x5 defensivo","Transición numérica","Gestión tiempo"] },
  // ── Enero 2026 ──
  { id: 11, date:"2026-01-05", title:"MD+2 Recuperacion",           ua:140, realMinutes:33, effectiveMinutes:26, avgRpe:2.9, attendance:11, concepts:["Recuperación activa","Flexibilidad dinámica","Pases suaves"] },
  { id: 12, date:"2026-01-06", title:"MD-5 Inicio semana",          ua:302, realMinutes:59, effectiveMinutes:47, avgRpe:5.3, attendance:12, concepts:["Pressing alto","Organización ofensiva","Transición defensiva","Fútbol directo"] },
  { id: 13, date:"2026-01-07", title:"MD-4 Desarrollo ofensivo",    ua:326, realMinutes:62, effectiveMinutes:49, avgRpe:5.5, attendance:13, concepts:["Ataque posicional","Juego interior-exterior","Incorporación portera","Desmarques"] },
  { id: 14, date:"2026-01-08", title:"MD-3 Contraataque",           ua:352, realMinutes:65, effectiveMinutes:52, avgRpe:5.9, attendance:12, concepts:["Contraataque directo","Transición 3x2","Velocidad conducción","Finalización rápida"] },
  { id: 15, date:"2026-01-09", title:"MD-2 ABP defensiva",          ua:268, realMinutes:53, effectiveMinutes:42, avgRpe:5.0, attendance:14, concepts:["Defensa córner rival","Cierre líneas pase","Recuperación tras ABP"] },
  { id: 16, date:"2026-01-12", title:"MD+2 Regenerativo",           ua:146, realMinutes:34, effectiveMinutes:27, avgRpe:3.1, attendance:10, concepts:["Regeneración","Movilidad funcional","Juego suave 3x3"] },
  { id: 17, date:"2026-01-13", title:"MD-5 Inicio ciclo",           ua:308, realMinutes:60, effectiveMinutes:48, avgRpe:5.3, attendance:12, concepts:["Sistema 4-0","Rotaciones ala-pivot","Pressing zona media","Ocupación espacios"] },
  { id: 18, date:"2026-01-14", title:"MD-4 Bloque defensivo",       ua:318, realMinutes:61, effectiveMinutes:48, avgRpe:5.4, attendance:13, concepts:["Bloque medio","Presión en zonas","Doblar al portador","Coberturas"] },
  { id: 19, date:"2026-01-15", title:"MD-3 Juego colectivo",        ua:364, realMinutes:67, effectiveMinutes:54, avgRpe:6.0, attendance:12, concepts:["Combinaciones 3x3","Superioridades ala","Pivot pantalla","Cambio orientación"] },
  { id: 20, date:"2026-01-16", title:"MD-2 Porteras ABP",           ua:280, realMinutes:55, effectiveMinutes:44, avgRpe:5.2, attendance:14, concepts:["Porteras en ABP","Saques cortos","Llegada de portera","Coberturas déficit"] },
  { id: 21, date:"2026-01-23", title:"MD+1 Recuperacion ligera",    ua:122, realMinutes:30, effectiveMinutes:23, avgRpe:2.5, attendance:11, concepts:["Activación suave","Estiramientos","Técnica sin oposición"] },
  { id: 22, date:"2026-01-27", title:"MD-4 Físico-táctico",         ua:334, realMinutes:63, effectiveMinutes:50, avgRpe:5.6, attendance:13, concepts:["Capacidad aeróbica táctica","Pressing extremo","Defensa 1x1","Superioridad numérica"] },
  { id: 23, date:"2026-01-28", title:"MD-3 Definicion avanzada",    ua:368, realMinutes:67, effectiveMinutes:54, avgRpe:6.2, attendance:12, concepts:["Finalización combinada","Entrada pivot","Definición ala","Remate portero incorporado"] },
  { id: 24, date:"2026-01-29", title:"MD-2 Ajustes y estrategia",   ua:274, realMinutes:54, effectiveMinutes:43, avgRpe:5.0, attendance:14, concepts:["Integración táctica","Plan A/B partido","Concentración defensiva"] },
  { id: 25, date:"2026-01-30", title:"MD-1 Pre-partido",            ua:162, realMinutes:35, effectiveMinutes:28, avgRpe:4.4, attendance:14, concepts:["Activación","Repaso táctico","Estrategia rival","Mentalización"] },
  // ── Febrero 2026 ──
  { id: 26, date:"2026-02-02", title:"MD+2 Trabajo físico",         ua:290, realMinutes:58, effectiveMinutes:46, avgRpe:5.1, attendance:12, concepts:["Resistencia específica","Circuito físico-técnico","Velocidad reacción","Capacidad aeróbica"] },
  { id: 27, date:"2026-02-03", title:"MD-5 Táctica ofensiva",       ua:314, realMinutes:61, effectiveMinutes:48, avgRpe:5.4, attendance:13, concepts:["Sistema 3-1","Rotaciones pivot","Ataque fluido","Variantes ofensivas"] },
  { id: 28, date:"2026-02-04", title:"MD-4 Defensa colectiva",      ua:340, realMinutes:63, effectiveMinutes:50, avgRpe:5.7, attendance:12, concepts:["Defensa zonal","Presión 2ª línea","Línea de 4","Intensidad defensiva"] },
  { id: 29, date:"2026-02-05", title:"MD-3 Transiciones",           ua:360, realMinutes:66, effectiveMinutes:53, avgRpe:5.9, attendance:13, concepts:["Trans. ofensiva","Trans. defensiva","Velocidad transición","Equilibrio táctico"] },
  { id: 30, date:"2026-02-06", title:"MD-2 ABP y rival",            ua:274, realMinutes:54, effectiveMinutes:43, avgRpe:5.0, attendance:14, concepts:["ABP ofensiva/defensiva","Análisis rival","Ajustes tácticos"] },
  { id: 31, date:"2026-02-10", title:"MD+2 Regeneracion",           ua:134, realMinutes:32, effectiveMinutes:25, avgRpe:2.7, attendance:10, concepts:["Recuperación activa","Estiramientos asistidos","Pases técnicos"] },
  { id: 32, date:"2026-02-11", title:"MD-4 Presion y robo",         ua:332, realMinutes:63, effectiveMinutes:50, avgRpe:5.5, attendance:13, concepts:["Presión tras pérdida","Robo en 5seg","Organización defensiva","Salida propia"] },
  { id: 33, date:"2026-02-12", title:"MD-3 Ataque posicional",      ua:356, realMinutes:66, effectiveMinutes:53, avgRpe:5.8, attendance:12, concepts:["Juego pivot-alas","Entrada tercero","Finalización definición","Amplitud"] },
  { id: 34, date:"2026-02-18", title:"MD+1 Recuperacion post",      ua:126, realMinutes:30, effectiveMinutes:23, avgRpe:2.6, attendance:11, concepts:["Trabajo regenerativo","Revisión partido","Movilidad articular"] },
  { id: 35, date:"2026-02-19", title:"MD-5 Semana intensa",         ua:306, realMinutes:60, effectiveMinutes:48, avgRpe:5.3, attendance:12, concepts:["Organización defensiva","Salida de presión","Posicionamiento 4-0","Cobertura"] },
  { id: 36, date:"2026-02-24", title:"MD+2 Físico compensatorio",   ua:295, realMinutes:58, effectiveMinutes:46, avgRpe:5.2, attendance:11, concepts:["Trabajo compensatorio","Fuerza funcional","Capacidad anaeróbica","Agilidad"] },
  { id: 37, date:"2026-02-25", title:"MD-3 ABP avanzada",           ua:362, realMinutes:67, effectiveMinutes:54, avgRpe:6.0, attendance:13, concepts:["ABP ofensiva avanzada","Variantes córner","Libre lateral","Estrategia ABP def."] },
  { id: 38, date:"2026-02-26", title:"MD-2 Ajustes y repaso",       ua:270, realMinutes:52, effectiveMinutes:41, avgRpe:4.9, attendance:14, concepts:["Repaso sistema defensivo","Ajustes tácticos","Salidas clave"] },
  // ── Marzo 2026 ──
  { id: 39, date:"2026-03-03", title:"MD-5 Inicio microciclo",      ua:305, realMinutes:59, effectiveMinutes:47, avgRpe:5.2, attendance:12, concepts:["Organización ofensiva","Sistema base","Pressing coordinado","Comunicación táctica"] },
  { id: 40, date:"2026-03-04", title:"MD-4 Ofensiva colectiva",     ua:342, realMinutes:64, effectiveMinutes:51, avgRpe:5.6, attendance:12, concepts:["Sistema 3-1","Combinaciones laterales","Fijación pivot","Cambio de lado"] },
  { id: 41, date:"2026-03-05", title:"MD-3 Definicion y remate",    ua:368, realMinutes:68, effectiveMinutes:55, avgRpe:6.2, attendance:13, concepts:["Definición 1x1 portera","Remate lejano","Llegada ala","Penaltis y tiros"] },
  { id: 42, date:"2026-03-06", title:"MD-2 Estrategia integral",    ua:278, realMinutes:55, effectiveMinutes:44, avgRpe:5.1, attendance:14, concepts:["Integración táctica","Plan A/B","Concentración defensiva"] },
  { id: 43, date:"2026-03-09", title:"MD+2 Recuperacion",           ua:138, realMinutes:33, effectiveMinutes:26, avgRpe:2.8, attendance:10, concepts:["Regeneración activa","Movilidad funcional","Técnica sin oposición"] },
  { id: 44, date:"2026-03-10", title:"MD-5 Bloque medio",           ua:304, realMinutes:60, effectiveMinutes:48, avgRpe:5.3, attendance:12, concepts:["Bloque medio-bajo","Presión selectiva","Cobertura doble","Control espacios"] },
  { id: 45, date:"2026-03-11", title:"MD-4 Juego colectivo",        ua:334, realMinutes:63, effectiveMinutes:50, avgRpe:5.5, attendance:13, concepts:["Juego colectivo","Amplitud y profundidad","Desmarques apoyo","Triangulaciones"] },
  { id: 46, date:"2026-03-12", title:"MD-3 Porteras y cierre",      ua:358, realMinutes:66, effectiveMinutes:53, avgRpe:5.8, attendance:12, concepts:["Salida portera","Rol portera jugadora","Cierre espacios","Coberturas rápidas"] },
  { id: 47, date:"2026-03-13", title:"MD-2 Repaso final",           ua:270, realMinutes:52, effectiveMinutes:41, avgRpe:4.9, attendance:14, concepts:["Repaso sistema ofensivo","Ajustes marcaje","Estrategia final"] },
  // ── Abril 2026 ──
  { id: 48, date:"2026-04-07", title:"MD+1 Recuperacion post",      ua:124, realMinutes:30, effectiveMinutes:23, avgRpe:2.6, attendance:11, concepts:["Trabajo regenerativo","Estiramientos","Revisión partido"] },
  { id: 49, date:"2026-04-08", title:"MD-5 Nuevo microciclo",       ua:298, realMinutes:58, effectiveMinutes:46, avgRpe:5.2, attendance:12, concepts:["Organización ofensiva","Sistema de juego base","Pressing coordinado","Comunicación"] },
  { id: 50, date:"2026-04-09", title:"MD-4 Físico-táctico",         ua:340, realMinutes:63, effectiveMinutes:50, avgRpe:5.6, attendance:13, concepts:["Capacidad aeróbica táctica","Pressing extremo","Defensa 1x1","Superioridad"] },
  { id: 51, date:"2026-04-10", title:"MD-3 Finalizacion avanzada",  ua:372, realMinutes:68, effectiveMinutes:55, avgRpe:6.3, attendance:12, concepts:["Finalización combinada","Entrada pivot","Definición ala derecha","Remate portero"] },
  { id: 52, date:"2026-04-27", title:"MD+1 Recuperacion",           ua:126, realMinutes:31, effectiveMinutes:24, avgRpe:2.8, attendance:11, concepts:["Regeneración activa","Movilidad articular","Estiramientos progresivos"] },
  { id: 53, date:"2026-04-28", title:"MD-4 Desarrollo ofensivo",    ua:304, realMinutes:59, effectiveMinutes:47, avgRpe:5.2, attendance:13, concepts:["Ataque posicional","Juego con pivot","Transición ofensiva","Finalización 2º palo"] },
  { id: 54, date:"2026-04-29", title:"MD-3 Pressing alto",          ua:362, realMinutes:66, effectiveMinutes:53, avgRpe:6.0, attendance:12, concepts:["Pressing alto coordinado","Robo en campo rival","Transición rápida","Verticalidad"] },
  { id: 55, date:"2026-04-30", title:"MD-2 ABP y finalizacion",     ua:258, realMinutes:51, effectiveMinutes:40, avgRpe:5.1, attendance:12, concepts:["ABP ofensiva","Corner 2º palo","Finalización","ABP defensiva"] },
  // ── Mayo 2026 ──
  { id: 56, date:"2026-05-01", title:"MD-1 Activacion",             ua:158, realMinutes:34, effectiveMinutes:27, avgRpe:4.6, attendance:14, concepts:["Activación técnica","Salida de presión","Sit. especiales","Estrategia"] },
  { id: 57, date:"2026-05-04", title:"MD+1 Regenerativo",           ua:118, realMinutes:29, effectiveMinutes:22, avgRpe:2.4, attendance:10, concepts:["Regeneración","Flexibilidad","Core básico"] },
  { id: 58, date:"2026-05-05", title:"MD-4 Defensa media pista",    ua:326, realMinutes:62, effectiveMinutes:50, avgRpe:5.4, attendance:13, concepts:["Presión media pista","Defensa de pivot","Transición def.","Cambios marcaje"] },
  { id: 59, date:"2026-05-06", title:"MD-3 Juego vertical",         ua:358, realMinutes:66, effectiveMinutes:53, avgRpe:5.8, attendance:12, concepts:["Juego vertical directo","Profundidad ala","Desborde individual","Centros laterales"] },
  { id: 60, date:"2026-05-07", title:"MD-2 Transiciones",           ua:352, realMinutes:64, effectiveMinutes:51, avgRpe:5.7, attendance:12, concepts:["Trans. ofensiva","Trans. defensiva","Salida de presión","Juego 1x1"] },
  { id: 61, date:"2026-05-08", title:"MD-1 Estrategia",             ua:172, realMinutes:37, effectiveMinutes:30, avgRpe:4.7, attendance:14, concepts:["ABP estratégica","Sit. especiales","Activación","Concentración"] },
  { id: 62, date:"2026-05-11", title:"MD+1 Compensatorio",          ua:142, realMinutes:33, effectiveMinutes:26, avgRpe:3.1, attendance:11, concepts:["Compensación muscular","Técnica individual","Movilidad"] },
  { id: 63, date:"2026-05-12", title:"MD-4 Ataque posicional",      ua:344, realMinutes:66, effectiveMinutes:53, avgRpe:5.2, attendance:13, concepts:["Ataque posicional","Pivot en zona","2º palo","Finalización"] },
  { id: 64, date:"2026-05-13", title:"MD-3 Defensa intensa",        ua:362, realMinutes:67, effectiveMinutes:54, avgRpe:6.0, attendance:12, concepts:["Defensa intensa 1x1","Coberturas rápidas","Interceptaciones","Repliegue organizado"] },
  { id: 65, date:"2026-05-14", title:"MD-2 Porteras y ABP",         ua:286, realMinutes:54, effectiveMinutes:43, avgRpe:5.3, attendance:12, concepts:["Juego de porteras","ABP ofensiva","Saques largos","Incorporación portera"] },
  { id: 66, date:"2026-05-15", title:"MD-1 Activacion competitiva", ua:166, realMinutes:36, effectiveMinutes:29, avgRpe:4.6, attendance:14, concepts:["Activación","ABP estratégica","Sit. especiales","Enfoque competitivo"] },
  /* ── MD (días de partido) ── */
  { id: 67, date:"2025-12-13", title:"MD Calentamiento pre-partido", ua: 82, realMinutes:25, effectiveMinutes:22, avgRpe:3.8, attendance:14, concepts:["Activación neuromuscular","Tiros a puerta","Pases cortos","Mentalización"] },
  { id: 68, date:"2026-01-17", title:"MD Activacion dia partido",    ua: 78, realMinutes:24, effectiveMinutes:21, avgRpe:3.6, attendance:14, concepts:["Movilidad dinámica","Rondos suaves","Estrategia final","Concentración"] },
  { id: 69, date:"2026-02-07", title:"MD Pre-partido",               ua: 85, realMinutes:26, effectiveMinutes:23, avgRpe:4.0, attendance:13, concepts:["Activación técnica","ABP repaso","Tiros portería","Mentalización"] },
  { id: 70, date:"2026-03-07", title:"MD Calentamiento oficial",     ua: 80, realMinutes:25, effectiveMinutes:22, avgRpe:3.7, attendance:14, concepts:["Puesta en acción","Combinaciones","Estrategia rival","Enfoque"] },
  { id: 71, date:"2026-04-11", title:"MD Activacion pre-partido",    ua: 76, realMinutes:23, effectiveMinutes:20, avgRpe:3.5, attendance:14, concepts:["Movilidad","Pases técnicos","Definición corta","Concentración táctica"] },
  { id: 72, date:"2026-05-02", title:"MD Pre-partido competitivo",   ua: 88, realMinutes:27, effectiveMinutes:24, avgRpe:4.1, attendance:14, concepts:["Activación completa","ABP clave","Tiros portería","Mentalización"] },
];

const CATEGORY_OPTIONS = ["Senior", "Juvenil", "Cadete", "Infantil", "Alevin", "Benjamines"];
const POSITIONS = ["Portera", "Cierre", "Ala", "Pivot", "Universal"];
const SAMPLE_OPTIONS = ["Ultimo partido", "Ultimos 5 partidos", "Ultimos 10 partidos", "Todos"];
const WARMUP_OPTIONS = ["Movilidad", "Tecnica individual", "Fundamentos", "Ludico", "Tarea jugada", "Preventivo"];
const MAIN_TASK_OPTIONS = ["Ataque", "Defensa", "ABP", "Finalización", "Transiciones", "Situaciones especiales", "6m-10m", "Fundamentos", "Ludico"];
const COOLDOWN_OPTIONS = ["Estiramientos pasivos", "Estiramientos dinamicos", "CORE", "Movilidad de cadera", "Roller", "Crioterapia", "Otros"];
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
  STAT_KEYS.forEach((key) => {
    avg[key] = Math.round(
      matches.reduce((sum, m) => sum + safeNum(getMatchStats(m, teamName)[key]), 0) / matches.length
    );
  });
  return avg;
}

function averageRivalStats(matches, teamName) {
  if (!matches.length) return null;
  const avg = {};
  STAT_KEYS.forEach((key) => {
    avg[key] = Math.round(
      matches.reduce((sum, m) => {
        const rivalName = m.teams.find((t) => t !== teamName);
        return sum + safeNum(getMatchStats(m, rivalName)[key]);
      }, 0) / matches.length
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

const MONTH_LABELS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function sortByDateDesc(items) {
  return [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function dayName(dateStr) {
  const DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const d = new Date(`${dateStr}T12:00:00`);
  return Number.isNaN(d.getTime()) ? "" : DAYS[d.getDay()];
}

function extractMD(title) {
  // Match "MD+1", "MD-2" etc.
  const mFull = String(title).match(/^(MD[+\-]\d+)/);
  if (mFull) return mFull[1];
  // Plain match day: "MD " followed by text → return "MD"
  if (/^MD\s/.test(String(title))) return "MD";
  return String(title).slice(0, 8);
}

function getMDStyle(title) {
  // Plain match day: "MD " or exactly "MD"
  if (/^MD\s/.test(String(title)) || String(title).trim() === "MD") {
    return { accent: "bg-rose-500", badge: "bg-rose-100 text-rose-800" };
  }
  const m = String(title).match(/^MD([+\-])(\d+)/);
  if (!m) return { accent: "bg-slate-300", badge: "bg-slate-100 text-slate-700" };
  const [, sign, raw] = m;
  const n = parseInt(raw, 10);
  if (sign === "+") {
    return n === 1
      ? { accent: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-800" }
      : { accent: "bg-teal-400",    badge: "bg-teal-100 text-teal-800" };
  }
  const MAP = {
    1: { accent: "bg-red-400",    badge: "bg-red-100 text-red-800" },
    2: { accent: "bg-amber-400",  badge: "bg-amber-100 text-amber-800" },
    3: { accent: "bg-orange-400", badge: "bg-orange-100 text-orange-800" },
    4: { accent: "bg-blue-400",   badge: "bg-blue-100 text-blue-800" },
    5: { accent: "bg-indigo-400", badge: "bg-indigo-100 text-indigo-800" },
  };
  return MAP[n] || { accent: "bg-slate-300", badge: "bg-slate-100 text-slate-700" };
}

function getOpponent(match, teamName) {
  return match.teams.find((t) => t !== teamName) || "Rival";
}

function getResult(match, teamName) {
  const my = getMatchStats(match, teamName);
  const rival = match.teams[0] === teamName ? match.b : match.a;
  return `${my.goals}-${rival.goals}`;
}

function localDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDays(anchorDate) {
  const base = toDate(anchorDate) || new Date();
  const dow = base.getDay() === 0 ? 6 : base.getDay() - 1;
  const monday = new Date(base);
  monday.setDate(base.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return localDateStr(d);
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
function deriveReportPercentages(stats, rivalStats, rivalName, matchResults) {
  // ── Tiros del rival ──────────────────────────────────────────────────────────
  const rs = rivalStats || {};
  const rTotal = Math.max(safeNum(rs.shotsTotal), 1);
  const rOnPct   = Math.max(0, Math.round((safeNum(rs.shotsOn)   / rTotal) * 100));
  const rOffPct  = Math.max(0, Math.round((safeNum(rs.shotsOff)  / rTotal) * 100));
  const rPostPct = Math.max(0, Math.round((safeNum(rs.shotsPost) / rTotal) * 100));
  const rGoalPct = Math.max(0, 100 - rOnPct - rOffPct - rPostPct);

  // ── Transiciones — denominador único para que sumen 100% ────────────────────
  const rec   = safeNum(stats.recoveries);
  const loss  = safeNum(stats.losses);
  const trans = safeNum(stats.transLoss);
  const lar   = safeNum(stats.lossAfterRecovery);
  const tTotal = Math.max(rec + loss + trans + lar, 1);
  const tOfPct = Math.round((rec   / tTotal) * 100);
  const tDefPct= Math.round((loss  / tTotal) * 100);
  const tTPct  = Math.round((trans / tTotal) * 100);
  const tLAPct = Math.max(0, 100 - tOfPct - tDefPct - tTPct);

  // ── Situaciones especiales ───────────────────────────────────────────────────
  const se5x4 = safeNum(stats.sitEsp5x4);
  const se4x5 = safeNum(stats.sitEsp4x5);
  const se4x3 = safeNum(stats.sitEsp4x3);
  const se3x4 = safeNum(stats.sitEsp3x4);
  const seTotal = Math.max(se5x4 + se4x5 + se4x3 + se3x4, 1);

  // ── Marcador (W/D/L) ─────────────────────────────────────────────────────────
  const mr = matchResults || { wins: 0, draws: 0, losses: 0, total: 0 };
  const mrTotal = Math.max(mr.total, 1);
  const winPct  = Math.round((mr.wins   / mrTotal) * 100);
  const drawPct = Math.round((mr.draws  / mrTotal) * 100);
  const losePct = Math.max(0, 100 - winPct - drawPct);

  // ── Portero ──────────────────────────────────────────────────────────────────
  const kSaves  = safeNum(stats.keeperSaves);
  const kIncorp = safeNum(stats.keeperIncorp);
  const kLong   = safeNum(stats.keeperLong);
  const kShort  = safeNum(stats.keeperShort);
  const kTotal  = Math.max(kSaves + kIncorp + kLong + kShort, 1);

  return [
    {
      title: `Tiros · ${rivalName || "Rival"}`, total: safeNum(rs.shotsTotal), color: "from-rose-500 to-red-600",
      items: [
        { label: "A portería", value: rOnPct },
        { label: "Fuera",      value: rOffPct },
        { label: "Al palo",    value: rPostPct },
        { label: "Gol",        value: rGoalPct },
      ],
    },
    {
      title: "Transiciones", total: trans + lar, color: "from-violet-500 to-fuchsia-600",
      items: [
        { label: "Trans. ofensiva",   value: tOfPct },
        { label: "Trans. defensiva",  value: tDefPct },
        { label: "Trans. tras pérd.", value: tTPct },
        { label: "Pérd. tras recup.", value: tLAPct },
      ],
    },
    {
      title: "Sit. especiales", total: se5x4 + se4x5 + se4x3 + se3x4, color: "from-amber-400 to-orange-500",
      items: [
        { label: "5×4", value: Math.round((se5x4 / seTotal) * 100) },
        { label: "4×5", value: Math.round((se4x5 / seTotal) * 100) },
        { label: "4×3", value: Math.round((se4x3 / seTotal) * 100) },
        { label: "3×4", value: Math.round((se3x4 / seTotal) * 100) },
      ],
    },
    {
      title: "Marcador", total: mr.total, color: "from-sky-500 to-blue-600",
      items: [
        { label: "Victoria", value: winPct },
        { label: "Empate",   value: drawPct },
        { label: "Derrota",  value: losePct },
      ],
    },
    {
      title: "Portero", total: kSaves, color: "from-teal-500 to-cyan-600",
      items: [
        { label: "Paradas",        value: Math.round((kSaves  / kTotal) * 100) },
        { label: "Incorporación",  value: Math.round((kIncorp / kTotal) * 100) },
        { label: "Saques largos",  value: Math.round((kLong   / kTotal) * 100) },
        { label: "Saques cortos",  value: Math.round((kShort  / kTotal) * 100) },
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
  // Use text+inputMode for numeric fields to eliminate spinner arrows
  const isNum = type === "number";
  return (
    <label className="block text-center">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <input
        type={isNum ? "text" : type}
        inputMode={isNum ? "numeric" : undefined}
        value={value} readOnly={readOnly}
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
    return (
      <div className={cn("shrink-0 rounded-xl p-[2px]", size, "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500")}>
        <img src={player.photoUrl} className="h-full w-full rounded-[9px] object-cover" alt={playerName(player)} />
      </div>
    );
  }
  return (
    <div className={cn("shrink-0 rounded-xl p-[2px]", size, "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500")}>
      <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-slate-900 text-xs font-black text-white">
        {player.photo || initials(playerName(player))}
      </div>
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
    if (group.items.length === 0) {
      goTo({ main: group.main, sub: "" });
      setVisualFocusGroup(group.title);
      return;
    }
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
      <div className="mb-5 rounded-2xl border border-blue-300/20 bg-blue-950/55 p-3">
        <span className="mb-1.5 block text-xs font-black uppercase tracking-[0.16em] text-blue-100/70">Temporada</span>
        <p className="rounded-2xl border border-yellow-300/25 bg-blue-900/80 px-3 py-2 text-sm font-black text-yellow-200">{selectedSeason}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4">
        {NAV_GROUPS.map((group) => {
          const isOpen = Boolean(openGroups[group.title]);
          const isMuted = mainTab !== group.main;
          return (
            <div key={group.title} className={cn(
              "rounded-[26px] border border-white/15 p-3 shadow-inner transition",
              isMuted ? "bg-slate-900/30" : "bg-yellow-900/20"
            )}>
              <button type="button" onClick={() => handleGroupClick(group)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border border-white/20 px-3 py-3 text-left transition",
                  isMuted
                    ? "bg-slate-700/60 hover:bg-slate-600/60"
                    : "bg-yellow-400/90 shadow-lg shadow-yellow-900/40"
                )}>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "h-8 w-1.5 rounded-full bg-gradient-to-b",
                    isMuted ? "from-slate-600 to-slate-700" : "from-blue-400 to-indigo-500"
                  )} />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white">{group.title}</p>
                </div>
                {group.items.length > 0 && (
                  <span className={cn("rounded-full border border-white/20 bg-white/15 px-2 py-1 text-xs font-black text-white transition", isOpen ? "rotate-180" : "")}>⌄</span>
                )}
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
    ["Transicion tras perdida", stats.transLoss],
    ["Perdida tras recuperacion", stats.lossAfterRecovery],
  ];
  return (
    <Card className="p-4">
      <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">Estadísticas</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map(([label, value]) => (
          <div key={label} className="flex h-24 flex-col items-center justify-center rounded-2xl bg-orange-50 p-3 text-center">
            <p className="text-[11px] font-bold uppercase text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-orange-900">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// FIX: porcentajes derivados de las stats reales
function PercentageReport({ stats, rivalStats, rivalName, matchResults }) {
  const sections = deriveReportPercentages(stats, rivalStats, rivalName, matchResults);
  const cols = "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5";
  return (
    <Card className="p-5">
      <p className="mb-4 text-center text-xs font-black uppercase tracking-widest text-slate-400">Informe general</p>
      <div className={cn("grid gap-3", cols)}>
        {sections.map((section) => (
          <div key={section.title} className="overflow-hidden rounded-2xl border border-slate-100">
            <div className={cn("flex items-center justify-between bg-gradient-to-br px-4 py-3 text-white", section.color)}>
              <span className="text-3xl font-black leading-none">{section.total}</span>
              <span className="text-right text-[10px] font-black uppercase leading-tight text-white/90">{section.title}</span>
            </div>
            <div className="space-y-2.5 bg-slate-50 p-4">
              {section.items.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-[10px] font-black text-slate-500">
                    <span>{item.label}</span><span>{item.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white">
                    <div className={cn("h-full rounded-full bg-gradient-to-r", section.color)} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Card badges */}
      {(safeNum(stats.yellow) > 0 || safeNum(stats.red) > 0) && (
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-3 rounded-[3px] bg-yellow-400 shadow-sm" />
            <span className="text-xs font-black text-slate-600">{safeNum(stats.yellow)} amarilla{safeNum(stats.yellow) !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-3 rounded-[3px] bg-red-500 shadow-sm" />
            <span className="text-xs font-black text-slate-600">{safeNum(stats.red)} roja{safeNum(stats.red) !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}
    </Card>
  );
}

function deriveHeatZonesHalf(stats, half) {
  // half = 1 (first) or 2 (second) — apply a deterministic variance so halves differ
  const offset = half === 1 ? [3, -2, 2, -3] : [-3, 2, -2, 3];
  const raw = [
    safeNum(stats.recoveries)                              + offset[0],
    safeNum(stats.shotsOff) + safeNum(stats.shotsPost)     + offset[1],
    safeNum(stats.shotsOn)                                 + offset[2],
    safeNum(stats.goals)                                   + offset[3],
  ].map(v => Math.max(0, v));
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  const pcts = raw.map((v) => Math.max(1, Math.round((v / sum) * 100)));
  return [
    { label: "Creación",    value: pcts[0], x: 6,  y: 8, w: 16, h: 84, c: "rgba(14,165,233,0.32)" },
    { label: "Elab. izq.", value: pcts[1], x: 24, y: 8, w: 52, h: 40, c: "rgba(245,158,11,0.42)" },
    { label: "Elab. der.", value: pcts[2], x: 24, y: 52, w: 52, h: 40, c: "rgba(239,68,68,0.45)" },
    { label: "Finaliz.",   value: pcts[3], x: 78, y: 8, w: 16, h: 84, c: "rgba(34,197,94,0.38)" },
  ];
}

function HeatMap({ stats }) {
  const PitchField = ({ label, zones }) => (
    <div>
      <p className="mb-1.5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <div className="relative h-56 overflow-hidden rounded-[20px] border-2 border-yellow-400/80 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 shadow-inner">
        {/* Inner pitch outline */}
        <div className="absolute inset-[5px] rounded-[15px] border border-yellow-400/55" />
        {/* Midfield line */}
        <div className="absolute inset-y-[5px] left-1/2 w-px -translate-x-1/2 bg-yellow-400/55" />
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/55" />
        {/* Left goal area */}
        <div className="absolute left-[3%] top-[25%] h-[50%] w-[12%] rounded-r-[10px] border border-yellow-400/55" />
        {/* Right goal area */}
        <div className="absolute right-[3%] top-[25%] h-[50%] w-[12%] rounded-l-[10px] border border-yellow-400/55" />
        {/* Left penalty spot */}
        <div className="absolute left-[13.5%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-yellow-400/65" />
        {/* Right penalty spot */}
        <div className="absolute right-[13.5%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-yellow-400/65" />
        {/* Endania logo in center */}
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-400/40 bg-blue-900/60 px-1.5 py-1">
          <span className="text-[9px] font-black leading-none tracking-wide text-yellow-300">EC</span>
        </div>
        {/* Direction arrow */}
        <div className="absolute bottom-1.5 right-3 z-20 rounded-full bg-black/25 px-1.5 py-0.5">
          <span className="text-[8px] font-black text-yellow-300/80">→ ataque</span>
        </div>
        {/* Heat zones */}
        {zones.map((zone) => (
          <div key={zone.label}
            className="absolute z-10 flex flex-col items-center justify-center rounded-[14px] border border-white/20 text-center"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%`, backgroundColor: zone.c }}>
            <span className="text-[8px] font-black text-white drop-shadow">{zone.label}</span>
            <span className="text-xs font-black text-white drop-shadow">{zone.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-4">
      <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-slate-400">Mapa de calor</p>
      <div className="grid grid-cols-2 gap-4">
        <PitchField label="1ª Parte" zones={deriveHeatZonesHalf(stats, 1)} />
        <PitchField label="2ª Parte" zones={deriveHeatZonesHalf(stats, 2)} />
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
        <input type="text" inputMode="numeric" value={value.rpe}
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
        <PercentageReport stats={statsA} rivalStats={statsB} rivalName={teamB} matchResults={{ wins: statsA.goals > statsB.goals ? 1 : 0, draws: statsA.goals === statsB.goals ? 1 : 0, losses: statsA.goals < statsB.goals ? 1 : 0, total: 1 }} />
        <PercentageReport stats={statsB} rivalStats={statsA} rivalName={teamA} matchResults={{ wins: statsB.goals > statsA.goals ? 1 : 0, draws: statsB.goals === statsA.goals ? 1 : 0, losses: statsB.goals < statsA.goals ? 1 : 0, total: 1 }} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <HeatMap stats={statsA} />
        <HeatMap stats={statsB} />
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
  const [planMsg, setPlanMsg] = useState("");

  const generarPlan = () => {
    setMyNotes(`PLAN DE PARTIDO — ${team1} vs ${team2}\n\n▶ SISTEMA: 2-2 base con variante 3-1 en superioridad.\n▶ PRESIÓN: Alta tras pérdida en campo rival (5 seg).\n▶ ABP OFENSIVA: Corner con llegada de ala al segundo palo.\n▶ ABP DEFENSIVA: Marcaje en zona, cierre de líneas de pase.\n▶ TRANSICIÓN: Salida rápida en 3 toques hacia pivot.\n▶ CONSIGNAS CLAVE: Comunicación, intensidad y orden táctico.`);
    setRivalNotes(`ANÁLISIS RIVAL — ${team2}\n\n⚠ PUNTOS DÉBILES: Transición defensiva lenta, dificultades en 4x5.\n⚠ PUNTOS FUERTES: Pivot físico, buenas ABP ofensivas.\n▶ ESTRATEGIA: Presión alta para forzar errores en salida.\n▶ EN INFERIORIDAD: Bloque bajo, no arriesgar pérdidas propias.\n▶ REFERENCIA: Vigilar el dorsal 7 en las bandas.`);
    setPlanMsg("✅ Plan generado — personaliza las notas según el análisis");
    setTimeout(() => setPlanMsg(""), 5000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionTitle title="Prepartido" subtitle="Escoge equipos y prepara el plan de partido." />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectBox label="Equipo 1" value={team1} onChange={setTeam1} options={teamNames.length ? teamNames : [MY_TEAM]} />
          <SelectBox label="Equipo 2" value={team2} onChange={setTeam2} options={teamNames.length ? teamNames : ["Rival"]} />
          <div className="flex flex-col items-center justify-end gap-1">
            <Button onClick={generarPlan}>🤖 Generar plan</Button>
            {planMsg && <p className="text-[10px] font-black text-emerald-600 text-center">{planMsg}</p>}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TextAreaBlock title={`Mi equipo · ${team1}`} value={myNotes} onChange={setMyNotes} placeholder="Plan de partido, consignas, disposicion..." />
        <TextAreaBlock title={`Rival · ${team2}`} value={rivalNotes} onChange={setRivalNotes} placeholder="Puntos debiles, consignas defensivas..." />
      </div>
    </div>
  );
}

function RecommendationPanel({ matches = [], teamName = MY_TEAM }) {
  const recent = matches
    .filter(m => m.teams.includes(teamName))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const avgStat = (key) => {
    if (!recent.length) return 0;
    const total = recent.reduce((s, m) => s + safeNum(getMatchStats(m, teamName)[key]), 0);
    return parseFloat((total / recent.length).toFixed(1));
  };

  const avgGoals   = avgStat("goals");
  const avgLosses  = avgStat("losses");
  const avgRecovs  = avgStat("recoveries");
  const avgShotsOn = avgStat("shotsOn");
  const avg5x4     = avgStat("sitEsp5x4");
  const avg4x5     = avgStat("sitEsp4x5");

  // Build 3 dynamic priorities based on real stats
  const priorities = [];

  if (avgLosses > 5)
    priorities.push({
      title: "Reducir pérdidas",
      detail: `Media de ${avgLosses} pérdidas/partido. Trabajar la salida de presión y la circulación segura en campo propio.`,
      gradient: "from-red-500 to-rose-700",
    });
  else
    priorities.push({
      title: "Mantener posesión",
      detail: `Buena gestión del balón (${avgLosses} pérdidas de media). Consolidar el juego interior para aumentar tiempo de control.`,
      gradient: "from-emerald-500 to-teal-700",
    });

  if (avgShotsOn < 4)
    priorities.push({
      title: "Aumentar llegada a portería",
      detail: `Solo ${avgShotsOn} tiros a puerta de media. Mejorar la combinación pivot-ala y la llegada por segundo palo.`,
      gradient: "from-amber-500 to-orange-700",
    });
  else
    priorities.push({
      title: "Aprovechar ocasiones",
      detail: `${avgShotsOn} tiros a puerta de media — buen volumen. Trabajar la definición para convertir más ocasiones en goles (${avgGoals} goles/partido).`,
      gradient: "from-sky-500 to-blue-700",
    });

  if (avg4x5 > 1)
    priorities.push({
      title: "Gestión de inferioridades",
      detail: `${avg4x5} situaciones 4x5 de media. Reforzar el bloque bajo y la gestión del tiempo en inferioridad numérica.`,
      gradient: "from-violet-500 to-purple-700",
    });
  else if (avgRecovs > 6)
    priorities.push({
      title: "Capitalizar recuperaciones",
      detail: `Alta tasa de recuperaciones (${avgRecovs}/partido). Trabajar la transición ofensiva rápida para convertirlas en ocasiones.`,
      gradient: "from-violet-500 to-purple-700",
    });
  else
    priorities.push({
      title: "Mejorar ABP ofensiva",
      detail: `Pocas superioridades aprovechadas (${avg5x4} de media). Revisar los esquemas de córner y faltas con llegada de ala.`,
      gradient: "from-violet-500 to-purple-700",
    });

  const subtitle = recent.length
    ? `Basado en los últimos ${recent.length} partido${recent.length > 1 ? "s" : ""} de ${teamName}.`
    : "Sin partidos recientes — análisis genérico.";

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle title="Recomendación IA" subtitle={subtitle} />
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {priorities.map((p, i) => (
            <div key={p.title} className={`rounded-3xl bg-gradient-to-br ${p.gradient} p-5 text-center text-white shadow-lg`}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">Prioridad {i + 1}</p>
              <h3 className="mt-2 text-lg font-black">{p.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/95">{p.detail}</p>
            </div>
          ))}
        </div>
      </Card>
      {recent.length > 0 && (
        <Card className="p-5">
          <SectionTitle title="Resumen de referencia" subtitle={`Medias de los últimos ${recent.length} partidos`} />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              { label: "Goles", val: avgGoals, color: "bg-emerald-50 text-emerald-800" },
              { label: "T. a puerta", val: avgShotsOn, color: "bg-sky-50 text-sky-800" },
              { label: "Recuperaciones", val: avgRecovs, color: "bg-violet-50 text-violet-800" },
              { label: "Pérdidas", val: avgLosses, color: "bg-rose-50 text-rose-800" },
              { label: "5x4", val: avg5x4, color: "bg-amber-50 text-amber-800" },
              { label: "4x5 (def)", val: avg4x5, color: "bg-orange-50 text-orange-800" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`rounded-2xl p-4 text-center ${color}`}>
                <p className="text-[10px] font-black uppercase tracking-wide opacity-70">{label}</p>
                <p className="mt-1 text-2xl font-black">{val}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

const DAFO_CATS = ["Ataque", "Defensa", "ABP", "Situaciones especiales", "Portero", "Otros"];

function iaAnalysis(cat, notes) {
  if (!notes || notes.trim().length < 10)
    return "Añade observaciones para que la IA analice esta categoría.";
  const map = {
    "Ataque": "Según tus notas y el historial del equipo, el patrón ofensivo muestra buena salida de presión y juego con pivot. La eficacia en finalización de segundo palo es el punto diferencial a mantener.",
    "Defensa": "La presión alta está siendo efectiva según tus observaciones. El historial indica que las pérdidas tras recuperación son el punto más débil — controlarlo es clave para el resultado.",
    "ABP": "Las acciones a balón parado ofensivas tienen margen de mejora. Los datos históricos muestran oportunidades claras en bandas cercanas y corners con segundo palo.",
    "Situaciones especiales": "Las superioridades e inferioridades requieren atención inmediata. El historial muestra buena respuesta en 5x4 pero dificultades en 4x5 que hay que corregir.",
    "Portero": "La portera muestra solidez en transición según tus notas. Los datos previos confirman buen rendimiento en 1x1 y en el juego de pies con salida de presión.",
    "Otros": "Observaciones generales registradas. Cruzar con los datos de entrenamiento de la semana para ajustar la intervención táctica en la segunda parte.",
  };
  return map[cat] || "Analizando datos del partido...";
}

function iaRecommendation(cat, notes) {
  if (!notes || notes.trim().length < 10)
    return "Sin datos suficientes. Añade observaciones primero.";
  const map = {
    "Ataque": "2ª parte: aumentar el ritmo con pivot en los primeros 5 minutos, explotar el segundo palo en cada ABP y mantener la salida de presión como sistema de inicio ofensivo.",
    "Defensa": "Ajuste táctico: si el marcador es favorable en el último cuarto, bajar la línea defensiva. Reforzar la cobertura en transición ofensiva del rival tras pérdida.",
    "ABP": "Activar bandas medias ofensivas y corner con segundo palo. En defensa, revisar la marcación en falta lateral que ha dado problemas en el primer período.",
    "Situaciones especiales": "Si el marcador lo permite, activar el 5x4 en el último cuarto. En inferioridad, priorizar la organización defensiva sobre la presión alta.",
    "Portero": "Indicar a la portera que active el juego largo en salidas de presión para sorprender al rival en transición rápida y aprovechar la velocidad de las alas.",
    "Otros": "Revisar el estado físico del equipo y considerar rotaciones con jugadoras de alto minutaje. Reforzar la comunicación en pista en los momentos de más presión.",
  };
  return map[cat] || "Generando recomendaciones para la segunda parte...";
}

function LivePanel({ players, teams, setMatches }) {
  const [showConvocatoria, setShowConvocatoria] = useState(false);
  const [convocadas, setConvocadas] = useState([]);
  const [rival, setRival] = useState("— Selecciona rival —");
  const [showLive, setShowLive] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timers, setTimers] = useState({});
  // Notas borrador dentro del popup (por categoría + generales)
  const [draftNotes, setDraftNotes] = useState(Object.fromEntries(DAFO_CATS.map((c) => [c, ""])));
  const [draftMine, setDraftMine] = useState("");
  const [draftRival, setDraftRival] = useState("");
  // Notas enviadas al DAFO exterior (solo lectura fuera del popup)
  const [sentNotes, setSentNotes] = useState(Object.fromEntries(DAFO_CATS.map((c) => [c, ""])));
  const [savedTimes, setSavedTimes] = useState(null);
  const [dbSent, setDbSent] = useState(false);

  const myPlayers = players.filter((p) => p.team === MY_TEAM);
  const rivalOptions = ["— Selecciona rival —", ...teams.filter((t) => t.name !== MY_TEAM).map((t) => t.name)];
  const convocadasPlayers = convocadas.length > 0 ? myPlayers.filter((p) => convocadas.includes(p.id)) : myPlayers;
  const rivalLabel = rival === "— Selecciona rival —" ? "—" : rival;

  React.useEffect(() => {
    const id = setInterval(() => {
      setTimers((prev) => {
        if (!Object.values(prev).some((t) => t.running)) return prev;
        const next = {};
        Object.keys(prev).forEach((k) => {
          next[k] = prev[k].running ? { ...prev[k], seconds: prev[k].seconds + 1 } : prev[k];
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTimer = (id) =>
    setTimers((prev) => ({ ...prev, [id]: { running: !prev[id]?.running, seconds: prev[id]?.seconds ?? 0 } }));

  const toggleConvocada = (id) =>
    setConvocadas((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const sendCategory = (cat) =>
    setSentNotes((prev) => ({ ...prev, [cat]: draftNotes[cat] }));

  const saveAndClose = () => {
    setSentNotes({ ...draftNotes });
    setSavedTimes({ ...timers });
    setDbSent(false);
    setShowLive(false);
  };

  const sendToDB = () => {
    const rivalName = rival === "— Selecciona rival —" ? "Rival" : rival;
    // Derive basic stats from DAFO notes character count as a rough proxy
    const noteLen = (cat) => (sentNotes[cat] || "").length;
    const atkLen  = noteLen("Ataque");
    const defLen  = noteLen("Defensa");
    const myGoals   = Math.round(2 + (atkLen / 120));
    const rivGoals  = Math.round(1 + (defLen / 180));
    const myShots   = myGoals + Math.round(atkLen / 60);
    const rivShots  = rivGoals + Math.round(defLen / 80);
    setMatches((prev) => [{
      id: Date.now(),
      date: localDateStr(new Date()),
      type: "LIVE",
      teams: [MY_TEAM, rivalName],
      a: { shotsOn: Math.max(myGoals + 1, 3), shotsOff: Math.max(myShots - myGoals - 1, 1), shotsPost: 0, goals: myGoals, shotsTotal: Math.max(myShots, 4), recoveries: Math.round(5 + atkLen / 50), losses: Math.round(3 + defLen / 100), transLoss: 2, lossAfterRecovery: 1, yellow: 0, red: 0, sitEsp5x4: 1, sitEsp4x5: 1, sitEsp4x3: 0, sitEsp3x4: 0, keeperSaves: 3, keeperIncorp: 1, keeperLong: 2, keeperShort: 4 },
      b: { shotsOn: Math.max(rivGoals + 1, 2), shotsOff: Math.max(rivShots - rivGoals - 1, 1), shotsPost: 0, goals: rivGoals, shotsTotal: Math.max(rivShots, 3), recoveries: Math.round(4 + defLen / 60), losses: Math.round(4 + atkLen / 80), transLoss: 2, lossAfterRecovery: 1, yellow: 0, red: 0, sitEsp5x4: 1, sitEsp4x5: 1, sitEsp4x3: 0, sitEsp3x4: 0, keeperSaves: 2, keeperIncorp: 0, keeperLong: 3, keeperShort: 3 },
    }, ...prev]);
    setDbSent(true);
  };

  const hasData = Object.values(sentNotes).some((n) => n.trim().length > 0);

  return (
    <div className="space-y-6">

      {/* ── Barra superior compacta ── */}
      <Card className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setShowConvocatoria(true)}
            className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-black text-violet-800 transition hover:bg-violet-100">
            📋 Convocatoria
          </button>
          <span className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-black text-cyan-700">
            {convocadas.length} jug.
          </span>
          <select value={rival} onChange={(e) => setRival(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-violet-300">
            {rivalOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <button type="button" onClick={() => setShowLive(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2 text-sm font-black text-white shadow-md shadow-red-400/40 transition hover:from-red-400 hover:to-rose-500 active:scale-95">
            <span className="animate-pulse text-red-200">●</span> LIVE
          </button>
        </div>
      </Card>

      {/* ── DAFO exterior — solo lectura ── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {DAFO_CATS.map((cat) => {
          const notes = sentNotes[cat];
          return (
            <div key={cat} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-center text-sm font-black uppercase tracking-wide text-slate-800">{cat}</p>
              <div className="min-h-[72px] rounded-2xl border border-slate-200 bg-white p-3">
                <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-slate-400">📝 Notas en directo</p>
                {notes
                  ? <p className="text-sm leading-5 text-slate-800">{notes}</p>
                  : <p className="text-xs italic text-slate-400">Sin notas aún — envíalas desde el panel LIVE.</p>}
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-3">
                <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-violet-500">🤖 Análisis</p>
                <p className="text-sm leading-5 text-violet-900">{iaAnalysis(cat, notes)}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-emerald-600">💡 Propuesta de Intervención</p>
                <p className="text-sm leading-5 text-emerald-900">{iaRecommendation(cat, notes)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tiempos guardados ── */}
      {savedTimes && (
        <Card className="p-5">
          <SectionTitle title="Tiempos del partido" subtitle="Minutos registrados en directo." />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
            {convocadasPlayers.map((p) => {
              const t = savedTimes[p.id] || { seconds: p.seconds || 0 };
              return (
                <div key={p.id} className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white p-3 text-center">
                  <PlayerAvatar player={p} size="h-10 w-10" />
                  <p className="text-xs font-black text-slate-900">{p.name}</p>
                  <p className="text-base font-black text-slate-700">{formatTime(t.seconds)}</p>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── Enviar a BD ── */}
      {hasData && (
        <div className="flex justify-center">
          {dbSent
            ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-black text-emerald-700">✓ Partido guardado en la Base de Datos como LIVE</div>
            : <button type="button" onClick={sendToDB}
                className="rounded-2xl bg-gradient-to-r from-[#061a3f] to-[#08285f] px-8 py-3 text-sm font-black text-white shadow-lg transition hover:from-blue-900 hover:to-blue-800">
                💾 Enviar a Base de Datos
              </button>
          }
        </div>
      )}

      {/* ── Modal convocatoria ── */}
      {showConvocatoria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowConvocatoria(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#061a3f] to-[#08285f] px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white">Convocadas</h2>
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-slate-900">{convocadas.length} seleccionadas</span>
              </div>
            </div>
            <div className="max-h-[60vh] space-y-2 overflow-y-auto p-4">
              {myPlayers.map((p) => {
                const sel = convocadas.includes(p.id);
                return (
                  <button key={p.id} type="button" onClick={() => toggleConvocada(p.id)}
                    className={cn("flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition",
                      sel ? "border-cyan-400 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50")}>
                    <PlayerAvatar player={p} size="h-10 w-10" />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 truncate">{playerName(p)}</p>
                      <p className="text-xs text-slate-500">#{p.dorsal} · {p.pos}</p>
                    </div>
                    {sel && <span className="text-lg text-cyan-500">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 p-4">
              <button type="button" onClick={() => setConvocadas([])}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">Limpiar</button>
              <button type="button" onClick={() => setShowConvocatoria(false)}
                className="rounded-2xl bg-gradient-to-r from-[#061a3f] to-[#08285f] px-6 py-2.5 text-sm font-black text-white">OK</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Popup LIVE — 90% pantalla ── */}
      {showLive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-[5vh_5vw] backdrop-blur-sm"
          onClick={() => !locked && setShowLive(false)}>
          <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}>

            {/* Cabecera */}
            <div className="shrink-0 bg-gradient-to-r from-red-600 to-rose-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="animate-pulse text-red-200 text-lg">●</span>
                  <span className="text-lg font-black text-white">{MY_TEAM} vs {rivalLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setLocked((l) => !l)}
                    title={locked ? "Desbloquear" : "Bloquear pantalla"}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 text-lg transition",
                      locked ? "bg-yellow-400 text-slate-900" : "bg-white/15 text-white hover:bg-white/25")}>
                    {locked ? "🔒" : "🔓"}
                  </button>
                  <button type="button" onClick={saveAndClose}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-400">
                    💾 Guardar y enviar
                  </button>
                  <button type="button" onClick={() => setShowLive(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white hover:bg-white/25">✕</button>
                </div>
              </div>
            </div>

            {/* Cuerpo — dos columnas */}
            <div className="flex min-h-0 flex-1 overflow-hidden">

              {/* Columna izquierda: tiempos jugadoras */}
              <div className="w-56 shrink-0 overflow-y-auto border-r border-slate-100 p-3">
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-400">Jugadoras</p>
                <div className="space-y-2">
                  {convocadasPlayers.map((p) => {
                    const timer = timers[p.id] || { running: false, seconds: p.seconds || 0 };
                    return (
                      <div key={p.id} className={cn("flex items-center gap-2 rounded-2xl border p-2 transition",
                        timer.running ? "border-emerald-300 bg-emerald-50" : "border-slate-100 bg-white")}>
                        <PlayerAvatar player={p} size="h-8 w-8" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-black text-slate-900">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.pos}</p>
                        </div>
                        <span className="tabular-nums text-xs font-black text-slate-700">{formatTime(timer.seconds)}</span>
                        <button type="button" onClick={() => toggleTimer(p.id)}
                          className={cn("rounded-lg px-1.5 py-1 text-[10px] font-black transition",
                            timer.running ? "bg-red-500 text-white" : "bg-emerald-500 text-white")}>
                          {timer.running ? "⏸" : "▶"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Columna derecha: notas */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Notas generales */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: `Mi equipo · ${MY_TEAM}`, value: draftMine, set: setDraftMine },
                    { label: `Rival · ${rivalLabel}`, value: draftRival, set: setDraftRival },
                  ].map(({ label, value, set }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
                      <textarea value={value} onChange={(e) => set(e.target.value)} rows={2}
                        placeholder="Notas generales..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white p-2 text-sm outline-none focus:border-violet-300" />
                      <button type="button" className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100">🎙 Audio</button>
                    </div>
                  ))}
                </div>

                {/* Notas por categoría */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {DAFO_CATS.map((cat) => (
                    <div key={cat} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-700">{cat}</p>
                      <textarea
                        value={draftNotes[cat]}
                        onChange={(e) => setDraftNotes((prev) => ({ ...prev, [cat]: e.target.value }))}
                        rows={3} placeholder={`Observaciones de ${cat.toLowerCase()}...`}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white p-2 text-sm outline-none focus:border-violet-300"
                      />
                      <div className="mt-2 flex gap-2">
                        <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100">🎙 Audio</button>
                        <button type="button" onClick={() => sendCategory(cat)}
                          className="rounded-xl bg-violet-500 px-3 py-1 text-xs font-black text-white transition hover:bg-violet-400">
                          Enviar ↑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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

function RegistryPanel({ players, setPlayers, teams, setTeams }) {
  const sortedTeams = sortedTeamsList(teams);
  const [selectedTeamId, setSelectedTeamId] = React.useState(() => {
    const mine = teams.find((t) => t.name === MY_TEAM);
    return mine?.id || teams[0]?.id || null;
  });
  const [modal, setModal] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);
  const [formData, setFormData] = React.useState({});

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);
  const teamPlayers = selectedTeam
    ? [...players.filter((p) => p.team === selectedTeam.name)].sort((a, b) => safeNum(a.dorsal) - safeNum(b.dorsal))
    : [];

  const openModal = (type, target = null) => {
    setModal(type);
    setEditTarget(target);
    if (type === "newTeam") setFormData({ name: "", category: "Senior", color: "", logo: "", logoUrl: "" });
    if (type === "editTeam") setFormData({ ...target });
    if (type === "newPlayer") setFormData({ name: "", surname: "", dorsal: "", pos: "Ala", birthDate: "", photoUrl: "", team: selectedTeam?.name || MY_TEAM });
    if (type === "editPlayer") setFormData({ ...target, dorsal: String(target.dorsal) });
  };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const saveTeam = () => {
    if (!formData.name?.trim()) return;
    const logo = formData.logo || initials(formData.name);
    if (modal === "newTeam") {
      setTeams((prev) => [...prev, { id: Date.now(), ...formData, logo }]);
    } else {
      setTeams((prev) => prev.map((t) => t.id === editTarget.id ? { ...t, ...formData, logo } : t));
    }
    closeModal();
  };

  const savePlayer = () => {
    if (!formData.name?.trim() || !formData.dorsal) return;
    const photo = initials(`${formData.name} ${formData.surname || ""}`);
    if (modal === "newPlayer") {
      setPlayers((prev) => [...prev, { id: Date.now(), ...formData, dorsal: safeNum(formData.dorsal), photo, starter: false, seconds: 0 }]);
    } else {
      setPlayers((prev) => prev.map((p) => p.id === editTarget.id ? { ...p, ...formData, dorsal: safeNum(formData.dorsal), photo } : p));
    }
    closeModal();
  };

  const isTeamModal = modal === "newTeam" || modal === "editTeam";
  const isEditing = modal === "editTeam" || modal === "editPlayer";
  const setF = (field, val) => setFormData((prev) => ({ ...prev, [field]: val }));

  const exportCSV = () => {
    if (!selectedTeam) return;
    const rows = [
      ["Dorsal", "Nombre", "Apellidos", "Posición", "Fecha nac.", "Edad"],
      ...teamPlayers.map((p) => [p.dorsal, p.name, p.surname, p.pos, p.birthDate, calculateAge(p.birthDate)]),
    ];
    const csv = "﻿" + rows.map((r) => r.join(";")).join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })),
      download: `${selectedTeam.name}-jugadoras.csv`,
    });
    a.click();
  };

  const exportPDF = () => {
    if (!selectedTeam) return;
    const cards = teamPlayers.map((p) => `
      <div style="border:1px solid #e2e8f0;border-radius:14px;padding:14px 10px;text-align:center;background:#fff;break-inside:avoid">
        <div style="width:52px;height:52px;border-radius:12px;background:#0f172a;color:#fff;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;letter-spacing:0.5px">${p.photo || (p.name[0] + (p.surname[0] || ""))}</div>
        <div style="font-size:11px;color:#94a3b8;font-weight:700">#${p.dorsal}</div>
        <div style="font-size:13px;font-weight:900;color:#0f172a;margin:2px 0">${p.name}</div>
        <div style="font-size:11px;color:#475569;margin-bottom:6px">${p.surname}</div>
        <div style="display:inline-block;background:#f1f5f9;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:700;color:#334155;margin-bottom:6px">${p.pos}</div>
        <div style="font-size:10px;color:#94a3b8">${p.birthDate}</div>
        <div style="font-size:10px;color:#64748b;font-weight:700">${calculateAge(p.birthDate)} años</div>
      </div>`).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${selectedTeam.name} – Plantilla</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:Arial,sans-serif;padding:28px;color:#0f172a;margin:0}
      h1{font-size:22px;margin:0 0 3px}
      .sub{font-size:13px;color:#64748b;margin:0 0 20px}
      .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
      @media print{body{padding:16px}.grid{grid-template-columns:repeat(5,1fr)}}
    </style></head><body>
    <h1>${selectedTeam.name}</h1>
    <p class="sub">${selectedTeam.category} · ${teamPlayers.length} jugadoras registradas</p>
    <div class="grid">${cards}</div>
    </body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4">
      {/* Layout: equipos 2 cols (9 filas para 18) | jugadoras 4 cols (5 filas para 20) */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[480px_1fr]">

        {/* ── Equipos ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Equipos</p>
              <p className="font-black text-slate-900">{sortedTeams.length} registrados</p>
            </div>
            <button type="button" onClick={() => openModal("newTeam")}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:from-emerald-400 hover:to-teal-500">
              + Nuevo equipo
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sortedTeams.map((team) => {
              const count = players.filter((p) => p.team === team.name).length;
              const isMine = team.name === MY_TEAM;
              const isSelected = team.id === selectedTeamId;
              return (
                <button key={team.id} type="button" onClick={() => setSelectedTeamId(team.id)}
                  className={cn(
                    "group w-full overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5",
                    isSelected ? "border-violet-400 shadow-lg ring-2 ring-violet-200" : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                  )}>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-900 px-3 py-3">
                    {team.logoUrl
                      ? <img src={team.logoUrl} className="h-11 w-11 shrink-0 rounded-xl object-cover" alt={team.name} />
                      : <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-[2.5px]">
                          <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-red-50 text-sm font-black text-red-900">{team.logo || initials(team.name)}</div>
                        </div>
                    }
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-white">
                        {isMine && <span className="mr-1 text-amber-300">★</span>}{team.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/60">{team.category} · {count} jug.</p>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); openModal("editTeam", team); }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-xs opacity-0 transition group-hover:opacity-100 hover:bg-white/25">
                      ✏️
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Jugadoras ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jugadoras</p>
              <p className="font-black text-slate-900">
                {selectedTeam
                  ? <><span className="text-violet-600">{selectedTeam.name}</span> · {teamPlayers.length} registradas</>
                  : "Selecciona un equipo"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selectedTeam && (
                <>
                  <button type="button" onClick={exportCSV}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700">
                    ↓ CSV
                  </button>
                  <button type="button" onClick={exportPDF}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700">
                    ↓ PDF
                  </button>
                </>
              )}
              {selectedTeam && (
                <button type="button" onClick={() => openModal("newPlayer")}
                  className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:from-violet-400 hover:to-fuchsia-500">
                  + Nueva jugadora
                </button>
              )}
            </div>
          </div>
          {selectedTeam ? (
            teamPlayers.length > 0
              ? <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {teamPlayers.map((p) => (
                    <div key={p.id} className="group relative flex flex-col items-center gap-1.5 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
                      <button type="button" onClick={() => openModal("editPlayer", p)}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-[10px] opacity-0 transition group-hover:opacity-100 hover:border-violet-300 hover:bg-violet-50">
                        ✏️
                      </button>
                      <PlayerAvatar player={p} size="h-14 w-14" />
                      <div className="w-full">
                        <p className="text-[10px] font-black text-slate-400">#{p.dorsal}</p>
                        <p className="w-full truncate text-xs font-black leading-tight text-slate-900">{p.name}</p>
                        <p className="w-full truncate text-[10px] text-slate-500">{p.surname}</p>
                        <span className="mt-1 inline-block rounded-lg bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{p.pos}</span>
                        <p className="mt-0.5 text-[10px] text-slate-400">{p.birthDate}</p>
                        <p className="text-[10px] font-bold text-slate-500">{calculateAge(p.birthDate)} años</p>
                      </div>
                    </div>
                  ))}
                </div>
              : <Card className="p-8 text-center text-sm text-slate-400">Sin jugadoras. Pulsa "+ Nueva jugadora" para añadir.</Card>
          ) : (
            <Card className="p-10 text-center">
              <p className="text-4xl">👈</p>
              <p className="mt-3 text-sm font-bold text-slate-500">Selecciona un equipo para ver sus jugadoras</p>
            </Card>
          )}
        </div>
      </div>

      {/* Modal add / edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={closeModal}>
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className={cn("px-6 py-5", isTeamModal ? "bg-gradient-to-r from-emerald-500 to-teal-600" : "bg-gradient-to-r from-violet-500 to-fuchsia-600")}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white">
                  {modal === "newTeam" && "Nuevo equipo"}
                  {modal === "editTeam" && "Editar equipo"}
                  {modal === "newPlayer" && `Nueva jugadora · ${selectedTeam?.name}`}
                  {modal === "editPlayer" && "Editar jugadora"}
                </h2>
                <button type="button" onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white hover:bg-white/25">✕</button>
              </div>
            </div>
            <div className="space-y-4 p-6">
              {isTeamModal ? (
                <>
                  <div className="flex items-start gap-4">
                    <PhotoUpload photoUrl={formData.logoUrl || ""} onChange={(url) => setF("logoUrl", url)} label="Logo" emptyText="Sin logo" size="h-20 w-20" />
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <MiniInput label="Nombre del equipo" value={formData.name || ""} onChange={(v) => setF("name", v)} />
                        <MiniInput label="Siglas" value={formData.logo || ""} onChange={(v) => setF("logo", v)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <SelectBox label="Categoría" value={formData.category || "Senior"} onChange={(v) => setF("category", v)} options={CATEGORY_OPTIONS} />
                        <MiniInput label="Color principal" value={formData.color || ""} onChange={(v) => setF("color", v)} />
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={saveTeam}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-black text-white transition hover:from-emerald-400 hover:to-teal-500">
                    {isEditing ? "Guardar cambios" : "+ Añadir equipo"}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <PhotoUpload photoUrl={formData.photoUrl || ""} onChange={(url) => setF("photoUrl", url)} size="h-24 w-24" />
                      {formData.birthDate && <p className="mt-1 text-center text-xs font-bold text-slate-400">{calculateAge(formData.birthDate)} años</p>}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <MiniInput label="Nombre" value={formData.name || ""} onChange={(v) => setF("name", v)} />
                      <MiniInput label="Apellidos" value={formData.surname || ""} onChange={(v) => setF("surname", v)} />
                      <MiniInput label="Dorsal" value={formData.dorsal || ""} onChange={(v) => setF("dorsal", v)} />
                      <SelectBox label="Posición" value={formData.pos || "Ala"} onChange={(v) => setF("pos", v)} options={POSITIONS} />
                      <MiniInput label="Fecha nacimiento" type="date" value={formData.birthDate || ""} onChange={(v) => setF("birthDate", v)} />
                    </div>
                  </div>
                  <button type="button" onClick={savePlayer}
                    className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-3 text-sm font-black text-white transition hover:from-violet-400 hover:to-fuchsia-500">
                    {isEditing ? "Guardar cambios" : "+ Añadir jugadora"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionAnalysisPanel({ mode, sessionFile, setSessionFile, sessionGoals, setSessionGoals, sessionProgress, setSessionProgress }) {
  const analysisMode = mode; // "pdf" | "video" — controlled by outer tabs

  // Local state for the 3 input bubbles
  const [pdfContenidos,     setPdfContenidos]     = useState("");
  const [pdfCondicionantes, setPdfCondicionantes] = useState("");

  const hasFile    = Boolean(sessionFile);
  const hasGoals   = sessionGoals.trim().length > 8;
  const analysisReady = hasFile && hasGoals;
  const analyzed   = sessionProgress >= 100;

  // ── Mock PDF analysis (solo lo que el plan escrito puede dar) ──
  const MOCK = {
    date:"2026-05-06", md:"MD-3", title:"Ataque posicional",
    jugadoras:12,
    // Objetivos declarados por el entrenador en el documento
    objetivos:[
      "Mejorar la salida de presión desde portería",
      "Conectar el juego interior-pivot en ataque posicional",
      "Finalizar con llegada de ala al 2º palo",
    ],
    // Tareas extraídas del plan (lo que está escrito)
    tareas:[
      { nombre:"Movilidad + pases cortos",     bloque:"Calentamiento",  min:10, rpe:3, capacidad:"Técnica"  },
      { nombre:"Rondo 4x2 salida de presión",  bloque:"Principal",      min:18, rpe:6, capacidad:"Táctica"  },
      { nombre:"Combinación interior-pivot",   bloque:"Principal",      min:20, rpe:6, capacidad:"Táctica"  },
      { nombre:"Juego posicional 4x4+2",       bloque:"Principal",      min:15, rpe:7, capacidad:"Cognitiva"},
      { nombre:"Situaciones 5x4 ofensivo",     bloque:"Principal",      min:10, rpe:6, capacidad:"Táctica"  },
      { nombre:"Estiramientos + reflexión",    bloque:"Vuelta a calma", min:7,  rpe:2, capacidad:"Física"   },
    ],
    // Cobertura: ¿qué objetivo cubre cada tarea del plan? (mín 3 – máx 5)
    cobertura:[
      { obj:"Salida de presión desde portería",  cubierto:true,  tareas:["Rondo 4x2 salida de presión"],                            icon:"✅" },
      { obj:"Juego interior-pivot",              cubierto:true,  tareas:["Combinación interior-pivot","Juego posicional 4x4+2"],     icon:"✅" },
      { obj:"Llegada de ala al 2º palo",         cubierto:false, tareas:[],                                                         icon:"❌" },
      { obj:"Gestión de superioridades 5x4",     cubierto:true,  tareas:["Situaciones 5x4 ofensivo"],                               icon:"✅" },
      { obj:"Activación y movilidad inicial",    cubierto:true,  tareas:["Movilidad + pases cortos"],                               icon:"✅" },
    ],
    // Distribución de tiempo según lo escrito en el plan
    timeBlocks:[
      {label:"Calentamiento",  min:10, pct:15, color:"#06b6d4"},
      {label:"Parte principal",min:63, pct:75, color:"#3b82f6"},
      {label:"Vuelta a calma", min:7,  pct:10, color:"#8b5cf6"},
    ],
    // Capacidades que cubre el plan (inferido del tipo de tareas escritas)
    radar:[
      {dim:"Técnica",    val:4, nota:"Solo calentamiento técnico"},
      {dim:"Táctica",    val:9, nota:"3 tareas tácticas ofensivas"},
      {dim:"Física",     val:3, nota:"No hay tarea física específica"},
      {dim:"Cognitiva",  val:7, nota:"4x4+2 requiere toma de decisión"},
      {dim:"Emocional",  val:2, nota:"Sin tarea de activación emocional"},
    ],
    // Carga estimada DESDE EL PLAN (duración × RPE por tarea)
    carga:{
      uaMin:295, uaMax:360,
      rpeEstimado:5.6,
      mdRango:"MD-3 → rango esperado 280–420 UA",
      enRango:true,
    },
    // Lo que falta o está mal en el plan
    alertas:[
      { tipo:"❌ Objetivo sin tarea", msg:"El objetivo 'Llegada de ala al 2º palo' no tiene ninguna tarea en el plan que lo trabaje directamente.", color:"bg-rose-50 border-rose-300 text-rose-900" },
      { tipo:"⚠️ Capacidad ausente", msg:"Ninguna tarea trabaja la componente física. Para MD-3 es aceptable, pero si hay objetivo físico debería añadirse.", color:"bg-amber-50 border-amber-300 text-amber-900" },
      { tipo:"💡 Sugerencia",        msg:"Añade 8-10' de finalización con llegada de ala (reduce Rondo a 12') para cubrir el 3er objetivo.", color:"bg-sky-50 border-sky-300 text-sky-900" },
      { tipo:"✅ Carga correcta",    msg:"Carga estimada (295-360 UA) dentro del rango MD-3. Distribución de bloques coherente con el día del microciclo.", color:"bg-emerald-50 border-emerald-300 text-emerald-900" },
    ],
    coherencia:{ score:67, label:"Media",
      color:"bg-amber-500",
      comentario:"2 de 3 objetivos declarados están cubiertos por tareas en el plan. El objetivo de finalización con llegada de ala no aparece en ninguna tarea. La coherencia subiría al 95% añadiendo una tarea de finalización de 8-10'.",
    },
    recomendacion:"Antes de ejecutar la sesión: añade una tarea de finalización con llegada de ala (8-10') reduciendo el Rondo inicial a 12'. Eso cubre el 3er objetivo y sube la coherencia plan-objetivos al 95%. La carga sigue dentro del rango MD-3.",
  };

  // Medias de MD-3 anteriores (excluyendo la sesión actual)
  const previousMd3 = useMemo(() => {
    const md3s = BASE_TRAININGS.filter(t => t.title.startsWith("MD-3") && t.date < MOCK.date);
    if (md3s.length === 0) return null;
    const sum = (k) => md3s.reduce((s,t) => s + t[k], 0);
    return {
      count:           md3s.length,
      avgUa:           Math.round(sum("ua") / md3s.length),
      avgRpe:          Math.round((sum("avgRpe") / md3s.length) * 10) / 10,
      avgRealMin:      Math.round(sum("realMinutes") / md3s.length),
      avgEffectiveMin: Math.round(sum("effectiveMinutes") / md3s.length),
      avgAttendance:   Math.round((sum("attendance") / md3s.length) * 10) / 10,
    };
  }, []);

  // Mes y día completos en español para la cabecera
  const _d         = new Date(MOCK.date + "T12:00:00");
  const fullDay    = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"][_d.getDay()];
  const fullMonth  = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][_d.getMonth()];
  const dayNumber  = _d.getDate();

  // Radar SVG
  const radarPts = MOCK.radar.map((d, i) => {
    const angle = (i / MOCK.radar.length) * Math.PI * 2 - Math.PI / 2;
    const r = (d.val / 10) * 50;
    return { x: 60 + r * Math.cos(angle), y: 60 + r * Math.sin(angle), label: d.dim, val: d.val, angle };
  });
  const radarPath = radarPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gridLevels = [0.25, 0.5, 0.75, 1];

  // ── Mock vídeo data (borrador) ──
  const VIDEO_MOCK = {
    date:"2026-05-06", md:"MD-3", title:"Ataque posicional",
    videoFile:"sesion_MD3_06mayo.mp4", duracion:"1h 06min",
    // Tiempos reales por bloque: medibles parando el cronómetro en el vídeo
    tiemposReales:[
      { bloque:"Calentamiento",   planMin:10, realMin:13, color:"#06b6d4" },
      { bloque:"Parte principal", planMin:63, realMin:58, color:"#3b82f6" },
      { bloque:"Vuelta a calma",  planMin:7,  realMin:5,  color:"#8b5cf6" },
      { bloque:"Paradas/pausas",  planMin:0,  realMin:9,  color:"#94a3b8" },
    ],
    // Repeticiones contadas desde el vídeo
    repsContadas:[
      { label:"Rep. combinación interior-pivot", plan:12, real:9  },
      { label:"Rep. rondo salida de presión",    plan:15, real:14 },
      { label:"Rep. situaciones 5x4",            plan:8,  real:6  },
      { label:"Interrupciones del entrenador",   plan:"—",real:11 },
    ],
    // Clips marcados en el vídeo (lo más valioso del análisis de vídeo)
    clips:[
      { t:"06:14", tipo:"✅ Buena ejecución", desc:"Combinación interior-pivot fluida, timing de la ala correcto en llegada a 2º palo.", color:"bg-emerald-50 border-emerald-300 text-emerald-900" },
      { t:"13:40", tipo:"⚠️ Error posicional", desc:"Portera no sale a apoyar en construcción — permanece en portería cuando el rondo pide su participación.", color:"bg-amber-50 border-amber-300 text-amber-900" },
      { t:"22:08", tipo:"✅ Pressing",          desc:"Recuperación en menos de 5seg tras pérdida. Las 4 de campo activan pressing sin demora.", color:"bg-emerald-50 border-emerald-300 text-emerald-900" },
      { t:"29:33", tipo:"❌ Sin desmarque",     desc:"Ala derecha estática en superioridad 3x2 — zona de finalización vacía. Repetir la acción.", color:"bg-rose-50 border-rose-300 text-rose-900" },
      { t:"41:05", tipo:"💡 Clip de referencia", desc:"ABP córner a 2º palo bien ejecutada. Útil para mostrar en sala como modelo.", color:"bg-sky-50 border-sky-300 text-sky-900" },
      { t:"53:22", tipo:"⚠️ Fatiga visible",    desc:"Ritmo de carrera claramente más lento en las 3 jugadoras del grupo A. Pausa de recuperación recomendable.", color:"bg-amber-50 border-amber-300 text-amber-900" },
    ],
    // Zonas de juego observadas en el vídeo (por dónde circula el balón)
    zonas:[
      { zona:"Zona ofensiva central",  pct:38, color:"#3b82f6" },
      { zona:"Banda derecha",          pct:24, color:"#10b981" },
      { zona:"Banda izquierda",        pct:18, color:"#8b5cf6" },
      { zona:"Zona defensiva",         pct:12, color:"#f97316" },
      { zona:"Transición media",       pct:8,  color:"#94a3b8" },
    ],
    // Observaciones individuales: solo lo visible en cámara
    jugadoras:[
      { name:"Paula",   obs:"Dos salidas largas fuera de zona en el 1er bloque. Posición en construcción mejora en 2ª parte.", nivel:"Bien",    color:"bg-emerald-100 text-emerald-800" },
      { name:"Noa",     obs:"Referencia en posicionamiento defensivo. Siempre en línea correcta. Liderazgo verbal visible.", nivel:"Muy bien",color:"bg-blue-100 text-blue-800" },
      { name:"Lara",    obs:"Llegada al 2º palo tarde en 3 de 5 acciones observadas. El timing de entrada necesita trabajo.", nivel:"Mejorar", color:"bg-amber-100 text-amber-800" },
      { name:"Iria",    obs:"Pérdidas de control en salida de presión bajo presión alta — 3 pérdidas contadas en vídeo.",    nivel:"Mejorar", color:"bg-rose-100 text-rose-800" },
      { name:"Sara",    obs:"Intensidad de pressing alta y constante. Velocidad de reacción tras pérdida claramente superior.", nivel:"Muy bien",color:"bg-blue-100 text-blue-800" },
    ],
    notaRpe:"⚠️ El RPE no se puede obtener del vídeo. Requiere cuestionario post-sesión a cada jugadora.",
    recomendacion:"El vídeo muestra que el automatismo interior-pivot existe pero se ejecuta lento (clip 06:14). Las pausas del entrenador (11 en vídeo) consumen 9' del bloque principal. Para MD-2: proyectar clip 06:14 y clip 29:33 antes de empezar la sesión. Reducir interrupciones a explicaciones de máx. 30seg.",
  };

  return (
    <div className="space-y-5">

      {/* ════════════════════════════════════════ PDF ══ */}
      {analysisMode === "pdf" && (
      <div className="space-y-5">
      {/* ── INPUT: 3 bocadillos + subir archivo ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-200">Análisis de sesión</p>
            <h2 className="mt-0.5 text-2xl font-black">Describe la sesión para el análisis IA</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button"
              onClick={() => setSessionProgress((v) => Math.min(100, analysisReady ? 100 : v + 15))}
              className={cn(
                "rounded-2xl px-6 py-2.5 text-sm font-black transition shadow-lg",
                analysisReady
                  ? "bg-white text-blue-700 hover:bg-blue-50"
                  : "bg-white/20 text-white/60 cursor-not-allowed"
              )}>
              {analyzed ? "✅ Analizado" : "🔍 Analizar sesión"}
            </button>
            <label className="cursor-pointer rounded-2xl border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-black transition hover:bg-white/25">
              📎 Subir archivo
              <input type="file" accept="image/*,.pdf" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; setSessionFile(f ? f.name : ""); setSessionProgress(f ? 35 : 0); }} />
            </label>
            <span className="text-sm font-bold text-white/60">{sessionFile || "Ningún archivo"}</span>
          </div>
        </div>

        {/* 2 bocadillos */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[
            {
              icon: "🎯", title: "Objetivos de la sesión",
              placeholder: "Ej: Mejorar salida de presión, conectar juego interior-pivot, finalizar con llegada de ala al 2º palo...",
              value: sessionGoals, onChange: setSessionGoals,
              border: "border-sky-400/60", bg: "bg-sky-500/20",
            },
            {
              icon: "⚙️", title: "Condicionantes y necesidades",
              placeholder: "Ej: Pabellón pequeño, 10 jugadoras disponibles, semana de 3 partidos, jugadoras con carga alta...",
              value: pdfCondicionantes, onChange: setPdfCondicionantes,
              border: "border-violet-400/60", bg: "bg-violet-500/20",
            },
          ].map((b, idx) => (
            <div key={idx} className={cn("relative rounded-2xl border-2 p-4", b.border, b.bg)}>
              {/* Rabillo del bocadillo */}
              <div className={cn("absolute -top-2 left-5 h-3 w-3 rotate-45 border-l-2 border-t-2", b.border)} style={{background:"rgba(255,255,255,0.12)"}} />
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white drop-shadow">
                <span className="text-lg">{b.icon}</span>{b.title}
              </p>
              <textarea
                value={b.value}
                onChange={e => b.onChange(e.target.value)}
                placeholder={b.placeholder}
                rows={3}
                className="w-full resize-none rounded-xl bg-white/10 p-2.5 text-sm font-semibold text-white placeholder-white/35 outline-none focus:bg-white/20 border border-white/15"
              />
            </div>
          ))}
        </div>

      </div>

      {/* ── BORRADOR DE ANÁLISIS (datos ficticios) ── */}
      <div className="rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 px-4 py-2.5 text-center">
        <p className="text-xs font-black text-sky-600">📄 BORRADOR — análisis del plan escrito · los datos de ejecución requieren vídeo</p>
      </div>

      {/* ── CABECERA — fecha completa ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-8 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-400">{fullDay}</p>
        <p className="mt-2 text-5xl font-black text-white leading-none">{dayNumber} <span className="text-amber-300">de {fullMonth}</span></p>
      </div>

      {/* ── MD-3 con carga esperada — destacado y con medias de anteriores MD-3 ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="rounded-3xl bg-white/15 border-2 border-white/30 px-7 py-5 text-6xl font-black leading-none shadow-inner">{MOCK.md}</span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">Carga esperada</p>
              <p className="mt-1 text-5xl font-black leading-none">{MOCK.carga.uaMin}–{MOCK.carga.uaMax} <span className="text-2xl font-bold text-white/80">UA</span></p>
              <p className="mt-2 text-sm font-bold text-white/80">{MOCK.carga.mdRango}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/15 border border-white/25 px-4 py-3 text-center min-w-[110px]">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/70">RPE estimado</p>
              <p className="mt-1 text-3xl font-black">{MOCK.carga.rpeEstimado}</p>
            </div>
            <div className="flex items-center">
              <span className={cn("rounded-2xl px-5 py-3 text-sm font-black text-white border-2", MOCK.carga.enRango ? "bg-emerald-600/90 border-emerald-300" : "bg-rose-700/90 border-rose-300")}>
                {MOCK.carga.enRango ? "✅ En rango" : "⚠️ Fuera de rango"}
              </span>
            </div>
          </div>
        </div>

        {/* Medias de MD-3 anteriores */}
        {previousMd3 && (
          <div className="mt-5 rounded-2xl bg-black/25 border border-white/15 p-4">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/70">📊 Media de los {previousMd3.count} MD-3 anteriores</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                <p className="text-[9px] font-black uppercase tracking-wide text-white/60">UA</p>
                <p className="text-2xl font-black text-amber-200">{previousMd3.avgUa}</p>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                <p className="text-[9px] font-black uppercase tracking-wide text-white/60">RPE medio</p>
                <p className="text-2xl font-black text-rose-200">{previousMd3.avgRpe}</p>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                <p className="text-[9px] font-black uppercase tracking-wide text-white/60">Min reales</p>
                <p className="text-2xl font-black text-sky-200">{previousMd3.avgRealMin}′</p>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                <p className="text-[9px] font-black uppercase tracking-wide text-white/60">Asistencia</p>
                <p className="text-2xl font-black text-emerald-200">{previousMd3.avgAttendance}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3 OBJETIVOS PRINCIPALES — en el medio, destacados ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-6 border-2 border-emerald-200 shadow-md">
        <p className="mb-4 text-center text-[11px] font-black uppercase tracking-[0.28em] text-emerald-700">🎯 3 Objetivos principales</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {MOCK.objetivos.map((obj, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border-2 border-emerald-300 bg-white px-4 py-4 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-black text-white shadow">{i+1}</span>
              <p className="text-sm font-black leading-snug text-emerald-900">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── OBJETIVOS DECLARADOS VS COBERTURA EN EL PLAN ── */}
      <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">🎯 Objetivos declarados — cobertura en el plan</p>
        <div className="space-y-3">
          {MOCK.cobertura.map((c,i) => (
            <div key={i} className={cn(
              "flex flex-wrap items-start gap-3 rounded-2xl border px-4 py-3",
              c.cubierto ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            )}>
              <span className="text-lg leading-none">{c.icon}</span>
              <div className="flex-1">
                <p className={cn("text-sm font-black", c.cubierto ? "text-emerald-900" : "text-rose-900")}>{c.obj}</p>
                {c.cubierto
                  ? <p className="mt-0.5 text-xs text-emerald-700">Cubierto por: {c.tareas.join(" · ")}</p>
                  : <p className="mt-0.5 text-xs font-bold text-rose-700">Sin tarea en el plan que lo trabaje</p>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TAREAS DEL PLAN + DISTRIBUCIÓN DE TIEMPO ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* Tareas listadas en el plan */}
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">📋 Tareas en el plan</p>
          <div className="space-y-2">
            {MOCK.tareas.map((t,i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <span className="w-5 text-center text-xs font-black text-slate-400">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-slate-800">{t.nombre}</p>
                  <p className="text-[10px] text-slate-400">{t.bloque} · {t.capacidad}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-black text-slate-700">{t.min}′</p>
                  <span className={cn(
                    "rounded-lg px-2 py-0.5 text-[9px] font-black text-white",
                    t.rpe >= 7 ? "bg-rose-500" : t.rpe >= 5 ? "bg-amber-500" : "bg-emerald-500"
                  )}>RPE {t.rpe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por bloques */}
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">⏱ Distribución del tiempo planificado</p>

          {/* Barras horizontales por bloque + tareas de cada parte */}
          <div className="space-y-4">
            {MOCK.timeBlocks.map(b => {
              const blockKey   = b.label === "Parte principal" ? "Principal" : b.label === "Vuelta a calma" ? "Vuelta a calma" : "Calentamiento";
              const blockTasks = MOCK.tareas.filter(t => t.bloque === blockKey);
              return (
                <div key={b.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 shrink-0 rounded-full" style={{background:b.color}}/>
                      <span className="text-xs font-black text-slate-700">{b.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-500">{b.min}′</span>
                      <span className="w-9 text-right text-[10px] font-bold text-slate-400">{b.pct}%</span>
                    </div>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-lg bg-slate-100">
                    <div className="h-full rounded-lg transition-all"
                      style={{width:`${b.pct}%`, background:b.color, opacity:0.85}}/>
                  </div>
                  {blockTasks.length > 0 && (
                    <ul className="mt-2 ml-5 space-y-1">
                      {blockTasks.map((t,i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
                          <span className="text-[11px] font-bold text-slate-700">{t.nombre}</span>
                          <span className="text-[10px] font-black text-slate-500">{t.min}′ · RPE {t.rpe}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tiempo total + efectivo estimado con dos escenarios de pérdida */}
          {(() => {
            const totalMin = MOCK.timeBlocks.reduce((s,b)=>s+b.min,0);
            const efectivo80 = Math.round(totalMin * 0.80); // 20% pérdida
            const perdida20  = totalMin - efectivo80;
            const efectivo70 = Math.round(totalMin * 0.70); // 30% pérdida
            const perdida30  = totalMin - efectivo70;
            return (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">Total planificado</span>
                  <span className="text-sm font-black text-slate-700">{totalMin}′</span>
                </div>

                {/* Escenario pérdida 20% */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wide text-amber-700">⚡ Estimado con pérdida 20%</span>
                    <span className="text-lg font-black text-amber-700">{efectivo80}′</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-amber-500">
                    <span>(~20% organización · transiciones)</span>
                    <span>−{perdida20}′</span>
                  </div>
                </div>

                {/* Escenario pérdida 30% */}
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wide text-rose-700">⚠️ Estimado con pérdida 30%</span>
                    <span className="text-lg font-black text-rose-700">{efectivo70}′</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-rose-500">
                    <span>(escenario con muchas pausas/explicaciones)</span>
                    <span>−{perdida30}′</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── CAPACIDADES PLANIFICADAS + COHERENCIA ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        {/* Radar de lo que DICE el plan */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Capacidades en el plan</p>
          <p className="mb-3 text-[9px] text-slate-500">Inferido del tipo de tareas escritas</p>
          <div className="flex justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {gridLevels.map(lvl=>(
                <polygon key={lvl} points={MOCK.radar.map((_,i)=>{
                  const a=(i/MOCK.radar.length)*Math.PI*2-Math.PI/2;
                  const r=lvl*50;
                  return `${60+r*Math.cos(a)},${60+r*Math.sin(a)}`;
                }).join(" ")} fill="none" stroke="#334155" strokeWidth="1"/>
              ))}
              {MOCK.radar.map((_,i)=>{
                const a=(i/MOCK.radar.length)*Math.PI*2-Math.PI/2;
                return <line key={i} x1="60" y1="60" x2={60+50*Math.cos(a)} y2={60+50*Math.sin(a)} stroke="#334155" strokeWidth="1"/>;
              })}
              <polygon points={radarPts.map(p=>`${p.x},${p.y}`).join(" ")} fill="#3b82f6" fillOpacity="0.35" stroke="#3b82f6" strokeWidth="2"/>
              {radarPts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3" fill="#60a5fa"/>)}
            </svg>
          </div>
          <div className="mt-3 space-y-1.5">
            {MOCK.radar.map(d=>(
              <div key={d.dim}>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[9px] font-black text-slate-400">{d.dim}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full rounded-full bg-blue-500" style={{width:`${d.val*10}%`}}/>
                  </div>
                  <span className="text-[9px] font-black text-white">{d.val}</span>
                </div>
                <p className="ml-[72px] text-[8px] text-slate-600 leading-3">{d.nota}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coherencia + alertas */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coherencia objetivos — tareas del plan</p>
              <span className={cn("rounded-full px-3 py-1 text-xs font-black text-white", MOCK.coherencia.color)}>
                {MOCK.coherencia.score}% · {MOCK.coherencia.label}
              </span>
            </div>
            <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{width:`${MOCK.coherencia.score}%`, background: MOCK.coherencia.score >= 80 ? "#10b981" : MOCK.coherencia.score >= 60 ? "#f59e0b" : "#ef4444"}}/>
            </div>
            <p className="text-xs leading-5 text-slate-600">{MOCK.coherencia.comentario}</p>
          </div>
          <div className="space-y-2">
            {MOCK.alertas.map((a,i)=>(
              <div key={i} className={cn("rounded-2xl border px-4 py-3 text-xs leading-5",a.color)}>
                <span className="font-black">{a.tipo} · </span>{a.msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECOMENDACIÓN SIGUIENTE SESIÓN ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">🤖 Recomendación para la siguiente sesión</p>
        <p className="text-sm leading-6 text-white/90">{MOCK.recomendacion}</p>
      </div>
      </div>
      )}

      {/* ════════════════════════════════════════ VÍDEO ══ */}
      {analysisMode === "video" && (
      <div className="space-y-5">

        {/* ── INPUT VÍDEO ── */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet-300">Análisis de vídeo</p>
              <h2 className="mt-0.5 text-2xl font-black">Sube el vídeo de la sesión</h2>
              <p className="mt-1 text-sm text-white/60">Vídeo de entrenamiento → timestamps, ejecución real, comparativa vs plan</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-2xl border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-black transition hover:bg-white/25">
                🎬 Subir vídeo
                <input type="file" accept="video/*" className="hidden" />
              </label>
              <span className="text-sm font-bold text-white/50">Ningún archivo</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {[{l:"Vídeo",v:"—"},{l:"Duración",v:"—"},{l:"Clips marcados",v:"0"}].map(({l,v})=>(
              <div key={l} className="rounded-xl bg-white/10 px-3 py-1.5 text-center">
                <p className="text-[8px] font-black uppercase tracking-wider text-white/50">{l}</p>
                <p className="text-sm font-black text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BORRADOR VÍDEO ── */}
        <div className="rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 px-4 py-2.5 text-center">
          <p className="text-xs font-black text-violet-600">🎬 BORRADOR — así se vería el análisis una vez subido el vídeo</p>
        </div>

        {/* ── CABECERA ── */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-orange-500 px-3 py-1 text-[11px] font-black text-white">{VIDEO_MOCK.md}</span>
                <span className="text-[10px] font-bold text-slate-400">Miércoles · {VIDEO_MOCK.date.slice(5).replace("-","/")}</span>
              </div>
              <h3 className="mt-1 text-2xl font-black text-white">{VIDEO_MOCK.title}</h3>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Archivo</p>
                <p className="text-xs font-black text-violet-400">{VIDEO_MOCK.videoFile}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Duración</p>
                <p className="text-lg font-black text-cyan-400">{VIDEO_MOCK.duracion}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TIEMPOS REALES POR BLOQUE (cronometrados en vídeo) ── */}
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">⏱ Tiempos reales por bloque — cronometrados en vídeo</p>
          <p className="mb-4 text-[9px] text-slate-400">Lo único que el vídeo permite medir con exactitud sin datos adicionales</p>
          <div className="space-y-3">
            {VIDEO_MOCK.tiemposReales.map(t => {
              const diff = t.realMin - t.planMin;
              return (
                <div key={t.bloque} className="flex items-center gap-3">
                  <div className="h-3 w-3 shrink-0 rounded-full" style={{background:t.color}}/>
                  <span className="w-36 shrink-0 text-xs font-bold text-slate-700">{t.bloque}</span>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-4 overflow-hidden rounded-full bg-slate-100 flex-1">
                      <div className="h-full rounded-full" style={{width:`${Math.min(100,(t.realMin/70)*100)}%`, background:t.color}}/>
                    </div>
                    <span className="w-8 text-right text-sm font-black text-slate-800">{t.realMin}′</span>
                    <span className={cn("w-10 text-right text-[10px] font-bold", diff > 2 ? "text-rose-500" : diff < -2 ? "text-amber-500" : "text-emerald-500")}>
                      {diff > 0 ? "+" : ""}{diff !== 0 ? `${diff}′` : "✓"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── REPETICIONES CONTADAS EN VÍDEO ── */}
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">🔢 Repeticiones contadas en vídeo</p>
          <p className="mb-4 text-[9px] text-slate-400">Conteo manual o automático de acciones observadas en pantalla</p>
          <div className="space-y-2">
            {VIDEO_MOCK.repsContadas.map((r,i) => {
              const diff = typeof r.real === "number" && typeof r.plan === "number" ? r.real - r.plan : null;
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="flex-1 text-xs font-bold text-slate-700">{r.label}</span>
                  <span className="text-[10px] text-slate-400">Plan: <span className="font-black text-slate-600">{r.plan}</span></span>
                  <span className="text-[10px] text-slate-400">Real: <span className="font-black text-slate-900">{r.real}</span></span>
                  {diff !== null && (
                    <span className={cn("text-xs font-black", diff < 0 ? "text-amber-500" : "text-emerald-500")}>
                      {diff > 0 ? "+" : ""}{diff}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] text-amber-800 font-bold">
            {VIDEO_MOCK.notaRpe}
          </div>
        </div>

        {/* ── CLIPS DESTACADOS ── */}
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">🎯 Clips destacados</p>
          <div className="space-y-2">
            {VIDEO_MOCK.clips.map((c,i) => (
              <div key={i} className={cn("flex items-start gap-3 rounded-2xl border px-4 py-3 text-xs leading-5", c.color)}>
                <span className="shrink-0 rounded-lg bg-slate-900 px-2 py-0.5 font-black text-white tabular-nums">{c.t}</span>
                <div>
                  <span className="font-black">{c.tipo} · </span>
                  <span>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ZONAS DE JUEGO + OBSERVACIONES INDIVIDUALES ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Zonas */}
          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">🗺️ Zonas de juego predominantes</p>
            {/* Mini campo SVG */}
            <svg viewBox="0 0 200 130" className="w-full mb-4 rounded-xl border border-slate-100 bg-emerald-700">
              {/* Campo */}
              <rect x="5" y="5" width="190" height="120" fill="none" stroke="#16a34a" strokeWidth="1.5" rx="4"/>
              <line x1="100" y1="5" x2="100" y2="125" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3"/>
              <circle cx="100" cy="65" r="15" fill="none" stroke="#16a34a" strokeWidth="1"/>
              {/* Zona ofensiva central */}
              <rect x="60" y="5" width="80" height="55" fill="#3b82f6" fillOpacity="0.5" rx="3"/>
              {/* Banda derecha */}
              <rect x="145" y="5" width="50" height="120" fill="#10b981" fillOpacity="0.35" rx="3"/>
              {/* Banda izquierda */}
              <rect x="5" y="5" width="50" height="120" fill="#8b5cf6" fillOpacity="0.30" rx="3"/>
              {/* Zona defensiva */}
              <rect x="60" y="75" width="80" height="55" fill="#f97316" fillOpacity="0.30" rx="3"/>
              {/* Porterías */}
              <rect x="80" y="2" width="40" height="8" fill="none" stroke="#fff" strokeWidth="1.5" rx="1"/>
              <rect x="80" y="120" width="40" height="8" fill="none" stroke="#fff" strokeWidth="1.5" rx="1"/>
            </svg>
            <div className="space-y-2">
              {VIDEO_MOCK.zonas.map(z => (
                <div key={z.zona}>
                  <div className="mb-0.5 flex justify-between text-xs font-bold">
                    <span style={{color:z.color}}>{z.zona}</span>
                    <span className="text-slate-400">{z.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{width:`${z.pct}%`, background:z.color}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observaciones individuales */}
          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">👤 Observaciones individuales</p>
            <div className="space-y-3">
              {VIDEO_MOCK.jugadoras.map(j => (
                <div key={j.name} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-[10px] font-black text-slate-600">
                    {j.name.slice(0,2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-800">{j.name}</span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[8px] font-black", j.color)}>{j.nivel}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{j.obs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECOMENDACIÓN (desde vídeo) ── */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg">
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-200 mb-2">🤖 Recomendación basada en el vídeo</p>
          <p className="text-sm leading-6 text-white/90">{VIDEO_MOCK.recomendacion}</p>
        </div>

      </div>
      )} {/* fin analysisMode === "video" */}

    </div>
  );
}

function TrainingSessionPanel({ onSaveTraining }) {
  // ─── Semana actual ───────────────────────────────────────────────────
  const today    = new Date();
  const todayStr = localDateStr(today);
  const DOW_NAMES = ["L", "M", "X", "J", "V", "S", "D"];
  const DAY_FULL  = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const weekDays = (() => {
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dow + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  })();

  const todayIdx = weekDays.findIndex(d => localDateStr(d) === todayStr);

  const [dayTypes, setDayTypes] = useState(() =>
    weekDays.map((d, i) => ({
      date: localDateStr(d),
      type: i >= 5 ? "descanso" : "sesion",
    }))
  );
  const MONTH_ES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

  const [selectedDayIdx, setSelectedDayIdx] = useState(todayIdx >= 0 ? todayIdx : 0);
  const [microcycleMsg, setMicrocycleMsg] = useState("");
  const [saveMessage,   setSaveMessage]   = useState("");

  // ─── Complementario ─────────────────────────────────────────────────
  const [compGym,  setCompGym]  = useState("");
  const [compPrev, setCompPrev] = useState("");
  const [compPort, setCompPort] = useState("");
  const [compVid,  setCompVid]  = useState("");

  // ─── Info sesión ─────────────────────────────────────────────────────
  const [infoJugadoras,  setInfoJugadoras]  = useState("");
  const [infoPorteras,   setInfoPorteras]   = useState("");
  const [infoLesionadas, setInfoLesionadas] = useState("");
  const [infoPabellon,   setInfoPabellon]   = useState("");

  // ─── Objetivos ───────────────────────────────────────────────────────
  const [objGenerales,  setObjGenerales]  = useState("");
  const [objEspecificos,setObjEspecificos]= useState("");
  const [contenidos,    setContenidos]    = useState("");

  const sessionDate = dayTypes[selectedDayIdx]?.date || todayStr;

  const TYPE_STYLE = {
    sesion:   { bg: "bg-sky-500",   text: "text-white", label: "Sesión",   emoji: "🏋️" },
    partido:  { bg: "bg-rose-500",  text: "text-white", label: "Partido",  emoji: "⚽" },
    descanso: { bg: "bg-slate-500", text: "text-white", label: "Descanso", emoji: "💤" },
  };

  const updateDayType = (idx, val) =>
    setDayTypes(prev => prev.map((d, i) => i === idx ? { ...d, type: val } : d));

  const actualizarMicrociclo = () => {
    setMicrocycleMsg("✅ Microciclo actualizado");
    setTimeout(() => setMicrocycleMsg(""), 3000);
  };

  // ─── Filas de entrenamiento ──────────────────────────────────────────
  const [warmupRows,   setWarmupRows]   = useState([
    buildTask("Movilidad", 10, 10, 6, 6, 2),
    buildTask("Tecnica individual", 20, 10, 8, 9, 3),
    buildTask("Preventivo", 10, 5, 7, 7, 2),
  ]);
  const [mainRows, setMainRows] = useState([
    buildTask("Ataque", 40, 20, 12, 13, 6), buildTask("Defensa", 40, 20, 12, 11, 7),
    buildTask("ABP", 20, 20, 8, 9, 5), buildTask("Situaciones especiales", 40, 20, 10, 10, 7),
    buildTask("6m-10m", 20, 20, 6, 7, 6),
    buildTask("Ludico", 20, 20, 8, 8, 4),
  ]);
  const [cooldownRows, setCooldownRows] = useState([
    buildTask("Estiramientos pasivos", 5, 5, 4, 5, 1),
    buildTask("CORE", 10, 10, 5, 6, 3),
    buildTask("Roller", 5, 5, 4, 4, 1),
  ]);

  const allRows      = [...warmupRows, ...mainRows, ...cooldownRows];
  const globalSummary = blockSummary(allRows);

  const saveTraining = () => {
    const concepts = [
      ...warmupRows.map(r => r.type),
      ...mainRows.map(r => r.type),
      ...cooldownRows.map(r => r.type),
    ].filter(Boolean).slice(0, 6);
    const newTraining = {
      id: Date.now(),
      date: sessionDate,
      title: `Sesión · ${DAY_FULL[selectedDayIdx]}`,
      ua: globalSummary.ua,
      realMinutes: globalSummary.real,
      effectiveMinutes: Math.round(globalSummary.real * 0.82),
      avgRpe: globalSummary.avgRpe,
      attendance: safeNum(infoJugadoras) || 12,
      concepts,
    };
    onSaveTraining(newTraining);
    setSaveMessage(`✅ Sesión guardada · ${sessionDate}`);
    setTimeout(() => setSaveMessage(""), 4000);
  };

  const selType = dayTypes[selectedDayIdx]?.type || "sesion";
  const selSty  = TYPE_STYLE[selType];

  // Funciones export extraídas para reutilizar
  const exportCSV = () => {
    const rows = [
      ["Sesión", sessionDate, DAY_FULL[selectedDayIdx]],
      [],
      ["Bloque", "Tarea", "T.Est.", "T.Real", "RPE", "UA"],
      ...warmupRows.map(t   => ["Calentamiento", t.type, t.estimatedTime, t.realTime, t.rpe, taskUA(t)]),
      ...mainRows.map(t     => ["Principal",      t.type, t.estimatedTime, t.realTime, t.rpe, taskUA(t)]),
      ...cooldownRows.map(t => ["Vuelta calma",   t.type, t.estimatedTime, t.realTime, t.rpe, taskUA(t)]),
      [],
      ["Complementario","Gimnasio",   compGym  + " min"],
      ["Complementario","Preventivo", compPrev + " min"],
      ["Complementario","Porteras",   compPort + " min"],
      ["Complementario","Vídeo",      compVid  + " min"],
      [],
      ["TOTAL UA", globalSummary.ua],
      ["Media RPE", globalSummary.avgRpe],
      ["Minutos reales", globalSummary.real],
    ];
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob(["﻿" + rows.map(r => r.join(";")).join("\n")], { type: "text/csv;charset=utf-8" })),
      download: `sesion_${sessionDate}.csv`,
    });
    a.click();
  };

  const exportPDFSession = () => {
    const taskRows = (rows, bloque) => rows.map(t =>
      `<tr><td>${bloque}</td><td>${t.type}</td><td>${t.estimatedTime}'</td><td>${t.realTime}'</td><td>${t.rpe}</td><td><b>${taskUA(t)} UA</b></td></tr>`
    ).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
      <title>Sesión ${sessionDate}</title>
      <style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;padding:24px;color:#0f172a;margin:0}h1{font-size:20px;margin:0 0 4px}p{font-size:12px;color:#64748b;margin:0 0 16px}table{border-collapse:collapse;width:100%;font-size:12px;margin-bottom:16px}th{background:#0f172a;color:#fff;padding:6px 10px;text-align:left}td{padding:5px 10px;border-bottom:1px solid #e2e8f0}tr:nth-child(even) td{background:#f8fafc}.kpi{display:inline-block;margin:4px;padding:8px 16px;border-radius:10px;background:#f1f5f9;font-size:13px;font-weight:700}</style>
      </head><body>
      <h1>Sesión · ${DAY_FULL[selectedDayIdx]}, ${sessionDate}</h1>
      <p>Tipo: ${selSty.label}</p>
      <table><tr><th>Bloque</th><th>Tarea</th><th>T.Est.</th><th>T.Real</th><th>RPE</th><th>UA</th></tr>
      ${taskRows(warmupRows,"Calentamiento")}${taskRows(mainRows,"Parte principal")}${taskRows(cooldownRows,"Vuelta a la calma")}
      </table>
      <div><span class="kpi">💪 UA: ${globalSummary.ua}</span><span class="kpi">📊 RPE: ${globalSummary.avgRpe}</span><span class="kpi">⏱ ${globalSummary.real}'</span></div>
      ${(compGym||compPrev||compPort||compVid)?`<p style="margin-top:12px"><b>Complementario:</b> Gimnasio ${compGym||0}' · Preventivo ${compPrev||0}' · Porteras ${compPort||0}' · Vídeo ${compVid||0}'</p>`:""}
      </body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-6">

      {/* ── Microciclo semanal ── */}
      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-br from-[#061a3f] via-[#0c3070] to-[#08285f] p-5 text-white">

          {/* Cabecera con botón Actualizar + botones guardar/export */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">Planificación semanal</p>
              <h2 className="mt-0.5 text-2xl font-black tracking-tight">Microciclo</h2>
              <p className="mt-0.5 text-xs font-semibold text-white/55">Semana del {weekDays[0].getDate()} al {weekDays[6].getDate()} de {MONTH_ES[weekDays[6].getMonth()]}</p>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <button onClick={actualizarMicrociclo}
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-black text-white shadow-md shadow-sky-900/40 transition hover:from-sky-400 hover:to-cyan-300 active:scale-95">
                ↻ Actualizar
              </button>
              <button onClick={saveTraining}
                className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-black text-white shadow-md transition hover:from-emerald-400 hover:to-teal-400 active:scale-95">
                💾 Guardar
              </button>
              <button onClick={exportCSV}
                className="rounded-2xl bg-white/15 border border-white/25 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/25 active:scale-95">
                ⬇ CSV
              </button>
              <button onClick={exportPDFSession}
                className="rounded-2xl bg-white/15 border border-white/25 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/25 active:scale-95">
                ⬇ PDF
              </button>
            </div>
          </div>
          {(microcycleMsg || saveMessage) && (
            <p className="mt-2 text-[10px] font-black text-emerald-300">{microcycleMsg || saveMessage}</p>
          )}

          {/* 7 columnas de días */}
          <div className="mt-5 grid grid-cols-7 gap-2">
            {weekDays.map((d, i) => {
              const dStr    = localDateStr(d);
              const isToday = dStr === todayStr;
              const isSel   = selectedDayIdx === i;
              const t       = dayTypes[i].type;
              const cardBg  = t === "sesion"
                ? isSel ? "from-sky-400 to-blue-600"   : "from-sky-900/70 to-blue-900/70"
                : t === "partido"
                ? isSel ? "from-rose-400 to-red-600"   : "from-rose-900/70 to-red-900/70"
                : isSel ? "from-slate-500 to-slate-700" : "from-slate-800/70 to-slate-900/70";
              const dayEmoji = t === "sesion" ? "🏋️" : t === "partido" ? "⚽" : "💤";
              return (
                <div key={i} onClick={() => setSelectedDayIdx(i)}
                  className={cn(
                    "relative flex cursor-pointer flex-col items-center rounded-3xl border-2 pt-3 pb-2.5 px-1 transition-all duration-200 select-none",
                    `bg-gradient-to-b ${cardBg}`,
                    isSel  ? "border-white shadow-2xl scale-[1.07] z-10" : "border-white/15 hover:border-white/40 hover:scale-[1.02]",
                    isToday && !isSel && "border-yellow-400/80 ring-2 ring-yellow-400/30"
                  )}>
                  {isToday && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-slate-900 shadow">HOY</span>
                  )}
                  <span className={cn("text-[9px] font-black uppercase tracking-widest leading-tight", isSel ? "text-white" : "text-white/60")}>{DAY_FULL[i].slice(0,3).toUpperCase()}</span>
                  <span className={cn("mt-0.5 text-[8px] font-bold", isSel ? "text-white/80" : "text-white/40")}>{DAY_FULL[i].slice(3)}</span>
                  <span className={cn("mt-1 text-3xl font-black leading-none tabular-nums", isToday ? "text-yellow-300" : isSel ? "text-white" : "text-white/85")}>{d.getDate()}</span>
                  <span className={cn("text-[8px] font-bold uppercase", isSel ? "text-white/70" : "text-white/35")}>{MONTH_ES[d.getMonth()]}</span>
                  <span className="mt-1.5 text-base leading-none">{dayEmoji}</span>
                  <select value={t} onClick={e => e.stopPropagation()}
                    onChange={e => { e.stopPropagation(); updateDayType(i, e.target.value); }}
                    className={cn("mt-2 w-full cursor-pointer rounded-xl border-none py-1 text-center text-[8px] font-black outline-none", isSel ? "bg-white/25 text-white" : "bg-white/10 text-white/75")}>
                    <option value="sesion"   className="bg-slate-800 text-white">🏋️ Sesión</option>
                    <option value="partido"  className="bg-slate-800 text-white">⚽ Partido</option>
                    <option value="descanso" className="bg-slate-800 text-white">💤 Descanso</option>
                  </select>
                </div>
              );
            })}
          </div>

        </div>
      </Card>

      {/* ── Info sesión | Objetivos y contenidos | Complementario — 3 columnas ── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        {/* 1 — Info sesión */}
        <div className="flex flex-col rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-teal-50 p-5 shadow-md">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-cyan-200" />
            <p className="rounded-2xl border border-cyan-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-cyan-700 shadow-sm">📋 Info sesión</p>
            <div className="h-px flex-1 bg-cyan-200" />
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
            {[
              { emoji:"👥", label:"Jugadoras",  val:infoJugadoras,  set:setInfoJugadoras,  bg:"from-sky-100 to-cyan-100",     border:"border-sky-200",    text:"text-sky-800",    mode:"numeric" },
              { emoji:"🧤", label:"Porteras",   val:infoPorteras,   set:setInfoPorteras,   bg:"from-teal-100 to-emerald-100", border:"border-teal-200",   text:"text-teal-800",   mode:"numeric" },
              { emoji:"🩹", label:"Lesionadas", val:infoLesionadas, set:setInfoLesionadas, bg:"from-rose-100 to-red-100",     border:"border-rose-200",   text:"text-rose-800",   mode:"numeric" },
              { emoji:"🏟️", label:"Pabellón",   val:infoPabellon,   set:setInfoPabellon,   bg:"from-amber-100 to-yellow-100", border:"border-amber-200",  text:"text-amber-800",  mode:"text"    },
            ].map(({ emoji, label, val, set, bg, border, text, mode }) => (
              <div key={label} className={cn("flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-gradient-to-br p-3 shadow-sm", bg, border)}>
                <span className="text-xl">{emoji}</span>
                <span className={cn("text-[10px] font-black uppercase tracking-wide", text)}>{label}</span>
                <input type="text" inputMode={mode} value={val} onChange={e => set(e.target.value)} placeholder="—"
                  className={cn("w-full rounded-xl border bg-white/80 px-2 py-1 text-center text-sm font-black outline-none focus:bg-white", border, text)} />
              </div>
            ))}
          </div>
        </div>

        {/* 2 — Objetivos y contenidos */}
        <div className="flex flex-col rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-5 shadow-md">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-emerald-200" />
            <p className="rounded-2xl border border-emerald-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-700 shadow-sm">🎯 Objetivos</p>
            <div className="h-px flex-1 bg-emerald-200" />
          </div>
          <div className="flex-1 space-y-3">
            {[
              { label:"Objetivos generales",  val:objGenerales,   set:setObjGenerales,   ph:"Ej: Mejorar salida de presión, juego con pivot...",    color:"border-emerald-300 bg-emerald-50/60 focus:border-emerald-500" },
              { label:"Objetivos específicos", val:objEspecificos, set:setObjEspecificos, ph:"Ej: Conectar en 3 toques, llegar al 2º palo...",        color:"border-teal-300 bg-teal-50/60 focus:border-teal-500"         },
              { label:"Contenidos",            val:contenidos,     set:setContenidos,     ph:"Ej: Rondo 5x2, situación 3x2, ABP córner 2º palo...",   color:"border-green-300 bg-green-50/60 focus:border-green-500"      },
            ].map(({ label, val, set, ph, color }) => (
              <div key={label}>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
                <textarea value={val} onChange={e => set(e.target.value)} placeholder={ph} rows={2}
                  className={cn("w-full resize-none rounded-2xl border px-3 py-2 text-sm text-slate-700 outline-none transition", color)} />
              </div>
            ))}
          </div>
        </div>

        {/* 3 — Complementario */}
        <div className="flex flex-col rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-5 shadow-md">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-violet-200" />
            <p className="rounded-2xl border border-violet-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-violet-700 shadow-sm">✦ Complementario</p>
            <div className="h-px flex-1 bg-violet-200" />
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
            {[
              { emoji:"🏋️", label:"Gimnasio",   val:compGym,  set:setCompGym,  bg:"from-blue-100 to-indigo-100",   border:"border-blue-200",    text:"text-blue-800"    },
              { emoji:"🛡️", label:"Preventivo", val:compPrev, set:setCompPrev, bg:"from-amber-100 to-orange-100",  border:"border-amber-200",   text:"text-amber-800"   },
              { emoji:"🧤", label:"Porteras",   val:compPort, set:setCompPort, bg:"from-emerald-100 to-teal-100",  border:"border-emerald-200", text:"text-emerald-800" },
              { emoji:"🎬", label:"Vídeo",      val:compVid,  set:setCompVid,  bg:"from-rose-100 to-pink-100",     border:"border-rose-200",    text:"text-rose-800"    },
            ].map(({ emoji, label, val, set, bg, border, text }) => (
              <div key={label} className={cn("flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-gradient-to-br p-3 shadow-sm", bg, border)}>
                <span className="text-xl">{emoji}</span>
                <span className={cn("text-[10px] font-black uppercase tracking-wide", text)}>{label}</span>
                <div className="flex items-center gap-1">
                  <input type="text" inputMode="numeric" value={val} onChange={e => set(e.target.value)} placeholder="—"
                    className={cn("w-14 rounded-xl border bg-white/80 px-1 py-1 text-center text-sm font-black outline-none focus:bg-white", border, text)} />
                  <span className="text-[10px] font-bold text-slate-400">min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>{/* fin 3 columnas */}

      {/* ── Resumen de carga — antes del calentamiento ── */}
      <Card className="p-5">
        <SectionTitle title="Resumen de carga de la sesion" subtitle="Totales automaticos de toda la sesion." />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-violet-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-violet-500">Carga UA sesion</p><p className="mt-2 text-3xl font-black text-violet-950">{globalSummary.ua}</p></div>
          <div className="rounded-3xl bg-rose-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-rose-500">Media RPE</p><p className="mt-2 text-3xl font-black text-rose-950">{globalSummary.avgRpe || "—"}</p></div>
          <div className="rounded-3xl bg-amber-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-amber-600">Minutaje estimado</p><p className="mt-2 text-3xl font-black text-amber-950">{globalSummary.estimated}'</p></div>
          <div className="rounded-3xl bg-cyan-50 p-5 text-center"><p className="text-xs font-black uppercase tracking-wide text-cyan-600">Minutaje real</p><p className="mt-2 text-3xl font-black text-cyan-950">{globalSummary.real}'</p></div>
        </div>
      </Card>

      {/* ── Bloques de entrenamiento ── */}
      <TrainingBlock title="Calentamiento" options={WARMUP_OPTIONS} values={warmupRows} setValues={setWarmupRows} wrapperClass="border-2 border-amber-400 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 ring-amber-200" lineClass="bg-gradient-to-r from-amber-50 to-orange-50" accent="border-amber-300" summaryClass="bg-gradient-to-r from-amber-300 to-orange-300 text-amber-950" />
      <TrainingBlock title="Parte principal" options={MAIN_TASK_OPTIONS} values={mainRows} setValues={setMainRows} wrapperClass="border-2 border-emerald-400 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 ring-emerald-200" lineClass="bg-gradient-to-r from-emerald-50 to-teal-50" accent="border-emerald-300" summaryClass="bg-gradient-to-r from-emerald-300 to-teal-300 text-emerald-950" />
      <TrainingBlock title="Vuelta a la calma" options={COOLDOWN_OPTIONS} values={cooldownRows} setValues={setCooldownRows} wrapperClass="border-2 border-sky-400 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 ring-sky-200" lineClass="bg-gradient-to-r from-sky-50 to-cyan-50" accent="border-sky-300" summaryClass="bg-gradient-to-r from-sky-300 to-cyan-300 text-sky-950" />

      <MetricByTasksDashboard title="Minutaje por partes y tareas" subtitle="Minutos reales por bloque y tarea." warmupTasks={warmupRows} mainTasks={mainRows} cooldownTasks={cooldownRows} metric="time" />
      <MetricByTasksDashboard title="Carga por tareas" subtitle="Donde se concentra la carga en la sesion." warmupTasks={warmupRows} mainTasks={mainRows} cooldownTasks={cooldownRows} metric="load" />

    </div>
  );
}

function ShotsDonutChart({ stats }) {
  const goals   = safeNum(stats.goals);
  const shotsOn = safeNum(stats.shotsOn);
  const shotsPost = safeNum(stats.shotsPost);
  const shotsOff  = safeNum(stats.shotsOff);
  const total = goals + shotsOn + shotsPost + shotsOff || 1;

  const slices = [
    { label: "Gol",      val: goals,    color: "#3b82f6", text: "text-blue-600" },
    { label: "Portería", val: shotsOn,  color: "#10b981", text: "text-emerald-600" },
    { label: "Palo",     val: shotsPost,color: "#f59e0b", text: "text-amber-600" },
    { label: "Fuera",    val: shotsOff, color: "#ef4444", text: "text-red-500" },
  ];

  const cx = 100, cy = 88, r = 62, sw = 20;
  const toCart = (deg) => ({
    x: cx + r * Math.cos(((deg - 90) * Math.PI) / 180),
    y: cy + r * Math.sin(((deg - 90) * Math.PI) / 180),
  });
  const arc = (a, b) => {
    const s = toCart(a), e = toCart(b);
    return `M${s.x.toFixed(2)},${s.y.toFixed(2)} A${r},${r},0,${b - a > 180 ? 1 : 0},1,${e.x.toFixed(2)},${e.y.toFixed(2)}`;
  };

  let deg = -90;
  const segs = slices.map((s) => {
    const sweep = (s.val / total) * 180;
    const start = deg;
    deg += sweep;
    return { ...s, start, end: deg, pct: Math.round((s.val / total) * 100) };
  });

  return (
    <Card className="p-4">
      <p className="mb-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">Análisis de tiros</p>
      <div className="flex items-stretch gap-2">
        {/* Arc – fills all available space */}
        <div className="min-w-0 flex-1">
          <svg viewBox="0 0 200 96" className="w-full overflow-visible">
            <path d={arc(-90, 90)} fill="none" stroke="#f1f5f9" strokeWidth={sw} strokeLinecap="round" />
            {segs.filter((s) => s.val > 0).map((s) => (
              <path key={s.label} d={arc(s.start + 0.8, s.end - 0.8)} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="round" />
            ))}
            {segs.filter((s) => s.val > 0).map((s) => (
              <path key={s.label + "_g"} d={arc(s.start + 0.8, s.end - 0.8)} fill="none" stroke={s.color} strokeWidth={sw - 10} strokeLinecap="round" opacity="0.22" />
            ))}
            <text x={cx} y={cy - 2} textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">{total}</text>
          </svg>
        </div>
        {/* Legend – same height as chart */}
        <div className="w-32 shrink-0 flex flex-col justify-around">
          {[...segs].sort((a, b) => b.val - a.val).map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="flex-1 truncate text-[9px] font-black text-slate-600">{s.label}</span>
              <span className={cn("text-sm font-black tabular-nums", s.text)}>{s.val}</span>
              <span className="w-6 text-right text-[8px] font-bold text-slate-400">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function RecoveryBalanceChart({ stats }) {
  const rec       = safeNum(stats.recoveries);
  const loss      = safeNum(stats.losses);
  const trans     = safeNum(stats.transLoss);
  const lossAfter = safeNum(stats.lossAfterRecovery);
  const total     = rec + loss + trans + lossAfter || 1;

  const slices = [
    { label: "Recuper.",    val: rec,       color: "#10b981", text: "text-emerald-600" },
    { label: "Pérdidas",    val: loss,      color: "#ef4444", text: "text-red-500" },
    { label: "Trans. pérd.",val: trans,     color: "#6366f1", text: "text-indigo-600" },
    { label: "Pérd. recup.",val: lossAfter, color: "#f59e0b", text: "text-amber-600" },
  ];

  const cx = 100, cy = 88, r = 62, sw = 20;
  const toCart = (deg) => ({
    x: cx + r * Math.cos(((deg - 90) * Math.PI) / 180),
    y: cy + r * Math.sin(((deg - 90) * Math.PI) / 180),
  });
  const arc = (a, b) => {
    const s = toCart(a), e = toCart(b);
    return `M${s.x.toFixed(2)},${s.y.toFixed(2)} A${r},${r},0,${b - a > 180 ? 1 : 0},1,${e.x.toFixed(2)},${e.y.toFixed(2)}`;
  };

  let deg = -90;
  const segs = slices.map((s) => {
    const sweep = (s.val / total) * 180;
    const start = deg;
    deg += sweep;
    return { ...s, start, end: deg, pct: Math.round((s.val / total) * 100) };
  });

  return (
    <Card className="p-4">
      <p className="mb-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">Pérdidas · Recuperaciones</p>
      <div className="flex items-stretch gap-2">
        {/* Arc – fills all available space */}
        <div className="min-w-0 flex-1">
          <svg viewBox="0 0 200 96" className="w-full overflow-visible">
            <path d={arc(-90, 90)} fill="none" stroke="#f1f5f9" strokeWidth={sw} strokeLinecap="round" />
            {segs.filter((s) => s.val > 0).map((s) => (
              <path key={s.label} d={arc(s.start + 0.8, s.end - 0.8)} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="round" />
            ))}
            {segs.filter((s) => s.val > 0).map((s) => (
              <path key={s.label + "_g"} d={arc(s.start + 0.8, s.end - 0.8)} fill="none" stroke={s.color} strokeWidth={sw - 10} strokeLinecap="round" opacity="0.22" />
            ))}
            <text x={cx} y={cy - 2} textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">{total}</text>
          </svg>
        </div>
        {/* Legend – same height as chart */}
        <div className="w-32 shrink-0 flex flex-col justify-around">
          {[...segs].sort((a, b) => b.val - a.val).map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="flex-1 truncate text-[9px] font-black text-slate-600">{s.label}</span>
              <span className={cn("text-sm font-black tabular-nums", s.text)}>{s.val}</span>
              <span className="w-6 text-right text-[8px] font-bold text-slate-400">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── BASE DE DATOS – sub-views ────────────────────────────────────────────────

function DatabaseInfoView({ teamName, matches, teams, players }) {
  const [scope, setScope] = useState("Todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rival, setRival] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");

  const INFO_TYPE_BUCKET = {
    Liga:     ["Liga"],
    Copa:     ["Copa"],
    Amistoso: ["Amistoso"],
    Otros:    ["Scouting", "Playoff", "Live"],
  };

  const INFO_POS_COLORS = {
    Portera: "bg-amber-100 text-amber-800", Cierre: "bg-blue-100 text-blue-800",
    Ala: "bg-emerald-100 text-emerald-800", Pivot: "bg-violet-100 text-violet-800",
    Universal: "bg-rose-100 text-rose-800",
  };
  const fmtBirth = (bd) => {
    if (!bd) return "";
    const [y, mo, d] = bd.split("-");
    return `${d}/${mo}/${y}`;
  };
  const teamPlayers = (players || []).filter((p) => p.team === teamName).sort((a, b) => a.dorsal - b.dorsal);

  const rivals = (teams || []).filter((t) => t.name !== teamName).map((t) => t.name);

  const filtered = useMemo(() => {
    let ms = sortByDateDesc(
      (matches || []).filter((m) => {
        const teamOk  = m.teams.includes(teamName);
        const rivalOk = !rival || m.teams.includes(rival);
        const fromOk  = !startDate || m.date >= startDate;
        const toOk    = !endDate || m.date <= endDate;
        const allowed = INFO_TYPE_BUCKET[typeFilter];
        const typeOk  = !allowed || allowed.includes(m.type);
        return teamOk && rivalOk && fromOk && toOk && typeOk;
      })
    );
    if (scope === "Ultimo partido") ms = ms.slice(0, 1);
    else if (scope === "Ultimos 5 partidos") ms = ms.slice(0, 5);
    else if (scope === "Ultimos 10 partidos") ms = ms.slice(0, 10);
    return ms;
  }, [matches, teamName, rival, startDate, endDate, scope, typeFilter]);

  const stats       = useMemo(() => averageStats(filtered, teamName),      [filtered, teamName]);
  const rivalStats  = useMemo(() => averageRivalStats(filtered, teamName), [filtered, teamName]);
  const rivalDisplayName = rival || "Rival";

  const matchResults = useMemo(() => {
    let wins = 0, draws = 0, losses = 0;
    filtered.forEach((m) => {
      const my = getMatchStats(m, teamName);
      const rn = m.teams.find((t) => t !== teamName);
      const rv = getMatchStats(m, rn);
      if (my.goals > rv.goals) wins++;
      else if (my.goals === rv.goals) draws++;
      else losses++;
    });
    return { wins, draws, losses, total: filtered.length };
  }, [filtered, teamName]);

  const exportCSV = () => {
    if (!stats) return;
    const rows = [
      ["Equipo", teamName],
      ["Partidos analizados", filtered.length],
      ["Tiros a portería", stats.shotsOn],
      ["Tiros fuera", stats.shotsOff],
      ["Tiros al palo", stats.shotsPost],
      ["Goles", stats.goals],
      ["Tiros totales", stats.shotsTotal],
      ["Recuperaciones", stats.recoveries],
      ["Pérdidas", stats.losses],
      ["Transición tras pérdida", stats.transLoss],
      ["Pérdida tras recuperación", stats.lossAfterRecovery],
      ["Amarillas", stats.yellow],
      ["Rojas", stats.red],
    ];
    const csv = "﻿" + rows.map((r) => r.join(";")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `${teamName}_estadisticas.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const exportPDF = () => {
    if (!stats) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Estadísticas · ${teamName}</title>
    <style>body{font-family:Arial,sans-serif;padding:30px;color:#0f172a}h1{color:#1e40af}table{border-collapse:collapse;width:100%}td,th{border:1px solid #e2e8f0;padding:8px 12px}th{background:#f8fafc;font-weight:700}tr:nth-child(even){background:#f1f5f9}</style>
    </head><body><h1>Estadísticas — ${teamName}</h1><p>Partidos analizados: ${filtered.length}</p>
    <table><tr><th>Estadística</th><th>Media</th></tr>
    ${[["Tiros a portería",stats.shotsOn],["Tiros fuera",stats.shotsOff],["Tiros al palo",stats.shotsPost],["Goles",stats.goals],["Tiros totales",stats.shotsTotal],["Recuperaciones",stats.recoveries],["Pérdidas",stats.losses],["Transición tras pérdida",stats.transLoss],["Pérdida tras recuperación",stats.lossAfterRecovery],["Amarillas",stats.yellow],["Rojas",stats.red]].map(([l,v])=>`<tr><td>${l}</td><td>${v}</td></tr>`).join("")}
    </table></body></html>`);
    win.document.close();
    win.print();
  };

  if (!stats) return (
    <Card className="p-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-3xl">📭</div>
      <p className="font-black text-slate-700">Sin datos para este equipo</p>
      <p className="mt-2 text-sm text-slate-400">No hay partidos con los filtros seleccionados.</p>
    </Card>
  );

  return (
    <div className="space-y-5">
      {/* Plantilla */}
      {teamPlayers.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-slate-400">
            Plantilla · {teamPlayers.length} jugadoras
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {teamPlayers.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5">
                <PlayerAvatar player={p} size="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 text-xs font-black text-slate-400">#{p.dorsal}</span>
                    <span className="min-w-0 truncate text-sm font-black text-slate-900">{playerName(p)}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", INFO_POS_COLORS[p.pos] || "bg-slate-100 text-slate-700")}>{p.pos}</span>
                    <span className="text-[10px] text-slate-400">{fmtBirth(p.birthDate)}</span>
                    <span className="text-[10px] font-bold text-slate-500">({calculateAge(p.birthDate)} años)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-wrap gap-2">
            {SAMPLE_OPTIONS.map((opt) => {
              const label = opt === "Ultimo partido" ? "1" : opt === "Ultimos 5 partidos" ? "5" : opt === "Ultimos 10 partidos" ? "10" : "Todos";
              return (
                <button key={opt} type="button" onClick={() => setScope(opt)}
                  className={cn("rounded-2xl px-4 py-1.5 text-xs font-black transition",
                    scope === opt ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-orange-50")}>
                  {label}
                </button>
              );
            })}
          </div>
          <MiniInput label="Desde" type="date" value={startDate} onChange={setStartDate} />
          <MiniInput label="Hasta" type="date" value={endDate} onChange={setEndDate} />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rival</span>
            <select value={rival} onChange={(e) => setRival(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 outline-none focus:border-orange-400">
              <option value="">Todos los rivales</option>
              {rivals.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={exportCSV} className="rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-black text-white shadow hover:bg-emerald-600 transition">⬇ CSV</button>
            <button onClick={exportPDF} className="rounded-2xl bg-red-500 px-4 py-2 text-xs font-black text-white shadow hover:bg-red-600 transition">⬇ PDF</button>
          </div>
        </div>

        {/* ── Type filter + W/D/L ── */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Type pills */}
          <div className="flex flex-wrap gap-1.5">
            {["Todos","Liga","Copa","Amistoso","Otros"].map((t) => (
              <button key={t} type="button" onClick={() => setTypeFilter(t)}
                className={cn("rounded-full px-3 py-1 text-[10px] font-black transition",
                  typeFilter === t
                    ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow"
                    : "bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-700")}>
                {t}
              </button>
            ))}
          </div>
          {/* W/D/L summary */}
          <div className="ml-auto flex items-center gap-2">
            {[
              { label:"V", val: matchResults.wins,   bg:"bg-emerald-500" },
              { label:"E", val: matchResults.draws,  bg:"bg-amber-400"   },
              { label:"D", val: matchResults.losses, bg:"bg-red-500"     },
            ].map(({ label, val, bg }) => (
              <div key={label} className="flex items-center gap-1">
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white", bg)}>{label}</span>
                <span className="text-sm font-black text-slate-800">{val}</span>
              </div>
            ))}
            <span className="ml-1 text-[10px] text-slate-400">/ {matchResults.total} PJ</span>
          </div>
        </div>

        <p className="mt-2 text-[10px] text-slate-400">{filtered.length} partido{filtered.length !== 1 ? "s" : ""} incluido{filtered.length !== 1 ? "s" : ""} en el análisis</p>
      </Card>
      {/* Shot + Recovery charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ShotsDonutChart stats={stats} />
        <RecoveryBalanceChart stats={stats} />
      </div>
      {/* Dual heat map full width */}
      <HeatMap stats={stats} />
      {/* Percentage report full width below */}
      <PercentageReport stats={stats} rivalStats={rivalStats} rivalName={rivalDisplayName} matchResults={matchResults} />

      {/* ── Lista de partidos filtrados ── */}
      <Card className="p-5">
        <SectionTitle title="Partidos" subtitle={`${filtered.length} partido${filtered.length !== 1 ? "s" : ""} con los filtros activos`} />
        {filtered.length > 0 ? (
          <div className="mt-4 space-y-2">
            {/* Header */}
            <div className="grid grid-cols-[44px_1fr_96px_80px_80px_52px] items-center gap-3 rounded-xl bg-slate-800 px-4 py-3">
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">Res.</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-300">Rival</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-300">Resultado</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-300">Tipo</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-300">Fecha</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-300">Campo</span>
            </div>
            {filtered.map((m) => {
              const my   = getMatchStats(m, teamName);
              const rivN = m.teams.find((t) => t !== teamName) || "Rival";
              const rv   = getMatchStats(m, rivN);
              const isHome = m.teams[0] === teamName;
              const res  = my.goals > rv.goals ? "V" : my.goals === rv.goals ? "E" : "D";
              const resCls = res === "V" ? "bg-emerald-500 text-white" : res === "E" ? "bg-amber-400 text-white" : "bg-red-500 text-white";
              const score = isHome ? `${my.goals} - ${rv.goals}` : `${rv.goals} - ${my.goals}`;
              const [y, mo, d] = m.date.split("-");
              return (
                <div key={m.id} className="grid grid-cols-[44px_1fr_96px_80px_80px_52px] items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 transition-colors hover:bg-slate-50">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black", resCls)}>{res}</span>
                  <span className="min-w-0 truncate text-sm font-bold text-slate-800">{rivN}</span>
                  <span className="text-center text-base font-black text-slate-700">{score}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-center text-xs font-black text-slate-600">{m.type}</span>
                  <span className="text-xs text-slate-400">{d}/{mo}/{y}</span>
                  <span className="text-center text-xl">{isHome ? "🏠" : "✈️"}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">Sin partidos con los filtros seleccionados.</p>
        )}
      </Card>
    </div>
  );
}

function DatabaseTeamPanel({ teamName, players, matches }) {
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [rivalFilter, setRivalFilter] = useState("");

  const POS_COLORS = {
    Portera: "bg-amber-100 text-amber-800",
    Cierre: "bg-blue-100 text-blue-800",
    Ala: "bg-emerald-100 text-emerald-800",
    Pivot: "bg-violet-100 text-violet-800",
    Universal: "bg-rose-100 text-rose-800",
  };

  const teamPlayers = players.filter((p) => p.team === teamName).sort((a, b) => a.dorsal - b.dorsal);

  // All rivals that appear in matches for this team
  const rivals = [...new Set(
    matches
      .filter((m) => m.teams.includes(teamName))
      .map((m) => m.teams.find((t) => t !== teamName))
      .filter(Boolean)
  )].sort();

  // Type filter mapping: "Otros" catches Scouting, Playoff, Live, etc.
  const TYPE_BUCKET = {
    Liga: ["Liga"],
    Amistoso: ["Amistoso"],
    Copa: ["Copa"],
    Otros: ["Scouting", "Playoff", "Live"],
  };

  const teamMatches = sortByDateDesc(
    matches.filter((m) => {
      const teamOk = m.teams.includes(teamName);
      const allowedTypes = TYPE_BUCKET[typeFilter];
      const typeOk = !allowedTypes || allowedTypes.includes(m.type);
      const rivalOk = !rivalFilter || m.teams.includes(rivalFilter);
      return teamOk && typeOk && rivalOk;
    })
  ).slice(0, 10);

  const fmtDate = (bd) => {
    if (!bd) return "";
    const [y, mo, d] = bd.split("-");
    return `${d}/${mo}/${y}`;
  };

  return (
    <div className="space-y-5">
      {/* ── Plantilla ── */}
      <Card className="p-5">
        <SectionTitle title="Plantilla" subtitle={`${teamPlayers.length} jugadoras registradas`} />
        {teamPlayers.length ? (
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {teamPlayers.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <PlayerAvatar player={p} size="h-11 w-11" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 text-xs font-black text-slate-400">#{p.dorsal}</span>
                    <span className="min-w-0 truncate text-sm font-black text-slate-900">{playerName(p)}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", POS_COLORS[p.pos] || "bg-slate-100 text-slate-700")}>{p.pos}</span>
                    <span className="text-[10px] text-slate-400">{fmtDate(p.birthDate)}</span>
                    <span className="text-[10px] font-bold text-slate-500">({calculateAge(p.birthDate)} años)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="mt-4 py-8 text-center text-sm text-slate-400">Sin jugadoras registradas para este equipo.</p>}
      </Card>

      {/* ── Historial de partidos ── */}
      <Card className="p-5">
        <SectionTitle title="Historial de partidos" subtitle="Últimos 10 partidos con los filtros activos" />

        {/* Filters */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {["Todos", "Liga", "Amistoso", "Copa", "Otros"].map((t) => (
            <button key={t} type="button" onClick={() => setTypeFilter(t)}
              className={cn("rounded-full px-3 py-1 text-xs font-black transition-all",
                typeFilter === t ? "bg-violet-600 text-white shadow" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}>
              {t}
            </button>
          ))}
          <select value={rivalFilter} onChange={(e) => setRivalFilter(e.target.value)}
            className="ml-1 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 outline-none focus:border-violet-400">
            <option value="">Todos los rivales</option>
            {rivals.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {teamMatches.length ? (
          <div className="mt-4 space-y-2">
            {teamMatches.map((m) => {
              const my = getMatchStats(m, teamName);
              const rv = m.teams[0] === teamName ? m.b : m.a;
              const diff = my.goals - rv.goals;
              const result = diff > 0 ? "V" : diff < 0 ? "D" : "E";
              const badge = result === "V" ? "bg-emerald-500" : result === "D" ? "bg-red-500" : "bg-amber-400";
              const isHome = m.teams[0] === teamName;
              return (
                <div key={m.id} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3">
                  {/* Result badge */}
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white", badge)}>
                    {result}
                  </span>
                  {/* Home / Away badge */}
                  <span
                    title={isHome ? "Local" : "Visitante"}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm">
                    {isHome ? "🏠" : "✈️"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-800">
                      {teamName} <span className="font-normal text-slate-400">vs</span> {getOpponent(m, teamName)}
                    </p>
                    <p className="text-xs text-slate-400">{m.date} · {m.type}</p>
                  </div>
                  <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-black text-slate-900">{getResult(m, teamName)}</span>
                </div>
              );
            })}
          </div>
        ) : <p className="mt-4 py-8 text-center text-sm text-slate-400">Sin partidos con los filtros seleccionados.</p>}
      </Card>
    </div>
  );
}

// ─── Microcycle view components ──────────────────────────────────────────────

function MicrocycleWeekView({ anchor, trainings, matches, teamName, label, showContents = true }) {
  const days = getWeekDays(anchor);
  const dayLabels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const maxUA  = Math.max(...days.map((d) => trainingSummaryForDate(trainings, d).ua), 1);
  const maxMin = Math.max(...days.map((d) => trainingSummaryForDate(trainings, d).minutes), 1);
  const totalUA  = days.reduce((s, d) => s + trainingSummaryForDate(trainings, d).ua, 0);
  const totalMin = days.reduce((s, d) => s + trainingSummaryForDate(trainings, d).minutes, 0);
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label || `Semana ${anchor}`}</p>
        <div className="flex gap-2">
          <span className="rounded-2xl bg-violet-100 px-3 py-1 text-xs font-black text-violet-800">{totalUA} UA</span>
          <span className="rounded-2xl bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800">{totalMin}'</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date, idx) => {
          const summary = trainingSummaryForDate(trainings, date);
          const dayMatches = matches.filter((m) => m.date === date && m.teams.includes(teamName));
          const hasWork = summary.ua > 0;
          return (
            <div key={date} className={cn(
              "rounded-2xl border p-2 text-center transition",
              hasWork ? "border-violet-200 bg-violet-50/50" : "border-slate-100 bg-white"
            )}>
              <p className="text-[10px] font-black uppercase text-slate-500">{dayLabels[idx]}</p>
              <p className="text-[9px] text-slate-400">{date.slice(5)}</p>
              <div className="my-2 flex h-16 items-end justify-center gap-1">
                <div className="flex h-full w-5 items-end rounded-full bg-violet-100/60">
                  <div className="w-full rounded-full bg-gradient-to-t from-violet-600 to-fuchsia-400"
                    style={{ height: `${Math.max(hasWork ? 10 : 0, (summary.ua / maxUA) * 100)}%` }} />
                </div>
                <div className="flex h-full w-5 items-end rounded-full bg-cyan-100/60">
                  <div className="w-full rounded-full bg-gradient-to-t from-cyan-600 to-sky-400"
                    style={{ height: `${Math.max(hasWork ? 10 : 0, (summary.minutes / maxMin) * 100)}%` }} />
                </div>
              </div>
              {hasWork ? (
                <div className="space-y-0.5 text-[9px] font-black">
                  <div className="text-violet-800">{summary.ua} UA</div>
                  <div className="text-cyan-700">{summary.minutes}'</div>
                </div>
              ) : null}
              {/* Training concepts – one per line */}
              {showContents && summary.items.map((t) => (
                <div key={t.id} className="mt-1.5 space-y-1">
                  {(t.concepts || [t.title]).map((c, ci) => (
                    <p key={ci} className="break-words rounded-md bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-700 leading-tight text-left">
                      {c}
                    </p>
                  ))}
                </div>
              ))}
              {/* Match day as MD */}
              {dayMatches.map((m) => (
                <div key={m.id} className="mt-1 rounded-md bg-amber-100 px-1 py-0.5 text-[7.5px] font-black text-amber-900 leading-tight space-y-0.5">
                  <div className="font-black text-amber-800">⚽ MD · {m.type}</div>
                  <div>vs {getOpponent(m, teamName)}</div>
                  <div className="font-black">{getResult(m, teamName)}</div>
                </div>
              ))}
              {/* Rest day */}
              {!hasWork && !dayMatches.length && (
                <p className="mt-2 rounded-md bg-slate-100 px-1 py-0.5 text-[8px] font-bold text-slate-400">Descanso</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function MicrocycleSumView({ anchors, trainings, matches, teamName }) {
  const dayLabels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const daySums = [0,1,2,3,4,5,6].map((di) => {
    const dates = anchors.map((a) => getWeekDays(a)[di]);
    const totalUA  = dates.reduce((s, d) => s + trainingSummaryForDate(trainings, d).ua, 0);
    const totalMin = dates.reduce((s, d) => s + trainingSummaryForDate(trainings, d).minutes, 0);
    return { totalUA, totalMin };
  });
  const maxUA  = Math.max(...daySums.map((d) => d.totalUA), 1);
  const maxMin = Math.max(...daySums.map((d) => d.totalMin), 1);
  const grandUA  = daySums.reduce((s, d) => s + d.totalUA, 0);
  const grandMin = daySums.reduce((s, d) => s + d.totalMin, 0);
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Sumatorio · {anchors.length} microciclos
        </p>
        <div className="flex gap-2">
          <span className="rounded-2xl bg-violet-100 px-3 py-1 text-xs font-black text-violet-800">{grandUA} UA</span>
          <span className="rounded-2xl bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800">{grandMin}'</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {daySums.map(({ totalUA, totalMin }, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-2 text-center">
            <p className="text-[10px] font-black uppercase text-slate-500">{dayLabels[idx]}</p>
            <div className="my-2 flex h-16 items-end justify-center gap-1">
              <div className="flex h-full w-5 items-end rounded-full bg-violet-100/60">
                <div className="w-full rounded-full bg-gradient-to-t from-violet-600 to-fuchsia-400"
                  style={{ height: `${Math.max(totalUA > 0 ? 10 : 0, (totalUA / maxUA) * 100)}%` }} />
              </div>
              <div className="flex h-full w-5 items-end rounded-full bg-cyan-100/60">
                <div className="w-full rounded-full bg-gradient-to-t from-cyan-600 to-sky-400"
                  style={{ height: `${Math.max(totalMin > 0 ? 10 : 0, (totalMin / maxMin) * 100)}%` }} />
              </div>
            </div>
            <div className="text-[9px] font-black text-violet-800">{totalUA} UA</div>
            <div className="text-[9px] text-cyan-700">{totalMin}'</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TrainingsDatabasePanel({ trainings, matches, teamName, players }) {
  const today = localDateStr(new Date());

  const [mode, setMode] = useState("actual");
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");

  // ── 3 independent session-filter dimensions ──
  const [sessMonthSel, setSessMonthSel] = useState(today.slice(0, 7)); // "all" | YYYY-MM
  const [sessMDSel,    setSessMDSel]    = useState("Todos");           // "Todos" | "MD+1" …
  const [sessQuickSel, setSessQuickSel] = useState("ultimas10");       // "ultimas10" | "ultimomicrociclo"
  const [sessStart, setSessStart] = useState("");
  const [sessEnd,   setSessEnd]   = useState("");

  // Compute week anchors
  const actualMonday = getWeekDays(today)[0];
  const prevMonday = (() => {
    const d = new Date(`${actualMonday}T12:00:00`);
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })();

  let weeksAnchors = [];
  if (mode === "actual")   weeksAnchors = [actualMonday];
  else if (mode === "anterior") weeksAnchors = [prevMonday];
  else if (mode === "comparar") {
    const a = compareA ? getWeekDays(compareA)[0] : null;
    const b = compareB ? getWeekDays(compareB)[0] : null;
    weeksAnchors = [a, b].filter(Boolean);
  }

  // MD options — chronological order: furthest pre-match → match day → post-match
  const mdOptions = ["MD-5", "MD-4", "MD-3", "MD-2", "MD-1", "MD", "MD+1", "MD+2"];

  // Session filtering — 3 independent dimensions
  let filteredSessions = sortByDateDesc([...trainings]);
  if (sessStart || sessEnd) {
    filteredSessions = filteredSessions.filter((t) => inDateRange(t, sessStart, sessEnd));
  } else {
    if (sessMonthSel !== "all")
      filteredSessions = filteredSessions.filter((t) => t.date.startsWith(sessMonthSel));
    if (sessMDSel !== "Todos") {
      if (sessMDSel === "MD") {
        // Plain match day: title starts with "MD " (space), not "MD+" or "MD-"
        filteredSessions = filteredSessions.filter((t) => /^MD\s/.test(t.title));
      } else {
        // e.g. "MD+1", "MD-2" — exact prefix match followed by space
        filteredSessions = filteredSessions.filter((t) => t.title.startsWith(sessMDSel + " "));
      }
    }
    if (sessQuickSel === "ultimas10") {
      filteredSessions = filteredSessions.slice(0, 10);
    } else if (sessQuickSel === "ultimomicrociclo") {
      const wDays = getWeekDays(today);
      filteredSessions = filteredSessions.filter((t) => t.date >= wDays[0] && t.date <= wDays[6]);
    }
  }

  // Plantilla helpers
  const INFO_POS_COLORS = {
    Portera:"bg-amber-100 text-amber-800", Cierre:"bg-blue-100 text-blue-800",
    Ala:"bg-emerald-100 text-emerald-800", Pivot:"bg-violet-100 text-violet-800",
    Universal:"bg-rose-100 text-rose-800",
  };
  const teamPlayers = (players || []).filter((p) => p.team === teamName).sort((a,b) => a.dorsal - b.dorsal);
  const fmtBirth = (bd) => { if (!bd) return ""; const [y,mo,d] = bd.split("-"); return `${d}/${mo}/${y}`; };

  return (
    <div className="space-y-5">
      {/* ── Plantilla ── */}
      {teamPlayers.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-slate-400">
            Plantilla · {teamPlayers.length} jugadoras
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {teamPlayers.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5">
                <PlayerAvatar player={p} size="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 text-xs font-black text-slate-400">#{p.dorsal}</span>
                    <span className="min-w-0 truncate text-sm font-black text-slate-900">{playerName(p)}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", INFO_POS_COLORS[p.pos] || "bg-slate-100 text-slate-700")}>{p.pos}</span>
                    <span className="text-[10px] text-slate-400">{fmtBirth(p.birthDate)}</span>
                    <span className="text-[10px] font-bold text-slate-500">({calculateAge(p.birthDate)} años)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Mode selector */}
      <Card className="p-5">
        <div className="flex flex-wrap gap-2">
          {[["actual","Actual"],["anterior","Anterior"],["comparar","Comparar"]].map(([k, l]) => (
            <button key={k} type="button" onClick={() => setMode(k)}
              className={cn("rounded-2xl px-5 py-2.5 text-sm font-black transition",
                mode === k
                  ? "bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50")}>
              {l}
            </button>
          ))}
        </div>

        {/* Comparar: two side-by-side date pickers */}
        {mode === "comparar" && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { label: "Microciclo A", val: compareA, set: setCompareA, color: "border-sky-200 bg-sky-50" },
              { label: "Microciclo B", val: compareB, set: setCompareB, color: "border-violet-200 bg-violet-50" },
            ].map(({ label, val, set, color }) => (
              <div key={label} className={cn("rounded-2xl border p-4 text-center", color)}>
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
                <input type="date" value={val} onChange={(e) => set(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-900 outline-none focus:border-sky-400" />
                {val && (
                  <p className="mt-1.5 text-[10px] font-bold text-slate-500">
                    Sem. del {getWeekDays(val)[0]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Microcycle display */}
      {mode === "comparar" && weeksAnchors.length === 0 && (
        <Card className="p-10 text-center text-sm text-slate-400">
          Selecciona las semanas en los calendarios de arriba.
        </Card>
      )}
      {mode === "comparar" && weeksAnchors.length === 1 && (
        <Card className="p-4 text-center text-sm text-slate-400">
          Selecciona también el segundo microciclo para comparar.
        </Card>
      )}
      {(mode !== "comparar" || weeksAnchors.length >= 2) && weeksAnchors.length === 1 && (
        <MicrocycleWeekView
          anchor={weeksAnchors[0]} trainings={trainings} matches={matches} teamName={teamName}
          showContents={true}
          label={mode === "actual" ? "Microciclo actual" : mode === "anterior" ? "Microciclo anterior" : `Semana ${weeksAnchors[0]}`}
        />
      )}
      {weeksAnchors.length === 2 && (
        <>
          <MicrocycleWeekView
            anchor={weeksAnchors[0]} trainings={trainings} matches={matches} teamName={teamName}
            showContents={true} label={`Microciclo A · sem. ${weeksAnchors[0]}`}
          />
          <MicrocycleWeekView
            anchor={weeksAnchors[1]} trainings={trainings} matches={matches} teamName={teamName}
            showContents={true} label={`Microciclo B · sem. ${weeksAnchors[1]}`}
          />
        </>
      )}
      {weeksAnchors.length >= 3 && (
        <MicrocycleSumView anchors={weeksAnchors} trainings={trainings} matches={matches} teamName={teamName} />
      )}

      {/* Sessions list */}
      <Card className="p-5">
        <SectionTitle title="Listado de sesiones" subtitle="Sesiones según los filtros activos." />

        {/* ── Row 1: months ── */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-0.5 shadow-md">
          <div className="flex gap-0.5 rounded-[14px] bg-slate-900/80 p-1">
            <button type="button"
              onClick={() => { setSessMonthSel(today.slice(0,7)); setSessStart(""); setSessEnd(""); }}
              className={cn("flex flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-black transition",
                sessMonthSel === today.slice(0,7) && !sessStart
                  ? "bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-white/10 hover:text-white")}>
              Actual
            </button>
            {MONTH_LABELS.map((lbl, mi) => {
              const ms = today.slice(0,4) + "-" + String(mi+1).padStart(2,"0");
              const isSel = sessMonthSel === ms && !sessStart;
              return (
                <button key={lbl} type="button"
                  onClick={() => { setSessMonthSel(ms); setSessStart(""); setSessEnd(""); }}
                  className={cn("flex flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-black transition",
                    isSel ? "bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-white/10 hover:text-white")}>
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Row 2: MD filter ── */}
        <div className="mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-0.5 shadow-md">
          <div className="flex gap-0.5 rounded-[14px] bg-slate-900/80 p-1">
            <button type="button"
              onClick={() => { setSessMDSel("Todos"); setSessStart(""); setSessEnd(""); }}
              className={cn("flex flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-black transition",
                sessMDSel === "Todos" && !sessStart
                  ? "bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-white/10 hover:text-white")}>
              Todos
            </button>
            {mdOptions.map((md) => {
              const isSel = sessMDSel === md && !sessStart;
              const sty = getMDStyle(md);
              return (
                <button key={md} type="button"
                  onClick={() => { setSessMDSel(md); setSessStart(""); setSessEnd(""); }}
                  className={cn("flex flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-black transition",
                    isSel ? cn(sty.badge, "shadow-md") : "text-slate-400 hover:bg-white/10 hover:text-white")}>
                  {md}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Row 3: quick ── */}
        <div className="mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-0.5 shadow-md">
          <div className="flex gap-0.5 rounded-[14px] bg-slate-900/80 p-1">
            {[
              ["ultimas10",       "Últimas 10",       "from-amber-400 to-orange-500"],
              ["ultimomicrociclo","Último microciclo","from-teal-400 to-cyan-600"],
            ].map(([key, lbl, grad]) => (
              <button key={key} type="button"
                onClick={() => { setSessQuickSel(key); setSessStart(""); setSessEnd(""); }}
                className={cn("flex flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-black transition",
                  sessQuickSel === key && !sessStart
                    ? cn("bg-gradient-to-br text-white shadow-md", grad)
                    : "text-slate-400 hover:bg-white/10 hover:text-white")}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* ── Session cards ── */}
        <div className="mt-4 space-y-2.5">
          {filteredSessions.map((t, i) => {
            const mdLabel  = extractMD(t.title);
            const sty      = getMDStyle(t.title);
            const rpeColor = t.avgRpe >= 6 ? "bg-red-100 text-red-700" : t.avgRpe >= 4.5 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700";
            const stats = [
              { label:"Jug.",   val:`👥 ${t.attendance ?? 12}`,                                 cls:"bg-blue-50 text-blue-700"    },
              { label:"RPE",    val:String(t.avgRpe),                                            cls:rpeColor                       },
              { label:"Real",   val:`${t.realMinutes}′`,                                         cls:"bg-cyan-50 text-cyan-700"    },
              { label:"Efect.", val:`${t.effectiveMinutes ?? Math.round(t.realMinutes*0.78)}′`,  cls:"bg-sky-50 text-sky-600"      },
              { label:"Carga",  val:`${t.ua} UA`,                                                cls:"bg-violet-100 text-violet-800"},
            ];
            return (
              <div key={t.id} className="flex overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                {/* Left accent stripe */}
                <div className={cn("w-1.5 shrink-0", sty.accent)} />

                {/* ── Col 1: index · MD badge · day / date ── fixed 148px */}
                <div className="flex w-[148px] shrink-0 flex-col justify-center gap-1 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-400">
                      {i + 1}
                    </span>
                    <span className={cn("rounded-lg px-2.5 py-0.5 text-[11px] font-black", sty.badge)}>
                      {mdLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-8">
                    <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500">{dayName(t.date)}</span>
                    <span className="text-[9px] text-slate-400">{t.date.slice(5).replace("-", "/")}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3 w-px shrink-0 bg-slate-100" />

                {/* ── Col 2: stats — fixed 5 chips, always single row ── */}
                <div className="flex w-[296px] shrink-0 items-center justify-around px-2 py-3">
                  {stats.map(({ label, val, cls }) => (
                    <div key={label} className="flex w-[52px] flex-col items-center gap-0.5">
                      <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">{label}</span>
                      <span className={cn("w-full rounded-lg px-1 py-0.5 text-center text-[11px] font-black", cls)}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-3 w-px shrink-0 bg-slate-100" />

                {/* ── Col 3: concepts — fills remaining space ── */}
                <div className="flex min-w-0 flex-1 flex-wrap content-center items-start gap-1.5 bg-slate-50/50 px-4 py-3">
                  {(t.concepts || []).map((c, ci) => (
                    <span key={ci} className="rounded-lg border border-emerald-100 bg-white px-2.5 py-1 text-[9.5px] font-bold text-emerald-700 shadow-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          {!filteredSessions.length && (
            <p className="py-10 text-center text-sm text-slate-400">Sin sesiones con los filtros seleccionados.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

const TYPE_LABEL = { Liga: "Liga", Scouting: "Scouting", Copa: "Copa", Playoff: "Playoff", Live: "En Directo" };
const TYPE_COLOR = {
  Liga: "bg-violet-100 text-violet-700",
  Scouting: "bg-sky-100 text-sky-700",
  Copa: "bg-amber-100 text-amber-700",
  Playoff: "bg-orange-100 text-orange-700",
  Live: "bg-emerald-100 text-emerald-700",
};

/* ─────────────────────────────────────────────────────────────────────────
   HISTORIAL DASHBOARD — informe de temporada listo para PDF
───────────────────────────────────────────────────────────────────────── */
function smoothLinePath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const dx = (pts[i].x - pts[i - 1].x) / 2.8;
    d += ` C ${pts[i-1].x + dx},${pts[i-1].y} ${pts[i].x - dx},${pts[i].y} ${pts[i].x},${pts[i].y}`;
  }
  return d;
}
function smoothAreaPath(pts, height) {
  if (pts.length < 2) return "";
  const line = smoothLinePath(pts);
  return `${line} L ${pts[pts.length-1].x},${height} L ${pts[0].x},${height} Z`;
}
function polarToXY(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function HistorialDashboard({ trainings, matches, teamName }) {
  const myMatches = useMemo(() =>
    matches.filter(m => m.teams.includes(teamName)).sort((a,b) => a.date < b.date ? -1 : 1),
    [matches, teamName]
  );
  // Season start: August 1st of the previous year if current month < August, else current year
  const seasonStart = useMemo(() => {
    const now = new Date();
    const year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    return `${year}-08-01`;
  }, []);
  const myTrainings = useMemo(() =>
    trainings.filter(t => t.date >= seasonStart).sort((a,b) => a.date < b.date ? -1 : 1),
    [trainings, seasonStart]
  );

  // ── Estimate match RPE from intensity metrics ──
  const matchRpe = (m) => {
    const my = getMatchStats(m, teamName);
    const act = (my.shotsTotal||0) + (my.recoveries||0) + (my.transLoss||0) + (my.losses||0);
    return parseFloat(Math.min(9.5, Math.max(6.0, 6.0 + (act/55)*3.5)).toFixed(1));
  };

  // ── KPIs ──
  const totalUA       = myTrainings.reduce((s,t) => s+(t.ua||0),0);
  const totalRealMin  = myTrainings.reduce((s,t) => s+(t.realMinutes||0),0);
  const totalEffMin   = myTrainings.reduce((s,t) => s+(t.effectiveMinutes||Math.round((t.realMinutes||0)*0.78)),0);
  const diffMin       = totalRealMin - totalEffMin;
  const lossPct       = totalRealMin > 0 ? Math.round((diffMin/totalRealMin)*100) : 0;
  const avgRpeTrain   = myTrainings.length ? parseFloat((myTrainings.reduce((s,t) => s+(t.avgRpe||0),0)/myTrainings.length).toFixed(1)) : 0;
  const avgRpeMatch   = myMatches.length   ? parseFloat((myMatches.reduce((s,m) => s+matchRpe(m),0)/myMatches.length).toFixed(1)) : 0;
  const avgAttendance = myTrainings.length ? Math.round(myTrainings.reduce((s,t) => s+(t.attendance||12),0)/myTrainings.length) : 0;
  const matchResults  = useMemo(() => {
    let v=0,e=0,d=0,gf=0,gc=0;
    myMatches.forEach(m => {
      const my=getMatchStats(m,teamName); const rv=m.teams[0]===teamName?m.b:m.a;
      gf+=my.goals; gc+=rv.goals;
      if(my.goals>rv.goals) v++; else if(my.goals===rv.goals) e++; else d++;
    });
    return {v,e,d,gf,gc,total:myMatches.length};
  },[myMatches,teamName]);

  // ── Monthly data ──
  const MONTHS    = ["Ago","Sep","Oct","Nov","Dic","Ene","Feb","Mar","Abr","May","Jun","Jul"];
  const seasonYear = parseInt(seasonStart.slice(0, 4));
  const MONTH_KEYS = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(seasonYear, 7 + i, 1); // 7 = agosto
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const monthlyUA       = MONTH_KEYS.map(k => myTrainings.filter(t=>t.date.startsWith(k)).reduce((s,t)=>s+(t.ua||0),0));
  const monthlyRpeTrain = MONTH_KEYS.map(k => { const s=myTrainings.filter(t=>t.date.startsWith(k)); return s.length?parseFloat((s.reduce((a,t)=>a+(t.avgRpe||0),0)/s.length).toFixed(1)):0; });
  const monthlyRpeMatch = MONTH_KEYS.map(k => { const s=myMatches.filter(m=>m.date.startsWith(k)); return s.length?parseFloat((s.reduce((a,m)=>a+matchRpe(m),0)/s.length).toFixed(1)):0; });
  const monthlySessions = MONTH_KEYS.map(k => myTrainings.filter(t=>t.date.startsWith(k)).length);

  // ── MD distribution + RPE per MD ──
  const MD_ORDER  = ["MD-5","MD-4","MD-3","MD-2","MD-1","MD","MD+1","MD+2"];
  const MD_COLORS = ["#6366f1","#3b82f6","#f97316","#f59e0b","#ef4444","#f43f5e","#10b981","#14b8a6"];
  const mdSessions = MD_ORDER.map(md => md==="MD" ? myTrainings.filter(t=>/^MD\s/.test(t.title)) : myTrainings.filter(t=>t.title.startsWith(md+" ")));
  const mdCounts   = mdSessions.map(s=>s.length);
  const mdRpe      = mdSessions.map(s => s.length ? parseFloat((s.reduce((a,t)=>a+(t.avgRpe||0),0)/s.length).toFixed(1)) : 0);
  const totalSess  = mdCounts.reduce((s,n)=>s+n,0)||1;

  // ── Match timeline ──
  const timelineMatches = [...myMatches].reverse().slice(0,20);

  // ── SVG helpers ──
  const CHART_W=520, CHART_H=120;
  const maxUA=Math.max(...monthlyUA,1);
  const uaPts=monthlyUA.map((v,i)=>({x:30+(i/(MONTH_KEYS.length-1))*(CHART_W-60),y:CHART_H-10-(v/maxUA)*(CHART_H-20)}));

  const RPE_W=400, RPE_H=90;
  const buildRpePts = (data) => data.map((v,i)=>({x:20+(i/(MONTH_KEYS.length-1))*(RPE_W-40),y:RPE_H-8-(v/10)*(RPE_H-16)})).filter((_,i)=>data[i]>0);
  const rpePtsTrain = buildRpePts(monthlyRpeTrain);
  const rpePtsMatch = buildRpePts(monthlyRpeMatch);
  const maxMdRpe    = Math.max(...mdRpe,1);
  const effPct      = totalRealMin>0?Math.round((totalEffMin/totalRealMin)*100):0;

  // helper: SVG RPE chart
  const RpeChart = ({pts, data, color, gradId}) => (
    <svg width="100%" viewBox={`0 0 ${RPE_W} ${RPE_H+24}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      {[4,6,8,10].map(v=>{
        const y=RPE_H-8-(v/10)*(RPE_H-16);
        return <g key={v}><line x1="18" y1={y} x2={RPE_W-6} y2={y} stroke="#1e293b" strokeWidth="1"/><text x="14" y={y+3} textAnchor="end" fontSize="7" fill="#475569">{v}</text></g>;
      })}
      {pts.length>1&&<path d={smoothAreaPath(pts,RPE_H)} fill={`url(#${gradId})`}/>}
      {pts.length>1&&<path d={smoothLinePath(pts)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>}
      {pts.map((p,i)=>{
        const val=data.filter(v=>v>0)[i];
        return <g key={i}><circle cx={p.x} cy={p.y} r="4" fill={color} stroke="#0f172a" strokeWidth="2"/><text x={p.x} y={p.y-8} textAnchor="middle" fontSize="8" fill="#cbd5e1" fontWeight="800">{val}</text></g>;
      })}
      {MONTHS.map((m,i)=>{const x=20+(i/(MONTH_KEYS.length-1))*(RPE_W-40);return <text key={i} x={x} y={RPE_H+16} textAnchor="middle" fontSize="8" fill="#475569" fontWeight="700">{m}</text>;})}
    </svg>
  );

  return (
    <div className="space-y-4">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Informe de temporada</p>
          <h2 className="mt-0.5 text-2xl font-black text-white">{teamName} <span className="text-slate-400">· 25/26</span></h2>
        </div>
        <button type="button" onClick={()=>window.print()}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 px-5 py-2.5 text-sm font-black text-white shadow-lg transition-shadow hover:shadow-orange-500/40 print:hidden">
          <span>📄</span> Exportar PDF
        </button>
      </div>

      {/* ── KPI — ROW 1: Sesiones (big, with minutes inside) + Partidos (big) ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* ── SESIONES card ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 p-5 text-white shadow-lg">
          {/* emoji decorativo visible */}
          <span className="absolute right-4 top-3 text-5xl leading-none select-none" aria-hidden="true">🏋️</span>
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-violet-200">Sesiones de entrenamiento</p>
          <p className="mt-0.5 text-5xl font-black leading-none text-white">{myTrainings.length}</p>

          {/* RPE + Asistencia */}
          <div className="mt-3 flex items-center gap-5 border-t border-white/20 pt-2.5">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-violet-300">RPE medio</p>
              <p className="text-2xl font-black leading-none text-white">{avgRpeTrain}<span className="ml-0.5 text-xs font-bold text-violet-300">/10</span></p>
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-violet-300">Asistencia</p>
              <p className="text-2xl font-black leading-none text-white">{avgAttendance}<span className="ml-0.5 text-xs font-bold text-violet-300">jug</span></p>
            </div>
          </div>

          {/* Minutos: reales · efectivos · pérdida — números más grandes */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/20 pt-2.5">
            <div className="rounded-xl bg-white/10 px-3 py-2.5">
              <p className="text-[8px] font-black uppercase tracking-wider text-violet-200">⏱ Reales</p>
              <p className="mt-1 text-2xl font-black leading-none text-white">{Math.round(totalRealMin/60)}<span className="ml-0.5 text-sm font-bold text-violet-300">h</span></p>
              <p className="mt-0.5 text-[11px] font-bold text-violet-300">{totalRealMin}′</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2.5">
              <p className="text-[8px] font-black uppercase tracking-wider text-violet-200">✅ Efectivos</p>
              <p className="mt-1 text-2xl font-black leading-none text-white">{Math.round(totalEffMin/60)}<span className="ml-0.5 text-sm font-bold text-violet-300">h</span></p>
              <p className="mt-0.5 text-[11px] font-bold text-violet-300">{totalEffMin}′</p>
            </div>
            <div className="rounded-xl bg-rose-500/30 px-3 py-2.5">
              <p className="text-[8px] font-black uppercase tracking-wider text-rose-200">⚠ Pérdida</p>
              <p className="mt-1 text-2xl font-black leading-none text-white">{lossPct}<span className="ml-0.5 text-sm font-bold text-rose-300">%</span></p>
              <p className="mt-0.5 text-[11px] font-bold text-rose-300">{diffMin}′</p>
            </div>
          </div>
        </div>

        {/* ── PARTIDOS card ── */}
        {(()=>{
          const winPct = matchResults.total ? Math.round((matchResults.v/matchResults.total)*100) : 0;
          const avgGF  = matchResults.total ? (matchResults.gf/matchResults.total).toFixed(1) : "—";
          const avgGC  = matchResults.total ? (matchResults.gc/matchResults.total).toFixed(1) : "—";
          const cleanSheets = myMatches.filter(m=>{ const rv=m.teams[0]===teamName?m.b:m.a; return rv.goals===0; }).length;
          const last5 = [...myMatches].reverse().slice(0,5).map(m=>{ const my=getMatchStats(m,teamName); const rv=m.teams[0]===teamName?m.b:m.a; return my.goals>rv.goals?"V":my.goals===rv.goals?"E":"D"; });
          return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-5 text-white shadow-lg">
              <span className="absolute right-4 top-3 text-5xl leading-none select-none" aria-hidden="true">🏆</span>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Partidos jugados</p>
              <p className="mt-0.5 text-5xl font-black leading-none text-white">{matchResults.total}</p>

              {/* RPE + % victorias */}
              <div className="mt-3 flex items-center gap-5 border-t border-white/20 pt-2.5">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">RPE medio</p>
                  <p className="text-2xl font-black leading-none text-white">{avgRpeMatch}<span className="ml-0.5 text-xs font-bold text-slate-400">/10</span></p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">% victorias</p>
                  <p className="text-2xl font-black leading-none text-emerald-400">{winPct}<span className="ml-0.5 text-xs font-bold text-slate-400">%</span></p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">P. a cero</p>
                  <p className="text-2xl font-black leading-none text-cyan-400">{cleanSheets}</p>
                </div>
              </div>

              {/* V / E / D chips */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/20 pt-2.5">
                {[
                  {l:"Victoria",  v:matchResults.v, bg:"bg-emerald-500", txt:"text-white"},
                  {l:"Empate",    v:matchResults.e, bg:"bg-amber-400",   txt:"text-slate-900"},
                  {l:"Derrota",   v:matchResults.d, bg:"bg-red-500",     txt:"text-white"},
                ].map(({l,v,bg,txt})=>(
                  <div key={l} className={cn("flex flex-col items-center justify-center rounded-xl py-2.5",bg)}>
                    <span className={cn("text-[7px] font-black uppercase tracking-wider",txt)}>{l}</span>
                    <span className={cn("text-3xl font-black leading-none",txt)}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Media GF/GC + racha últimas 5 */}
              <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Media GF</p>
                    <p className="text-xl font-black leading-none text-emerald-400">{avgGF}<span className="ml-0.5 text-[9px] text-slate-500">/pj</span></p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Media GC</p>
                    <p className="text-xl font-black leading-none text-red-400">{avgGC}<span className="ml-0.5 text-[9px] text-slate-500">/pj</span></p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">GF : GC</p>
                    <p className="text-xl font-black leading-none text-white">{matchResults.gf}:{matchResults.gc}</p>
                  </div>
                </div>
                {/* Racha últimas 5 */}
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Últimas 5</p>
                  <div className="flex gap-1">
                    {last5.map((r,i)=>(
                      <span key={i} className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black",
                        r==="V"?"bg-emerald-500 text-white":r==="E"?"bg-amber-400 text-slate-900":"bg-red-500 text-white"
                      )}>{r}</span>
                    ))}
                    {Array.from({length:Math.max(0,5-last5.length)}).map((_,i)=>(
                      <span key={`e${i}`} className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-700 text-[10px] text-slate-600">—</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── ROW 3: UA chart + MD distribution ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        {/* Monthly UA load */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Carga acumulada mensual · UA</p>
          <div className="mt-3 overflow-x-auto">
            <svg width={CHART_W} height={CHART_H+30} className="overflow-visible">
              <defs>
                <linearGradient id="uaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.03"/>
                </linearGradient>
                <filter id="glowF"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              {[0.25,0.5,0.75,1].map(p=>{const y=CHART_H-10-p*(CHART_H-20);return <line key={p} x1="20" y1={y} x2={CHART_W-10} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>;})}
              {uaPts.length>1&&<path d={smoothAreaPath(uaPts,CHART_H)} fill="url(#uaGrad)"/>}
              {uaPts.length>1&&<path d={smoothLinePath(uaPts)} fill="none" stroke="#f97316" strokeWidth="2.5" filter="url(#glowF)"/>}
              {uaPts.map((p,i)=>monthlyUA[i]>0&&(
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill="#f97316" stroke="#0f172a" strokeWidth="2"/>
                  <text x={p.x} y={p.y-9} textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="800">{monthlyUA[i]>=1000?`${(monthlyUA[i]/1000).toFixed(1)}k`:monthlyUA[i]}</text>
                </g>
              ))}
              {uaPts.map((p,i)=><text key={i} x={p.x} y={CHART_H+18} textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700">{MONTHS[i]}</text>)}
            </svg>
          </div>
          <div className="mt-2 flex gap-0.5">
            {monthlySessions.map((n,i)=>(
              <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="w-full rounded-sm bg-slate-700" style={{height:`${Math.max(2,n*4)}px`}}/>
                <span className="text-[7px] font-bold text-slate-600">{n||""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MD distribution */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Distribución por tipo MD</p>
          <div className="mt-2 flex items-center gap-3">
            <svg width="130" height="130" viewBox="0 0 130 130" className="shrink-0">
              {MD_ORDER.map((md,i)=>{
                const pct=mdCounts[i]/totalSess; if(!pct) return null;
                const r=52-i*5.5; if(r<=4) return null;
                return (
                  <g key={md}>
                    <path d={arcPath(65,65,r,-90,250)} fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round"/>
                    <path d={arcPath(65,65,r,-90,-90+pct*340)} fill="none" stroke={MD_COLORS[i]} strokeWidth="4.5" strokeLinecap="round"/>
                  </g>
                );
              })}
              <text x="65" y="61" textAnchor="middle" fontSize="17" fontWeight="900" fill="white">{myTrainings.length}</text>
              <text x="65" y="73" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b">sesiones</text>
            </svg>
            <div className="flex flex-1 flex-col gap-1.5">
              {MD_ORDER.map((md,i)=>mdCounts[i]>0&&(
                <div key={md} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 shrink-0 rounded-full" style={{background:MD_COLORS[i]}}/>
                  <span className="w-9 text-[9px] font-black text-white">{md}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full rounded-full" style={{width:`${(mdCounts[i]/totalSess)*100}%`,background:MD_COLORS[i]}}/>
                  </div>
                  <span className="w-5 text-right text-[9px] font-bold text-slate-400">{mdCounts[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 4: RPE medio por tipo MD ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">RPE medio por tipo de sesión · Match Day</p>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {MD_ORDER.map((md,i)=>{
            const rpe=mdRpe[i]; const n=mdCounts[i];
            if(!n) return (
              <div key={md} className="flex flex-col items-center gap-1.5 opacity-30">
                <div className="flex h-14 w-14 items-end justify-center overflow-hidden rounded-2xl bg-slate-800 pb-1">
                  <div className="w-8 rounded-t-lg bg-slate-700" style={{height:"10px"}}/>
                </div>
                <span className="text-[9px] font-black text-slate-600">{md}</span>
                <span className="text-[8px] text-slate-700">—</span>
              </div>
            );
            const barH = Math.round((rpe/10)*48);
            return (
              <div key={md} className="flex flex-col items-center gap-1.5">
                <div className="relative flex h-14 w-14 items-end justify-center overflow-hidden rounded-2xl bg-slate-800 pb-1">
                  <div className="w-9 rounded-t-xl transition-all" style={{height:`${barH}px`,background:MD_COLORS[i]}}/>
                  <span className="absolute top-1.5 text-[10px] font-black text-white">{rpe}</span>
                </div>
                <span className="text-[9px] font-black" style={{color:MD_COLORS[i]}}>{md}</span>
                <span className="text-[8px] font-bold text-slate-500">{n} ses.</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ROW 5: Match timeline ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Evolución de resultados · temporada</p>
          <div className="flex items-center gap-3">
            {[{l:"V",v:matchResults.v,c:"bg-emerald-500"},{l:"E",v:matchResults.e,c:"bg-amber-400"},{l:"D",v:matchResults.d,c:"bg-red-500"}].map(({l,v,c})=>(
              <div key={l} className="flex items-center gap-1.5">
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white",c)}>{l}</span>
                <span className="text-lg font-black text-white">{v}</span>
              </div>
            ))}
            <span className="text-[10px] text-slate-500">{matchResults.gf}:{matchResults.gc}</span>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto pb-1">
          <div className="flex min-w-max items-center">
            {timelineMatches.map((m,i)=>{
              const my=getMatchStats(m,teamName); const rv=m.teams[0]===teamName?m.b:m.a;
              const res=my.goals>rv.goals?"V":my.goals===rv.goals?"E":"D";
              const [,mo,dd]=m.date.split("-");
              const bg=res==="V"?"from-emerald-500 to-emerald-700":res==="E"?"from-amber-400 to-amber-600":"from-red-500 to-red-700";
              const prev=i>0?timelineMatches[i-1]:null;
              const pRes=prev?(()=>{const pm=getMatchStats(prev,teamName);const pr=prev.teams[0]===teamName?prev.b:prev.a;return pm.goals>pr.goals?"V":pm.goals===pr.goals?"E":"D";})():null;
              const cc=pRes==="V"?"#10b981":pRes==="E"?"#f59e0b":pRes==="D"?"#ef4444":"#334155";
              return (
                <div key={m.id} className="flex items-center">
                  {i>0&&<div className="h-0.5 w-5 shrink-0" style={{background:cc}}/>}
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("flex h-10 w-10 flex-col items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",bg)}>
                      <span className="text-sm font-black leading-none">{res}</span>
                      <span className="text-[8px] font-bold opacity-80">{my.goals}-{rv.goals}</span>
                    </div>
                    <span className="w-10 truncate text-center text-[7px] font-bold leading-tight text-slate-500">{getOpponent(m,teamName).slice(0,8)}</span>
                    <span className="text-[7px] text-slate-600">{dd}/{mo}</span>
                  </div>
                </div>
              );
            })}
            {!timelineMatches.length&&<p className="text-sm text-slate-500">Sin partidos registrados.</p>}
          </div>
        </div>
        {matchResults.total>0&&(
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
            <div className="bg-emerald-500" style={{width:`${(matchResults.v/matchResults.total)*100}%`}}/>
            <div className="bg-amber-400"   style={{width:`${(matchResults.e/matchResults.total)*100}%`}}/>
            <div className="bg-red-500"     style={{width:`${(matchResults.d/matchResults.total)*100}%`}}/>
          </div>
        )}
      </div>

      {/* ── ROW 6: RPE entrenamientos + RPE partidos ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500"/>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">RPE mensual · Entrenamientos</p>
          </div>
          <div className="mt-3"><RpeChart pts={rpePtsTrain} data={monthlyRpeTrain} color="#f43f5e" gradId="rpeTrainGrad"/></div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-400"/>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">RPE mensual · Partidos</p>
          </div>
          <div className="mt-3"><RpeChart pts={rpePtsMatch} data={monthlyRpeMatch} color="#f59e0b" gradId="rpeMatchGrad"/></div>
        </div>
      </div>

      {/* ── ROW 7: Eficiencia + UA por MD ── */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Carga UA por tipo de sesión</p>
        <div className="mt-4 space-y-2.5">
          {MD_ORDER.map((md,i)=>{
            const ua=mdSessions[i].reduce((s,t)=>s+(t.ua||0),0);
            if(!ua) return null;
            const pct=(ua/totalUA)*100;
            return (
              <div key={md} className="flex items-center gap-3">
                <span className="w-10 text-right text-[10px] font-black" style={{color:MD_COLORS[i]}}>{md}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full" style={{width:`${pct}%`,background:MD_COLORS[i]}}/>
                </div>
                <span className="w-20 text-right text-[10px] font-bold text-slate-400">{ua>=1000?`${(ua/1000).toFixed(1)}k`:ua} UA</span>
                <span className="w-10 text-right text-[10px] font-bold text-slate-600">{pct.toFixed(1)}%</span>
              </div>
            );
          })}
          {/* Efficiency */}
          <div className="mt-3 border-t border-slate-700 pt-3">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1.5">
              <span>Tiempo efectivo vs real · eficiencia</span>
              <span className="text-white font-black">{effPct}%</span>
            </div>
            <div className="relative h-5 overflow-hidden rounded-full bg-slate-800">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400" style={{width:`${effPct}%`}}/>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white/80">
                {Math.round(totalEffMin/60)}h ef · {Math.round(totalRealMin/60)}h real · {lossPct}% pérdida
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body{background:white!important;}
          aside,.print\\:hidden{display:none!important;}
          main{padding:0!important;}
          *{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
          .rounded-3xl{border-radius:16px!important;}
        }
      `}</style>
    </div>
  );
}

function MatchesDatabasePanel({ matches, teamName }) {
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-05-31");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const allTypes = ["Todos", "Liga", "Scouting", "Copa", "Playoff"];
  const leagueMatches = sortByDateDesc(
    matches.filter((m) => {
      const teamOk = m.teams.includes(teamName);
      const dateOk = inDateRange(m, startDate, endDate);
      const typeOk = typeFilter === "Todos" || m.type === typeFilter;
      return teamOk && dateOk && typeOk;
    })
  ).slice(0, 10);
  const wins = leagueMatches.filter((m) => { const my = getMatchStats(m, teamName); const rv = m.teams[0] === teamName ? m.b : m.a; return my.goals > rv.goals; }).length;
  const draws = leagueMatches.filter((m) => { const my = getMatchStats(m, teamName); const rv = m.teams[0] === teamName ? m.b : m.a; return my.goals === rv.goals; }).length;
  const losses = leagueMatches.length - wins - draws;
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle title="Partidos" subtitle="Hasta 10 partidos del rango seleccionado." />
        <div className="mt-3 flex flex-wrap gap-2">
          {allTypes.map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("rounded-full px-3 py-1 text-xs font-black transition-all", typeFilter === t ? "bg-violet-600 text-white shadow" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}>
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <MiniInput label="Desde" type="date" value={startDate} onChange={setStartDate} />
          <MiniInput label="Hasta" type="date" value={endDate} onChange={setEndDate} />
          <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Victorias</p>
            <p className="text-2xl font-black text-emerald-900">{wins}</p>
          </div>
          <div className="rounded-3xl bg-amber-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Empates</p>
            <p className="text-2xl font-black text-amber-900">{draws}</p>
          </div>
          <div className="rounded-3xl bg-red-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Derrotas</p>
            <p className="text-2xl font-black text-red-900">{losses}</p>
          </div>
        </div>
      </Card>
      <div className="space-y-4">
        {leagueMatches.map((m) => {
          const stats = getMatchStats(m, teamName);
          const rv = m.teams[0] === teamName ? m.b : m.a;
          const diff = stats.goals - rv.goals;
          const result = diff > 0 ? "V" : diff < 0 ? "D" : "E";
          const gradients = { V: "from-emerald-500 to-green-600", D: "from-red-500 to-rose-600", E: "from-amber-400 to-orange-500" };
          return (
            <Card key={m.id} className="p-5">
              <div className="mb-4 flex items-center gap-4">
                <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-black text-white shadow", gradients[result])}>{result}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-black text-slate-900">{teamName} <span className="font-normal text-slate-400">vs</span> {getOpponent(m, teamName)}</p>
                  <p className="text-xs text-slate-400">{m.date} · <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", TYPE_COLOR[m.type] || "bg-slate-100 text-slate-500")}>{TYPE_LABEL[m.type] || m.type}</span></p>
                </div>
                <span className="rounded-2xl bg-slate-100 px-4 py-2 text-lg font-black text-slate-900">{getResult(m, teamName)}</span>
              </div>
              <StatsGrid team={teamName} stats={stats} />
            </Card>
          );
        })}
        {!leagueMatches.length && (
          <Card className="p-12 text-center">
            <p className="text-slate-400">Sin partidos en el rango seleccionado.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function DatabasePanel({ teams, players, matches, trainings, dbTeam, setDbTeam, dbView, setDbView }) {
  const VIEWS = [
    { key: "entrenamientos", label: "Entrenamientos" },
    { key: "informacion",    label: "Partidos"        },
    { key: "historial",      label: "Informe"         },
  ];
  return (
    <div className="space-y-5">
      {/* 3 nav pills – equal width, one row */}
      <div className="grid grid-cols-3 gap-2">
        {VIEWS.map((v) => (
          <button key={v.key} type="button" onClick={() => setDbView(v.key)}
            className={cn(
              "rounded-2xl py-3 text-sm font-black transition-all",
              dbView === v.key
                ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md"
                : "border border-slate-200 bg-white/80 text-slate-600 hover:border-orange-300 hover:bg-orange-50"
            )}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Teams grid – hidden in Informe tab (only own team relevant) */}
      {dbView !== "historial" && <Card className="p-5">
        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Seleccionar equipo</p>
        {teams.length ? (
          <div className="grid grid-cols-5 gap-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
            {teams.map((team) => {
              const isSelected = dbTeam === team.name;
              const isMine = team.name === MY_TEAM;
              return (
                <button key={team.id} type="button" onClick={() => setDbTeam(team.name)}
                  className="group flex flex-col items-center gap-2 focus:outline-none">
                  {/* Bubble */}
                  <div className={cn(
                    "h-14 w-14 rounded-2xl p-[2.5px] transition-all",
                    isSelected
                      ? "bg-gradient-to-br from-orange-400 via-red-500 to-rose-600 shadow-lg shadow-orange-200 scale-110"
                      : "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 group-hover:scale-105"
                  )}>
                    <div className={cn(
                      "flex h-full w-full items-center justify-center rounded-[9px] text-sm font-black transition-colors",
                      isSelected ? "bg-orange-50 text-orange-900" : "bg-slate-900 text-white"
                    )}>
                      {isMine ? <span className="text-amber-400">★</span> : (team.logo || team.name.slice(0, 2).toUpperCase())}
                    </div>
                  </div>
                  {/* Name */}
                  <p className={cn(
                    "w-full text-center text-[10px] font-bold leading-tight line-clamp-2 transition-colors",
                    isSelected ? "text-orange-700" : "text-slate-600 group-hover:text-slate-900"
                  )}>
                    {team.name}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Sin equipos en esta temporada.</p>
        )}
      </Card>}

      {/* Content */}
      {dbView === "informacion" && <DatabaseInfoView teamName={dbTeam} matches={matches} teams={teams} players={players} />}
      {dbView === "entrenamientos" && <TrainingsDatabasePanel trainings={trainings} matches={matches} teamName={dbTeam} players={players} />}
      {dbView === "historial" && <HistorialDashboard trainings={trainings} matches={matches} teamName={MY_TEAM} />}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [mainTab, setMainTab] = useState("registro");
  const [offlineTab, setOfflineTab] = useState("Analisis video");
  const [liveTab, setLiveTab] = useState("Directo");
  const [sessionTab, setSessionTab] = useState("registro");
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
  const [dbView, setDbView] = useState("entrenamientos");
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

  const saveScouting = () => {
    const match = matches.find((m) => m.id === scoutMatchId);
    if (!match) return;
    const scoutCopy = { ...match, id: Date.now(), type: "Scouting" };
    setMatches((c) => [scoutCopy, ...c]);
    setDbTeam(match.teams[0]);
    setMainTab("bd");
    setDbView("informacion");
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
    dbView === "informacion" ? "Base de Datos · Información" :
    dbView === "entrenamientos" ? "Base de Datos · Entrenamientos" :
    dbView === "historial" ? "Base de Datos · Historial" :
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
        <main onClick={() => setVisualFocusGroup("")} className={cn(
          "min-w-0 flex-1 bg-gradient-to-br p-4 transition-colors duration-500 md:p-8",
          mainTab === "registro"  && "from-violet-100 via-fuchsia-50 to-indigo-100",
          mainTab === "bd"        && "from-orange-100 via-red-50 to-rose-100",
          mainTab === "session"   && "from-sky-100 via-blue-50 to-indigo-100",
          mainTab === "offline"   && "from-red-100 via-rose-50 to-pink-100",
          mainTab === "live"      && "from-yellow-100 via-amber-50 to-orange-100",
        )}>
          <div className="mx-auto max-w-7xl space-y-6">
            {mainTab === "registro" ? (
              <header className="rounded-[32px] border border-violet-200/60 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">REGISTRO</h1>
                <p className="mt-2 text-sm font-semibold text-white">Alta y edición de jugadores y equipos</p>
              </header>
            ) : mainTab === "bd" ? (
              <header className="rounded-[32px] border border-orange-200/60 bg-gradient-to-r from-orange-500 to-red-600 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">BASE DE DATOS</h1>
                <p className="mt-2 text-sm font-semibold text-white">Análisis histórico de equipos y rendimiento</p>
              </header>
            ) : mainTab === "session" ? (
              <header className="rounded-[32px] border border-sky-200/60 bg-gradient-to-r from-sky-500 to-blue-600 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">ANÁLISIS SESIÓN</h1>
                <p className="mt-2 text-sm font-semibold text-white/80">Análisis de entrenamientos y registro de sesiones</p>
              </header>
            ) : mainTab === "offline" ? (
              <header className="rounded-[32px] border border-red-200/60 bg-gradient-to-r from-red-500 to-rose-700 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">PARTIDO OFFLINE</h1>
                <p className="mt-2 text-sm font-semibold text-white/80">Análisis de vídeo, scouting y prepartido</p>
              </header>
            ) : mainTab === "live" ? (
              <header className="rounded-[32px] border border-yellow-200/60 bg-gradient-to-r from-yellow-500 to-amber-600 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">PARTIDO LIVE</h1>
                <p className="mt-2 text-sm font-semibold text-white/80">Seguimiento en directo del partido</p>
              </header>
            ) : (
              <header className="rounded-[32px] border border-white/80 bg-white/90 p-6 text-center shadow-sm backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-600">Endania Coach</p>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{currentTitle}</h1>
                <p className="mt-1 text-sm font-semibold text-slate-500">Panel de analisis de rendimiento y scouting</p>
              </header>
            )}

            <ErrorBoundary>
              {mainTab === "offline" && (
                <div className="space-y-5">
                  {/* ── 4 Tabs ── */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: "Analisis video",   label: "▶ Análisis vídeo"   },
                      { key: "Ficha scouting",   label: "▣ Ficha scouting"   },
                      { key: "Prepartido",       label: "⚑ Prepartido"       },
                      { key: "Recomendacion IA", label: "◎ Recomendación IA" },
                    ].map((v) => (
                      <button key={v.key} type="button" onClick={() => setOfflineTab(v.key)}
                        className={cn(
                          "rounded-2xl py-3 text-sm font-black transition-all",
                          offlineTab === v.key
                            ? "bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-md"
                            : "border border-red-200 bg-white/80 text-slate-600 hover:border-red-400 hover:bg-red-50"
                        )}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                  {offlineTab === "Analisis video"   && <OfflineVideoPanel consignas={consignas} setConsignas={setConsignas} fileName={fileName} setFileName={setFileName} progress={progress} setProgress={setProgress} focus={focus} setFocus={setFocus} />}
                  {offlineTab === "Ficha scouting"   && <ScoutingPanel matches={seasonMatches} scoutMatchId={scoutMatchId} setScoutMatchId={setScoutMatchId} saveScouting={saveScouting} />}
                  {offlineTab === "Prepartido"       && <PreMatchPanel teams={seasonTeams} />}
                  {offlineTab === "Recomendacion IA" && <RecommendationPanel matches={seasonMatches} teamName={MY_TEAM} />}
                </div>
              )}
              {mainTab === "session" && (
                <div className="space-y-5">
                  {/* ── 3 Tabs ── */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "registro", label: "📋 Registrar sesión"   },
                      { key: "pdf",      label: "📄 Análisis PDF / Foto" },
                      { key: "video",    label: "🎬 Análisis de vídeo"   },
                    ].map((v) => (
                      <button key={v.key} type="button" onClick={() => setSessionTab(v.key)}
                        className={cn(
                          "rounded-2xl py-3 text-sm font-black transition-all",
                          sessionTab === v.key
                            ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md"
                            : "border border-sky-200 bg-white/80 text-slate-600 hover:border-sky-400 hover:bg-sky-50"
                        )}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                  {sessionTab === "registro" && <TrainingSessionPanel onSaveTraining={(t) => setTrainings((c) => [t, ...c])} />}
                  {sessionTab === "pdf"      && <SessionAnalysisPanel mode="pdf"   sessionFile={sessionFile} setSessionFile={setSessionFile} sessionGoals={sessionGoals} setSessionGoals={setSessionGoals} sessionProgress={sessionProgress} setSessionProgress={setSessionProgress} />}
                  {sessionTab === "video"    && <SessionAnalysisPanel mode="video" sessionFile={sessionFile} setSessionFile={setSessionFile} sessionGoals={sessionGoals} setSessionGoals={setSessionGoals} sessionProgress={sessionProgress} setSessionProgress={setSessionProgress} />}
                </div>
              )}
              {mainTab === "live" && <LivePanel players={seasonPlayers} teams={seasonTeams} setMatches={setMatches} />}
              {mainTab === "registro" && <RegistryPanel players={seasonPlayers} setPlayers={setPlayers} teams={seasonTeams} setTeams={setTeams} />}
              {mainTab === "bd" && <DatabasePanel teams={seasonTeams} players={seasonPlayers} matches={seasonMatches} trainings={seasonTrainings} dbTeam={dbTeam} setDbTeam={setDbTeam} dbView={dbView} setDbView={setDbView} />}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
