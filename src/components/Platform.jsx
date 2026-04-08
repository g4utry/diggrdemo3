import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

/* ══════ THEME ══════ */
const T = {
  bg: "#06080D",
  s1: "#0D1117",
  s2: "#151B25",
  s3: "#1C2333",
  b: "#21283B",
  tx: "#E6EDF3",
  tx2: "#8B949E",
  tx3: "#484F58",
  br: "#2F81F7",
  brG: "rgba(47,129,247,0.12)",
  gn: "#3FB950",
  gnG: "rgba(63,185,80,0.12)",
  am: "#D29922",
  amG: "rgba(210,153,34,0.12)",
  rd: "#F85149",
  pr: "#A371F7",
  cy: "#39D2C0",
};

/* ══════ SVG ICONS ══════ */
function SvgIcon({ paths, size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const ICONS = {
  home: (s, c) => <SvgIcon size={s} color={c} paths={["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", "M9 22V12h6v10"]} />,
  book: (s, c) => <SvgIcon size={s} color={c} paths={["M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z", "M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"]} />,
  plus: (s, c) => <SvgIcon size={s} color={c} paths={["M12 5v14", "M5 12h14"]} />,
  search: (s, c) => <SvgIcon size={s} color={c} paths={["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"]} />,
  bell: (s, c) => <SvgIcon size={s} color={c} paths={["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"]} />,
  back: (s, c) => <SvgIcon size={s} color={c} paths={["M19 12H5", "M12 19l-7-7 7-7"]} />,
  chev: (s, c) => <SvgIcon size={s} color={c} paths={["M9 18l6-6-6-6"]} />,
  edit: (s, c) => <SvgIcon size={s} color={c} paths={["M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"]} />,
  zap: (s, c) => <SvgIcon size={s} color={c} paths={["M13 2L3 14h9l-1 8 10-12h-9l1-8"]} />,
  check: (s, c) => <SvgIcon size={s} color={c} paths={["M20 6L9 17l-5-5"]} />,
  x: (s, c) => <SvgIcon size={s} color={c} paths={["M18 6L6 18", "M6 6l12 12"]} />,
  warn: (s, c) => <SvgIcon size={s} color={c} paths={["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z", "M12 9v4", "M12 17h.01"]} />,
  file: (s, c) => <SvgIcon size={s} color={c} paths={["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6"]} />,
  msg: (s, c) => <SvgIcon size={s} color={c} paths={["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"]} />,
  clock: (s, c) => <SvgIcon size={s} color={c} paths={["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"]} />,
  users: (s, c) => <SvgIcon size={s} color={c} paths={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M9 7a4 4 0 100 8 4 4 0 000-8z", "M23 21v-2a4 4 0 00-3-3.87"]} />,
  target: (s, c) => <SvgIcon size={s} color={c} paths={["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6a6 6 0 100 12 6 6 0 000-12z", "M12 10a2 2 0 100 4 2 2 0 000-4z"]} />,
  shield: (s, c) => <SvgIcon size={s} color={c} paths={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]} />,
  bldg: (s, c) => <SvgIcon size={s} color={c} paths={["M3 21h18", "M3 7v14", "M21 7v14", "M6 7V3h12v4", "M9 21v-4h6v4"]} />,
  hotel: (s, c) => <SvgIcon size={s} color={c} paths={["M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z", "M9 22V10h6v12"]} />,
  factory: (s, c) => <SvgIcon size={s} color={c} paths={["M2 20h20", "M2 20V8l5 4V8l5 4V4l5 4v12"]} />,
  grad: (s, c) => <SvgIcon size={s} color={c} paths={["M22 10l-10-6L2 10l10 6 10-6z", "M6 12v5c3 3 9 3 12 0v-5"]} />,
  trophy: (s, c) => <SvgIcon size={s} color={c} paths={["M6 9H3V6h3z", "M18 9h3V6h-3z", "M6 6a6 6 0 1012 0v6a6 6 0 01-12 0V6z", "M9 21h6", "M12 17v4"]} />,
  pound: (s, c) => <SvgIcon size={s} color={c} paths={["M7 18h10", "M7 12h7", "M8 6a4 4 0 018 0v1a4 4 0 01-4 4H7"]} />,
  layers: (s, c) => <SvgIcon size={s} color={c} paths={["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"]} />,
  pulse: (s, c) => <SvgIcon size={s} color={c} paths={["M22 12h-4l-3 9L9 3l-3 9H2"]} />,
  compass: (s, c) => <SvgIcon size={s} color={c} paths={["M12 2a10 10 0 100 20 10 10 0 000-20z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"]} />,
  grid: (s, c) => <SvgIcon size={s} color={c} paths={["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7z"]} />,
  brief: (s, c) => <SvgIcon size={s} color={c} paths={["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z", "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"]} />,
  map: (s, c) => <SvgIcon size={s} color={c} paths={["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z", "M8 2v16", "M16 6v16"]} />,
  cal: (s, c) => <SvgIcon size={s} color={c} paths={["M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z", "M16 2v4", "M8 2v4", "M3 10h18"]} />,
  clip: (s, c) => <SvgIcon size={s} color={c} paths={["M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2", "M15 2H9a1 1 0 00-1 1v1a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z"]} />,
  bot: (s, c) => <SvgIcon size={s} color={c} paths={["M12 2a2 2 0 012 2v1h3a2 2 0 012 2v8a6 6 0 01-6 6h-2a6 6 0 01-6-6V7a2 2 0 012-2h3V4a2 2 0 012-2z", "M9 12h.01", "M15 12h.01", "M10 16h4"]} />,
  send: (s, c) => <SvgIcon size={s} color={c} paths={["M22 2L11 13", "M22 2l-7 20-4-9-9-4 20-7z"]} />,
  bar: (s, c) => <SvgIcon size={s} color={c} paths={["M12 20V10", "M18 20V4", "M6 20v-4"]} />,
  pie: (s, c) => <SvgIcon size={s} color={c} paths={["M21.21 15.89A10 10 0 118 2.83", "M22 12A10 10 0 0012 2v10z"]} />,
  up: (s, c) => <SvgIcon size={s} color={c} paths={["M23 6l-9.5 9.5-5-5L1 18"]} />,
  inbox: (s, c) => <SvgIcon size={s} color={c} paths={["M22 12h-6l-2 3h-4l-2-3H2", "M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"]} />,
  gear: (s, c) => <SvgIcon size={s} color={c} paths={["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"]} />,
  survey: (s, c) => <SvgIcon size={s} color={c} paths={["M9 11l3 3L22 4", "M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"]} />,
  quote: (s, c) => <SvgIcon size={s} color={c} paths={["M16 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8z", "M15 3v4a2 2 0 002 2h4", "M10 12H7", "M17 16H7", "M13 8H7"]} />,
  folder: (s, c) => <SvgIcon size={s} color={c} paths={["M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"]} />,
};

/* Category configs */
const CATS = {
  self_build: { label: "Self Build", icon: "home" },
  build_to_sell: { label: "Build to Sell", icon: "bldg" },
  build_to_rent: { label: "Build to Rent", icon: "hotel" },
  social_housing: { label: "Social Housing", icon: "users" },
  pbsa: { label: "PBSA", icon: "grad" },
  co_living: { label: "Co-Living", icon: "grid" },
  commercial: { label: "Commercial", icon: "brief" },
  industrial: { label: "Industrial", icon: "factory" },
  stadium_leisure: { label: "Stadium", icon: "trophy" },
};

/* ══════ DATA ══════ */
const pipeData = [
  { month: "Oct", value: 12.4 }, { month: "Nov", value: 18.2 },
  { month: "Dec", value: 15.8 }, { month: "Jan", value: 22.6 },
  { month: "Feb", value: 28.4 }, { month: "Mar", value: 34.1 },
];
const statusData = [
  { name: "Enquiry", value: 2, color: "#6B7280" },
  { name: "Matching", value: 2, color: "#A371F7" },
  { name: "Review", value: 3, color: "#2F81F7" },
  { name: "Quotes", value: 2, color: "#39D2C0" },
  { name: "Instructed", value: 2, color: "#3FB950" },
];
const KANBAN_STAGES = [
  { key: "enquiry_received", label: "Enquiry Received", color: "#6B7280", desc: "Draft enquiries — gathering information and documents" },
  { key: "appetite_matching", label: "Appetite Matching", color: "#A371F7", desc: "AI matching to suitable insurers — client selecting where to send" },
  { key: "insurer_review", label: "Insurer Review", color: "#2F81F7", desc: "Q&A with insurers and waiting for terms" },
  { key: "quotes_received", label: "Quotes Received", color: "#39D2C0", desc: "Collating terms in diggr format and running comparisons" },
  { key: "policy_instructed", label: "Policy Instructed", color: "#3FB950", desc: "Payment processing and policy bound" },
];
const schemes = [
  // Enquiry Received — needs more info
  { id: "SCH-2843", title: "Cotswold Self-Build, Bourton", val: 680000, sc: "#6B7280", upd: "3d ago", st: "enquiry_received", cat: "self_build", loc: "Cotswolds", units: 1,
    docsTotal: 4, docsUploaded: 2, missingItems: ["Site investigation report", "Schedule of accommodation"] },
  { id: "SCH-2851", title: "Highgate Mews — 6 Townhouses", val: 4200000, sc: "#6B7280", upd: "1d ago", st: "enquiry_received", cat: "build_to_sell", loc: "London N6", units: 6,
    docsTotal: 4, docsUploaded: 3, missingItems: ["Schedule of accommodation"] },

  // Appetite Matching — AI matched, awaiting client to select
  { id: "SCH-2850", title: "Battersea Works Conversion", val: 18500000, sc: "#A371F7", upd: "4h ago", st: "appetite_matching", cat: "conversion", loc: "London SW8", units: 64,
    matchedInsurers: 8, recommendedInsurers: 5, aiConfidence: 0.94, action: "select" },
  { id: "SCH-2849", title: "Leeds Co-Living Phase 1", val: 6700000, sc: "#A371F7", upd: "8h ago", st: "appetite_matching", cat: "co_living", loc: "Leeds", units: 38,
    matchedInsurers: 5, recommendedInsurers: 3, aiConfidence: 0.87, action: "review", selectedCount: 3 },

  // Insurer Review — Q&A and waiting for terms
  { id: "SCH-2846", title: "Old Mill Conversion, Chester", val: 3200000, sc: "#2F81F7", upd: "5h ago", st: "insurer_review", cat: "conversion", loc: "Chester", units: 14,
    sentTo: 4, openQuestions: 2, daysWaiting: 1 },
  { id: "SCH-2842", title: "Canary Wharf Commercial Tower", val: 89000000, sc: "#2F81F7", upd: "4d ago", st: "insurer_review", cat: "commercial", loc: "London E14", units: 0,
    sentTo: 6, openQuestions: 3, daysWaiting: 4, needsChase: true },
  { id: "SCH-2848", title: "Bristol Riverside PBSA", val: 14800000, sc: "#2F81F7", upd: "2d ago", st: "insurer_review", cat: "pbsa", loc: "Bristol", units: 320,
    sentTo: 4, openQuestions: 0, daysWaiting: 5, needsChase: true },

  // Quotes Received — comparing terms
  { id: "SCH-2847", title: "Riverside Apartments — 42 Unit BTR", val: 8500000, sc: "#39D2C0", upd: "2h ago", st: "quotes_received", cat: "build_to_rent", loc: "Manchester", units: 42,
    quotesIn: 3, quotesExpected: 4, bestPremium: "£16,800", comparisonReady: true },
  { id: "SCH-2845", title: "Park View Social Housing — Phase 3", val: 12100000, sc: "#39D2C0", upd: "1d ago", st: "quotes_received", cat: "social_housing", loc: "Birmingham", units: 56,
    quotesIn: 5, quotesExpected: 5, bestPremium: "£24,200", comparisonReady: true },

  // Policy Instructed — paying
  { id: "SCH-2844", title: "Harbourside PBSA Block A", val: 21400000, sc: "#3FB950", upd: "2d ago", st: "policy_instructed", cat: "pbsa", loc: "Liverpool", units: 280,
    insurer: "Ark Insurance", premium: "£42,800", paymentStatus: "pending", paymentDue: "5 Apr" },
  { id: "SCH-2841", title: "Edinburgh New Town Restoration", val: 5400000, sc: "#3FB950", upd: "1w ago", st: "policy_instructed", cat: "conversion", loc: "Edinburgh", units: 22,
    insurer: "Premier Guarantee", premium: "£12,600", paymentStatus: "paid", paidOn: "28 Mar" },
];
const matchData = [
  { name: "Ark Insurance Group", score: 94, ap: "strong", rat: "A", reasons: ["Broadest appetite for large BTR", "Accepts concrete frame 8+ storeys", "Competitive on £5M+ in NW"], w: ["Enhanced", "Developer", "Lender"], prem: "£18,200" },
  { name: "Premier Guarantee", score: 88, ap: "strong", rat: "A", reasons: ["Strong residential appetite", "Preferred for volume BTR", "Good Manchester track record"], w: ["Standard", "Enhanced"], prem: "£16,800" },
  { name: "Protek Warranty", score: 82, ap: "strong", rat: "A-", reasons: ["Broad mid-range appetite", "BTR up to 40 storeys", "Competitive inspection regime"], w: ["Standard", "Enhanced", "Lender"], prem: "£17,400" },
  { name: "AHCI", score: 71, ap: "moderate", rat: "A", reasons: ["Good for larger developments"], w: ["Standard", "Enhanced"], prem: "£19,100", caut: ["Higher pricing tier"] },
  { name: "LABC Warranty", score: 52, ap: "marginal", rat: "A-", reasons: ["General residential appetite"], w: ["Standard"], prem: "£21,300", caut: ["Better suited to smaller schemes"] },
  { name: "ICW Insurance", score: 38, ap: "declined", rat: "B+", reasons: [], rej: ["Limited BTR experience", "No enhanced wording available"] },
];
const notifs = [
  { id: 1, ic: "inbox", title: "Premier Guarantee: indication received", sch: "SCH-2847", time: "12m ago", ur: true },
  { id: 2, ic: "msg", title: "Ark Insurance: question on ground conditions", sch: "SCH-2847", time: "1h ago", ur: true },
  { id: 3, ic: "bar", title: "AI comparison ready for review", sch: "SCH-2847", time: "2h ago", ur: true },
  { id: 4, ic: "send", title: "Submission sent to 5 insurers", sch: "SCH-2846", time: "5h ago", ur: false },
];
const agentTasks = [
  { id: 1, type: "email", title: "Follow-up email to Ark Insurance", scheme: "SCH-2847", status: "running", progress: 72, detail: "Drafting response to ground condition query with extracted report data", started: "3 min ago" },
  { id: 2, type: "form", title: "Auto-filling LABC submission form", scheme: "SCH-2846", status: "running", progress: 45, detail: "Mapping scheme fields to LABC format — 12 of 26 fields complete", started: "8 min ago" },
  { id: 3, type: "compare", title: "Analysing Premier Guarantee wording", scheme: "SCH-2847", status: "running", progress: 88, detail: "Extracting clause-level differences against standard wording", started: "12 min ago" },
  { id: 4, type: "followup", title: "Chasing AHCI for indication", scheme: "SCH-2845", status: "queued", progress: 0, detail: "Scheduled reminder — no response in 4 business days", started: "Queued" },
  { id: 5, type: "extract", title: "Extracting data from structural report", scheme: "SCH-2843", status: "running", progress: 31, detail: "OCR + structured extraction — identifying load-bearing specs", started: "1 min ago" },
  { id: 6, type: "match", title: "Re-running matching after new documents", scheme: "SCH-2843", status: "queued", progress: 0, detail: "Waiting for document extraction to complete", started: "Queued" },
  { id: 7, type: "email", title: "Sent confirmation to Protek Warranty", scheme: "SCH-2847", status: "done", progress: 100, detail: "Acknowledged receipt of enhanced wording terms", started: "22 min ago" },
  { id: 8, type: "form", title: "Completed Ark submission pack", scheme: "SCH-2842", status: "done", progress: 100, detail: "28 fields mapped, 4 documents attached, cover note generated", started: "1h ago" },
];
const agentTaskIcons = { email: "send", form: "clip", compare: "bar", followup: "clock", extract: "file", match: "target" };

const intakeSteps = [
  { k: "type", l: "Project Type", ic: "compass" },
  { k: "details", l: "Scheme Details", ic: "map" },
  { k: "fin", l: "Financials", ic: "pound" },
  { k: "con", l: "Construction", ic: "bldg" },
  { k: "time", l: "Timeline", ic: "cal" },
  { k: "stake", l: "Stakeholders", ic: "users" },
  { k: "docs", l: "Documents", ic: "file" },
  { k: "review", l: "Review", ic: "clip" },
];

/* ══════ HELPERS ══════ */
function FadeIn({ children, delay = 0 }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(10px)",
      transition: `all 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600,
      background: color + "18", color, border: `1px solid ${color}22`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}

function IconBtn({ icon, size = 13, color = T.tx2, label, primary, onClick }) {
  const bg = primary ? T.br : T.s2;
  const fg = primary ? "#fff" : color;
  const bd = primary ? "none" : `1px solid ${T.b}`;
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "9px 16px", borderRadius: 8, background: bg,
      border: bd, color: fg, fontSize: 12, cursor: "pointer", fontWeight: primary ? 600 : 500,
    }}>
      {ICONS[icon]?.(size, fg)}
      {label}
    </button>
  );
}

/* ══════ SCHEME ROW ══════ */
function SchemeRow({ s, onClick }) {
  const [h, setH] = useState(false);
  const stage = KANBAN_STAGES?.find(st => st.key === s.st);
  const stageLabel = stage?.label || s.st;
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", padding: "14px 20px",
        cursor: "pointer", transition: "all 0.2s",
        background: h ? T.s2 : "transparent", borderBottom: `1px solid ${T.b}`,
      }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: T.tx3 }}>{s.id}</span>
          <Badge color={s.sc}>{stageLabel}</Badge>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, flexShrink: 0, marginLeft: 20 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>{"\u00A3"}{(s.val / 1e6).toFixed(1)}M</div>
          <div style={{ fontSize: 11, color: T.tx3 }}>{s.upd}</div>
        </div>
        <span style={{ transition: "transform 0.2s", transform: h ? "translateX(3px)" : "none" }}>
          {ICONS.chev(14, T.tx3)}
        </span>
      </div>
    </div>
  );
}

/* ══════ MATCH CARD ══════ */
function MatchCard({ m, rank }) {
  const [ex, setEx] = useState(false);
  const colors = { strong: T.gn, moderate: T.cy, marginal: T.am, declined: T.rd };
  const c = colors[m.ap];

  return (
    <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
      <div onClick={() => setEx(!ex)} style={{
        padding: "18px 22px", cursor: "pointer", display: "flex",
        alignItems: "center", gap: 16, position: "relative",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${c},transparent)` }} />
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: `${c}15`, border: `1px solid ${c}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: c,
        }}>{rank}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: T.tx }}>{m.name}</span>
            <Badge color={c}>{m.ap}</Badge>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: T.tx3, marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
              {ICONS.shield(11, T.tx3)}{m.rat}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {m.w?.map(w => <span key={w} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: T.s3, color: T.tx2 }}>{w}</span>)}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.tx }}>{m.score}%</div>
          {m.prem && <div style={{ fontSize: 12, color: T.tx2 }}>{m.prem}</div>}
        </div>
        <span style={{ transition: "transform 0.2s", transform: ex ? "rotate(90deg)" : "none" }}>
          {ICONS.chev(14, T.tx3)}
        </span>
      </div>
      {ex && (
        <div style={{ padding: "0 22px 18px", borderTop: `1px solid ${T.b}`, paddingTop: 14 }}>
          {m.reasons?.length > 0 && <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.tx2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Why this insurer</div>
            {m.reasons.map((r, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>{ICONS.check(12, T.gn)}<span style={{ fontSize: 13, color: T.tx2 }}>{r}</span></div>)}
          </div>}
          {m.caut?.length > 0 && <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.am, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Cautions</div>
            {m.caut.map((r, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>{ICONS.warn(12, T.am)}<span style={{ fontSize: 13, color: T.tx2 }}>{r}</span></div>)}
          </div>}
          {m.rej?.length > 0 && <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.rd, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Rejection reasons</div>
            {m.rej.map((r, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>{ICONS.x(12, T.rd)}<span style={{ fontSize: 13, color: T.tx2 }}>{r}</span></div>)}
          </div>}
        </div>
      )}
    </div>
  );
}

/* ══════ DASHBOARD ══════ */
function Dashboard({ nav }) {
  return (
    <div>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: 13, color: T.tx2, marginTop: 4 }}>Project pipeline — March 2026</p>
          </div>
          <IconBtn icon="plus" label="Add Project" primary onClick={() => nav("intake")} />
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { ic: "layers", val: "11", lbl: "Total Projects", trend: "+3 this month", col: T.tx },
          { ic: "zap", val: "9", lbl: "Active Projects", col: T.br },
          { ic: "bell", val: "4", lbl: "Awaiting Action", col: T.am },
          { ic: "pound", val: "\u00A3134.9M", lbl: "Pipeline Value", trend: "+22% MoM", col: T.gn },
        ].map((s, i) => (
          <FadeIn key={i} delay={80 * i}>
            <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "20px 22px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right,${s.col}08,transparent)`, pointerEvents: "none" }} />
              <div style={{ marginBottom: 12, opacity: 0.7 }}>{ICONS[s.ic]?.(20, s.col)}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.col, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: T.tx2, marginTop: 6 }}>{s.lbl}</div>
              {s.trend && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: T.gn, marginTop: 6, fontFamily: "monospace" }}>{ICONS.up(11, T.gn)}{s.trend}</div>}
            </div>
          </FadeIn>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 24 }}>
        <FadeIn delay={200}>
          <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: T.tx, marginBottom: 16 }}>{ICONS.pulse(14, T.br)}Pipeline Value</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={pipeData}>
                <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.br} stopOpacity={0.2} /><stop offset="100%" stopColor={T.br} stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: T.tx3 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: T.tx3 }} />
                <Tooltip contentStyle={{ background: T.s2, border: `1px solid ${T.b}`, borderRadius: 8, fontSize: 12, color: T.tx }} />
                <Area type="monotone" dataKey="value" stroke={T.br} strokeWidth={2} fill="url(#ag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
        <FadeIn delay={280}>
          <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: T.tx, marginBottom: 12 }}>{ICONS.pie(14, T.pr)}By Status</div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart><Pie data={statusData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={52} paddingAngle={3} strokeWidth={0}>{statusData.map((d, i) => <Cell key={i} fill={d.color} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, justifyContent: "center" }}>
              {statusData.map(d => <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.tx2 }}><span style={{ width: 6, height: 6, borderRadius: 2, background: d.color }} />{d.name}</div>)}
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={320}>
        <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${T.b}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: T.tx }}>{ICONS.book(14, T.tx2)}Recent Projects</div>
            <button onClick={() => nav("schemes")} style={{ fontSize: 12, color: T.br, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
          </div>
          {schemes.map(s => <SchemeRow key={s.id} s={s} onClick={() => nav("detail")} />)}
        </div>
      </FadeIn>
    </div>
  );
}

