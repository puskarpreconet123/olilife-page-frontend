import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { getMetrics, getAllergySummary, formatDiabeticStatus, formatConditions } from "../utils/dietEngine";
import StatsGrid from "../components/dashboard/StatsGrid";
import MacroTargets from "../components/dashboard/MacroTargets";
import TipsList from "../components/dashboard/TipsList";
import DietGenerator from "../components/dashboard/DietGenerator";
import ProductSection from "../components/dashboard/ProductSection";
import EditConstraints from "../components/dashboard/EditConstraints";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import Toast, { showToast } from "../components/shared/Toast";
import useScrollReveal from "../hooks/useScrollReveal";

const DEFAULT_PROFILE = {
  age: "", gender: "", height: "", heightUnit: "cm", weight: "",
  activityLevel: "", goal: "", diabeticStatus: "", hasAllergies: false,
  allergyList: [], customAllergy: "", chronicConditions: []
};

export default function DashboardPage() {
  const { user, isLoggedIn, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useScrollReveal();

  const [profile, setProfile] = useState(location.state?.profile || DEFAULT_PROFILE);
  const [savedDiet, setSavedDiet] = useState(null);
  const [modal, setModal] = useState(null);
  const [loaded, setLoaded] = useState(Boolean(location.state?.profile));
  const [saving, setSaving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Guard: Redirect admins to admin panel
  useEffect(() => {
    if (isLoggedIn && user?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  // Load profile + saved diet plan from DB on mount
  useEffect(() => {
    if (!isLoggedIn) { setLoaded(true); return; }
    api.get("/api/user/profile")
      .then((res) => {
        const saved = res.data.profile;
        if (saved) {
          setProfile((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== "" && v !== null && v !== undefined))
          }));
        }
        if (res.data.savedDietPlan?.meals?.length) {
          setSavedDiet(res.data.savedDietPlan);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConstraintsSave = async (updated) => {
    setSaving(true);
    setProfile(updated);
    try {
      await api.put("/api/user/profile", { profile: updated, onboardingComplete: true });
      showToast("Constraints saved. Regenerate your diet to apply changes.");
      if (refreshUser) refreshUser();
    } catch {
      showToast("Could not save — check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleDietSaved = (updatedDiet) => {
    setSavedDiet(updatedDiet);
  };

  const handleLoginSuccess = async (u) => {
    setModal(null);
    if (u?.role === "admin") {
      navigate("/admin");
      return;
    }
    if (modal === "signup") {
      try {
        await api.put("/api/user/profile", { profile, onboardingComplete: true });
        if (refreshUser) refreshUser();
      } catch (err) { }
      showToast("Account created and profile saved!");
    } else {
      showToast("Logged in! Your previous diet plan has been restored.");
    }

    // Reload profile + diet from DB
    api.get("/api/user/profile")
      .then((res) => {
        if (res.data.profile) {
          setProfile((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(res.data.profile).filter(([, v]) => v !== "" && v !== null && v !== undefined))
          }));
        }
        if (res.data.savedDietPlan?.meals?.length) {
          setSavedDiet(res.data.savedDietPlan);
        }
      })
      .catch(() => { });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSendEmail = () => {
    if (!isLoggedIn) {
      setModal("login");
      return;
    }
    setSendingEmail(true);
    api.post("/api/user/send-diet-email")
      .then(() => {
        showToast("Diet chart sent to your email!", "success");
      })
      .catch((err) => {
        showToast(err.response?.data?.message || "Failed to send email.", "error");
      })
      .finally(() => setSendingEmail(false));
  };

  if (!loaded) {
    return (
      <main className="app-shell">
        <div className="app-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100%" }}>
          <p style={{ color: "rgba(62,39,35,0.6)", fontSize: "0.92rem" }}>Loading your plan…</p>
        </div>
      </main>
    );
  }

  const metrics = getMetrics(profile);

  return (
    <main className="app-shell app-shell--dashboard" aria-label="Olilife dashboard">
      <div className="status-bar" aria-hidden="true" />
      <div className="app-inner">

        {/* Top bar */}
        <header className="topbar">
          <div className="brand-row">
            <div className="brand-pill"><img src="/olilife_logo-300x95.webp" alt="Olilife" className="brand-logo" /></div>
            {isLoggedIn
              ? <button className="btn btn-subtle" style={{ padding: "10px 18px", fontSize: "0.88rem" }} onClick={handleLogout}>Log Out</button>
              : <button className="btn btn-subtle" style={{ padding: "10px 18px", fontSize: "0.88rem" }} onClick={() => setModal("login")}>Log In</button>
            }
          </div>
        </header>

        <div className="dashboard-content">

          {/* Hero card — full width */}
          <div className="panel-card dashboard-hero reveal">
            <span className="dashboard-eyebrow">Your Olilife dashboard</span>
            <h2>Personalized wellness overview.</h2>
            <p>Your body metrics, health conditions, diet plan, and product recommendations update together as you edit your constraints.</p>
            <div className="dashboard-actions">
              {isLoggedIn ? (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                >
                  {sendingEmail ? "Sending..." : "Send via Email"}
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => navigate("/", { state: { fromDashboard: true } })}
                >
                  Back to Onboarding
                </button>
              )}
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => document.getElementById("diet-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Jump to Diet
              </button>
            </div>
          </div>

          {/* Two-column grid: sidebar left, main content right */}
          <div className="dashboard-columns">

            {/* Left column — profile & health overview */}
            <div className="dashboard-col">

              {/* Edit constraints — collapsible inline editor */}
              <div className="reveal stagger-1">
                <EditConstraints profile={profile} onSave={handleConstraintsSave} saving={saving} />
              </div>

              {/* Health overview */}
              <section className="panel-card section-card reveal stagger-2">
                <div className="section-head"><div><h3>Health Overview</h3><p>Conditions, body metrics, and calorie targets come first.</p></div></div>
                <StatsGrid metrics={metrics} state={profile} />
              </section>

              {/* Health summary pills */}
              <section className="panel-card section-card reveal stagger-3">
                <div className="section-head"><div><h3>Health Summary</h3><p>Conditions and sensitivities stay visible throughout the plan.</p></div></div>
                <div className="summary-row">
                  <span className="summary-pill">Diabetic: {formatDiabeticStatus(profile.diabeticStatus)}</span>
                  <span className="summary-pill neutral">Allergies: {getAllergySummary(profile)}</span>
                  <span className="summary-pill neutral">Conditions: {formatConditions(profile.chronicConditions)}</span>
                </div>
              </section>

              {/* Macro targets */}
              <section className="panel-card section-card reveal stagger-4">
                <div className="section-head"><div><h3>Macro Targets</h3><p>Targets adapt to your goal and daily calorie needs.</p></div></div>
                <MacroTargets metrics={metrics} />
              </section>

              {/* Tips */}
              <section className="panel-card section-card reveal stagger-5">
                <div className="section-head"><div><h3>Personalized Guidance</h3><p>Tailored to your goal, diabetic profile, and conditions.</p></div></div>
                <TipsList state={profile} />
              </section>

              {/* Products */}
              <section className="panel-card section-card reveal-pop stagger-2">
                <div className="section-head"><div><h3>Product Recommendations</h3><p>Most relevant Olilife suggestions based on your conditions.</p></div></div>
                <ProductSection state={profile} />
              </section>

            </div>

            {/* Right column — diet & products */}
            <div className="dashboard-col">

              {/* Diet generator */}
              <section className="panel-card section-card reveal-right" id="diet-section">
                <div className="section-head">
                  <div>
                    <h3>Diet Generator</h3>
                    <p>5-meal chart saved to your account — swaps persist automatically.</p>
                  </div>
                </div>
                <DietGenerator
                  state={profile}
                  savedDiet={savedDiet}
                  onRequestAuth={() => setModal("login")}
                  onDietSaved={handleDietSaved}
                />
              </section>

            </div>

          </div>

        </div>
      </div>

      {modal === "login" && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setModal("signup")}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "signup" && (
        <SignupModal
          onSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setModal("login")}
          onClose={() => setModal(null)}
        />
      )}
      <Toast />
    </main>
  );
}
