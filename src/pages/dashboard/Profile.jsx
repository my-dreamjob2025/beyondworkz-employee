import { useState, useEffect, useCallback } from "react";
import { profileService } from "../../services/profileService";
import useAuth from "../../hooks/useAuth";

import ProfileSummaryCard from "../../components/profile/ProfileSummaryCard";
import QuickLinksSidebar from "../../components/profile/QuickLinksSidebar";
import ResumeSection from "../../components/profile/ResumeSection";
import ResumeHeadlineSection from "../../components/profile/ResumeHeadlineSection";
import SkillsSection from "../../components/profile/SkillsSection";
import WorkExperience from "../../components/profile/WorkExperience";
import BlueCollarWorkExperience from "../../components/profile/BlueCollarWorkExperience";
import EducationSection from "../../components/profile/EducationSection";
import BlueCollarWorkPrefsSection from "../../components/profile/BlueCollarWorkPrefsSection";
import EditProfileModal from "../../components/profile/EditProfileModal";

const Profile = () => {
  const { initAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalTab, setEditModalTab] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await profileService.getProfile();
      if (res.success) {
        setUser(res.user);
        setProfile(res.profile);
      }
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const initialFormData = user ? { user, profile: profile ?? {} } : null;

  const isWhiteCollar = user?.employeeType === "whitecollar";

  const openEditModal = useCallback((tab = null) => {
    setEditModalTab(tab);
    setEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalOpen(false);
    setEditModalTab(null);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Summary Card - Top */}
      <ProfileSummaryCard
        user={user}
        profile={profile}
        onEditProfile={() => openEditModal("basic")}
        onAddMissing={(tab) => openEditModal(tab)}
        onAvatarUpdated={async () => {
          await fetchProfile();
          await initAuth();
        }}
      />

      {/* Main layout: Quick links (left) + Content (right) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Quick links sidebar */}
        <QuickLinksSidebar
          employeeType={user?.employeeType}
          onNavigate={scrollToSection}
          onUploadResume={() => openEditModal("resume")}
          onAddEducation={() => openEditModal("education")}
          onAddProjects={() => openEditModal("professional")}
          onEdit={(tab) => openEditModal(tab)}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {isWhiteCollar && (
            <ResumeSection
              resume={profile?.whiteCollarDetails?.resume}
              onEdit={() => openEditModal("resume")}
              onDeleted={fetchProfile}
            />
          )}

          {isWhiteCollar && (
            <ResumeHeadlineSection
              resumeHeadline={profile?.whiteCollarDetails?.resumeHeadline}
              bio={profile?.whiteCollarDetails?.bio}
              onEdit={() => openEditModal("professional")}
            />
          )}

          {!isWhiteCollar && (
            <BlueCollarWorkPrefsSection
              profile={profile}
              onEdit={(tab) => openEditModal(tab)}
            />
          )}

          <SkillsSection
            skills={profile?.skills}
            onEdit={() => openEditModal("skills")}
          />

          {isWhiteCollar ? (
            <WorkExperience
              experience={profile?.experience}
              onEdit={() => openEditModal("experience")}
            />
          ) : (
            <BlueCollarWorkExperience
              experience={profile?.experience}
              onEdit={() => openEditModal("experience")}
            />
          )}

          <EducationSection
            education={profile?.education}
            onEdit={() => openEditModal("education")}
          />
        </div>
      </div>

      <EditProfileModal
        isOpen={editModalOpen && !!user}
        onClose={closeEditModal}
        initialData={initialFormData}
        initialTab={editModalTab}
        onSaved={async () => {
          await fetchProfile();
          await initAuth();
        }}
      />
    </div>
  );
};

export default Profile;
