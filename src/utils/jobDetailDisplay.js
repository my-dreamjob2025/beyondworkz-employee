/** Format JobPost public payload sections for the job detail page */

const BENEFIT_LABELS = [
  ["healthInsurance", "Health insurance"],
  ["travelAllowance", "Travel allowance"],
  ["pf", "Provident fund (PF)"],
  ["esi", "ESI coverage"],
  ["incentives", "Performance incentives"],
];

const BONUS_LABELS = [
  ["performance", "Performance bonus"],
  ["joining", "Joining bonus"],
  ["commission", "Commission structure"],
];

export function benefitLabelsFromJob(benefits) {
  if (!benefits || typeof benefits !== "object") return [];
  return BENEFIT_LABELS.filter(([key]) => benefits[key]).map(([, label]) => label);
}

export function bonusLabelsFromJob(bonuses) {
  if (!bonuses || typeof bonuses !== "object") return [];
  return BONUS_LABELS.filter(([key]) => bonuses[key]).map(([, label]) => label);
}

const SCREENING_FLAG_LABELS = [
  ["experience", "We will review your experience against the role"],
  ["locationComfort", "Comfort working at this location matters"],
  ["immediateJoin", "Immediate availability is a plus"],
  ["salaryComfort", "Salary fit may be part of screening"],
];

/**
 * Items to show under "Screening & application" for candidates.
 */
export function screeningHighlights(screening) {
  if (!screening || typeof screening !== "object") return { flags: [], customQuestions: [], prefs: [] };

  const flags = SCREENING_FLAG_LABELS.filter(([key]) => screening[key]).map(([, label]) => label);

  const prefs = [];
  const pe = String(screening.preferredExperience || "").trim();
  const ped = String(screening.preferredEducation || "").trim();
  if (pe) prefs.push({ label: "Preferred experience", value: pe });
  if (ped) prefs.push({ label: "Preferred education", value: ped });

  const customQuestions = Array.isArray(screening.customQuestions)
    ? screening.customQuestions.map((q) => String(q).trim()).filter(Boolean)
    : [];

  return { flags, customQuestions, prefs };
}

export function hasScreeningSection(screening) {
  const { flags, customQuestions, prefs } = screeningHighlights(screening);
  return flags.length > 0 || customQuestions.length > 0 || prefs.length > 0;
}

export function openingsLabel(count) {
  const n = typeof count === "number" && count >= 1 ? count : 1;
  return n === 1 ? "1 opening" : `${n} openings`;
}
