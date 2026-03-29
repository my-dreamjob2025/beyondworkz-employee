import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { profileService } from "../../services/profileService";
import useAuth from "../../hooks/useAuth";

import BasicInfoStep from "../profile-setup/BasicInfoStep";
import ProfessionalStep from "../profile-setup/ProfessionalStep";
import SkillsStep from "../profile-setup/SkillsStep";
import WorkPrefsStep from "../profile-setup/WorkPrefsStep";
import EducationStep from "../profile-setup/EducationStep";
import ExperienceStep from "../profile-setup/ExperienceStep";
import BlueCollarExperienceStep from "../profile-setup/BlueCollarExperienceStep";
import ResumeStep from "../profile-setup/ResumeStep";

const TABS = [
  { id: "basic", label: "Basic Info", icon: "👤" },
  { id: "professional", label: "Professional", icon: "💼", whiteCollarOnly: true },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "experience", label: "Experience", blueCollarLabel: "Work History", icon: "📋" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "workprefs", label: "Work Prefs", icon: "🔧", blueCollarOnly: true },
  { id: "resume", label: "Resume", icon: "📄", whiteCollarOnly: true },
];

const TRANSITION_MS = 320;

const EditProfileModal = ({ isOpen, onClose, initialData, onSaved, initialTab }) => {
  const { user: authUser } = useAuth();
  const employeeType = authUser?.employeeType || "whitecollar";

  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const closeTimerRef = useRef(null);

  const [activeTab, setActiveTab] = useState(initialTab || "basic");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    workStatus: "",
    years: "00",
    months: "00",
    avatar: null,
    availability: "",
    whatsappNumber: "",
    skills: [],
    experience: [],
    education: [],
    whiteCollarDetails: {},
    blueCollarDetails: {},
  });

  useEffect(() => {
    if (isOpen && initialTab) {
      const visible = TABS.filter((t) => {
        if (t.whiteCollarOnly) return employeeType === "whitecollar";
        if (t.blueCollarOnly) return employeeType === "bluecollar";
        return true;
      });
      const validTab = visible.some((t) => t.id === initialTab)
        ? initialTab
        : visible[0]?.id || "basic";
      setActiveTab(validTab);
    }
  }, [isOpen, initialTab, employeeType]);

  useEffect(() => {
    if (isOpen && initialData) {
      const u = initialData.user || {};
      const p = initialData.profile || {};
      setFormData({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        phone: u.phone || "",
        city: u.city || "",
        workStatus: u.workStatus || "",
        years: u.years || "00",
        months: u.months || "00",
        avatar: u.avatar || null,
        availability: p.availability || "",
        whatsappNumber: p.whatsappNumber || "",
        skills: p.skills || [],
        experience: p.experience || [],
        education: p.education || [],
        whiteCollarDetails: p.whiteCollarDetails || {},
        blueCollarDetails: p.blueCollarDetails || {},
      });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setMounted(true);
      setAnimateIn(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setAnimateIn(false);
    closeTimerRef.current = setTimeout(() => {
      setMounted(false);
      closeTimerRef.current = null;
    }, TRANSITION_MS);
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!initialData?.user) return;
    setSaving(true);
    setError("");
    try {
      await profileService.updateProfile(formData);
      onSaved?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  const visibleTabs = TABS.filter((t) => {
    if (t.whiteCollarOnly) return employeeType === "whitecollar";
    if (t.blueCollarOnly) return employeeType === "bluecollar";
    return true;
  });

  const content = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicInfoStep
            data={formData}
            onChange={handleChange}
            employeeType={employeeType}
            onAvatarUpdated={onSaved}
          />
        );
      case "professional":
        return <ProfessionalStep data={formData} onChange={handleChange} />;
      case "skills":
        return <SkillsStep data={formData} onChange={handleChange} employeeType={employeeType} />;
      case "experience":
        return employeeType === "bluecollar" ? (
          <BlueCollarExperienceStep data={formData} onChange={handleChange} />
        ) : (
          <ExperienceStep data={formData} onChange={handleChange} />
        );
      case "workprefs":
        return <WorkPrefsStep data={formData} onChange={handleChange} />;
      case "education":
        return <EducationStep data={formData} onChange={handleChange} />;
      case "resume":
        return (
          <ResumeStep
            data={formData}
            onChange={handleChange}
            onSaved={onSaved}
          />
        );
      default:
        return null;
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-modal-title"
    >
      <div
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
          animateIn
            ? "opacity-100 translate-y-0 sm:scale-100"
            : "opacity-0 translate-y-8 sm:translate-y-3 sm:scale-[0.97]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
          <h2 id="edit-profile-modal-title" className="text-lg sm:text-xl font-semibold text-slate-900">
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          <aside className="lg:w-52 border-b lg:border-b-0 lg:border-r border-slate-200 p-3 lg:p-4 flex-shrink-0 overflow-x-auto lg:overflow-y-auto">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:w-full ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {employeeType === "bluecollar" && tab.blueCollarLabel ? tab.blueCollarLabel : tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {content()}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-4 sm:px-6 py-4 border-t border-slate-200 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default EditProfileModal;
