import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { profileService } from "../../services/profileService";

const ProfileStrength = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(authUser?.profileCompletion ?? 0);

  useEffect(() => {
    profileService.getProfile().then((res) => {
      if (res?.user?.profileCompletion !== undefined) {
        setProfileCompletion(res.user.profileCompletion);
      }
    }).catch(() => {});
  }, []);

  const pct = Math.min(100, Math.max(0, Number(profileCompletion) || 0));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
      <h3 className="font-semibold mb-4">Profile Strength</h3>

      <div className="w-32 h-32 mx-auto rounded-full border-8 border-blue-600 flex items-center justify-center text-2xl font-bold">
        {pct}%
      </div>

      <p className="text-sm text-slate-500 mt-4">
        Add your latest projects and certifications to reach 100%.
      </p>

      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileStrength;
