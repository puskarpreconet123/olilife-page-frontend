import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../utils/api";

export default function ForgotPasswordModal({ onClose, onBackToLogin }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setMounted(true);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const [step, setStep]           = useState("email"); // "email" | "otp"
  const [email, setEmail]         = useState("");
  const [otp, setOtp]             = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm]     = useState("");
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showNew, setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email is required."); return; }
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setStep("otp");
      setResendCooldown(600);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    setError("");
    if (code.length < 6) { setError("Enter the full 6-digit code."); return; }
    if (!newPassword) { setError("New password is required."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { email, otp: code, newPassword });
      setSuccess("Password reset successfully! You can now log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(600);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`modal-overlay${visible ? " show" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <button className="modal-close-btn" type="button" aria-label="Close" onClick={onClose}>✕</button>
          <div className="modal-brand-icon">{success ? "✅" : step === "otp" ? "🔐" : "🔑"}</div>
          <h3>{success ? "All done!" : step === "otp" ? "Enter reset code" : "Forgot password?"}</h3>
          <p>
            {success
              ? "Your password has been updated."
              : step === "otp"
              ? `We sent a 6-digit code to ${email}. It expires in 10 minutes.`
              : "Enter your email and we'll send you a reset code."}
          </p>
        </div>

        <div className="modal-body">
          {error && (
            <div className="modal-error">
              <span className="modal-error-icon">⚠</span>
              {error}
            </div>
          )}

          {success ? (
            <button className="btn btn-primary" type="button" onClick={onBackToLogin}>
              Back to Login
            </button>
          ) : step === "email" ? (
            <form onSubmit={handleSendOtp} className="field-group" noValidate>
              <div className="field-group">
                <label className="field-label" htmlFor="forgot-email">Email address</label>
                <div className="input-shell">
                  <input
                    className="text-input"
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>
              <div className="auth-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Send Reset Code"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={onBackToLogin}>Back to Login</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReset} className="field-group" noValidate>
              <div className="otp-group" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    className="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  />
                ))}
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="reset-new-password">New password</label>
                <div className="input-shell">
                  <input
                    className="text-input"
                    id="reset-new-password"
                    type={showNew ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-toggle-visibility"
                    onClick={() => setShowNew((v) => !v)}
                    tabIndex={-1}
                  >{showNew ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="reset-confirm-password">Confirm new password</label>
                <div className="input-shell">
                  <input
                    className="text-input"
                    id="reset-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-toggle-visibility"
                    onClick={() => setShowConfirm((v) => !v)}
                    tabIndex={-1}
                  >{showConfirm ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className="auth-actions">
                <button className="btn btn-primary" type="submit" disabled={loading || otp.join("").length < 6}>
                  {loading ? "Resetting…" : "Reset Password"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => { setStep("email"); setError(""); setOtp(["","","","","",""]); }}>
                  Back
                </button>
              </div>
              <p className="modal-switch">
                Didn't receive it?{" "}
                <button type="button" onClick={handleResend} disabled={resendCooldown > 0}>
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
