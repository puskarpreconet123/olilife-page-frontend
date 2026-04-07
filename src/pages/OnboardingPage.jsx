import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import ProgressBar from "../components/shared/ProgressBar";
import WelcomeScreen from "../components/screens/WelcomeScreen";
import AgeGenderScreen from "../components/screens/AgeGenderScreen";
import HeightScreen from "../components/screens/HeightScreen";
import WeightScreen from "../components/screens/WeightScreen";
import ActivityScreen from "../components/screens/ActivityScreen";
import GoalScreen from "../components/screens/GoalScreen";
import HealthScreen from "../components/screens/HealthScreen";
import SignupModal from "../components/auth/SignupModal";
import LoginModal from "../components/auth/LoginModal";
import Toast, { showToast } from "../components/shared/Toast";

const TOTAL_SCREENS = 7; // 0-6, dashboard is /dashboard route

const DEFAULT_STATE = {
  age: "", gender: "", height: "", heightUnit: "cm", weight: "",
  activityLevel: "", goal: "", diabeticStatus: "", hasAllergies: false,
  allergyList: [], customAllergy: "", chronicConditions: []
};

function isAgeGenderComplete(s) {
  const n = Number(s?.age);
  return Number.isFinite(n) && n > 0 && n <= 90 && Boolean(s?.gender);
}
function isHeightComplete(s) {
  const t = (s?.height || "").toString().trim();
  if (!t) return false;
  if (s?.heightUnit === "cm") {
    const v = Number(t);
    return Number.isFinite(v) && v >= 30 && v <= 300;
  }
  return /^\d{1,2}(\.\d{1,2})?$/.test(t) && Number(t) <= 10;
}
function isWeightComplete(s) {
  const v = Number((s?.weight || "").toString().trim());
  return Number.isFinite(v) && v >= 10 && v <= 150;
}
function canAdvance(screen, s) {
  if (screen === 0) return true;
  if (screen === 1) return isAgeGenderComplete(s);
  if (screen === 2) return isHeightComplete(s);
  if (screen === 3) return isWeightComplete(s);
  if (screen === 4) return Boolean(s.activityLevel);
  if (screen === 5) return Boolean(s.goal);
  if (screen === 6) return Boolean(s.diabeticStatus) && (s.chronicConditions || []).length >= 1;
  return false;
}
function validationMessage(screen) {
  if (screen === 1) return "Please complete both your age and gender to continue.";
  if (screen === 2) return "Please enter a valid height before continuing.";
  if (screen === 3) return "Please enter a valid weight in kilograms.";
  if (screen === 4) return "Please choose your activity level to continue.";
  if (screen === 5) return "Please select your primary goal to continue.";
  if (screen === 6) return "Please select diabetic status and at least one chronic condition.";
  return "Please complete this step before continuing.";
}

function isProfileComplete(s) {
  if (!s) return false;
  return isAgeGenderComplete(s) &&
         isHeightComplete(s) &&
         isWeightComplete(s) &&
         Boolean(s.activityLevel) &&
         Boolean(s.goal) &&
         Boolean(s.diabeticStatus) &&
         (s.chronicConditions || []).length >= 1;
}

export default function OnboardingPage() {
  const { isLoggedIn, user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [screen, setScreen]   = useState(0);
  const [profile, setProfile] = useState(DEFAULT_STATE);
  const [modal, setModal]     = useState(null); // "signup" | "login" | null
  const saveTimer = useRef(null);

  // Load saved profile when user is logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.onboardingComplete && !location.state?.fromDashboard) { 
      navigate("/dashboard", { state: { profile: user.profile || profile } }); 
      return; 
    }
    api.get("/api/user/profile")
      .then((res) => {
        const saved = res.data.profile;
        if (saved) {
          const merged = { ...profile, ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== "" && v !== null && v !== undefined)) };
          setProfile(merged);
          
          if (isProfileComplete(merged) && !location.state?.fromDashboard) {
            api.put("/api/user/profile", { onboardingComplete: true }).catch(() => {});
            if (refreshUser) refreshUser();
            navigate("/dashboard", { state: { profile: merged } });
          }
        }
      })
      .catch(() => {});
  }, [isLoggedIn, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveProfile = (updates) => {
    if (!isLoggedIn) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      api.put("/api/user/profile", { profile: updates }).catch(() => {});
    }, 600);
  };

  const onChange = (key, value) => {
    setProfile((prev) => {
      const updated = { ...prev, [key]: value };
      saveProfile(updated);
      return updated;
    });
  };

  const handleNext = () => {
    if (!canAdvance(screen, profile)) {
      showToast(validationMessage(screen));
      return;
    }
    // If user is already finished and at welcome, let them skip directly back to dash
    if (screen === 0 && user?.onboardingComplete) {
      navigate("/dashboard", { state: { profile } });
      return;
    }
    if (screen === 6) {
      if (isLoggedIn) {
        api.put("/api/user/profile", { profile, onboardingComplete: true }).catch(() => {});
      }
      navigate("/dashboard", { state: { profile } });
      return;
    }
    setScreen((s) => Math.min(s + 1, TOTAL_SCREENS - 1));
  };

  const handleBack = () => setScreen((s) => Math.max(s - 1, 0));

  const handleSignupSuccess = () => {
    setModal(null);
    showToast("Account created! Continue your plan.");
  };

  const handleLoginSuccess = (u) => {
    setModal(null);
    showToast("Welcome back!");
    if (u?.onboardingComplete || isProfileComplete(u?.profile)) {
      if (!u?.onboardingComplete) {
        api.put("/api/user/profile", { onboardingComplete: true }).catch(() => {});
        if (refreshUser) refreshUser();
      }
      navigate("/dashboard", { state: { profile: u?.profile || profile } });
    }
  };

  const handleLogout = async () => {
    await logout();
    setProfile(DEFAULT_STATE);
    setScreen(0);
    showToast("Logged out successfully");
  };

  const screenProps = { state: profile, onChange, onNext: handleNext, onBack: handleBack, canAdvance: canAdvance(screen, profile) };

  return (
    <main className="app-shell app-shell--onboarding" aria-label="Olilife onboarding app">
      <div className="status-bar" aria-hidden="true" />
      <div className="app-inner">
        <ProgressBar
          current={screen}
          total={TOTAL_SCREENS}
          action={isLoggedIn && (
            <button className="btn btn-subtle" type="button" style={{ padding: "10px 18px", fontSize: "0.88rem" }} onClick={handleLogout}>
              Log Out
            </button>
          )}
        />
        <section className="screen-frame">
          {screen === 0 && (
            <WelcomeScreen
              onNext={handleNext}
              onShowSignup={() => setModal("signup")}
              onShowLogin={() => setModal("login")}
            />
          )}
          {screen === 1 && <AgeGenderScreen {...screenProps} />}
          {screen === 2 && <HeightScreen {...screenProps} />}
          {screen === 3 && <WeightScreen {...screenProps} />}
          {screen === 4 && <ActivityScreen {...screenProps} />}
          {screen === 5 && <GoalScreen {...screenProps} />}
          {screen === 6 && <HealthScreen {...screenProps} />}
        </section>
      </div>

      {modal === "signup" && (
        <SignupModal
          onSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setModal("login")}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "login" && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setModal("signup")}
          onClose={() => setModal(null)}
        />
      )}
      <Toast />
    </main>
  );
}
