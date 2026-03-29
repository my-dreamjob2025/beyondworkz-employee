import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/beyond-workz-logo.png";

const fontStack = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

export function BrandWordmark({ variant = "header", className = "" }) {
  const sizes = {
    header: "text-[0.8125rem] font-bold leading-none min-[400px]:text-[0.9375rem] sm:text-lg sm:font-extrabold sm:leading-tight",
    landing: "text-base font-extrabold leading-tight sm:text-xl",
    auth: "text-xl font-extrabold leading-tight sm:text-2xl",
    footer: "text-sm font-bold sm:text-base",
    footerDark: "text-sm font-bold sm:text-base",
    onBlue: "text-lg font-extrabold leading-tight sm:text-xl",
  };

  const tone =
    variant === "footerDark" ? (
      <>
        <span className="text-white">Beyond</span>{" "}
        <span className="text-amber-400">Workz</span>
      </>
    ) : variant === "onBlue" ? (
      <>
        <span className="text-white">Beyond</span>{" "}
        <span className="text-sky-200">Workz</span>
      </>
    ) : (
      <>
        <span className="text-neutral-900">Beyond</span>{" "}
        <span className="text-[#2563eb]">Workz</span>
      </>
    );

  return (
    <span
      className={`tracking-tight whitespace-nowrap ${sizes[variant] || sizes.header} ${className}`}
      style={fontStack}
    >
      {tone}
    </span>
  );
}

/** Dashboard / app shell header — button navigates to dashboard */
export function BrandLogoWithWordmarkButton({ onClick, imgClassName, variant = "header", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Beyond Workz home"
      className={`flex min-w-0 max-w-full items-center gap-1.5 rounded-lg py-1 text-left transition hover:bg-slate-50 min-[400px]:gap-2 sm:gap-2.5 ${className}`}
    >
      <img
        src={brandLogo}
        alt=""
        className={
          imgClassName ||
          "h-8 w-auto max-h-9 shrink-0 object-contain object-left sm:h-9"
        }
      />
      <BrandWordmark variant={variant} />
    </button>
  );
}

/** Public navbar — Link to home */
export function BrandLogoWithWordmarkLink({ to = "/", imgClassName, variant = "landing", className = "" }) {
  return (
    <Link
      to={to}
      className={`flex min-w-0 max-w-full items-center gap-1.5 rounded-lg py-1 transition hover:opacity-90 min-[400px]:gap-2 sm:gap-2.5 ${className}`}
    >
      <img
        src={brandLogo}
        alt=""
        className={
          imgClassName ||
          "h-9 w-auto max-h-10 shrink-0 object-contain object-left sm:h-10"
        }
      />
      <BrandWordmark variant={variant} />
    </Link>
  );
}