/* ══════ SCHEMES LIST ══════ */
/* ══════ KANBAN CARD ══════ */
function KanbanCard({ s, onClick }) {
  const [h, setH] = useState(false);
  const Cic = ICONS[CATS[s.cat]?.icon] || ICONS.bldg;

  // Stage-specific content blocks
  const renderStageContent = () => {
    switch (s.st) {
      case "enquiry_received": {
        const pct = Math.round((s.docsUploaded / s.docsTotal) * 100);
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: T.tx3, fontWeight: 500 }}>Documents</span>
              <span style={{ fontSize: 10, color: s.sc, fontFamily: "monospace", fontWeight: 600 }}>
                {s.docsUploaded}/{s.docsTotal}
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: T.s3, marginBottom: 8 }}>
              <div style={{ height: 3, borderRadius: 2, background: s.sc, width: `${pct}%`, transition: "width 0.5s" }} />
            </div>
            {s.missingItems?.length > 0 && (
              <div style={{
                padding: "6px 8px", borderRadius: 6,
                background: `${T.am}10`, border: `1px solid ${T.am}20`,
                marginTop: 6,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                  {ICONS.warn(9, T.am)}
                  <span style={{ fontSize: 9, fontWeight: 600, color: T.am, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Awaiting
                  </span>
                </div>
                {s.missingItems.map((item, i) => (
                  <div key={i} style={{ fontSize: 10, color: T.tx2, lineHeight: 1.4 }}>· {item}</div>
                ))}
              </div>
            )}
          </div>
        );
      }
      case "appetite_matching": {
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "6px 8px", borderRadius: 6,
              background: `${T.pr}12`, border: `1px solid ${T.pr}25`, marginBottom: 6,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {ICONS.bot(10, T.pr)}
                <span style={{ fontSize: 10, color: T.pr, fontWeight: 600 }}>
                  AI matched {s.matchedInsurers}
                </span>
              </div>
              <span style={{ fontSize: 9, color: T.pr, fontFamily: "monospace" }}>
                {Math.round(s.aiConfidence * 100)}%
              </span>
            </div>
            <div style={{ fontSize: 10, color: T.tx3, lineHeight: 1.5, marginBottom: 8 }}>
              <strong style={{ color: T.tx2 }}>{s.recommendedInsurers}</strong> recommended
              {s.selectedCount && <> · <strong style={{ color: T.cy }}>{s.selectedCount}</strong> selected</>}
            </div>
            <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{
              width: "100%", padding: "6px 10px", borderRadius: 6,
              background: s.sc, border: "none", color: "#fff",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            }}>
              {s.action === "select" ? "Select Insurers" : "Continue Selection"}
              {ICONS.chev(10, "#fff")}
            </button>
          </div>
        );
      }
      case "insurer_review": {
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              <div style={{ flex: 1, padding: "6px 8px", borderRadius: 6, background: T.s3 }}>
                <div style={{ fontSize: 9, color: T.tx3, marginBottom: 2 }}>Sent</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.tx, fontFamily: "monospace" }}>{s.sentTo}</div>
              </div>
              {s.openQuestions > 0 && (
                <div style={{ flex: 1, padding: "6px 8px", borderRadius: 6, background: `${T.am}12`, border: `1px solid ${T.am}25` }}>
                  <div style={{ fontSize: 9, color: T.am, marginBottom: 2 }}>Q&amp;A</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.am, fontFamily: "monospace" }}>{s.openQuestions}</div>
                </div>
              )}
              <div style={{ flex: 1, padding: "6px 8px", borderRadius: 6, background: T.s3 }}>
                <div style={{ fontSize: 9, color: T.tx3, marginBottom: 2 }}>Days</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.daysWaiting >= 3 ? T.am : T.tx, fontFamily: "monospace" }}>{s.daysWaiting}d</div>
              </div>
            </div>
            {s.needsChase && (
              <button onClick={(e) => { e.stopPropagation(); }} style={{
                width: "100%", padding: "6px 10px", borderRadius: 6,
                background: T.am, border: "none", color: "#fff",
                fontSize: 10, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                boxShadow: `0 0 12px ${T.am}40`,
              }}>
                {ICONS.send(10, "#fff")}
                Chase Insurers
              </button>
            )}
          </div>
        );
      }
      case "quotes_received": {
        const pct = Math.round((s.quotesIn / s.quotesExpected) * 100);
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: T.tx3, fontWeight: 500 }}>Quotes In</span>
              <span style={{ fontSize: 10, color: s.sc, fontFamily: "monospace", fontWeight: 600 }}>
                {s.quotesIn}/{s.quotesExpected}
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: T.s3, marginBottom: 8 }}>
              <div style={{ height: 3, borderRadius: 2, background: s.sc, width: `${pct}%`, transition: "width 0.5s" }} />
            </div>
            <div style={{
              padding: "6px 8px", borderRadius: 6,
              background: `${T.cy}10`, border: `1px solid ${T.cy}25`, marginBottom: 6,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: T.cy, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Best Premium
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.tx, fontFamily: "monospace" }}>
                  {s.bestPremium}
                </span>
              </div>
            </div>
            {s.comparisonReady && (
              <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{
                width: "100%", padding: "6px 10px", borderRadius: 6,
                background: s.sc, border: "none", color: "#fff",
                fontSize: 10, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}>
                {ICONS.bar(10, "#fff")}
                View Comparison
              </button>
            )}
          </div>
        );
      }
      case "policy_instructed": {
        const isPaid = s.paymentStatus === "paid";
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, color: T.tx3, marginBottom: 3 }}>Insurer</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.tx, marginBottom: 8 }}>{s.insurer}</div>
            <div style={{
              padding: "8px 10px", borderRadius: 6,
              background: isPaid ? `${T.gn}12` : `${T.am}12`,
              border: `1px solid ${isPaid ? T.gn + "30" : T.am + "30"}`,
              marginBottom: 6,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {isPaid ? ICONS.check(10, T.gn) : ICONS.clock(10, T.am)}
                  <span style={{ fontSize: 9, fontWeight: 600, color: isPaid ? T.gn : T.am, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {isPaid ? "Paid" : "Due"}
                  </span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.tx, fontFamily: "monospace" }}>
                  {s.premium}
                </span>
              </div>
              <div style={{ fontSize: 9, color: T.tx3, marginTop: 3 }}>
                {isPaid ? `Paid ${s.paidOn}` : `Due ${s.paymentDue}`}
              </div>
            </div>
            {!isPaid && (
              <button onClick={(e) => { e.stopPropagation(); }} style={{
                width: "100%", padding: "6px 10px", borderRadius: 6,
                background: s.sc, border: "none", color: "#fff",
                fontSize: 10, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}>
                {ICONS.pound(10, "#fff")}
                Process Payment
              </button>
            )}
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? T.s2 : T.s1,
        border: `1px solid ${h ? T.bh : T.b}`,
        borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer",
        transition: "all 0.2s", position: "relative", overflow: "hidden",
        transform: h ? "translateY(-1px)" : "none",
        boxShadow: h ? `0 8px 24px rgba(0,0,0,0.3)` : "none",
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 2,
        background: s.sc,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: T.tx3 }}>{s.id}</span>
        <span style={{ fontSize: 9, color: T.tx3 }}>{s.upd}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.tx, lineHeight: 1.35, marginBottom: 8 }}>
        {s.title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{
          width: 18, height: 18, borderRadius: 5, background: T.s3,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Cic size={10} color={T.tx3} />
        </div>
        <span style={{ fontSize: 10, color: T.tx3 }}>{s.loc}</span>
        {s.units > 0 && (
          <>
            <span style={{ color: T.tx3, fontSize: 9 }}>·</span>
            <span style={{ fontSize: 10, color: T.tx3 }}>{s.units}u</span>
          </>
        )}
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: T.tx, letterSpacing: "-0.01em" }}>
          {"\u00A3"}{(s.val / 1e6).toFixed(1)}M
        </span>
      </div>

      {renderStageContent()}
    </div>
  );
}

