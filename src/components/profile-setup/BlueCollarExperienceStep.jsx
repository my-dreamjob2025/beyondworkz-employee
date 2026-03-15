import { useState } from "react";

const BLUE_COLLAR_SKILL_SUGGESTIONS = [
  "Driving", "Vehicle washing", "Physical work", "Communication", "Cleaning",
  "Maintenance", "Delivery", "Time management", "Customer service", "Team work",
  "Safety awareness", "Manual labour", "Loading/Unloading", "Housekeeping",
  "Security", "Warehouse", "Packing", "Quality check",
];

const emptyExp = () => ({
  jobTitle: "",
  company: "",
  dateOfJoining: "",
  relievingDate: "",
  current: false,
  location: "",
  description: "",
  noticePeriod: "",
  currentCTC: "",
  skillsUsed: [],
});

const BlueCollarExperienceStep = ({ data, onChange }) => {
  const experience = data.experience || [];
  const [editing, setEditing] = useState(experience.length === 0 ? 0 : null);
  const [form, setForm] = useState(emptyExp());

  const updateForm = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const formatDate = (d) => {
    if (!d) return "";
    const x = new Date(d);
    return x.toISOString().slice(0, 10);
  };

  const save = () => {
    if (!form.jobTitle || !form.company || !form.dateOfJoining) return;
    const entry = {
      ...form,
      dateOfJoining: form.dateOfJoining ? new Date(form.dateOfJoining) : null,
      relievingDate: form.relievingDate ? new Date(form.relievingDate) : null,
      current: !!form.current,
      currentCTC: form.currentCTC ? Number(form.currentCTC) : undefined,
      noticePeriod: form.noticePeriod?.trim() || undefined,
      skillsUsed: Array.isArray(form.skillsUsed) ? form.skillsUsed : [],
    };
    const updated = [...experience];
    if (editing === experience.length) {
      updated.push(entry);
    } else {
      updated[editing] = entry;
    }
    onChange("experience", updated);
    setForm(emptyExp());
    setEditing(null);
  };

  const remove = (idx) => {
    onChange("experience", experience.filter((_, i) => i !== idx));
  };

  const [skillInput, setSkillInput] = useState("");
  const skillsUsed = Array.isArray(form.skillsUsed) ? form.skillsUsed : [];

  const startEdit = (idx) => {
    const item = idx === experience.length ? emptyExp() : experience[idx];
    const skillsArr = Array.isArray(item.skillsUsed)
      ? item.skillsUsed
      : (typeof item.skillsUsed === "string" ? item.skillsUsed.split(",").map((s) => s.trim()).filter(Boolean) : []);
    setForm({
      ...emptyExp(),
      ...item,
      dateOfJoining: item.dateOfJoining ? formatDate(item.dateOfJoining) : "",
      relievingDate: item.relievingDate ? formatDate(item.relievingDate) : "",
      currentCTC: item.currentCTC ?? "",
      skillsUsed: skillsArr,
    });
    setSkillInput("");
    setEditing(idx);
  };

  const addSkillUsed = (name) => {
    const trimmed = (typeof name === "string" ? name : skillInput).trim();
    if (!trimmed || skillsUsed.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    updateForm("skillsUsed", [...skillsUsed, trimmed]);
    setSkillInput("");
  };

  const removeSkillUsed = (skill) => {
    updateForm("skillsUsed", skillsUsed.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Work History</h2>
        <p className="text-sm text-slate-500 mt-1">Add your previous jobs and roles.</p>
      </div>

      {experience.map((exp, idx) => (
        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{exp.jobTitle}</p>
            <p className="text-slate-500 text-xs mt-0.5">{exp.company}</p>
            <p className="text-slate-400 text-xs mt-0.5">
              {exp.dateOfJoining ? new Date(exp.dateOfJoining).toLocaleDateString() : ""}
              {exp.current ? " – Present" : exp.relievingDate ? ` – ${new Date(exp.relievingDate).toLocaleDateString()}` : ""}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => startEdit(idx)} className="text-xs text-blue-600 hover:underline">
              Edit
            </button>
            <button type="button" onClick={() => remove(idx)} className="text-xs text-red-500 hover:underline">
              Remove
            </button>
          </div>
        </div>
      ))}

      {editing !== null ? (
        <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 space-y-4">
          <p className="text-sm font-semibold text-slate-800">
            {editing === experience.length ? "Add Work History" : "Edit Work History"}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Job Title *</label>
              <input
                type="text"
                value={form.jobTitle}
                onChange={(e) => updateForm("jobTitle", e.target.value)}
                placeholder="e.g. Vehicle Washer, Delivery Driver"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Company / Employer *</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => updateForm("company", e.target.value)}
                placeholder="e.g. ABC Car Wash, XYZ Logistics"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date of Joining *</label>
              <input
                type="date"
                value={form.dateOfJoining}
                onChange={(e) => updateForm("dateOfJoining", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Relieving Date</label>
              <input
                type="date"
                value={form.relievingDate}
                onChange={(e) => updateForm("relievingDate", e.target.value)}
                disabled={form.current}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                <input type="checkbox" checked={form.current} onChange={(e) => updateForm("current", e.target.checked)} className="accent-blue-600" />
                <span className="text-xs text-slate-500">Currently working here</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateForm("location", e.target.value)}
              placeholder="e.g. Mumbai, Nagpur"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              placeholder="Describe your role and duties..."
              rows={3}
              maxLength={1000}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Notice Period</label>
              <input
                type="text"
                value={form.noticePeriod}
                onChange={(e) => updateForm("noticePeriod", e.target.value)}
                placeholder="e.g. Immediate, Same day"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Monthly Salary (₹)</label>
              <input
                type="number"
                value={form.currentCTC}
                onChange={(e) => updateForm("currentCTC", e.target.value)}
                placeholder="e.g. 15000"
                min={0}
                step={100}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Skills Used</label>
            <p className="text-xs text-slate-500 mb-2">Type a skill and press Enter, or click suggestions below</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkillUsed(skillInput);
                  }
                }}
                placeholder="e.g. Driving, Vehicle washing"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addSkillUsed(skillInput)}
                disabled={!skillInput.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            {skillsUsed.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {skillsUsed.map((s, idx) => (
                  <span
                    key={`${s}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkillUsed(s)}
                      className="hover:text-blue-200 transition-colors leading-none text-lg"
                      aria-label={`Remove ${s}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {BLUE_COLLAR_SKILL_SUGGESTIONS.filter((s) => !skillsUsed.some((sk) => sk.toLowerCase() === s.toLowerCase())).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkillUsed(s)}
                    className="px-3 py-1.5 border border-slate-300 text-slate-600 text-sm rounded-full hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    + {s}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={save}
              disabled={!form.jobTitle || !form.company || !form.dateOfJoining}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium rounded-lg"
            >
              Save
            </button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => startEdit(experience.length)}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
        >
          + Add Work History
        </button>
      )}
    </div>
  );
};

export default BlueCollarExperienceStep;
