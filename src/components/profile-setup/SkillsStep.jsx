import { useState } from "react";

const WHITE_COLLAR_SUGGESTIONS = [
  "JavaScript", "React", "Node.js", "Python", "Java", "SQL", "TypeScript",
  "HTML/CSS", "AWS", "Docker", "Git", "Figma", "Excel", "Communication",
  "Project Management", "Data Analysis", "Machine Learning",
];

const BLUE_COLLAR_SUGGESTIONS = [
  "Plumbing", "Electrical Work", "Carpentry", "Welding", "Painting",
  "AC Repair", "Driving", "Security", "Housekeeping", "Cooking",
  "Gardening", "Masonry", "Tailoring", "Beauty & Wellness", "Delivery",
];

const SkillsStep = ({ data, onChange, employeeType }) => {
  const [input, setInput] = useState("");
  const skills = data.skills || [];
  const suggestions =
    employeeType === "whitecollar" ? WHITE_COLLAR_SUGGESTIONS : BLUE_COLLAR_SUGGESTIONS;

  const addSkill = (name) => {
    const trimmed = name.trim();
    if (!trimmed || skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase()))
      return;
    onChange("skills", [...skills, { name: trimmed }]);
    setInput("");
  };

  const removeSkill = (name) => {
    onChange("skills", skills.filter((s) => s.name !== name));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Your Skills</h2>
        <p className="text-sm text-slate-500 mt-1">
          Add skills to help employers find you. Press Enter or comma to add.
        </p>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Add a skill
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => addSkill(input)}
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Added skills */}
      {skills.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Added ({skills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span
                key={`${s.name}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full"
              >
                {s.name}
                <button
                  type="button"
                  onClick={() => removeSkill(s.name)}
                  className="hover:text-blue-200 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
          Suggested
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions
            .filter((s) => !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase()))
            .map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addSkill(s)}
                className="px-3 py-1.5 border border-slate-300 text-slate-600 text-sm rounded-full hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                + {s}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
