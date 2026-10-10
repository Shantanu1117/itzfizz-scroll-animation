/**
 * Separation of Content and Presentation
 * Exact visual specification data matching the ITZFIZZ Mountain Canyon Reference Design
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
    indexLabel: "01",
    sector: "SEC.01",
    gateDistance: "0 - 60M",
    gatePos: "9%",
    code: "PKP-ADOPT // +58",
    value: "58%",
    numericValue: 58,
    label: "Increase in pick up point use",
    detail: "First-wave network density & automated locker routing efficiency",
    icon: "network",
    accent: "#45db7d",
    numColor: "#5ef28e",
    barColor: "#45db7d",
    accentSecondary: "rgba(69, 219, 125, 0.18)",
    startProgress: 0.12,
    endProgress: 0.28,
    enterFromY: 24
  },
  {
    id: "box2",
    indexLabel: "02",
    sector: "SEC.02",
    gateDistance: "60M - 120M",
    gatePos: "65.5%",
    code: "COM-DEFLECT // -23",
    value: "23%",
    numericValue: 23,
    label: "Decreased in customer phone calls",
    detail: "Proactive real-time telemetry notifications reducing manual inquiries",
    icon: "phone",
    accent: "#ffffff",
    numColor: "#ffffff",
    barColor: "#e2e8f0",
    accentSecondary: "rgba(255, 255, 255, 0.12)",
    startProgress: 0.31,
    endProgress: 0.47,
    enterFromY: 24
  },
  {
    id: "box3",
    indexLabel: "03",
    sector: "SEC.03",
    gateDistance: "120M - 180M",
    gatePos: "77.5%",
    code: "PKP-VELOCITY // +27",
    value: "27%",
    numericValue: 27,
    label: "Increase in pick up point use",
    detail: "Higher fulfillment speed with optimized route planning",
    icon: "bars",
    accent: "#f59e0b",
    numColor: "#ffffff",
    barColor: "#e2e8f0",
    accentSecondary: "rgba(226, 232, 240, 0.12)",
    startProgress: 0.50,
    endProgress: 0.66,
    enterFromY: 24
  },
  {
    id: "box4",
    indexLabel: "04",
    sector: "SEC.04",
    gateDistance: "180M - 240M",
    gatePos: "89%",
    code: "OPS-EFFICIENCY // +40",
    value: "40%",
    numericValue: 40,
    label: "Improved operational efficiency",
    detail: "Smarter allocation and dynamic load balancing",
    icon: "bolt",
    accent: "#45db7d",
    numColor: "#ffffff",
    barColor: "#f59e0b",
    accentSecondary: "rgba(245, 158, 11, 0.16)",
    startProgress: 0.69,
    endProgress: 0.85,
    enterFromY: 24
  }
];

export const RUNWAY_MARKERS = [
  { pos: "0%", label: "000M" },
  { pos: "25%", label: "060M" },
  { pos: "50%", label: "120M" },
  { pos: "75%", label: "180M" },
  { pos: "100%", label: "240M" }
];
