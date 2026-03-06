import { useNavigate } from "react-router-dom";
import capgemini from "../../assets/logos/capgemini.svg";
import genpact from "../../assets/logos/genpact.svg";
import icici from "../../assets/logos/icici.svg";
import kotak from "../../assets/logos/kotak.svg";
import techMahindra from "../../assets/logos/techmahindra.svg";
import heroImage from "../../assets/images/hero-image.png";
import searchIcon from "../../assets/icons/search.svg";
import locationIcon from "../../assets/icons/location.svg";

const trendingTags = [
  "Remote",
  "UX Designer",
  "Forklift Operator",
  "Marketing",
];

const logos = [capgemini, genpact, icici, kotak, techMahindra];

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/jobs");
  };

  return (
    <section
      className="w-full pt-16 pb-32"
      style={{
        background:
          "linear-gradient(180deg, rgba(37, 99, 235, 0.05) 0%, #F8FAFC 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl leading-tight">
          Go <span className="text-[#2563EB]">Beyond</span> Just a Job.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-[#838383]">
          Connect with top employers across industries. Whether you're in the
          office or out in the field, your next big opportunity awaits.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 w-full max-w-4xl bg-white border border-[#E2E8F0] shadow-lg rounded-full px-3 py-2"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Keyword */}
            <div className="flex items-center gap-3 flex-1 px-5 py-3">
              <img src={searchIcon} alt="" className="h-5 w-5 opacity-60" />

              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full bg-transparent text-base focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-8 w-px bg-[#E2E8F0]" />

            {/* Location */}
            <div className="flex items-center gap-3 flex-1 px-5 py-3">
              <img src={locationIcon} alt="" className="h-5 w-5 opacity-60" />

              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full bg-transparent text-base focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Search Button */}
            <div className="px-2 py-2 flex-shrink-0 w-full lg:w-auto">
              <button
                type="submit"
                className="w-full lg:w-[140px] h-[48px] bg-[#2563EB] text-white font-semibold rounded-full hover:bg-blue-700 transition flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Trending */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-[#838383]">Trending:</span>

          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-4 py-2 text-sm text-[#0F172A] font-medium shadow-sm"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Trusted Logos */}
        <div className="mt-8">
          <p className="tracking-widest uppercase text-[#838383] mb-8">
            Trusted by top enterprises
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Company logo"
                className="h-12 md:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="mt-6 flex justify-center">
          <img
            src={heroImage}
            alt="Professional working at desk"
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
