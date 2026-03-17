import capgemini from "../../assets/logos/capgemini.svg";
import icici from "../../assets/logos/icici.svg";
import techMahindra from "../../assets/logos/techmahindra.svg";
import coolPlaceImg from "../../assets/images/landing-page/girlondesk.png";
import reliance from "../../assets/logos/reliance.svg";
import jio from "../../assets/logos/jio.svg";
import futureStep from "../../assets/logos/reliance.svg";

const companyLogos = [
  capgemini,
  reliance,
  jio,
  futureStep,
  icici,
  techMahindra,
];

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
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-['Inter'] font-bold text-xl sm:text-2xl lg:text-[32px] leading-tight tracking-[0%] uppercase text-[#191500]">
            Cool Places to Work
          </h2>
        </div>

        {/* Logos */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {companyLogos.map((logo, index) => (
            <div
              key={index}
              className="w-28 sm:w-36 lg:w-[168px] h-12 sm:h-14 lg:h-[64px] flex items-center justify-center
              bg-white rounded-xl lg:rounded-[16px] shadow-md flex-shrink-0"
            >
              <img
                src={logo}
                alt="Company logo"
                className="max-h-8 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Push Image to Bottom */}
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
