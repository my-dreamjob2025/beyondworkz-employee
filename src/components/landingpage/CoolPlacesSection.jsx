import capgemini from "../../assets/logos/capgemini.svg";
import genpact from "../../assets/logos/genpact.svg";
import icici from "../../assets/logos/icici.svg";
import kotak from "../../assets/logos/kotak.svg";
import techMahindra from "../../assets/logos/techmahindra.svg";
import coolPlaceImg from "../../assets/images/helper icon.svg";
import reliance from "../../assets/logos/reliance.svg";
import jio from "../../assets/logos/jio.svg";
import futureStep from "../../assets/logos/FutureStep_Limited.svg";

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
      <div className="w-[1440px] px-6 pt-20 flex flex-col">

        {/* Heading */}
        <div className="text-center">
          <h2 className="font-['Inter'] font-bold text-[32px] leading-[20px] tracking-[0%] uppercase text-[#191500]">
            Cool Places to Work
          </h2>
        </div>

        {/* Logos */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {companyLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[168px] h-[64px] flex items-center justify-center
              bg-white rounded-[16px] shadow-md"
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
        <div className="mt-8 flex justify-center">
          <img
            src={coolPlaceImg}
            alt="Professional at a cool workplace"
            className="w-[491px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default CoolPlacesSection;