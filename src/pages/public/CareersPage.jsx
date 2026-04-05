import { Link } from "react-router-dom";
import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

export default function CareersPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Careers at Beyond Workz</h1>
          <p className="mt-4 text-lg text-slate-600">
            We&apos;re building the platform that helps millions find work. If that excites you, we&apos;d love to hear
            from you.
          </p>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold text-slate-900">Open roles</h2>
            <p className="mt-3 text-slate-600">
              We post openings here as we grow. Don&apos;t see a match? Send your profile—we often hire for
              engineering, product, design, and operations.
            </p>
            <p className="mt-6 text-sm text-slate-500">
              To apply for internal roles, email{" "}
              <a href="mailto:careers@beyondworkz.com" className="font-medium text-[#2563EB] hover:underline">
                careers@beyondworkz.com
              </a>{" "}
              with your CV and what you&apos;d like to work on.
            </p>
          </section>

          <div className="mt-10">
            <Link to="/jobs" className="text-sm font-semibold text-[#2563EB] hover:underline">
              Looking for jobs with other employers? Browse listings →
            </Link>
          </div>
        </div>
      </div>
    </PublicMarketingLayout>
  );
}
