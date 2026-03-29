import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/landing-page/hero-image.png";
import searchIcon from "../../assets/icons/common-icon/search.svg";
import locationIcon from "../../assets/icons/common-icon/location.svg";

const trendingTags = [
  "Remote",
  "UX Designer",
  "Forklift Operator",
  "Marketing",
];

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/jobs");
  };

  return (
    <section
      className="w-full pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, rgba(37, 99, 235, 0.05) 0%, #F8FAFC 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
          Go <span className="text-[#2563EB]">Beyond</span> Just a Job.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#838383]">
          Connect with top employers across industries. Whether you're in the
          office or out in the field, your next big opportunity awaits.
        </p>

        {/* Search Bar - fully responsive */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-6 sm:mt-8 w-full max-w-4xl min-w-0 bg-white border border-[#E2E8F0] shadow-lg rounded-2xl sm:rounded-3xl lg:rounded-full overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center">
            {/* Keyword */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 px-4 sm:px-5 py-3 sm:py-3.5 border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
              <img src={searchIcon} alt="" className="h-4 w-4 sm:h-5 sm:w-5 opacity-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full min-w-0 bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-8 w-px bg-[#E2E8F0] flex-shrink-0" />

            {/* Location */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 px-4 sm:px-5 py-3 sm:py-3.5 border-b lg:border-b-0 border-[#E2E8F0]">
              <img src={locationIcon} alt="" className="h-4 w-4 sm:h-5 sm:w-5 opacity-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full min-w-0 bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Search Button */}
            <div className="p-3 sm:p-4 lg:p-2 flex-shrink-0">
              <button
                type="submit"
                className="w-full lg:w-[140px] min-h-[44px] sm:min-h-[48px] h-11 sm:h-12 bg-[#2563EB] text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl lg:rounded-full hover:bg-blue-700 active:bg-blue-800 transition flex items-center justify-center touch-manipulation"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Trending */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
          <span className="text-xs sm:text-sm font-medium text-[#838383] w-full sm:w-auto text-center sm:text-left">Trending:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => navigate("/jobs")}
              className="rounded-full bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[#0F172A] font-medium shadow-sm hover:shadow-md transition min-h-[36px] touch-manipulation"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              {tag}
            </button>
          ))}
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