/* ══════ SCHEMES (KANBAN) ══════ */
function Schemes({ nav }) {
  const totalValue = schemes.reduce((sum, s) => sum + s.val, 0);

  return (
    <div>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: 0 }}>My Projects</h1>
            <p style={{ fontSize: 13, color: T.tx2, marginTop: 4 }}>
              {schemes.length} projects in pipeline · {"\u00A3"}{(totalValue / 1e6).toFixed(1)}M total value
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "flex", gap: 2, padding: 3, borderRadius: 8,
              background: T.s2, border: `1px solid ${T.b}`,
            }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 5, padding: "5px 10px",
                borderRadius: 6, background: T.brG, border: "none",
                color: T.br, fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}>
                {ICONS.grid(11, T.br)}Kanban
              </button>
              <button style={{
                display: "flex", alignItems: "center", gap: 5, padding: "5px 10px",
                borderRadius: 6, background: "transparent", border: "none",
                color: T.tx3, fontSize: 11, fontWeight: 500, cursor: "pointer",
              }}>
                {ICONS.book(11, T.tx3)}List
              </button>
            </div>
            <IconBtn icon="plus" label="Add Project" primary onClick={() => nav("intake")} />
          </div>
        </div>
      </FadeIn>

      {/* Stage descriptions strip */}
      <FadeIn delay={80}>
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${KANBAN_STAGES.length}, 1fr)`,
          gap: 10, marginBottom: 16, marginTop: 24,
        }}>
          {KANBAN_STAGES.map((stage, i) => {
            const count = schemes.filter(s => s.st === stage.key).length;
            const stageValue = schemes
              .filter(s => s.st === stage.key)
              .reduce((sum, s) => sum + s.val, 0);
            return (
              <div key={stage.key} style={{
                padding: "12px 14px", borderRadius: 10,
                background: T.s1, border: `1px solid ${T.b}`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: stage.color,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: stage.color,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    Stage {i + 1}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: stage.color,
                    background: stage.color + "15", padding: "1px 7px", borderRadius: 4,
                    fontFamily: "monospace",
                  }}>
                    {count}
                  </span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.tx, marginBottom: 2 }}>
                  {stage.label}
                </div>
                {stageValue > 0 && (
                  <div style={{ fontSize: 10, color: T.tx3, fontFamily: "monospace" }}>
                    {"\u00A3"}{(stageValue / 1e6).toFixed(1)}M
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Kanban board */}
      <FadeIn delay={160}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${KANBAN_STAGES.length}, 1fr)`,
          gap: 10,
          alignItems: "flex-start",
        }}>
          {KANBAN_STAGES.map(stage => {
            const stageProjects = schemes.filter(s => s.st === stage.key);
            return (
              <div key={stage.key} style={{
                background: T.s1, border: `1px solid ${T.b}`, borderRadius: 12,
                padding: 10, minHeight: 400,
                display: "flex", flexDirection: "column",
              }}>
                {/* Column header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 8px 10px", borderBottom: `1px solid ${T.b}`, marginBottom: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", background: stage.color,
                      boxShadow: `0 0 8px ${stage.color}80`,
                    }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.tx }}>
                      {stage.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: stage.color,
                    fontFamily: "monospace",
                    background: stage.color + "15", padding: "1px 6px", borderRadius: 4,
                  }}>
                    {stageProjects.length}
                  </span>
                </div>

                {/* Cards */}
                <div style={{ flex: 1 }}>
                  {stageProjects.length === 0 ? (
                    <div style={{
                      padding: "30px 14px", textAlign: "center",
                      border: `1px dashed ${T.b}`, borderRadius: 8,
                    }}>
                      <div style={{ marginBottom: 6, opacity: 0.4 }}>
                        {ICONS.folder(18, T.tx3)}
                      </div>
                      <div style={{ fontSize: 10, color: T.tx3 }}>
                        No projects in this stage
                      </div>
                    </div>
                  ) : (
                    stageProjects.map(s => (
                      <KanbanCard key={s.id} s={s} onClick={() => nav("detail")} />
                    ))
                  )}
                </div>

                {/* Stage description footer */}
                <div style={{
                  marginTop: 8, padding: "10px 8px 4px",
                  borderTop: `1px solid ${T.b}`,
                  fontSize: 9, color: T.tx3, lineHeight: 1.45,
                }}>
                  {stage.desc}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}

/* ══════ DETAIL ══════ */
function Detail({ nav }) {
  const s = schemes[0];
  const [tab, setTab] = useState("matching");
  const tabs = [
    { k: "matching", ic: "target" }, { k: "documents", ic: "file" },
    { k: "messages", ic: "msg" }, { k: "timeline", ic: "clock" },
  ];

  return (
    <div>
      <FadeIn>
        <button onClick={() => nav("schemes")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.tx2, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}>{ICONS.back(13, T.tx2)}Back</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: T.tx3 }}>{s.id}</span>
              <Badge color={s.sc}>{KANBAN_STAGES.find(st => st.key === s.st)?.label || s.st}</Badge>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: T.tx, margin: 0 }}>{s.title}</h1>
            <p style={{ fontSize: 13, color: T.tx2, marginTop: 4 }}>42-unit BTR · Concrete frame · 8 storeys · Manchester</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <IconBtn icon="edit" label="Edit" />
            <IconBtn icon="zap" label="Run Matching" primary onClick={() => nav("matching")} />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { l: "Value", v: "\u00A38.5M", ic: "pound" },
            { l: "GDV", v: "\u00A314.2M", ic: "up" },
            { l: "Units", v: "42", ic: "bldg" },
            { l: "Target", v: "Mar 2027", ic: "cal" },
            { l: "Matches", v: "6", ic: "target", col: T.br },
          ].map((x, i) => (
            <div key={i} style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                {ICONS[x.ic]?.(12, T.tx3)}
                <span style={{ fontSize: 11, color: T.tx3 }}>{x.l}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: x.col || T.tx }}>{x.v}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={160}>
        <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: `1px solid ${T.b}` }}>
          {tabs.map(tb => (
            <button key={tb.k} onClick={() => setTab(tb.k)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13, fontWeight: 500,
              color: tab === tb.k ? T.br : T.tx2, background: "none", border: "none", cursor: "pointer",
              borderBottom: tab === tb.k ? `2px solid ${T.br}` : "2px solid transparent", textTransform: "capitalize",
            }}>
              {ICONS[tb.ic]?.(13, tab === tb.k ? T.br : T.tx3)}{tb.k}
            </button>
          ))}
        </div>
      </FadeIn>

      {tab === "matching" && (
        <FadeIn delay={200}>
          <div style={{ background: T.s2, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${T.b}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: T.brG, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS.bot(14, T.br)}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>AI Matching Summary</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: T.gn, background: T.gnG, padding: "2px 8px", borderRadius: 4, marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>{ICONS.shield(10, T.gn)}0.91</span>
            </div>
            <p style={{ fontSize: 13, color: T.tx2, lineHeight: 1.65, margin: 0 }}>
              Evaluated 8 insurers. 3 show strong appetite: <strong style={{ color: T.tx }}>Ark Insurance</strong>, <strong style={{ color: T.tx }}>Premier Guarantee</strong>, and <strong style={{ color: T.tx }}>Protek Warranty</strong>. Concrete frame and value sit within appetite. Premier Guarantee most competitive on pricing.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {matchData.map((m, i) => <MatchCard key={i} m={m} rank={i + 1} />)}
          </div>
        </FadeIn>
      )}

      {tab === "documents" && (
        <FadeIn delay={200}>
          <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
            {[
              { n: "Planning Permission — MCC/2025/0847.pdf", c: "Planning", st: "extracted", sz: "2.4 MB" },
              { n: "Site Plan — Riverside Quarter.pdf", c: "Site Plan", st: "extracted", sz: "8.1 MB" },
              { n: "Schedule of Works — Rev C.xlsx", c: "Schedule", st: "processing", sz: "1.2 MB" },
              { n: "Structural Engineer Report.pdf", c: "Structural", st: "uploaded", sz: "5.7 MB" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${T.b}`, gap: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS.file(16, T.tx3)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.tx }}>{d.n}</div>
                  <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{d.c} · {d.sz}</div>
                </div>
                <Badge color={d.st === "extracted" ? T.gn : d.st === "processing" ? T.am : T.tx3}>{d.st}</Badge>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {tab === "messages" && <FadeIn delay={200}><div style={{ textAlign: "center", padding: 60, color: T.tx3 }}>{ICONS.msg(32, T.tx3)}<p style={{ marginTop: 12, fontSize: 13, color: T.tx2 }}>Messaging — Phase 2</p></div></FadeIn>}

      {tab === "timeline" && (
        <FadeIn delay={200}>
          <div style={{ paddingLeft: 24, position: "relative" }}>
            <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: `linear-gradient(180deg,${T.gn},${T.br},${T.tx3})` }} />
            {[
              { dt: "12 Mar", ev: "Scheme created", det: "92% readiness", c: T.gn },
              { dt: "13 Mar", ev: "AI matching completed", det: "6 matched, 3 strong", c: T.gn },
              { dt: "13 Mar", ev: "Submitted to 5 insurers", det: "Ark, Premier, Protek, AHCI, LABC", c: T.br },
              { dt: "15 Mar", ev: "Premier: indication received", det: "\u00A316,800 — 10yr DLP", c: T.gn },
              { dt: "Today", ev: "AI comparison ready", det: "3 indications for review", c: T.br },
            ].map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 24, paddingLeft: 24 }}>
                <div style={{ position: "absolute", left: -24, top: 3, width: 10, height: 10, borderRadius: "50%", border: `2px solid ${e.c}`, background: T.bg }} />
                <div style={{ fontSize: 11, fontFamily: "monospace", color: T.tx3, marginBottom: 3 }}>{e.dt}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>{e.ev}</div>
                <div style={{ fontSize: 12, color: T.tx2, marginTop: 2 }}>{e.det}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}

/* ══════ INTAKE ══════ */
const DOC_REQS = {
  new_build: [
    { key: "arch_pack", label: "Architectural Drawing Pack", desc: "Floor plans, elevations, sections, and general arrangement drawings", required: true },
    { key: "site_investigation", label: "Site Investigation Report", desc: "Ground conditions, soil analysis, and geotechnical recommendations", required: true },
    { key: "design_access", label: "Design and Access Statement", desc: "Planning document describing the design principles and access provisions", required: true },
    { key: "schedule_accom", label: "Schedule of Accommodation", desc: "Unit mix, sizes, types, and specification summary", required: true },
  ],
  conversion: [
    { key: "existing_pack", label: "Existing Drawing Pack", desc: "As-built drawings showing the current state of the building", required: true },
    { key: "proposed_pack", label: "Proposed Drawing Pack", desc: "Proposed floor plans, elevations, and sections post-conversion", required: true },
    { key: "structural_docs", label: "Structural Documents", desc: "Structural reports and drawings — load assessments, beam schedules, foundation details", required: true },
    { key: "scope_works", label: "Scope of Works", desc: "Detailed description of all conversion works to be undertaken", required: true },
    { key: "schedule_accom", label: "Schedule of Accommodation", desc: "Unit mix, sizes, types, and specification summary", required: true },
  ],
};

function Intake({ nav }) {
  const [phase, setPhase] = useState("upload"); // "upload" | "form"
  const [buildType, setBuildType] = useState(null); // null | "new_build" | "conversion"
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [step, setStep] = useState(0);
  const [fd, setFd] = useState({ cat: "build_to_rent", bt: "new_build" });
  const cur = intakeSteps[step];

  const toggleUpload = (docKey) => {
    setUploadedDocs(prev => ({ ...prev, [docKey]: !prev[docKey] }));
  };

  const currentDocs = buildType ? DOC_REQS[buildType] : [];
  const uploadedCount = currentDocs.filter(d => uploadedDocs[d.key]).length;
  const allUploaded = currentDocs.length > 0 && uploadedCount === currentDocs.length;

  // ── PHASE 1: Document Upload ──
  if (phase === "upload") {
    return (
      <div>
        <FadeIn>
          <button onClick={() => nav("dashboard")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.tx2, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}>
            {ICONS.back(13, T.tx2)}Back
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: T.tx, margin: "0 0 6px" }}>Add Project</h1>
          <p style={{ fontSize: 13, color: T.tx2, margin: "0 0 28px" }}>
            Start by uploading your project documents. Our AI will extract key data and pre-fill the proposal form for you.
          </p>
        </FadeIn>

        {/* AI explainer banner */}
        <FadeIn delay={80}>
          <div style={{
            background: `linear-gradient(135deg, ${T.cy}08, ${T.br}06)`,
            border: `1px solid ${T.cy}20`, borderRadius: 14,
            padding: "20px 24px", marginBottom: 24, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30, width: 120, height: 120,
              background: `radial-gradient(circle, ${T.cy}10, transparent)`, pointerEvents: "none",
            }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: `${T.cy}15`, border: `1px solid ${T.cy}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {ICONS.bot(18, T.cy)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.tx, marginBottom: 6 }}>How it works</div>
                <div style={{ fontSize: 13, color: T.tx2, lineHeight: 1.65 }}>
                  Upload your project documents and our AI agent will automatically extract project details — site information, unit counts, construction specifications, planning references, and more. The extracted data pre-fills your proposal form, saving you from manual data entry. You can review and edit everything before submitting.
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                  {[
                    { ic: "file", label: "Upload docs" },
                    { ic: "bot", label: "AI extracts data" },
                    { ic: "clip", label: "Form pre-filled" },
                    { ic: "target", label: "Insurer matching" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: T.s3, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {ICONS[s.ic]?.(10, T.cy)}
                      </div>
                      <span style={{ fontSize: 11, color: T.tx3, fontWeight: 500 }}>{s.label}</span>
                      {i < 3 && <span style={{ color: T.tx3, fontSize: 10, marginLeft: 4 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Step 1: Choose build type */}
        <FadeIn delay={160}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.tx, marginBottom: 4 }}>
              Step 1 — Select project type
            </div>
            <div style={{ fontSize: 12, color: T.tx2, marginBottom: 14 }}>
              The documents we need depend on whether this is a new build or a conversion
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { key: "new_build", label: "New Build", desc: "Ground-up construction on a new or cleared site", ic: "bldg" },
                { key: "conversion", label: "Conversion", desc: "Converting an existing building to a new use", ic: "edit" },
              ].map(opt => {
                const sel = buildType === opt.key;
                return (
                  <div key={opt.key} onClick={() => { setBuildType(opt.key); setUploadedDocs({}); }}
                    style={{
                      background: sel ? `${T.br}10` : T.s1,
                      border: `1px solid ${sel ? T.br + "44" : T.b}`,
                      borderRadius: 12, padding: "20px 22px", cursor: "pointer",
                      transition: "all 0.2s", position: "relative", overflow: "hidden",
                    }}>
                    {sel && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.br }} />}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: sel ? T.brG : T.s3,
                        border: `1px solid ${sel ? T.br + "30" : T.b}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {ICONS[opt.ic]?.(18, sel ? T.br : T.tx3)}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: sel ? T.tx : T.tx2 }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{opt.desc}</div>
                      </div>
                    </div>
                    {sel && (
                      <div style={{
                        fontSize: 11, color: T.br, fontFamily: "monospace",
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        {ICONS.check(11, T.br)}Selected — {DOC_REQS[opt.key].length} documents required
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Step 2: Document upload checklist */}
        {buildType && (
          <FadeIn delay={240}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.tx, marginBottom: 2 }}>
                    Step 2 — Upload your documents
                  </div>
                  <div style={{ fontSize: 12, color: T.tx2 }}>
                    {uploadedCount} of {currentDocs.length} uploaded
                  </div>
                </div>
                {uploadedCount > 0 && (
                  <div style={{
                    fontSize: 11, fontFamily: "monospace", color: T.cy,
                    background: `${T.cy}12`, padding: "4px 10px", borderRadius: 6,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    {ICONS.bot(11, T.cy)}
                    AI will extract data from {uploadedCount} doc{uploadedCount !== 1 ? "s" : ""}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, borderRadius: 2, background: T.s3, marginBottom: 16 }}>
                <div style={{
                  height: 4, borderRadius: 2, transition: "width 0.4s",
                  background: allUploaded ? T.gn : T.br,
                  width: `${currentDocs.length > 0 ? (uploadedCount / currentDocs.length) * 100 : 0}%`,
                }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {currentDocs.map(doc => {
                  const uploaded = !!uploadedDocs[doc.key];
                  return (
                    <div key={doc.key} onClick={() => toggleUpload(doc.key)}
                      style={{
                        background: uploaded ? `${T.gn}08` : T.s1,
                        border: `1px solid ${uploaded ? T.gn + "30" : T.b}`,
                        borderRadius: 12, padding: "16px 20px", cursor: "pointer",
                        transition: "all 0.2s",
                      }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                          background: uploaded ? `${T.gn}15` : T.s3,
                          border: `1px solid ${uploaded ? T.gn + "30" : T.b}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          {uploaded
                            ? ICONS.check(16, T.gn)
                            : ICONS.upload(16, T.tx3)
                          }
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: uploaded ? T.tx : T.tx2 }}>
                              {doc.label}
                            </span>
                            {doc.required && !uploaded && (
                              <span style={{
                                fontSize: 9, fontWeight: 600, padding: "1px 6px", borderRadius: 3,
                                background: `${T.am}15`, color: T.am, textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}>Required</span>
                            )}
                            {uploaded && (
                              <span style={{
                                fontSize: 9, fontWeight: 600, padding: "1px 6px", borderRadius: 3,
                                background: T.gnG, color: T.gn, textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}>Uploaded</span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: T.tx3, lineHeight: 1.5 }}>
                            {doc.desc}
                          </div>
                          {uploaded && (
                            <div style={{
                              display: "flex", alignItems: "center", gap: 6, marginTop: 8,
                              fontSize: 11, color: T.cy,
                            }}>
                              {ICONS.bot(11, T.cy)}
                              AI will extract project data from this document
                            </div>
                          )}
                        </div>
                        <div style={{
                          fontSize: 11, color: uploaded ? T.gn : T.br,
                          fontWeight: 500, flexShrink: 0, marginTop: 4,
                        }}>
                          {uploaded ? "Remove" : "Upload"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue button */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 0", borderTop: `1px solid ${T.b}`,
            }}>
              <button onClick={() => { setBuildType(null); setUploadedDocs({}); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
                  borderRadius: 8, background: T.s2, border: `1px solid ${T.b}`,
                  color: T.tx2, fontSize: 12, cursor: "pointer", fontWeight: 500,
                }}>
                {ICONS.back(12, T.tx2)}Change type
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => { setFd({ ...fd, bt: buildType }); setPhase("form"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
                    borderRadius: 8, background: "transparent", border: `1px solid ${T.b}`,
                    color: T.tx2, fontSize: 12, cursor: "pointer", fontWeight: 500,
                  }}>
                  Skip for now{ICONS.chev(12, T.tx2)}
                </button>
                <button onClick={() => { setFd({ ...fd, bt: buildType }); setPhase("form"); }}
                  disabled={!allUploaded}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "10px 22px",
                    borderRadius: 8, border: "none", fontSize: 13, cursor: allUploaded ? "pointer" : "default",
                    fontWeight: 600,
                    background: allUploaded ? T.br : T.s3,
                    color: allUploaded ? "#fff" : T.tx3,
                    boxShadow: allUploaded ? `0 0 20px ${T.br}30` : "none",
                    transition: "all 0.3s",
                  }}>
                  {ICONS.zap(13, allUploaded ? "#fff" : T.tx3)}
                  Extract & Continue
                </button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    );
  }

  // ── PHASE 2: Form wizard (existing flow) ──
  return (
    <div>
      <FadeIn>
        <button onClick={() => setPhase("upload")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.tx2, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}>
          {ICONS.back(13, T.tx2)}Back to documents
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.tx, margin: "0 0 24px" }}>Add Project</h1>
      </FadeIn>

      {/* AI pre-fill banner */}
      {Object.keys(uploadedDocs).length > 0 && (
        <FadeIn delay={40}>
          <div style={{
            background: `${T.cy}08`, border: `1px solid ${T.cy}20`,
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            {ICONS.bot(14, T.cy)}
            <span style={{ fontSize: 12, color: T.cy, fontWeight: 500 }}>
              AI has pre-filled fields from your uploaded documents.
            </span>
            <span style={{ fontSize: 11, color: T.tx3, marginLeft: 4 }}>
              Review and edit as needed.
            </span>
          </div>
        </FadeIn>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        <FadeIn delay={80}>
          <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: 16 }}>
            {intakeSteps.map((s, i) => (
              <div key={s.k} onClick={() => setStep(i)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                borderRadius: 8, cursor: "pointer", marginBottom: 2,
                background: step === i ? T.brG : "transparent",
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  background: i < step ? T.gnG : step === i ? T.brG : T.s3,
                  border: `1px solid ${i < step ? T.gn + "30" : step === i ? T.br + "30" : T.b}`,
                }}>
                  {i < step ? ICONS.check(11, T.gn) : ICONS[s.ic]?.(11, step === i ? T.br : T.tx3)}
                </span>
                <span style={{ fontSize: 12, fontWeight: step === i ? 600 : 400, color: step === i ? T.tx : T.tx2 }}>{s.l}</span>
              </div>
            ))}
            <div style={{ margin: "16px 12px 8px", paddingTop: 10, borderTop: `1px solid ${T.b}` }}>
              <div style={{ fontSize: 11, color: T.tx3, marginBottom: 6 }}>Completion</div>
              <div style={{ height: 4, borderRadius: 2, background: T.s3 }}>
                <div style={{ height: 4, borderRadius: 2, background: T.br, width: `${Math.round((step / 7) * 100)}%`, transition: "width 0.4s" }} />
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              {ICONS[cur.ic]?.(16, T.br)}
              <span style={{ fontSize: 16, fontWeight: 600, color: T.tx }}>{cur.l}</span>
            </div>
            <div style={{ fontSize: 12, color: T.tx2, marginBottom: 24 }}>
              {step === 0 ? "What type of project is this?" : step === 7 ? "Review before submitting" : "Complete this section"}
            </div>

            {step === 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.tx2, marginBottom: 8 }}>Project Category</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
                  {Object.entries(CATS).map(([k, v]) => (
                    <div key={k} onClick={() => setFd({ ...fd, cat: k })} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "14px 16px",
                      borderRadius: 10, cursor: "pointer",
                      background: fd.cat === k ? T.brG : T.s2,
                      border: `1px solid ${fd.cat === k ? T.br + "44" : T.b}`,
                    }}>
                      {ICONS[v.icon]?.(18, fd.cat === k ? T.br : T.tx3)}
                      <span style={{ fontSize: 12, fontWeight: 500, color: fd.cat === k ? T.tx : T.tx2 }}>{v.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.tx2, marginBottom: 8 }}>Build Type</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["new_build", "New Build"], ["conversion", "Conversion"], ["refurbishment", "Refurbishment"], ["extension", "Extension"]].map(([k, l]) => (
                    <div key={k} onClick={() => setFd({ ...fd, bt: k })} style={{
                      flex: 1, padding: "12px 16px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                      background: fd.bt === k ? T.brG : T.s2, border: `1px solid ${fd.bt === k ? T.br + "44" : T.b}`,
                      fontSize: 12, fontWeight: 500, color: fd.bt === k ? T.tx : T.tx2,
                    }}>{l}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["Scheme Title", "Riverside Apartments — 42 Unit BTR"], ["Site Address", "Plot 7, Riverside Quarter"], ["City", "Manchester"], ["Postcode", "M3 4LQ"]].map(([l, v]) => (
                  <div key={l}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: T.tx2, marginBottom: 6 }}>{l}</label>
                    <input defaultValue={v} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, background: T.s2, border: `1px solid ${T.b}`, color: T.tx, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Project Value", "8,500,000"], ["GDV", "14,200,000"], ["Units", "42"], ["Storeys", "8"]].map(([l, v]) => (
                  <div key={l}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: T.tx2, marginBottom: 6 }}>{l}</label>
                    <input defaultValue={v} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, background: T.s2, border: `1px solid ${T.b}`, color: T.tx, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            )}

            {step > 2 && step < 7 && (
              <div style={{ padding: 40, textAlign: "center", color: T.tx3 }}>
                {ICONS[cur.ic]?.(24, T.tx3)}
                <p style={{ marginTop: 10, fontSize: 13, color: T.tx2 }}>Complete the {cur.l.toLowerCase()} section</p>
              </div>
            )}

            {step === 7 && (
              <div>
                <div style={{ background: T.gnG, border: `1px solid ${T.gn}30`, borderRadius: 10, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12 }}>
                  {ICONS.check(16, T.gn)}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.gn, marginBottom: 4 }}>Ready to submit</div>
                    <p style={{ fontSize: 12, color: T.tx2, margin: 0 }}>AI matching will evaluate against all UK LDI insurers.</p>
                  </div>
                </div>
                {[["Type", "Build to Rent — New Build"], ["Title", "Riverside Apartments — 42 Unit BTR"], ["Location", "Manchester, M3 4LQ"], ["Value", "\u00A38,500,000"], ["Units", "42"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.b}`, fontSize: 13 }}>
                    <span style={{ color: T.tx3 }}>{k}</span>
                    <span style={{ color: T.tx, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${T.b}` }}>
              <button onClick={() => step > 0 ? setStep(step - 1) : setPhase("upload")} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8,
                background: T.s2, border: `1px solid ${T.b}`, fontSize: 12, cursor: "pointer",
                color: T.tx2,
              }}>{ICONS.back(12, T.tx2)}{step > 0 ? "Previous" : "Back to docs"}</button>
              {step < 7 ? (
                <button onClick={() => setStep(step + 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 8, background: T.br, border: "none", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  Continue{ICONS.chev(12, "#fff")}
                </button>
              ) : (
                <button onClick={() => nav("matching")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 8, background: T.gn, border: "none", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  {ICONS.zap(13, "#fff")}Submit & Match
                </button>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

/* ══════ MATCHING RESULTS ══════ */
function Matching({ nav }) {
  const [ld, setLd] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLd(false), 2200); return () => clearTimeout(t); }, []);

  if (ld) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
      <style>{`@keyframes p{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@keyframes lb{0%{width:0}100%{width:100%}}`}</style>
      <div style={{ width: 60, height: 60, borderRadius: 16, background: T.brG, border: `1px solid ${T.br}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, animation: "p 1.5s ease-in-out infinite" }}>{ICONS.bot(28, T.br)}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.tx, marginBottom: 6 }}>Running AI Matching Engine</div>
      <div style={{ fontSize: 13, color: T.tx2, marginBottom: 20 }}>Evaluating against 8 UK LDI insurers...</div>
      <div style={{ width: 200, height: 3, borderRadius: 2, background: T.s3, overflow: "hidden" }}>
        <div style={{ height: 3, borderRadius: 2, background: T.br, animation: "lb 2s ease-in-out forwards" }} />
      </div>
    </div>
  );

  return (
    <div>
      <FadeIn>
        <button onClick={() => nav("detail")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.tx2, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}>{ICONS.back(13, T.tx2)}Back to Scheme</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: T.tx, margin: "0 0 4px" }}>Matching Results</h1>
            <p style={{ fontSize: 13, color: T.tx2, margin: 0 }}>SCH-2847 · Riverside Apartments</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontFamily: "monospace", color: T.gn, background: T.gnG, padding: "5px 12px", borderRadius: 6 }}>
            {ICONS.shield(11, T.gn)}confidence: 0.91
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ background: T.s2, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${T.b}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: T.brG, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS.bot(14, T.br)}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>AI Summary</span>
          </div>
          <p style={{ fontSize: 13, color: T.tx2, lineHeight: 1.65, margin: 0 }}>
            Evaluated 8 insurers. 3 strong appetite: <strong style={{ color: T.tx }}>Ark Insurance</strong>, <strong style={{ color: T.tx }}>Premier Guarantee</strong>, <strong style={{ color: T.tx }}>Protek Warranty</strong>. Premier most competitive on pricing. Ark broadest coverage — recommended if lender requires named insurer.
          </p>
        </div>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {matchData.map((m, i) => <FadeIn key={i} delay={200 + i * 60}><MatchCard m={m} rank={i + 1} /></FadeIn>)}
      </div>
    </div>
  );
}

/* ══════ BOUNCING DOTS ══════ */
function BounceDots({ active, color = T.cy }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", height: 16 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: "50%", background: color,
          animation: active ? `bounce 1.2s ${i * 0.15}s ease-in-out infinite` : "none",
          opacity: active ? 1 : 0.35,
        }} />
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  );
}

/* ══════ AGENT PANEL ══════ */
function AgentPanel({ open, onClose }) {
  const running = agentTasks.filter(t => t.status === "running");
  const queued = agentTasks.filter(t => t.status === "queued");
  const done = agentTasks.filter(t => t.status === "done");

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 240, right: 0, top: 0, zIndex: 45,
      display: "flex", justifyContent: "flex-start",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 420, height: "100%", background: T.s1,
        borderRight: `1px solid ${T.b}`, display: "flex", flexDirection: "column",
        boxShadow: "8px 0 40px rgba(0,0,0,0.5)",
        animation: "slideIn 0.25s ease-out",
      }}>
        <style>{`@keyframes slideIn{from{transform:translateX(-20px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

        {/* Header */}
        <div style={{
          padding: "18px 20px", borderBottom: `1px solid ${T.b}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: `linear-gradient(135deg, ${T.cy}20, ${T.br}20)`,
              border: `1px solid ${T.cy}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {ICONS.bot(16, T.cy)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.tx }}>My Agent</div>
              <div style={{ fontSize: 11, color: T.cy, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cy, boxShadow: `0 0 8px ${T.cy}` }} />
                {running.length} active · {queued.length} queued
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 6, background: T.s3,
            border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            {ICONS.x(14, T.tx3)}
          </button>
        </div>

        {/* Task list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {/* Running */}
          {running.length > 0 && (
            <div style={{ padding: "0 16px", marginBottom: 16 }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: T.cy, textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
              }}>
                <BounceDots active={true} />
                Running ({running.length})
              </div>
              {running.map(task => {
                const tic = agentTaskIcons[task.type] || "bot";
                return (
                  <div key={task.id} style={{
                    background: T.s2, border: `1px solid ${T.b}`, borderRadius: 10,
                    padding: "14px 16px", marginBottom: 8, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, height: 2,
                      width: `${task.progress}%`, background: T.cy,
                      transition: "width 1s ease",
                    }} />
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: `${T.cy}12`, border: `1px solid ${T.cy}25`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {ICONS[tic]?.(14, T.cy)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.tx, marginBottom: 3 }}>{task.title}</div>
                        <div style={{ fontSize: 11, color: T.tx2, lineHeight: 1.5, marginBottom: 8 }}>{task.detail}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 3, borderRadius: 2, background: T.s3 }}>
                            <div style={{
                              height: 3, borderRadius: 2, background: T.cy,
                              width: `${task.progress}%`, transition: "width 0.5s",
                            }} />
                          </div>
                          <span style={{ fontSize: 11, fontFamily: "monospace", color: T.cy, fontWeight: 600, flexShrink: 0 }}>{task.progress}%</span>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 10, color: T.tx3 }}>
                          <span style={{
                            padding: "1px 6px", borderRadius: 3, background: T.s3,
                          }}>{task.scheme}</span>
                          <span>{task.started}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Queued */}
          {queued.length > 0 && (
            <div style={{ padding: "0 16px", marginBottom: 16 }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: T.am, textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
              }}>
                {ICONS.clock(10, T.am)}
                Queued ({queued.length})
              </div>
              {queued.map(task => {
                const tic = agentTaskIcons[task.type] || "bot";
                return (
                  <div key={task.id} style={{
                    background: T.s2, border: `1px solid ${T.b}`, borderRadius: 10,
                    padding: "12px 16px", marginBottom: 8, opacity: 0.7,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: T.s3, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {ICONS[tic]?.(14, T.tx3)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: T.tx2 }}>{task.title}</div>
                        <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{task.detail}</div>
                        <span style={{
                          fontSize: 10, padding: "1px 6px", borderRadius: 3,
                          background: T.s3, color: T.tx3, marginTop: 4, display: "inline-block",
                        }}>{task.scheme}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Done */}
          {done.length > 0 && (
            <div style={{ padding: "0 16px" }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: T.gn, textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
              }}>
                {ICONS.check(10, T.gn)}
                Completed ({done.length})
              </div>
              {done.map(task => {
                const tic = agentTaskIcons[task.type] || "bot";
                return (
                  <div key={task.id} style={{
                    background: T.s2, border: `1px solid ${T.b}`, borderRadius: 10,
                    padding: "12px 16px", marginBottom: 8, opacity: 0.5,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: `${T.gn}10`, border: `1px solid ${T.gn}20`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {ICONS.check(14, T.gn)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: T.tx2, textDecoration: "line-through", textDecorationColor: T.tx3 }}>{task.title}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 3, fontSize: 10, color: T.tx3 }}>
                          <span style={{ padding: "1px 6px", borderRadius: 3, background: T.s3 }}>{task.scheme}</span>
                          <span>{task.started}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 20px", borderTop: `1px solid ${T.b}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 11, color: T.tx3 }}>
            {running.length + queued.length + done.length} total tasks today
          </div>
          <div style={{
            fontSize: 10, fontFamily: "monospace", color: T.cy,
            background: `${T.cy}12`, padding: "3px 8px", borderRadius: 4,
          }}>
            agent v1.0
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════ APP SHELL ══════ */
const NAV_PRIMARY = [
  { key: "dashboard", label: "Dashboard", ic: "home" },
  { key: "schemes", label: "My Projects", ic: "folder" },
  { key: "intake", label: "Add Project", ic: "plus" },
];
const NAV_SECONDARY = [
  { key: "messages", label: "Messages", ic: "msg", badge: 3 },
  { key: "quotes", label: "Quotes", ic: "quote" },
  { key: "documents", label: "Documents", ic: "file" },
  { key: "survey", label: "Survey Portal", ic: "survey" },
  { key: "settings", label: "Settings", ic: "gear" },
];

export default function App() {
  const [pg, setPg] = useState("dashboard");
  const [no, setNo] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const activeCount = agentTasks.filter(t => t.status === "running").length;
  const queuedCount = agentTasks.filter(t => t.status === "queued").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, color: T.tx, fontFamily: "'Manrope',-apple-system,sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <aside style={{ width: 240, background: T.s1, borderRight: `1px solid ${T.b}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40 }}>
        <div style={{ padding: "20px 22px", borderBottom: `1px solid ${T.b}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${T.br},${T.cy})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ICONS.layers(14, "#fff")}
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>diggr<span style={{ color: T.br }}>.ai</span></span>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {NAV_PRIMARY.map(item => (
            <div key={item.key} onClick={() => setPg(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              borderRadius: 9, cursor: "pointer", marginBottom: 2,
              background: pg === item.key ? T.brG : "transparent",
              color: pg === item.key ? T.br : T.tx2,
            }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: pg === item.key ? T.br + "22" : T.s3 }}>
                {ICONS[item.ic]?.(13, pg === item.key ? T.br : T.tx3)}
              </span>
              <span style={{ fontSize: 13, fontWeight: pg === item.key ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}

          <div style={{ margin: "12px 14px", borderTop: `1px solid ${T.b}` }} />
          <div style={{ padding: "0 14px 6px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.tx3, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Platform</div>
          </div>

          {NAV_SECONDARY.map(item => (
            <div key={item.key} onClick={() => setPg(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 14px",
              borderRadius: 9, cursor: "pointer", marginBottom: 1,
              background: pg === item.key ? T.brG : "transparent",
              color: pg === item.key ? T.br : T.tx2,
            }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: pg === item.key ? T.br + "22" : T.s3 }}>
                {ICONS[item.ic]?.(13, pg === item.key ? T.br : T.tx3)}
              </span>
              <span style={{ fontSize: 13, fontWeight: pg === item.key ? 600 : 400 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 700, minWidth: 18, height: 18,
                  borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                  background: T.br, color: "#fff",
                }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Agent section */}
        <div onClick={() => setAgentOpen(true)} style={{
          margin: "0 10px", padding: "12px 14px", borderRadius: 10, cursor: "pointer",
          background: `linear-gradient(135deg, ${T.cy}08, ${T.br}06)`,
          border: `1px solid ${T.cy}20`,
          transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: `${T.cy}18`, border: `1px solid ${T.cy}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {ICONS.bot(12, T.cy)}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.tx }}>My Agent</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <BounceDots active={activeCount > 0} />
              {(activeCount + queuedCount) > 0 && (
                <span style={{
                  fontSize: 10, fontWeight: 700, color: T.cy, fontFamily: "monospace",
                  background: `${T.cy}18`, padding: "1px 6px", borderRadius: 4,
                }}>
                  {activeCount + queuedCount}
                </span>
              )}
            </div>
          </div>
          <div style={{ fontSize: 10, color: T.tx3, lineHeight: 1.4 }}>
            {activeCount > 0
              ? `${activeCount} task${activeCount > 1 ? "s" : ""} running`
              : "No active tasks"
            }
            {queuedCount > 0 && ` · ${queuedCount} queued`}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.b}`, padding: "14px 16px", marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${T.pr},${T.br})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>JM</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.tx }}>James Mitchell</div>
              <div style={{ fontSize: 10, color: T.tx3 }}>Thames Developments</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header style={{ height: 56, borderBottom: `1px solid ${T.b}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", background: `${T.s1}cc`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: T.s2, border: `1px solid ${T.b}`, width: 280 }}>
            {ICONS.search(13, T.tx3)}
            <span style={{ color: T.tx3, fontSize: 12 }}>Search schemes, insurers...</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "monospace", color: T.tx3, background: T.s2, padding: "4px 10px", borderRadius: 6, border: `1px solid ${T.b}` }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.gn }} />8 insurers
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => setNo(!no)} style={{ width: 34, height: 34, borderRadius: 8, background: T.s2, border: `1px solid ${T.b}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                {ICONS.bell(15, T.tx2)}
                <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: T.rd, border: `2px solid ${T.s1}` }} />
              </button>
              {no && (
                <div style={{ position: "absolute", top: 42, right: 0, width: 360, background: T.s1, border: `1px solid ${T.b}`, borderRadius: 12, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", overflow: "hidden", zIndex: 50 }}>
                  <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.b}`, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Notifications</span>
                    <span style={{ fontSize: 11, color: T.br, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {notifs.map(n => (
                    <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${T.b}`, background: n.ur ? T.s2 : "transparent", cursor: "pointer", display: "flex", gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {ICONS[n.ic]?.(13, T.tx3)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: n.ur ? 600 : 400, color: T.tx }}>{n.title}</div>
                        <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{n.sch} · {n.time}</div>
                      </div>
                      {n.ur && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.br, marginTop: 6 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: 28, maxWidth: 1100 }} onClick={() => { no && setNo(false); }}>
          {pg === "dashboard" && <Dashboard nav={setPg} />}
          {pg === "schemes" && <Schemes nav={setPg} />}
          {pg === "detail" && <Detail nav={setPg} />}
          {pg === "intake" && <Intake nav={setPg} />}
          {pg === "matching" && <Matching nav={setPg} />}
          {pg === "messages" && (
            <FadeIn>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px" }}>Messages</h1>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 24 }}>In-platform communication with insurers and stakeholders</p>
              <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
                {[
                  { from: "Ark Insurance Group", subj: "RE: Ground conditions — SCH-2847", time: "12 min ago", ur: true, preview: "Thanks for the report. Could you also confirm the pile depth specification..." },
                  { from: "Premier Guarantee", subj: "Indication submitted — SCH-2847", time: "1h ago", ur: true, preview: "Please find attached our indication for the Riverside Apartments scheme..." },
                  { from: "LABC Warranty", subj: "Additional information required — SCH-2846", time: "3h ago", ur: false, preview: "We require the structural engineer's professional indemnity certificate..." },
                  { from: "Protek Warranty", subj: "Enhanced wording terms — SCH-2847", time: "1d ago", ur: false, preview: "Following our discussion, please find the enhanced wording document..." },
                  { from: "AHCI", subj: "Submission received — SCH-2845", time: "2d ago", ur: false, preview: "We confirm receipt of your submission for Park View Social Housing..." },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", padding: "16px 20px", borderBottom: `1px solid ${T.b}`, gap: 14, cursor: "pointer", background: m.ur ? `${T.br}06` : "transparent" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: m.ur ? T.brG : T.s3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      {ICONS.msg(15, m.ur ? T.br : T.tx3)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: m.ur ? 600 : 500, color: T.tx }}>{m.from}</span>
                        <span style={{ fontSize: 11, color: T.tx3, flexShrink: 0 }}>{m.time}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: m.ur ? 600 : 400, color: m.ur ? T.tx : T.tx2, marginBottom: 2 }}>{m.subj}</div>
                      <div style={{ fontSize: 12, color: T.tx3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
                    </div>
                    {m.ur && <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.br, flexShrink: 0, marginTop: 8 }} />}
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          {pg === "quotes" && (
            <FadeIn>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px" }}>Quotes</h1>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 24 }}>Indications, formal terms, and comparisons across all projects</p>
              <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
                {[
                  { insurer: "Premier Guarantee", scheme: "SCH-2847", type: "Indication", premium: "\u00A316,800", dlp: "10 yr", status: "active", sc: T.gn },
                  { insurer: "Ark Insurance Group", scheme: "SCH-2847", type: "Indication", premium: "\u00A318,200", dlp: "12 yr", status: "active", sc: T.gn },
                  { insurer: "Protek Warranty", scheme: "SCH-2847", type: "Formal Terms", premium: "\u00A317,400", dlp: "10 yr", status: "active", sc: T.cy },
                  { insurer: "AHCI", scheme: "SCH-2845", type: "Indication", premium: "\u00A324,600", dlp: "10 yr", status: "pending", sc: T.am },
                  { insurer: "Build-Zone", scheme: "SCH-2843", type: "Indication", premium: "\u00A32,100", dlp: "10 yr", status: "expired", sc: T.tx3 },
                ].map((q, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${T.b}`, gap: 16 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {ICONS.quote(15, T.tx3)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>{q.insurer}</div>
                      <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{q.scheme} · {q.type} · {q.dlp} DLP</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.tx, marginRight: 12 }}>{q.premium}</div>
                    <Badge color={q.sc}>{q.status}</Badge>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          {pg === "documents" && (
            <FadeIn>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px" }}>Documents</h1>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 24 }}>All documents across projects — uploaded, extracted, and generated</p>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["All", "Planning", "Structural", "Schedule", "Certificates", "Generated"].map(f => (
                  <button key={f} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", background: f === "All" ? T.brG : "transparent", color: f === "All" ? T.br : T.tx2, border: `1px solid ${f === "All" ? T.br + "33" : T.b}` }}>{f}</button>
                ))}
              </div>
              <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
                {[
                  { n: "Planning Permission — MCC/2025/0847.pdf", sch: "SCH-2847", st: "extracted", sz: "2.4 MB", cat: "Planning" },
                  { n: "Site Plan — Riverside Quarter Plot 7.pdf", sch: "SCH-2847", st: "extracted", sz: "8.1 MB", cat: "Site Plan" },
                  { n: "Structural Engineer Report.pdf", sch: "SCH-2847", st: "extracted", sz: "5.7 MB", cat: "Structural" },
                  { n: "AI Comparison Report — SCH-2847.pdf", sch: "SCH-2847", st: "generated", sz: "340 KB", cat: "Generated" },
                  { n: "Schedule of Works — Rev C.xlsx", sch: "SCH-2846", st: "processing", sz: "1.2 MB", cat: "Schedule" },
                  { n: "Ground Investigation Report.pdf", sch: "SCH-2843", st: "uploaded", sz: "12.3 MB", cat: "Ground" },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${T.b}`, gap: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS.file(16, T.tx3)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T.tx }}>{d.n}</div>
                      <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{d.sch} · {d.cat} · {d.sz}</div>
                    </div>
                    <Badge color={d.st === "extracted" ? T.gn : d.st === "processing" ? T.am : d.st === "generated" ? T.cy : T.tx3}>{d.st}</Badge>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          {pg === "survey" && (
            <FadeIn>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px" }}>Survey Portal</h1>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 24 }}>Inspection scheduling, milestones, and surveyor coordination</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
                {[
                  { l: "Active Surveys", v: "2", ic: "survey", c: T.br },
                  { l: "Upcoming Inspections", v: "3", ic: "cal", c: T.am },
                  { l: "Issues Open", v: "1", ic: "warn", c: T.rd },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "20px 22px" }}>
                    <div style={{ marginBottom: 10, opacity: 0.7 }}>{ICONS[s.ic]?.(18, s.c)}</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: T.tx2, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.b}`, fontSize: 14, fontWeight: 600, color: T.tx, display: "flex", alignItems: "center", gap: 8 }}>
                  {ICONS.cal(14, T.tx2)}Upcoming Milestones
                </div>
                {[
                  { scheme: "SCH-2844", milestone: "Foundation inspection", date: "2 Apr 2026", surveyor: "Smith & Partners", status: "scheduled" },
                  { scheme: "SCH-2844", milestone: "Frame stage inspection", date: "18 May 2026", surveyor: "Smith & Partners", status: "upcoming" },
                  { scheme: "SCH-2845", milestone: "Pre-completion review", date: "6 Apr 2026", surveyor: "BRS Surveyors", status: "scheduled" },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${T.b}`, gap: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS.survey(15, T.tx3)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T.tx }}>{m.milestone}</div>
                      <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{m.scheme} · {m.surveyor} · {m.date}</div>
                    </div>
                    <Badge color={m.status === "scheduled" ? T.gn : T.am}>{m.status}</Badge>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          {pg === "settings" && (
            <FadeIn>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px" }}>Settings</h1>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 24 }}>Account, organisation, and platform preferences</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { title: "Profile", desc: "Name, email, password, MFA", ic: "users" },
                  { title: "Organisation", desc: "Company details, team members", ic: "bldg" },
                  { title: "Notifications", desc: "Email and in-app preferences", ic: "bell" },
                  { title: "Integrations", desc: "Connected services and API keys", ic: "link" },
                  { title: "Billing", desc: "Subscription, invoices, payment method", ic: "pound" },
                  { title: "Agent Preferences", desc: "Auto-actions, approval thresholds", ic: "bot" },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.s1, border: `1px solid ${T.b}`, borderRadius: 14, padding: "20px 22px", cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: T.s3, display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS[s.ic]?.(16, T.tx2)}</div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: T.tx }}>{s.title}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.tx3 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </main>
      </div>

      {/* Agent Panel Overlay */}
      <AgentPanel open={agentOpen} onClose={() => setAgentOpen(false)} />
    </div>
  );
}
