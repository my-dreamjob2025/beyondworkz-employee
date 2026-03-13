import { useState } from "react";

const LEVELS = ["10th", "12th", "Diploma", "Undergraduate", "Postgraduate", "Doctorate", "Other"];

const emptyEdu = () => ({
  level: "",
  degree: "",
  institution: "",
  fieldOfStudy: "",
  gradeOrPercentage: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
});

const EducationStep = ({ data, onChange }) => {
  const education = data.education || [];
  const [editing, setEditing] = useState(education.length === 0 ? 0 : null);
  const [form, setForm] = useState(emptyEdu());

  const updateForm = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const save = () => {
    if (!form.level || !form.institution) return;
    const updated = [...education];
    if (editing === education.length) {
      updated.push(form);
    } else {
      updated[editing] = form;
    }
    onChange("education", updated);
    setForm(emptyEdu());
    setEditing(null);
  };

  const remove = (idx) => {
    onChange("education", education.filter((_, i) => i !== idx));
  };

  const startEdit = (idx) => {
    setForm(idx === education.length ? emptyEdu() : { ...education[idx] });
    setEditing(idx);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Education</h2>
        <p className="text-sm text-slate-500 mt-1">
          Add your educational qualifications.
        </p>
      </div>

      {/* Saved entries */}
      {education.map((edu, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3"
        >
          <div>
            <p className="font-semibold text-slate-800 text-sm">
              {edu.degree || edu.level} {edu.fieldOfStudy ? `— ${edu.fieldOfStudy}` : ""}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{edu.institution}</p>
            {edu.gradeOrPercentage && (
              <p className="text-slate-400 text-xs mt-0.5">
                Grade / %: {edu.gradeOrPercentage}
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => startEdit(idx)}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add / Edit form */}
      {editing !== null ? (
        <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 space-y-4">
          <p className="text-sm font-semibold text-slate-800">
            {editing === education.length ? "Add Education" : "Edit Education"}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Level <span className="text-red-500">*</span>
              </label>
              <select
                value={form.level}
                onChange={(e) => updateForm("level", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select level</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Degree / Course
              </label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) => updateForm("degree", e.target.value)}
                placeholder="e.g. B.Tech, MBA"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Institution / School <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.institution}
              onChange={(e) => updateForm("institution", e.target.value)}
              placeholder="e.g. Nagpur University"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={form.fieldOfStudy}
                onChange={(e) => updateForm("fieldOfStudy", e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Grade / Percentage
              </label>
              <input
                type="text"
                value={form.gradeOrPercentage}
                onChange={(e) => updateForm("gradeOrPercentage", e.target.value)}
                placeholder="e.g. 8.5 CGPA / 85%"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Start Year
              </label>
              <input
                type="number"
                value={form.startDate ? new Date(form.startDate).getFullYear() : ""}
                onChange={(e) => updateForm("startDate", `${e.target.value}-01-01`)}
                placeholder="2018"
                min="1980"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                End Year
              </label>
              <input
                type="number"
                value={form.endDate ? new Date(form.endDate).getFullYear() : ""}
                onChange={(e) => updateForm("endDate", `${e.target.value}-01-01`)}
                placeholder="2022"
                disabled={form.currentlyStudying}
                min="1980"
                max={new Date().getFullYear() + 6}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.currentlyStudying}
                  onChange={(e) => updateForm("currentlyStudying", e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-xs text-slate-500">Currently studying</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={save}
              disabled={!form.level || !form.institution}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => startEdit(education.length)}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          + Add Education
        </button>
      )}
    </div>
  );
};

export default EducationStep;
