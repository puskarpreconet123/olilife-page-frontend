import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginModal({ onSuccess, onSwitchToSignup, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  useEffect(() => {
    setMounted(true);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Email and password are required."); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      onSuccess(user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (showForgot) {
    return (
      <ForgotPasswordModal
        onClose={onClose}
        onBackToLogin={() => setShowForgot(false)}
      />
    );
  }

  return createPortal(
    <div
      className={`modal-overlay${visible ? " show" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <button className="modal-close-btn" type="button" aria-label="Close" onClick={onClose}>✕</button>
          <div className="modal-brand-icon">🌿</div>
          <h3>Welcome back</h3>
          <p>Log in to restore your wellness profile and continue your plan.</p>
        </div>

        <div className="modal-body">
          {error && (
            <div className="modal-error">
              <span className="modal-error-icon">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="field-group" noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="login-email">Email</label>
              <div className="input-shell">
                <input
                  className="text-input"
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field-group">
              <div className="field-label-row">
                <label className="field-label" htmlFor="login-password">Password</label>
                <button type="button" className="forgot-link" onClick={() => setShowForgot(true)}>
                  Forgot password?
                </button>
              </div>
              <div className="input-shell">
                <input
                  className="text-input"
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="auth-actions">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Logging in…" : "Log In"}
              </button>
              <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>

          <p className="modal-switch">
            No account yet?{" "}
            <button type="button" onClick={onSwitchToSignup}>Sign up</button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
