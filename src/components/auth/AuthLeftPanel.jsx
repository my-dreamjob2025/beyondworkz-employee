import userIllustration from "../../assets/user-illustration.png";
import brandLogo from "../../assets/logos/beyond-workz-logo.png";
import { BrandWordmark } from "../brand/BrandMark";

const AuthLeftPanel = () => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 flex-shrink-0 relative min-h-screen overflow-hidden isolate"
      style={{ backgroundColor: "#1447E6" }}
    >
      {/* ── Concentric glow rings behind the illustration ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div
          className="w-[310px] h-[310px] rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div
          className="w-[210px] h-[210px] rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      {/* ── Large circle bottom-right ── */}
      <div
        className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.10)" }}
      />

      {/* ── Floating skill-icon badges ── */}
      {/* React – top center */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "13%", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
          {/* React atom icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1.5"
              fill="none"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1.5"
              fill="none"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1.5"
              fill="none"
              transform="rotate(120 12 12)"
            />
          </svg>
        </div>
      </div>

      {/* Jira – top right of figure */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "22%", right: "22%" }}
      >
        <div className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#2684FF" />
            <path d="M12 6l-6 6 6 6 6-6-6-6z" fill="#0052CC" />
            <path d="M12 9l-3 3 3 3 3-3-3-3z" fill="#4C9AFF" />
          </svg>
        </div>
      </div>

      {/* Excel – right of figure */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "35%", right: "14%" }}
      >
        <div
          className="w-13 h-13 rounded-xl shadow-lg flex items-center justify-center"
          style={{ width: 52, height: 52, backgroundColor: "#1D6F42" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="3" fill="#1D6F42" />
            <text
              x="4"
              y="17"
              fontFamily="Arial"
              fontWeight="bold"
              fontSize="13"
              fill="white"
            >
              X
            </text>
          </svg>
        </div>
      </div>

      {/* Python – left of figure */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "38%", left: "13%" }}
      >
        <div
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center"
          style={{ width: 56, height: 56 }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24">
            <path
              d="M11.9 2C9.1 2 7.3 3.3 7.3 5.4v1.5h4.6v.5H5.4C3.2 7.4 2 9.1 2 11.9s1.2 4.8 3.4 5.3l.6.1v-1.8c0-.6.5-1.1 1.1-1.1h6.9c1 0 1.8-.8 1.8-1.8V5.8c0-1-.8-1.8-1.8-1.8zm-1.1 2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
              fill="#3776AB"
            />
            <path
              d="M12.1 22c2.8 0 4.6-1.3 4.6-3.4v-1.5h-4.6v-.5h6.5c2.2 0 3.4-1.7 3.4-4.5s-1.2-4.8-3.4-5.3l-.6-.1v1.8c0 .6-.5 1.1-1.1 1.1H9.9c-1 0-1.8.8-1.8 1.8v5.8c0 1 .8 1.8 1.8 1.8zm1.1-2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
              fill="#FFD43B"
            />
          </svg>
        </div>
      </div>

      {/* ── Main content column ── */}
      <div className="relative z-10 flex flex-col min-h-screen w-full px-10 py-8">
        <header className="flex flex-shrink-0 flex-wrap items-center gap-3">
          <img
            src={brandLogo}
            alt=""
            className="h-11 w-auto max-w-[100px] shrink-0 object-contain object-left brightness-0 invert sm:h-12 sm:max-w-[120px]"
          />
          <BrandWordmark variant="onBlue" />
        </header>

        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center py-6">
          <img
            src={userIllustration}
            alt=""
            className="w-[60%] max-w-[300px] h-auto object-contain drop-shadow-2xl"
            aria-hidden
          />
        </div>

        {/* Copy + CTA */}
        <div className="flex-shrink-0 flex flex-col items-center text-center pb-10">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-3 leading-tight">
            Find Work Beyond Limits
          </h2>
          <p
            className="text-base xl:text-lg max-w-xs leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Discover blue-collar and white-collar opportunities tailored to your
            skill, experience, and ambition.
          </p>
          <div
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl"
            style={{ backgroundColor: "#F97316" }}
          >
            <span>★</span>
            <span>Trusted by 50,000+ job seekers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
