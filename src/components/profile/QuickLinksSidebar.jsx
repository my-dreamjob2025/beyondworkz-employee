const QuickLinksSidebar = ({
  activeSection,
  onNavigate,
  onUploadResume,
  onAddEducation,
  onAddProjects,
  onEdit,
}) => {
  const handleLabelClick = (link) => {
    if (link.scrollId && onNavigate) {
      onNavigate(link.scrollId);
    } else if (link.editTab && onEdit) {
      onEdit(link.editTab);
    }
  };

  const links = [
    { id: "resume", label: "Resume", action: "Upload", scrollId: "resume", onActionClick: onUploadResume },
    { id: "resume-headline", label: "Resume headline", scrollId: "resume-headline", editTab: "professional" },
    { id: "key-skills", label: "Key skills", scrollId: "key-skills", editTab: "skills" },
    { id: "education", label: "Education", action: "Add", scrollId: "education", onActionClick: onAddEducation },
    { id: "it-skills", label: "IT skills", scrollId: "key-skills", editTab: "skills" },
    { id: "projects", label: "Projects", action: "Add", editTab: "professional", onActionClick: onAddProjects },
    { id: "profile-summary", label: "Profile summary", scrollId: "resume-headline", editTab: "professional" },
    { id: "accomplishments", label: "Accomplishments", editTab: "professional" },
    { id: "career-profile", label: "Career profile", scrollId: "employment", editTab: "experience" },
    { id: "personal-details", label: "Personal details", editTab: "basic" },
  ];

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
            {link.action && link.onActionClick && (
              <button
                type="button"
                onClick={link.onActionClick}
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
