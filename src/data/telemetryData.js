/**
 * Separation of Content and Presentation
 * Core assignment impact metrics, headline characters, and wind-tunnel calibration sectors
 */

export const HEADLINE_TEXT = "WELCOME ITZFIZZ";

export const HEADLINE_CHARS = [
  { id: "char-0", char: "W", word: 1, index: 0 },
  { id: "char-1", char: "E", word: 1, index: 1 },
  { id: "char-2", char: "L", word: 1, index: 2 },
  { id: "char-3", char: "C", word: 1, index: 3 },
  { id: "char-4", char: "O", word: 1, index: 4 },
  { id: "char-5", char: "M", word: 1, index: 5 },
  { id: "char-6", char: "E", word: 1, index: 6 },
  { id: "char-7", char: " ", word: 0, index: 7, isSpace: true },
  { id: "char-8", char: "I", word: 2, index: 8 },
  { id: "char-9", char: "T", word: 2, index: 9 },
  { id: "char-10", char: "Z", word: 2, index: 10 },
  { id: "char-11", char: "F", word: 2, index: 11 },
  { id: "char-12", char: "I", word: 2, index: 12 },
  { id: "char-13", char: "Z", word: 2, index: 13 },
  { id: "char-14", char: "Z", word: 2, index: 14 }
];

export const IMPACT_METRICS = [
  {
    id: "box1",
    sector: "SEC.01",
    gateDistance: "060M",
    code: "PKP-ADOPT // +58",
    value: "58%",
    numericValue: 58,
    label: "Increase in pick up point use",
    detail: "First-wave network density & automated locker routing efficiency",
    accent: "#def54f",
    accentSecondary: "rgba(222, 245, 79, 0.16)",
    startProgress: 0.12,
    endProgress: 0.28,
    enterFromY: 28
  },
  {
    id: "box2",
    sector: "SEC.02",
    gateDistance: "120M",
    code: "COM-DEFLECT // -23",
    value: "23%",
    numericValue: 23,
    label: "Decreased in customer phone calls",
    detail: "Proactive real-time telemetry notifications reducing manual inquiries",
    accent: "#6ac9ff",
    accentSecondary: "rgba(106, 201, 255, 0.16)",
    startProgress: 0.31,
    endProgress: 0.47,
    enterFromY: 28
  },
  {
    id: "box3",
    sector: "SEC.03",
    gateDistance: "180M",
    code: "PKP-VELOCITY // +27",
    value: "27%",
    numericValue: 27,
    label: "Increase in pick up point use",
    detail: "Sustained repeat hub utilization across high-throughput urban corridors",
    accent: "#e2e8f0",
    accentSecondary: "rgba(226, 232, 240, 0.14)",
    startProgress: 0.50,
    endProgress: 0.66,
    enterFromY: 28
  },
  {
    id: "box4",
    sector: "SEC.04",
    gateDistance: "240M",
    code: "COM-RESOLVE // -40",
    value: "40%",
    numericValue: 40,
    label: "Decreased in customer phone calls",
    detail: "End-to-end autonomous handoff verification at destination terminals",
    accent: "#fa7328",
    accentSecondary: "rgba(250, 115, 40, 0.18)",
    startProgress: 0.69,
    endProgress: 0.85,
    enterFromY: 28
  }
];

export const RUNWAY_MARKERS = [
  { pos: "0%", label: "000M // START GATE" },
  { pos: "20%", label: "050M // SEC.01" },
  { pos: "40%", label: "100M // SEC.02" },
  { pos: "60%", label: "150M // SEC.03" },
  { pos: "80%", label: "200M // SEC.04" },
  { pos: "100%", label: "250M // APEX LOCK" }
];
