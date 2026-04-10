import React from "react";

const GOALS = [
  { key: "weight-loss", label: "Weight Loss", desc: "Support a lighter, more balanced body profile." },
  { key: "weight-gain", label: "Weight Gain", desc: "Build strength and improve nourishment." },
  { key: "maintain",    label: "Maintain",    desc: "Hold steady with consistent wellness support." },
  { key: "detox",       label: "Detox",       desc: "Focus on reset, lightness, and cleaner habits." },
  { key: "energy",      label: "Energy",      desc: "Improve stamina, clarity, and everyday vitality.", wide: true }
];

export default function GoalScreen({ state, onChange, onNext, onBack, canAdvance }) {
  return (
    <article className="screen active" aria-labelledby="goalTitle">
      <h2 className="panel-title" id="goalTitle" style={{ marginBottom: "8px" }}>What is your current goal?</h2>
      <div className="panel-card field-group">
        <div className="field-label">Primary goal</div>
        <div className="option-grid" role="group" aria-label="Select your goal">
          {GOALS.map((g) => (
            <button
              key={g.key}
              className={`option-card${g.wide ? " wide" : ""}${state.goal === g.key ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("goal", g.key)}
            >
              <strong>{g.label}</strong>
              <span>{g.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="insight-strip">
        <strong>Plan direction:</strong>{" "}
        Your main goal becomes the lens for the recommendations in the next phase.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>Next</button>
      </div>
    </article>
  );
}
