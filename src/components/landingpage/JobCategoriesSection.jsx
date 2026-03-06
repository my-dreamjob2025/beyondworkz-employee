import techIcon from "../../assets/category/tech.svg";
import constructionIcon from "../../assets/category/construction.svg";
import healthcareIcon from "../../assets/category/healthcare.svg";
import financeIcon from "../../assets/category/finance.svg";

const categories = [
  { label: "Tech & IT", jobs: "12,450 Jobs", icon: techIcon },
  { label: "Construction", jobs: "8,320 Jobs", icon: constructionIcon },
  { label: "Healthcare", jobs: "15,900 Jobs", icon: healthcareIcon },
  { label: "Finance", jobs: "6,210 Jobs", icon: financeIcon },
];

const JobCategoriesSection = () => {
  return (
    <section className="w-full bg-[#F1F5F9] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#0F172A]">
            Browse by Category
          </h2>

          <p className="mt-5 text-base text-[#94A3B8]">
            Explore thousands of job opportunities in various sectors, tailored
            to both white-collar and blue-collar professionals.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center text-center bg-white border border-[#E2E8F0] rounded-[16px] h-[210px] px-6 py-8 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-md bg-[rgba(37,99,235,0.08)]">
                <img
                  src={category.icon}
                  alt={category.label}
                  className="w-5 h-5 object-contain"
                />
              </div>

              {/* Title */}
              <h5 className="text-xl font-semibold text-[#0F172A] mt-2">
                {category.label}
              </h5>

              {/* Jobs */}
              <p className="mt-3 text-sm text-[#64748B]">{category.jobs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategoriesSection;
