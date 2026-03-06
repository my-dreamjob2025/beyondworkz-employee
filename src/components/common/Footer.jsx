import logoMark from "../../assets/icons/arrow.svg";
import FooterLogo from "../../assets/logos/footerlogo.svg"

const seekerLinks = [
  "Browse Jobs",
  "Browse Companies",
  "Salary Calculator",
  "Resume Builder",
];
const employerLinks = [
  "Post a Job",
  "Browse Candidates",
  "Pricing Plans",
  "Employer Dashboard",
];
const companyLinks = [
  "About Us",
  "Careers",
  "Privacy Policy",
  "Terms of Service",
];

const Footer = () => {
  return (
    <footer
      className="border-t border-slate-200"
      style={{ background: "#0F172A" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col w-[409px] h-[180px] gap-[22.89px]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center">
                <img
                  src={FooterLogo}
                  alt="Beyond Workz Logo"
                  className="w-[20px] h-[18px]"
                />
              </div>

              <span
                className="w-[161px] h-[30px] text-[20px] leading-[30px] font-extrabold text-white"
                style={{ fontFamily: "Inter" }}
              >
                Beyond Workz
              </span>
            </div>

            <p
              className="w-[302px] h-[68px] text-[14px] leading-[22.4px] font-normal flex items-center"
              style={{ color: "#A4A4A4", fontFamily: "Inter" }}
            >
              Connecting great talent with great opportunities across
              industries—from office roles to on-site operations.
            </p>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#A4A4A4" }}
            >
              Job seekers
            </h3>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: "#A4A4A4" }}>
              {seekerLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#A4A4A4" }}
            >
              Employers
            </h3>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: "#A4A4A4" }}>
              {employerLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#A4A4A4" }}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: "#A4A4A4" }}>
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 pt-6 text-xs sm:flex-row"
          style={{ borderTop: "1px solid #2D3339", color: "#A4A4A4" }}
        >
          <p>© {new Date().getFullYear()} Beyond Workz. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 ring-1 ring-slate-700 hover:bg-slate-800 hover:text-white"
              aria-label="Visit our social profile"
            >
              <img src={logoMark} alt="" className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 ring-1 ring-slate-700 hover:bg-slate-800 hover:text-white"
              aria-label="Visit our social profile"
            >
              <img src={logoMark} alt="" className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 ring-1 ring-slate-700 hover:bg-slate-800 hover:text-white"
              aria-label="Visit our social profile"
            >
              <img src={logoMark} alt="" className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
