import { Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

export default function AboutPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">Company</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">About Beyond Workz</h1>
          <p className="mt-4 text-lg text-slate-600">
            We connect skilled people with employers who need them—whether that&apos;s at a desk or on site.
          </p>

          <section id="mission" className="mt-14 scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/80 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Our mission is to make hiring fair, fast, and transparent. We build tools so job seekers can show what
              they can do, and so employers can find the right person without friction—from white-collar roles to
              blue-collar work that keeps cities running.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              We believe opportunity shouldn&apos;t depend on which job board you know. Beyond Workz brings roles,
              applications, and communication into one place so both sides can move with confidence.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900">What we stand for</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" aria-hidden />
                <span>
                  <strong className="text-slate-900">Clarity</strong> — Clear job listings, structured applications,
                  and status updates so nobody is left guessing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" aria-hidden />
                <span>
                  <strong className="text-slate-900">Access</strong> — One platform for many kinds of work, not only
                  office jobs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" aria-hidden />
                <span>
                  <strong className="text-slate-900">Respect</strong> — Your data and time matter. We&apos;re
                  building with privacy and usability in mind.
                </span>
              </li>
            </ul>
          </section>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="inline-flex rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4ed8]"
            >
              Browse jobs
            </Link>
            <Link
              to="/register"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
