import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignupModal({ onSuccess, onSwitchToLogin, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setMounted(true);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const { sendOtp, verifyOtp } = useAuth();

  // step: "form" | "otp"
  const [step, setStep]         = useState("form");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) { setError("All fields are required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await sendOtp(email, password);
      setStep("otp");
      setResendCooldown(120);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
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

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the full 6-digit code."); return; }
    setError("");
    setLoading(true);
    try {
      const user = await verifyOtp(email, code);
      onSuccess(user);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
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
      await sendOtp(email, password);
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(120);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
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
          <div className="modal-brand-icon">{step === "otp" ? "📬" : "🌱"}</div>
          <h3>{step === "otp" ? "Check your email" : "Create your account"}</h3>
          <p>
            {step === "otp"
              ? `We sent a 6-digit code to ${email}. It expires in 2 minutes.`
              : "Sign up to save your wellness profile and personalized plan."}
          </p>
        </div>

        <div className="modal-body">
          {error && (
            <div className="modal-error">
              <span className="modal-error-icon">⚠</span>
              {error}
            </div>
          )}

          {step === "form" ? (
            <form onSubmit={handleSendOtp} className="field-group" noValidate>
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
                  {loading ? "Sending code…" : "Continue"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="field-group" noValidate>
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
              <div className="auth-actions">
                <button className="btn btn-primary" type="submit" disabled={loading || otp.join("").length < 6}>
                  {loading ? "Verifying…" : "Verify & Create Account"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => { setStep("form"); setError(""); setOtp(["","","","","",""]); }}>
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

          {step === "form" && (
            <p className="modal-switch">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin}>Log in</button>
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
