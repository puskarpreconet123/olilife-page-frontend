import React from "react";

export default function ProgressBar({ current, total, action }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <header className="topbar">
      <div className="brand-row">
        <div className="brand-pill">
          <img src="/olilife_logo-300x95.webp" alt="Olilife" className="brand-logo" />
        </div>
        <div className="brand-row-right">
          <div className="step-indicator">Step {current + 1} of {total}</div>
          {action}
        </div>
      </div>
      <div className="progress-track" aria-label="Progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
