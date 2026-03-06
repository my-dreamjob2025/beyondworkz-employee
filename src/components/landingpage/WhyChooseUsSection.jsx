import networkIcon from "../../assets/icons/network.svg";
import verifiedIcon from "../../assets/icons/verified.svg";
import growthIcon from "../../assets/icons/grow.svg";
import fastIcon from "../../assets/icons/light.svg";

const reasons = [
  {
    title: "Massive Job Network",
    description:
      "Access thousands of listings ranging from local workshops to global corporate offices seamlessly.",
    icon: networkIcon,
  },
  {
    title: "Verified Employers",
    description:
      "Every company on our platform is strictly vetted to ensure legitimate and safe opportunities.",
    icon: verifiedIcon,
  },
  {
    title: "Career Growth Tools",
    description:
      "Utilize our resume builders, salary estimators, and free skill assessment courses.",
    icon: growthIcon,
  },
  {
    title: "Fast Applications",
    description:
      "Apply to your dream job in just a few clicks with a single universal profile.",
    icon: fastIcon,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section
      className="w-full py-20"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(37, 99, 235, 0.05) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#0F172A]">
            Why Choose Us
          </h2>

          <p className="mt-4 text-base text-[#94A3B8]">
            We make the job search process simple, transparent, and effective
            for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="w-[290px] h-[236px] bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col justify-start transition hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center shadow-[0px_8px_16px_0px_#2563EB33] bg-[#2563EB]">
                <img
                  src={reason.icon}
                  alt={reason.title}
                  className="w-[56px] h-[56px] object-contain mt-2"
                />
              </div>
              {/* Title */}
              <h3 className="w-[178.3px] h-[27px] mt-[24px] font-['Inter'] font-semibold text-[18px] leading-[27px] tracking-[0px] text-[#0F172A]">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="w-[239px] h-[68px] mt-[12px] font-['Inter'] font-normal text-[14px] leading-[22.4px] tracking-[0px] text-[#94A3B8]">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
