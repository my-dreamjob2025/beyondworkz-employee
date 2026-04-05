import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

export default function TermsPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-white">
        <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20 text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <h2 className="mt-10 text-xl font-bold text-slate-900">1. Agreement</h2>
          <p className="mt-3">
            By accessing or using Beyond Workz, you agree to these Terms. If you do not agree, please do not use the
            service.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">2. Eligibility</h2>
          <p className="mt-3">
            You must be legally able to enter a contract in your jurisdiction and provide accurate registration
            information.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">3. User conduct</h2>
          <p className="mt-3">
            You agree not to misuse the platform—for example, by posting false information, harassing others, or
            attempting to access systems without authorization.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">4. Applications and employers</h2>
          <p className="mt-3">
            Job listings and hiring decisions are made by employers. Beyond Workz is not your employer and does not
            guarantee interviews or offers.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">5. Changes</h2>
          <p className="mt-3">
            We may update these Terms. Continued use after changes constitutes acceptance of the revised Terms.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">6. Contact</h2>
          <p className="mt-3">
            <a href="mailto:legal@beyondworkz.com" className="text-[#2563EB] hover:underline">
              legal@beyondworkz.com
            </a>
          </p>
        </article>
      </div>
    </PublicMarketingLayout>
  );
}
