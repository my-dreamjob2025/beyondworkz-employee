import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

const QUICK = [
  { label: "Tech & IT roles", q: "developer", city: "" },
  { label: "Pune opportunities", q: "", city: "Pune" },
  { label: "Full-time", q: "", city: "", type: "Full Time" },
];

export default function BrowseCompaniesPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function goSearch(overrides = {}) {
    const params = new URLSearchParams();
    const query = overrides.q !== undefined ? overrides.q : q.trim();
    const c = overrides.city !== undefined ? overrides.city : city.trim();
    const type = overrides.type;
    if (query) params.set("q", query);
    if (c) params.set("city", c);
    if (type) params.set("type", type);
    const qs = params.toString();
    navigate(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <PublicMarketingLayout>
      <div className="bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">Discover employers</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Browse companies</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Search open roles—each listing shows the employer and location. Save jobs and apply when you&apos;re
              ready.
            </p>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-slate-800">Search jobs (opens job board)</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Role, skill, or keyword"
                  className="min-h-[48px] flex-1 rounded-xl border border-slate-200 px-4 text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  onKeyDown={(e) => e.key === "Enter" && goSearch()}
                />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="min-h-[48px] w-full rounded-xl border border-slate-200 px-4 text-slate-900 shadow-sm sm:w-48 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  onKeyDown={(e) => e.key === "Enter" && goSearch()}
                />
                <button
                  type="button"
                  onClick={() => goSearch()}
                  className="min-h-[48px] shrink-0 rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                >
                  Search
                </button>
              </div>
            </div>

            <p className="mt-8 text-sm font-medium text-slate-700">Quick filters</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goSearch({ q: item.q, city: item.city, type: item.type })}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#2563EB]/50 hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
          <ol className="mt-6 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                1
              </span>
              <span>Run a search or open a quick filter to see live job posts from employers.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                2
              </span>
              <span>Read the role, company context, and location on each card.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                3
              </span>
              <span>Sign in to apply, save jobs, and track application status from your dashboard.</span>
            </li>
          </ol>

          <Link
            to="/jobs"
            className="mt-10 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Open full job board
          </Link>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
