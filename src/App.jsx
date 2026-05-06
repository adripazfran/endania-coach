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
    items: [],
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
                    : (visualFocusGroup === group.title || (group.items.length === 0 && mainTab === group.main))
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
    setMatches((prev) => [{
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type: "LIVE",
      teams: [MY_TEAM, rivalName],
      a: { shotsOn: 0, shotsOff: 0, shotsPost: 0, goals: 0, shotsTotal: 0, recoveries: 0, losses: 0, transLoss: 0, lossAfterRecovery: 0, yellow: 0, red: 0 },
      b: { shotsOn: 0, shotsOff: 0, shotsPost: 0, goals: 0, shotsTotal: 0, recoveries: 0, losses: 0, transLoss: 0, lossAfterRecovery: 0, yellow: 0, red: 0 },
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
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().slice(0, 10));
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

// ─── BASE DE DATOS – sub-views ────────────────────────────────────────────────

function DatabaseInfoView({ teamName, stats, dbScope, setDbScope }) {
  if (!stats) return (
    <Card className="p-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-3xl">📭</div>
      <p className="font-black text-slate-700">Sin datos para este equipo</p>
      <p className="mt-2 text-sm text-slate-400">No hay partidos con los filtros seleccionados.</p>
    </Card>
  );
  return (
    <div className="space-y-5">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-800">Muestra estadística</p>
            <p className="text-xs text-slate-400">Partidos incluidos en el análisis</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_OPTIONS.map((opt) => (
              <button key={opt} type="button" onClick={() => setDbScope(opt)}
                className={cn("rounded-2xl px-3 py-1.5 text-xs font-black transition",
                  dbScope === opt
                    ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-orange-50")}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </Card>
      <StatsGrid team={teamName} stats={stats} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <HeatMap teamName={teamName} stats={stats} />
        <PercentageReport teamName={teamName} stats={stats} />
      </div>
    </div>
  );
}

function DatabaseTeamPanel({ teamName, players, matches }) {
  const POS_COLORS = {
    Portera: "bg-amber-100 text-amber-800",
    Cierre: "bg-blue-100 text-blue-800",
    Ala: "bg-emerald-100 text-emerald-800",
    Pivot: "bg-violet-100 text-violet-800",
    Universal: "bg-rose-100 text-rose-800",
  };
  const teamPlayers = players.filter((p) => p.team === teamName).sort((a, b) => a.dorsal - b.dorsal);
  const teamMatches = sortByDateDesc(getMatchesForTeam(matches, teamName)).slice(0, 8);
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle title="Plantilla" subtitle={`${teamPlayers.length} jugadoras registradas`} />
        {teamPlayers.length ? (
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {teamPlayers.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <PlayerAvatar player={p} size="h-11 w-11" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-400">#{p.dorsal}</span>
                    <span className="truncate text-sm font-black text-slate-900">{playerName(p)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", POS_COLORS[p.pos] || "bg-slate-100 text-slate-700")}>{p.pos}</span>
                    <span className="text-[10px] text-slate-400">{calculateAge(p.birthDate)} años</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="mt-4 py-8 text-center text-sm text-slate-400">Sin jugadoras registradas para este equipo.</p>}
      </Card>
      <Card className="p-5">
        <SectionTitle title="Historial de partidos" subtitle={`${teamMatches.length} partidos más recientes`} />
        {teamMatches.length ? (
          <div className="mt-4 space-y-2">
            {teamMatches.map((m) => {
              const my = getMatchStats(m, teamName);
              const rival = m.teams[0] === teamName ? m.b : m.a;
              const diff = my.goals - rival.goals;
              const result = diff > 0 ? "V" : diff < 0 ? "D" : "E";
              const badge = result === "V" ? "bg-emerald-500" : result === "D" ? "bg-red-500" : "bg-amber-400";
              return (
                <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white", badge)}>{result}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-800">{teamName} <span className="font-normal text-slate-400">vs</span> {getOpponent(m, teamName)}</p>
                    <p className="text-xs text-slate-400">{m.date} · {m.type}</p>
                  </div>
                  <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-black text-slate-900">{getResult(m, teamName)}</span>
                </div>
              );
            })}
          </div>
        ) : <p className="mt-4 py-8 text-center text-sm text-slate-400">Sin partidos registrados.</p>}
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
  const totalUA = filtered.reduce((s, t) => s + safeNum(t.ua), 0);
  const totalMin = filtered.reduce((s, t) => s + safeNum(t.realMinutes), 0);
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle title="Entrenamientos" subtitle="Hasta 10 sesiones del rango seleccionado." />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniInput label="Desde" type="date" value={startDate} onChange={setStartDate} />
          <MiniInput label="Hasta" type="date" value={endDate} onChange={setEndDate} />
          <div className="rounded-3xl bg-violet-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-500">Carga total</p>
            <p className="text-2xl font-black text-violet-950">{totalUA} <span className="text-sm">UA</span></p>
          </div>
          <div className="rounded-3xl bg-cyan-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Tiempo total</p>
            <p className="text-2xl font-black text-cyan-950">{totalMin}<span className="text-sm">'</span></p>
          </div>
        </div>
      </Card>
      <MicrocycleChart trainings={filteredAll} matches={matches} teamName={teamName} anchorDate={anchor} />
      <Card className="p-5">
        <SectionTitle title="Listado de sesiones" subtitle={`${filtered.length} sesiones en el rango.`} />
        <div className="mt-4 space-y-2">
          {filtered.map((t, i) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-600">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-slate-800">{t.title}</p>
                <p className="text-xs text-slate-400">{t.date} · RPE {t.avgRpe}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-xl bg-violet-100 px-3 py-1 text-sm font-black text-violet-900">{t.ua} UA</span>
                <span className="rounded-xl bg-cyan-100 px-3 py-1 text-sm font-black text-cyan-900">{t.realMinutes}'</span>
              </div>
            </div>
          ))}
          {!filtered.length && <p className="py-8 text-center text-sm text-slate-400">Sin entrenamientos en el rango seleccionado.</p>}
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
  const wins = leagueMatches.filter((m) => { const my = getMatchStats(m, teamName); const rv = m.teams[0] === teamName ? m.b : m.a; return my.goals > rv.goals; }).length;
  const draws = leagueMatches.filter((m) => { const my = getMatchStats(m, teamName); const rv = m.teams[0] === teamName ? m.b : m.a; return my.goals === rv.goals; }).length;
  const losses = leagueMatches.length - wins - draws;
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle title="Partidos de liga" subtitle="Hasta 10 partidos del rango seleccionado." />
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
                  <p className="text-xs text-slate-400">{m.date} · Liga</p>
                </div>
                <span className="rounded-2xl bg-slate-100 px-4 py-2 text-lg font-black text-slate-900">{getResult(m, teamName)}</span>
              </div>
              <StatsGrid team={teamName} stats={stats} />
            </Card>
          );
        })}
        {!leagueMatches.length && (
          <Card className="p-12 text-center">
            <p className="text-slate-400">Sin partidos de liga en el rango seleccionado.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function DatabasePanel({ teams, players, matches, trainings, dbTeam, setDbTeam, dbScope, setDbScope, dbStats, dbView, setDbView }) {
  const VIEWS = [
    { key: "informacion", label: "Información" },
    { key: "equipo", label: "Equipo" },
    { key: "entrenamientos", label: "Entrenamientos" },
    { key: "partidos", label: "Partidos" },
  ];
  return (
    <div className="space-y-5">
      {/* Team selector – horizontal scrollable strip */}
      <Card className="p-4">
        <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Seleccionar equipo</p>
        {teams.length ? (
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {teams.map((team) => (
              <button key={team.id} type="button" onClick={() => setDbTeam(team.name)}
                className={cn(
                  "flex min-w-fit items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all",
                  dbTeam === team.name
                    ? "border-orange-500 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md shadow-orange-200"
                    : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                )}>
                <span className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black",
                  dbTeam === team.name ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                )}>{team.logo}</span>
                <span className="whitespace-nowrap">{team.name === MY_TEAM ? "★ " + team.name : team.name}</span>
              </button>
            ))}
          </div>
        ) : <p className="text-sm text-slate-400">Sin equipos en esta temporada.</p>}
      </Card>
      {/* Sub-view tabs */}
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {VIEWS.map((v) => (
          <button key={v.key} type="button" onClick={() => setDbView(v.key)}
            className={cn(
              "min-w-fit rounded-2xl px-5 py-2.5 text-sm font-black transition-all",
              dbView === v.key
                ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50"
            )}>
            {v.label}
          </button>
        ))}
      </div>
      {/* Content */}
      {dbView === "informacion" && <DatabaseInfoView teamName={dbTeam} stats={dbStats} dbScope={dbScope} setDbScope={setDbScope} />}
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
        <main onClick={() => setVisualFocusGroup("")} className="min-w-0 flex-1 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-indigo-100 p-4 md:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {mainTab === "registro" ? (
              <header className="rounded-[32px] border border-violet-200/60 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-7 text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow">REGISTRO</h1>
                <p className="mt-2 text-sm font-semibold text-white">Alta y edición de jugadores y equipos</p>
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
                <div className="space-y-6">
                  {offlineTab === "Analisis video" && <OfflineVideoPanel consignas={consignas} setConsignas={setConsignas} fileName={fileName} setFileName={setFileName} progress={progress} setProgress={setProgress} focus={focus} setFocus={setFocus} />}
                  {offlineTab === "Ficha scouting" && <ScoutingPanel matches={seasonMatches} scoutMatchId={scoutMatchId} setScoutMatchId={setScoutMatchId} saveScouting={saveScouting} />}
                  {offlineTab === "Prepartido" && <PreMatchPanel teams={seasonTeams} />}
                  {offlineTab === "Recomendacion IA" && <RecommendationPanel />}
                </div>
              )}
              {mainTab === "session" && sessionTab === "Analizar" && <SessionAnalysisPanel sessionFile={sessionFile} setSessionFile={setSessionFile} sessionGoals={sessionGoals} setSessionGoals={setSessionGoals} sessionProgress={sessionProgress} setSessionProgress={setSessionProgress} />}
              {mainTab === "session" && sessionTab === "Sesion de entreno" && <TrainingSessionPanel onSaveTraining={(t) => setTrainings((c) => [t, ...c])} />}
              {mainTab === "live" && <LivePanel players={seasonPlayers} teams={seasonTeams} setMatches={setMatches} />}
              {mainTab === "registro" && <RegistryPanel players={seasonPlayers} setPlayers={setPlayers} teams={seasonTeams} setTeams={setTeams} />}
              {mainTab === "bd" && <DatabasePanel teams={seasonTeams} players={seasonPlayers} matches={seasonMatches} trainings={seasonTrainings} dbTeam={dbTeam} setDbTeam={setDbTeam} dbScope={dbScope} setDbScope={setDbScope} dbStats={dbStats} dbView={dbView} setDbView={setDbView} />}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
