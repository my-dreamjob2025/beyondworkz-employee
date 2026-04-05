import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";
import {
  JOB_FAMILIES,
  EXPERIENCE_LABELS,
  computeSalaryEstimate,
  formatInr,
  formatLakh,
} from "../../utils/salaryEstimate";

const LOCATION_OPTIONS = [
  { id: "metro", label: "Metro (Mumbai, Bangalore, Delhi NCR, …)" },
  { id: "tier1", label: "Tier-1 city" },
  { id: "tier2", label: "Tier-2 / emerging hubs" },
  { id: "other", label: "Other locations" },
];

const ORG_OPTIONS = [
  { id: "startup", label: "Startup / early-stage" },
  { id: "sme", label: "SME / mid-size" },
  { id: "enterprise", label: "Large enterprise" },
];

function readParams(sp) {
  return {
    category: sp.get("category") || "swe",
    exp: sp.get("exp") || "1-3",
    loc: sp.get("loc") || "tier1",
    org: sp.get("org") || "sme",
  };
}

function buildParams(category, experience, location, org) {
  const p = new URLSearchParams();
  p.set("category", category);
  p.set("exp", experience);
  p.set("loc", location);
  p.set("org", org);
  return p;
}

export default function SalaryCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = readParams(searchParams);

  const [category, setCategory] = useState(initial.category);
  const [experience, setExperience] = useState(initial.exp);
  const [location, setLocation] = useState(initial.loc);
  const [org, setOrg] = useState(initial.org);
  const [copyState, setCopyState] = useState("");

  useEffect(() => {
    const p = readParams(searchParams);
    setCategory(p.category);
    setExperience(p.exp);
    setLocation(p.loc);
    setOrg(p.org);
  }, [searchParams]);

  const pushAll = useCallback(
    (cat, exp, loc, orgVal) => {
      setSearchParams(buildParams(cat, exp, loc, orgVal), { replace: true });
    },
    [setSearchParams]
  );

  const result = useMemo(
    () =>
      computeSalaryEstimate({
        familyId: category,
        experience,
        location,
        org,
      }),
    [category, experience, location, org]
  );

  const summaryText = useMemo(() => {
    const fam = JOB_FAMILIES.find((f) => f.id === category)?.label || "";
    return [
      `Beyond Workz salary estimate (illustrative)`,
      `Role: ${fam}`,
      `Experience: ${EXPERIENCE_LABELS[experience] || experience}`,
      `Annual range: ${formatInr(result.annualLow)} – ${formatInr(result.annualHigh)}`,
      `Approx. monthly (before tax, mid): ${formatInr(result.monthlyMid)}`,
      `Not a guarantee of actual offers.`,
    ].join("\n");
  }, [category, experience, result]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const p = buildParams(category, experience, location, org);
    return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
  }, [category, experience, location, org]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopyState("Copied summary");
      setTimeout(() => setCopyState(""), 2500);
    } catch {
      setCopyState("Copy failed");
      setTimeout(() => setCopyState(""), 2500);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("Link copied");
      setTimeout(() => setCopyState(""), 2500);
    } catch {
      setCopyState("Copy failed");
      setTimeout(() => setCopyState(""), 2500);
    }
  };

  const reset = () => {
    const cat = "swe";
    const exp = "1-3";
    const loc = "tier1";
    const orgVal = "sme";
    setCategory(cat);
    setExperience(exp);
    setLocation(loc);
    setOrg(orgVal);
    pushAll(cat, exp, loc, orgVal);
  };

  return (
    <PublicMarketingLayout>
      <div className="bg-slate-50">
        <div className="border-b border-amber-200/80 bg-amber-50/90 px-4 py-3 text-center text-sm text-amber-950">
          <strong>Illustrative only.</strong> Ranges are modeled for discussion—not offers, tax advice, or CTC
          breakdowns. Check real listings on{" "}
          <Link to="/jobs" className="font-semibold underline">
            job search
          </Link>
          .
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:grid lg:grid-cols-5 lg:gap-10 lg:py-16">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">Tools</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Salary calculator
            </h1>
            <p className="mt-4 leading-relaxed text-slate-600">
              Tune role family, experience, location, and organization type. We return a reasonable annual band in INR
              plus a simple monthly midpoint (before tax).
            </p>

            <ul className="mt-8 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-emerald-600" aria-hidden>
                  ✓
                </span>
                Shareable URL (bookmark or send to a mentor)
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600" aria-hidden>
                  ✓
                </span>
                India-focused rounding (₹ lakhs-style clarity)
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600" aria-hidden>
                  ✓
                </span>
                Copy summary for notes or email
              </li>
            </ul>
          </div>

          <div className="mt-10 lg:col-span-3 lg:mt-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <fieldset className="space-y-5">
                <legend className="sr-only">Salary estimate inputs</legend>

                <div>
                  <label htmlFor="sal-category" className="block text-sm font-semibold text-slate-800">
                    Job family
                  </label>
                  <select
                    id="sal-category"
                    value={category}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCategory(v);
                      pushAll(v, experience, location, org);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    {JOB_FAMILIES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sal-exp" className="block text-sm font-semibold text-slate-800">
                    Experience
                  </label>
                  <select
                    id="sal-exp"
                    value={experience}
                    onChange={(e) => {
                      const v = e.target.value;
                      setExperience(v);
                      pushAll(category, v, location, org);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    {Object.entries(EXPERIENCE_LABELS).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sal-loc" className="block text-sm font-semibold text-slate-800">
                    Location band
                  </label>
                  <select
                    id="sal-loc"
                    value={location}
                    onChange={(e) => {
                      const v = e.target.value;
                      setLocation(v);
                      pushAll(category, experience, v, org);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    {LOCATION_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sal-org" className="block text-sm font-semibold text-slate-800">
                    Organization type
                  </label>
                  <select
                    id="sal-org"
                    value={org}
                    onChange={(e) => {
                      const v = e.target.value;
                      setOrg(v);
                      pushAll(category, experience, location, v);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    {ORG_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reset defaults
                </button>
                {copyState ? (
                  <span className="self-center text-sm font-medium text-emerald-700" role="status">
                    {copyState}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl bg-[#0B1B33] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Estimated annual (INR)</p>
                <p className="mt-1 text-2xl font-bold tabular-nums sm:text-3xl">
                  {formatInr(result.annualLow)} <span className="font-normal text-slate-400">–</span>{" "}
                  {formatInr(result.annualHigh)}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Midpoint ≈ {formatLakh(result.annualMid)} · {result.familyLabel}
                </p>
              </div>
              <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-slate-400">Monthly (before tax, mid)</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{formatInr(result.monthlyMid)}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Range: {formatInr(result.monthlyLow)} – {formatInr(result.monthlyHigh)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Rough take-home (FY, illustrative)</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{formatInr(result.approxTakeHomeAnnual)} / yr</p>
                  <p className="mt-1 text-xs text-slate-500">Very rough; depends on regime & components</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Copy estimate
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="rounded-lg bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300"
                >
                  Copy share link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
