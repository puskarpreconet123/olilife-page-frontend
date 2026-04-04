import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignupModal({ onSuccess, onSwitchToLogin, onClose }) {
  const { signup } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) { setError("All fields are required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const user = await signup(email, password);
      onSuccess(user);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <h3>Create your account</h3>
        <p>Sign up to save your wellness profile and personalized plan.</p>
        {error && <div className="modal-error">{error}</div>}
        <form onSubmit={handleSubmit} className="field-group" noValidate>
          <div className="field-group">
            <label className="field-label" htmlFor="signup-email">Email</label>
            <div className="input-shell">
              <input
                className="text-input"
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="signup-password">Password</label>
            <div className="input-shell">
              <input
                className="text-input"
                id="signup-password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="signup-confirm">Confirm password</label>
            <div className="input-shell">
              <input
                className="text-input"
                id="signup-confirm"
                type="password"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="auth-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
        <p className="modal-switch">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>Log in</button>
        </p>
      </div>
    </div>
  );
}
