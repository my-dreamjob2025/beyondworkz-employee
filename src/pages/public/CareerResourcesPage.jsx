import { Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

const RESOURCES = [
  {
    title: "Search jobs",
    desc: "Filter by location, job type, and keywords. URLs are shareable.",
    to: "/jobs",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    title: "Salary calculator",
    desc: "Illustrative INR bands by role family, experience, and location.",
    to: "/salary-calculator",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Resume & profile",
    desc: "Step-by-step guidance to make your profile application-ready.",
    to: "/resume-builder",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Browse companies",
    desc: "Search roles and discover who’s hiring in your city or domain.",
    to: "/companies",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Our mission",
    desc: "Why we built Beyond Workz and how we help job seekers.",
    to: "/mission",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export default function CareerResourcesPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">Learn & tools</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Career resources</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Everything in one place to explore roles, benchmark pay, and strengthen your profile—before and after you
            apply.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {RESOURCES.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="group flex h-full gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition hover:border-[#2563EB]/35 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] group-hover:bg-[#2563EB]/15">
                    {r.icon}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-slate-900 group-hover:text-[#2563EB]">{r.title}</h2>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#2563EB]">
                      Open
                      <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
