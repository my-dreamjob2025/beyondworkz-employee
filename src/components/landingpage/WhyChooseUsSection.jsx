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
              className="bg-white border border-[#E2E8F0] rounded-2xl p-7 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-md">
                <img
                  src={reason.icon}
                  alt={reason.title}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-base font-semibold text-[#0F172A]">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
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
