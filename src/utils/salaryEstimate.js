/**
 * Illustrative India market ranges (INR, annual). Not a guarantee of offers.
 * Bases are approximate median-style anchors for full-time roles; adjusted by experience, location, org type.
 */

/** @typedef {'0-1'|'1-3'|'3-5'|'5-8'|'8+'} ExperienceKey */
/** @typedef {'metro'|'tier1'|'tier2'|'other'} LocationKey */
/** @typedef {'startup'|'sme'|'enterprise'} OrgKey */

export const EXPERIENCE_KEYS = ["0-1", "1-3", "3-5", "5-8", "8+"];

export const EXPERIENCE_LABELS = {
  "0-1": "0–1 years",
  "1-3": "1–3 years",
  "3-5": "3–5 years",
  "5-8": "5–8 years",
  "8+": "8+ years",
};

/** Multipliers on base salary (experience band) */
const EXP_MULT = {
  "0-1": 0.88,
  "1-3": 1,
  "3-5": 1.22,
  "5-8": 1.45,
  "8+": 1.68,
};

const LOC_MULT = {
  metro: 1.14,
  tier1: 1.06,
  tier2: 0.98,
  other: 0.92,
};

const ORG_MULT = {
  startup: 0.94,
  sme: 1,
  enterprise: 1.08,
};

/**
 * Median-style annual base in INR by job family (India, blended white/blue collar anchors).
 * Values are before multipliers; tuned for order-of-magnitude estimates only.
 */
export const JOB_FAMILIES = [
  { id: "swe", label: "Software / IT", base: 920_000 },
  { id: "data", label: "Data / Analytics", base: 880_000 },
  { id: "product", label: "Product / UX", base: 1_000_000 },
  { id: "sales", label: "Sales / BD", base: 620_000 },
  { id: "mkt", label: "Marketing / Content", base: 580_000 },
  { id: "ops", label: "Operations / Admin", base: 520_000 },
  { id: "hr", label: "HR / Recruiting", base: 560_000 },
  { id: "finance", label: "Finance / Accounting", base: 640_000 },
  { id: "eng", label: "Engineering (non-IT)", base: 480_000 },
  { id: "field", label: "Field / Site / Technician", base: 360_000 },
  { id: "support", label: "Customer support", base: 380_000 },
];

/**
 * Round to a clean INR figure for display (nearest ₹10k in lakhs range).
 * @param {number} n
 */
export function roundSalaryInr(n) {
  if (!Number.isFinite(n) || n <= 0) return 0;
  const abs = Math.abs(n);
  if (abs >= 100_000) return Math.round(n / 10_000) * 10_000;
  if (abs >= 10_000) return Math.round(n / 1_000) * 1_000;
  return Math.round(n);
}

/**
 * @param {{
 *   familyId: string,
 *   experience: ExperienceKey,
 *   location: LocationKey,
 *   org: OrgKey,
 * }} input
 */
export function computeSalaryEstimate(input) {
  const family = JOB_FAMILIES.find((f) => f.id === input.familyId) || JOB_FAMILIES[0];
  const base = family.base;
  const exp = EXP_MULT[input.experience] ?? EXP_MULT["1-3"];
  const loc = LOC_MULT[input.location] ?? LOC_MULT.tier1;
  const org = ORG_MULT[input.org] ?? ORG_MULT.sme;

  const mid = base * exp * loc * org;
  const low = roundSalaryInr(mid * 0.82);
  const high = roundSalaryInr(mid * 1.18);
  const midpoint = roundSalaryInr(mid);

  const monthlyBeforeTax = roundSalaryInr(midpoint / 12);
  const monthlyLow = roundSalaryInr(low / 12);
  const monthlyHigh = roundSalaryInr(high / 12);

  return {
    familyLabel: family.label,
    annualLow: low,
    annualHigh: high,
    annualMid: midpoint,
    monthlyLow,
    monthlyHigh,
    monthlyMid: monthlyBeforeTax,
    /** Simple FY ballpark for user education only */
    approxTakeHomeAnnual: roundSalaryInr(midpoint * 0.72),
  };
}

export function formatInr(n) {
  return `₹${roundSalaryInr(n).toLocaleString("en-IN")}`;
}

export function formatLakh(n) {
  const r = roundSalaryInr(n);
  const lakhs = r / 100_000;
  if (lakhs >= 1) return `₹${lakhs.toFixed(1)} LPA`;
  return formatInr(r);
}
