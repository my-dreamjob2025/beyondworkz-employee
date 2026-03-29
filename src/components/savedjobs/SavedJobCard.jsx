import SkillsTag from "./SkillsTag";
import { TrashIcon } from "../icons/ActionIcons";
import savedIcon from "../../assets/icons/common-icon/saved.svg";
import location from "../../assets/icons/common-icon/location.svg";
import cash from "../../assets/icons/common-icon/cash.svg";

const SavedJobCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      {/* TOP SECTION */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div
            className="w-14 h-14 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600"
            aria-hidden
          >
            FN
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Senior Frontend Engineer
            </h3>

            <p className="text-sm text-slate-500">FinFlow Networks</p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-1">
              <span className="flex">
                <img
                  src={location}
                  alt="saved icon"
                  className="w-5 h-5 font-[#2563EB]"
                />
                <p> New York, NY (Hybrid)</p>
              </span>{" "}
              <span className="flex">
                <img
                  src={cash}
                  alt="saved icon"
                  className="w-5 h-5 font-[#0F1724]"
                />

                <p>$140k - $160k/yr</p>
              </span>
            </div>
          </div>
        </div>

        <button className="p-4 bg-[#EFF6FF] rounded-full">
          {" "}
          <img
            src={savedIcon}
            alt="saved icon"
            className="w-5 h-5 font-[#2563EB]"
          />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-500 mt-4 leading-relaxed">
        We are looking for an experienced Senior Frontend Engineer to lead the
        development of our core financial dashboards. You will work closely with
        product and design teams to build highly responsive, accessible, and
        performant user interfaces using React and TypeScript.
      </p>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2 mt-4">
        <SkillsTag label="React" />
        <SkillsTag label="TypeScript" />
        <SkillsTag label="Next.js" />
        <SkillsTag label="Tailwind CSS" />
      </div>

      <div className="border-t border-[#00000014] mt-5 pt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">Posted 2 days ago</span>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
            aria-label="Remove from saved jobs"
            title="Remove"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedJobCard;
