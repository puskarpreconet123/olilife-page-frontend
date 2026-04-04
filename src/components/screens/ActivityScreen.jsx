import React from "react";

const ACTIVITIES = [
  { key: "sedentary", label: "Sedentary",  desc: "Mostly desk-based with minimal daily movement." },
  { key: "light",     label: "Light",      desc: "Short walks or light movement a few times a week." },
  { key: "moderate",  label: "Moderate",   desc: "Regular workouts or a fairly active routine." },
  { key: "active",    label: "Active",     desc: "Frequent exercise, training, or high daily movement." }
];

export default function ActivityScreen({ state, onChange, onNext, onBack, canAdvance }) {
  return (
    <article className="screen active" aria-labelledby="activityTitle">
      <div className="panel-card">
        <h2 className="panel-title" id="activityTitle">How active are you most days?</h2>
        <p className="panel-copy">Choose the option that feels closest to your usual weekly rhythm.</p>
      </div>
      <div className="panel-card field-group">
        <div className="field-label">Activity level</div>
        <div className="option-grid" role="group" aria-label="Select your activity level">
          {ACTIVITIES.map((a) => (
            <button
              key={a.key}
              className={`option-card${state.activityLevel === a.key ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("activityLevel", a.key)}
            >
              <strong>{a.label}</strong>
              <span>{a.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="insight-strip">
        <strong>Daily rhythm:</strong>{" "}
        Your activity level helps balance nourishment, recovery, and energy support.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>Next</button>
      </div>
    </article>
  );
}
