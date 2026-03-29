const TAB_DEFS = [
  { id: "all", label: (c) => `All${c.all ? ` (${c.all})` : ""}` },
  { id: "submitted", label: (c) => `Applied${c.submitted ? ` (${c.submitted})` : ""}` },
  { id: "shortlisted", label: (c) => `Shortlisted${c.shortlisted ? ` (${c.shortlisted})` : ""}` },
  {
    id: "interview_scheduled",
    label: (c) => `Interview${c.interview_scheduled ? ` (${c.interview_scheduled})` : ""}`,
  },
  { id: "rejected", label: (c) => `Rejected${c.rejected ? ` (${c.rejected})` : ""}` },
  { id: "hired", label: (c) => `Hired${c.hired ? ` (${c.hired})` : ""}` },
];

const ApplicationTabs = ({ activeId, onChange, counts }) => {
  const c = {
    all: counts?.all ?? 0,
    submitted: counts?.submitted ?? 0,
    shortlisted: counts?.shortlisted ?? 0,
    interview_scheduled: counts?.interview_scheduled ?? 0,
    rejected: counts?.rejected ?? 0,
    hired: counts?.hired ?? 0,
  };

  return (
    <div className="flex flex-wrap gap-3">
      {TAB_DEFS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-4 py-2 text-sm rounded-full font-medium transition
          ${
            activeId === id
              ? "bg-orange-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {label(c)}
        </button>
      ))}
    </div>
  );
};

export default ApplicationTabs;
