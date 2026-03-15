import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { profileService } from "../../services/profileService";
import { initAuth } from "../../store/slices/authSlice";
import logo from "../../assets/logos/beyondworkzlogo.png";

import EmployeeTypeStep from "../../components/profile-setup/EmployeeTypeStep";
import BasicInfoStep from "../../components/profile-setup/BasicInfoStep";
import ProfessionalStep from "../../components/profile-setup/ProfessionalStep";
import ExperienceStep from "../../components/profile-setup/ExperienceStep";
import BlueCollarExperienceStep from "../../components/profile-setup/BlueCollarExperienceStep";
import SkillsStep from "../../components/profile-setup/SkillsStep";
import WorkPrefsStep from "../../components/profile-setup/WorkPrefsStep";
import EducationStep from "../../components/profile-setup/EducationStep";
import {
  UserIcon,
  BriefcaseIcon,
  DocumentIcon,
  BoltIcon,
  WrenchIcon,
  AcademicCapIcon,
  TargetIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "../../components/profile-setup/StepIcons";

const WHITE_COLLAR_STEPS = [
  { id: "basic", label: "Basic Info", Icon: UserIcon },
  { id: "professional", label: "Professional", Icon: BriefcaseIcon },
  { id: "experience", label: "Experience", Icon: DocumentIcon },
  { id: "skills", label: "Skills", Icon: BoltIcon },
  { id: "education", label: "Education", Icon: AcademicCapIcon },
];

const BLUE_COLLAR_STEPS = [
  { id: "basic", label: "Basic Info", Icon: UserIcon },
  { id: "experience", label: "Experience", Icon: DocumentIcon },
  { id: "skills", label: "Skills", Icon: BoltIcon },
  { id: "workprefs", label: "Work Preferences", Icon: WrenchIcon },
  { id: "education", label: "Education", Icon: AcademicCapIcon },
];

const EMPLOYEE_TYPE_STEP = { id: "employeeType", label: "Job Type", Icon: TargetIcon };

const CompleteProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const needsEmployeeType = !user?.employeeType;
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSkipModal, setShowSkipModal] = useState(false);

  const [formData, setFormData] = useState({
    employeeType: user?.employeeType || null,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: "",
    city: "",
    workStatus: "",
    years: "00",
    months: "00",
    availability: "",
    whatsappNumber: "",
    skills: [],
    experience: [],
    education: [],
    whiteCollarDetails: {},
    blueCollarDetails: {},
  });

  const employeeType = user?.employeeType || formData?.employeeType || "whitecollar";
  const baseSteps = employeeType === "whitecollar" ? WHITE_COLLAR_STEPS : BLUE_COLLAR_STEPS;
  const steps = needsEmployeeType ? [EMPLOYEE_TYPE_STEP, ...baseSteps] : baseSteps;

  // Pre-fill with existing profile data
  useEffect(() => {
    profileService
      .getProfile()
      .then((res) => {
        if (res.success) {
          const u = res.user;
          const p = res.profile;
          setFormData((prev) => ({
            ...prev,
            employeeType: u.employeeType ?? prev.employeeType,
            firstName: u.firstName || prev.firstName,
            lastName: u.lastName || prev.lastName,
            phone: u.phone || "",
            city: u.city || "",
            workStatus: u.workStatus || "",
            years: u.years || "00",
            months: u.months || "00",
            availability: p?.availability || "",
            whatsappNumber: p?.whatsappNumber || "",
            skills: p?.skills || [],
            experience: p?.experience || [],
            education: p?.education || [],
            whiteCollarDetails: p?.whiteCollarDetails || {},
            blueCollarDetails: p?.blueCollarDetails || {},
          }));
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile. Please refresh.");
      });
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveCurrentStep = async () => {
    setSaving(true);
    setError("");
    try {
      await profileService.updateProfile(formData);
      if (stepId === "employeeType" && formData.employeeType) {
        await dispatch(initAuth()).unwrap();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
      setSaving(false);
      return false;
    }
    setSaving(false);
    return true;
  };

  const handleNext = async () => {
    if (stepId === "employeeType") {
      if (!formData.employeeType) {
        setError("Please select a job type to continue.");
        return;
      }
    }
    const ok = await saveCurrentStep();
    if (!ok) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => (stepId === "employeeType" ? 0 : s + 1));
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
    if (needsEmployeeType) {
      setShowSkipModal(true);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  const handleSkipModalContinue = async () => {
    if (!formData.employeeType) {
      setError("Please select a job type to continue.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await profileService.updateProfile({ ...formData, employeeType: formData.employeeType });
      await dispatch(initAuth()).unwrap();
      setShowSkipModal(false);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const stepId = steps[currentStep].id;
  const isLastStep = currentStep === steps.length - 1;
  const progressPct = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Top bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Beyond Workz" className="w-9 h-9" />
          <span className="font-semibold text-slate-800 text-lg">Beyond Workz</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center gap-1"
        >
          Skip for now
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-medium px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {stepId === "employeeType"
              ? `Step 1 of ${steps.length}`
              : employeeType === "whitecollar"
                ? "Professional Profile"
                : "Skilled & Field Profile"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto">
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
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Step indicators - horizontal pills with icons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-1 mb-8">
          {steps.map((step, idx) => {
            const StepIcon = step.Icon;
            const isComplete = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isComplete
                      ? "bg-emerald-50 text-emerald-700"
                      : isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <StepIcon className={isActive ? "w-4 h-4 text-white" : "w-4 h-4"} />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-4 h-0.5 mx-0.5 ${
                      isComplete ? "bg-emerald-200" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 sm:p-8">
          {stepId === "employeeType" && (
            <EmployeeTypeStep
              selectedType={formData.employeeType}
              onChange={handleChange}
            />
          )}
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
            employeeType === "bluecollar" ? (
              <BlueCollarExperienceStep data={formData} onChange={handleChange} />
            ) : (
              <ExperienceStep data={formData} onChange={handleChange} />
            )
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
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || stepId === "employeeType"}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30"
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
                <>
                  Finish Setup
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              ) : (
                <>
                  Save & Continue
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          You can always update your profile later from the dashboard.
        </p>
      </div>

      {/* Skip modal - shown when user tries to skip without selecting employee type */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Select your job type first</h3>
                <p className="text-sm text-slate-500">
                  Choose the category that best matches your career goals.
                </p>
              </div>
            </div>
            <EmployeeTypeStep
              selectedType={formData.employeeType}
              onChange={handleChange}
            />
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowSkipModal(false);
                  setError("");
                }}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSkipModalContinue}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
