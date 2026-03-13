import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { profileService } from "../../services/profileService";
import logo from "../../assets/logos/beyondworkzlogo.png";

import BasicInfoStep from "../../components/profile-setup/BasicInfoStep";
import ProfessionalStep from "../../components/profile-setup/ProfessionalStep";
import ExperienceStep from "../../components/profile-setup/ExperienceStep";
import SkillsStep from "../../components/profile-setup/SkillsStep";
import WorkPrefsStep from "../../components/profile-setup/WorkPrefsStep";
import EducationStep from "../../components/profile-setup/EducationStep";

const WHITE_COLLAR_STEPS = [
  { id: "basic", label: "Basic Info", icon: "👤" },
  { id: "professional", label: "Professional", icon: "💼" },
  { id: "experience", label: "Experience", icon: "📋" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "education", label: "Education", icon: "🎓" },
];

const BLUE_COLLAR_STEPS = [
  { id: "basic", label: "Basic Info", icon: "👤" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "workprefs", label: "Work Preferences", icon: "🔧" },
  { id: "education", label: "Education", icon: "🎓" },
];

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const employeeType = user?.employeeType || "whitecollar";
  const steps = employeeType === "whitecollar" ? WHITE_COLLAR_STEPS : BLUE_COLLAR_STEPS;

  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: "",
    city: "",
    workStatus: "",
    years: "00",
    months: "00",
    availability: "",
    skills: [],
    experience: [],
    education: [],
    whiteCollarDetails: {},
    blueCollarDetails: {},
  });

  // Pre-fill with existing profile data
  useEffect(() => {
    profileService.getProfile().then((res) => {
      if (res.success) {
        const u = res.user;
        const p = res.profile;
        setFormData((prev) => ({
          ...prev,
          firstName: u.firstName || prev.firstName,
          lastName: u.lastName || prev.lastName,
          phone: u.phone || "",
          city: u.city || "",
          workStatus: u.workStatus || "",
          years: u.years || "00",
          months: u.months || "00",
          availability: p?.availability || "",
          skills: p?.skills || [],
          experience: p?.experience || [],
          education: p?.education || [],
          whiteCollarDetails: p?.whiteCollarDetails || {},
          blueCollarDetails: p?.blueCollarDetails || {},
        }));
      }
    }).catch(() => {});
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveCurrentStep = async () => {
    setSaving(true);
    setError("");
    try {
      await profileService.updateProfile(formData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
      setSaving(false);
      return false;
    }
    setSaving(false);
    return true;
  };

  const handleNext = async () => {
    const ok = await saveCurrentStep();
    if (!ok) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
    window.scrollTo(0, 0);
  };

  const handleSkip = () => {
    navigate("/dashboard", { replace: true });
  };

  const stepId = steps[currentStep].id;
  const isLastStep = currentStep === steps.length - 1;
  const progressPct = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Beyond Workz" className="w-8 h-8" />
          <span className="font-semibold text-slate-800">Beyond Workz</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-sm text-slate-500 hover:text-slate-700 font-medium"
        >
          Skip for now →
        </button>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            {employeeType === "whitecollar" ? "⚪ White Collar" : "🔵 Blue Collar"} Profile
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Complete Your Profile</h1>
          <p className="text-slate-500 text-sm mt-1">
            A complete profile gets 5× more views from employers
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {Math.round(progressPct)}% complete
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-1">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  idx < currentStep
                    ? "bg-green-100 text-green-700"
                    : idx === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <span>
                  {idx < currentStep ? "✓" : step.icon}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-6 h-0.5 ${
                    idx < currentStep ? "bg-green-300" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {stepId === "basic" && (
            <BasicInfoStep
              data={formData}
              onChange={handleChange}
              employeeType={employeeType}
            />
          )}
          {stepId === "professional" && (
            <ProfessionalStep data={formData} onChange={handleChange} />
          )}
          {stepId === "experience" && (
            <ExperienceStep data={formData} onChange={handleChange} />
          )}
          {stepId === "skills" && (
            <SkillsStep
              data={formData}
              onChange={handleChange}
              employeeType={employeeType}
            />
          )}
          {stepId === "workprefs" && (
            <WorkPrefsStep data={formData} onChange={handleChange} />
          )}
          {stepId === "education" && (
            <EducationStep data={formData} onChange={handleChange} />
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : isLastStep ? (
                "Finish Setup →"
              ) : (
                "Save & Continue →"
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          You can always update your profile later from the dashboard.
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;
