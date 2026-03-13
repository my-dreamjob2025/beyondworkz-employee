import FooterLogo from "../../assets/logos/beyondworkzlogo.png";
import LinkedinIcon from "../../assets/icons/common-icon/linkedin.svg";
import TwitterIcon from "../../assets/icons/common-icon/twitter.svg";
import FacebookIcon from "../../assets/icons/common-icon/facebook.svg";

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
    <footer className="bg-[#0B1B33] text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={FooterLogo} alt="Beyond Workz" className="w-6 h-6" />
              <span className="text-white font-semibold text-lg">
                Beyond Workz
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm">
              Connecting great talent with great opportunities. Built for the
              modern workforce, from corporate desks to construction sites.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <p className="text-white font-semibold mb-5">For Job Seekers</p>

            <ul className="space-y-3 text-sm">
              {seekerLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <p className="text-white font-semibold mb-5">For Employers</p>

            <ul className="space-y-3 text-sm">
              {employerLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold mb-5">Company</p>

            <ul className="space-y-3 text-sm">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Beyond Workz. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <img
              src={LinkedinIcon}
              className="w-5 h-5 cursor-pointer hover:opacity-80"
            />
            <img
              src={TwitterIcon}
              className="w-5 h-5 cursor-pointer hover:opacity-80"
            />
            <img
              src={FacebookIcon}
              className="w-5 h-5 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
