import { useState } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../assets/icons/landing-page/arrow.svg";
import { BrandLogoWithWordmarkLink } from "../brand/BrandMark";

const RECRUITERS_URL = "http://employer.beyondworkz.com/";

const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Career Resources", href: "#" },
  { label: "For Employers", href: RECRUITERS_URL },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRecruitersClick = () => {
    // External redirect (same tab) for recruiters/employers.
    window.location.href = RECRUITERS_URL;
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--color-neutral-200)",
        backgroundColor: "var(--color-neutral-50)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <BrandLogoWithWordmarkLink to="/" />

        {/* Desktop Menu */}
        <ul
          className="hidden items-center gap-8 text-sm font-medium md:flex"
          style={{ color: "var(--color-neutral-600)" }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("http") ? (
                <a href={link.href} className="transition hover:text-black">
                  {link.label}
                </a>
              ) : (
                <Link to={link.href} className="transition hover:text-black">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Register */}
          <Link
            to="/register"
            className="rounded-md px-5 py-2 text-sm font-semibold"
            style={{
              backgroundColor: "var(--color-accent-500)",
              color: "#ffffff",
            }}
          >
            Register
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-md px-5 py-2 text-sm font-semibold"
            style={{
              color: "var(--color-accent-500)",
              border: "1px solid var(--color-accent-500)",
              backgroundColor: "#fff7ed",
            }}
          >
            Login
          </Link>

          {/* Divider */}
          <div
            className="h-6 w-px"
            style={{ backgroundColor: "var(--color-neutral-200)" }}
          />

          {/* Recruiters */}
          <button
            type="button"
            onClick={handleRecruitersClick}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E6] bg-[#F1F1F1] px-5 py-2 text-sm font-medium text-[#475569] transition hover:bg-[#E8E8E6]"
            aria-label="For Recruiters - go to employer site"
          >
            For Recruiters
            <img src={arrowIcon} alt="" className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-slate-800"></span>
            <span className="block h-0.5 w-6 bg-slate-800"></span>
            <span className="block h-0.5 w-6 bg-slate-800"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "var(--color-neutral-200)" }}
        >
          <div className="space-y-4 px-6 py-5">
            {NAV_LINKS.map((link) => (
              <div key={link.label} style={{ color: "var(--color-neutral-600)" }}>
                {link.href.startsWith("http") ? (
                  <a href={link.href} className="block w-full text-sm font-medium">
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.href} className="block w-full text-sm font-medium">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-3">
              {/* Register */}
              <Link
                to="/register"
                className="block w-full rounded-md py-2 text-center text-sm font-semibold"
                style={{
                  backgroundColor: "var(--color-accent-500)",
                  color: "#ffffff",
                }}
              >
                Register
              </Link>

              {/* Login */}
              <Link
                to="/login"
                className="block w-full rounded-md py-2 text-center text-sm font-semibold"
                style={{
                  color: "var(--color-accent-500)",
                  border: "1px solid var(--color-accent-500)",
                }}
              >
                Login
              </Link>

              {/* Recruiters */}
              <button
                type="button"
                onClick={handleRecruitersClick}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E6] bg-[#F1F1F1] px-5 py-2 text-sm font-medium text-[#475569] transition hover:bg-[#E8E8E6]"
                aria-label="For Recruiters - go to employer site"
              >
                For Recruiters
                <img src={arrowIcon} alt="" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
