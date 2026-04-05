import PublicMarketingLayout from "../../layouts/PublicMarketingLayout";

export default function PrivacyPage() {
  return (
    <PublicMarketingLayout>
      <div className="bg-white">
        <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20 text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <h2 className="mt-10 text-xl font-bold text-slate-900">1. Introduction</h2>
          <p className="mt-3">
            Beyond Workz (&quot;we&quot;, &quot;us&quot;) operates this platform to help job seekers and employers
            connect. This policy describes how we collect, use, and protect your personal information when you use our
            services.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">2. Information we collect</h2>
          <p className="mt-3">
            We may collect account details (name, email, phone), profile and resume data, application activity, and
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Information you submit when applying to jobs or completing your profile</li>
            <li>Technical data such as device type and approximate location when required for the service</li>
            <li>Communications you send to support</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-slate-900">3. How we use information</h2>
          <p className="mt-3">
            We use your data to operate the platform, match you with opportunities, improve our services, and comply
            with the law. Employers you apply to receive the information needed to evaluate your application.
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">4. Your choices</h2>
          <p className="mt-3">
            You can update or delete profile information in your account settings where available. You may contact us
            to exercise rights applicable in your region (e.g. access, correction, deletion).
          </p>

          <h2 className="mt-8 text-xl font-bold text-slate-900">5. Contact</h2>
          <p className="mt-3">
            Questions about privacy? Email{" "}
            <a href="mailto:privacy@beyondworkz.com" className="text-[#2563EB] hover:underline">
              privacy@beyondworkz.com
            </a>
            .
          </p>
        </article>
      </div>
    </PublicMarketingLayout>
  );
}
