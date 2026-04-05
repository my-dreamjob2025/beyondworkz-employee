import { Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

/** Dedicated mission page — also summarized on /about#mission */
export default function MissionPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-gradient-to-b from-[#0B1B33] to-slate-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Mission</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Opportunity should be within reach for every worker.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-slate-300">
            Beyond Workz exists to close the gap between people who want to work and teams that need talent. We focus
            on real workflows—searching roles, applying with a full profile, and staying informed—not on noise or
            endless forms.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            From tech and operations to field and service roles, we&apos;re building a single place where the modern
            workforce can grow. That&apos;s our mission, and we&apos;re just getting started.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300"
            >
              Find your next role
            </Link>
            <Link
              to="/about"
              className="inline-flex rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              About the company
            </Link>
          </div>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
