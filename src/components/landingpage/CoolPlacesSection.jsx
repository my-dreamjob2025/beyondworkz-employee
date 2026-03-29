import coolPlaceImg from "../../assets/images/landing-page/girlondesk.png";

const CoolPlacesSection = () => {
  return (
    <section
      className="w-full flex justify-center"
      style={{
        background:
          "linear-gradient(0deg, #F1F5F9 0%, #2563EB 50%, #F0F4F9 100%)",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 flex flex-col">
        <div className="text-center">
          <h2 className="font-['Inter'] font-bold text-xl sm:text-2xl lg:text-[32px] leading-tight tracking-[0%] uppercase text-[#191500]">
            Cool Places to Work
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Explore workplaces that invest in people—whether you work in an office or on-site.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <img
            src={coolPlaceImg}
            alt="Professional at a cool workplace"
            className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[491px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CoolPlacesSection;
