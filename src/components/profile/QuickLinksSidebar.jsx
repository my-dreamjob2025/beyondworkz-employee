const WHITE_COLLAR_LINKS = [
  { id: "resume", label: "Resume", action: "Upload", scrollId: "resume", needsAction: true },
  { id: "resume-headline", label: "Resume headline", scrollId: "resume-headline", editTab: "professional" },
  { id: "key-skills", label: "Key skills", scrollId: "key-skills", editTab: "skills" },
  { id: "education", label: "Education", action: "Add", scrollId: "education", needsAction: true },
  { id: "projects", label: "Projects", action: "Add", editTab: "professional", needsAction: true },
  { id: "career-profile", label: "Career profile", scrollId: "employment", editTab: "experience" },
  { id: "personal-details", label: "Personal details", editTab: "basic" },
];

const BLUE_COLLAR_LINKS = [
  { id: "work-prefs", label: "Work preferences", scrollId: "work-prefs", editTab: "workprefs" },
  { id: "key-skills", label: "Key skills", scrollId: "key-skills", editTab: "skills" },
  { id: "work-history", label: "Work history", scrollId: "employment", editTab: "experience" },
  { id: "education", label: "Education", action: "Add", scrollId: "education", needsAction: true },
  { id: "personal-details", label: "Personal details", editTab: "basic" },
];

const QuickLinksSidebar = ({
  employeeType = "whitecollar",
  activeSection,
  onNavigate,
  onUploadResume,
  onAddEducation,
  onAddProjects,
  onEdit,
}) => {
  const links = employeeType === "bluecollar" ? BLUE_COLLAR_LINKS : WHITE_COLLAR_LINKS;

  const handleLabelClick = (link) => {
    if (link.scrollId && onNavigate) {
      onNavigate(link.scrollId);
    } else if (link.editTab && onEdit) {
      onEdit(link.editTab);
    }
  };

  const getActionClick = (link) => {
    if (link.id === "resume") return onUploadResume;
    if (link.id === "education") return onAddEducation;
    if (link.id === "projects") return onAddProjects;
    return null;
  };

  return (
    <aside className="w-56 shrink-0">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Quick links</h3>
      <nav className="space-y-0.5">
        {links.map((link) => (
          <div key={link.id} className="flex items-center justify-between group">
            <button
              type="button"
              onClick={() => handleLabelClick(link)}
              className={`flex-1 text-left py-2 px-0 text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? "text-orange-600"
                  : "text-slate-700 hover:text-orange-600"
              }`}
            >
              {link.label}
            </button>
            {link.action && getActionClick(link) && (
              <button
                type="button"
                onClick={getActionClick(link)}
                className="text-xs font-medium text-orange-600 hover:text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {link.action}
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default QuickLinksSidebar;
