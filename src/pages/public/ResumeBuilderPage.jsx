import { Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

const STEPS = [
  {
    title: "Profile & headline",
    desc: "Tell employers who you are, your strengths, and what role you want next.",
    tip: "Keep your headline under one line; mirror language from jobs you want.",
  },
  {
    title: "Experience & education",
    desc: "Structured history with dates—employers scan this first after your headline.",
    tip: "Use action verbs and measurable outcomes where possible.",
  },
  {
    title: "Skills & resume file",
    desc: "Tag skills that match job posts. Upload a PDF for roles that ask for a CV attachment.",
    tip: "Refresh skills when you learn something new—search uses them for recommendations.",
  },
];

const CHECKLIST = [
  "Phone number and email verified",
  "Location and work preferences up to date",
  "At least one work experience or education entry",
  "Resume PDF under the size limit (if required by employers)",
];

export default function ResumeBuilderPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">Profile = resume</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Resume builder</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Your Beyond Workz profile is your live resume for applications—complete it once, then apply with accurate,
              employer-ready information every time.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              {STEPS.map((s, i) => (
                <section key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-base font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
                      <p className="mt-2 text-slate-600 leading-relaxed">{s.desc}</p>
                      <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <span className="font-medium text-slate-800">Tip:</span> {s.tip}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Strong profile checklist</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {CHECKLIST.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-600" aria-hidden>
                        ○
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-slate-500">
                  Complete these in{" "}
                  <Link to="/dashboard/profile" className="font-semibold text-[#2563EB] hover:underline">
                    Profile
                  </Link>{" "}
                  after you sign in.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">Ready to build yours?</p>
              <p className="mt-1 text-sm text-slate-600">Create an account or open your profile to edit every section.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Register
              </Link>
              <Link
                to="/dashboard/profile"
                className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Go to profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
