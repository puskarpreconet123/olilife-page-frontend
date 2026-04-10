import React, { useState } from "react";

const GENDERS = ["female", "male", "other"];

export default function AgeGenderScreen({ state, onChange, onNext, onBack, canAdvance }) {
  const [ageError, setAgeError] = useState("");
  return (
    <article className="screen active" aria-labelledby="ageGenderTitle">
      <h2 className="panel-title" id="ageGenderTitle" style={{ marginBottom: "8px" }}>Tell us a little about you.</h2>
      <div className="panel-card field-group">
        <label className="field-label" htmlFor="ageInput">Age</label>
        <div className="input-shell">
          <input
            className="text-input"
            id="ageInput"
            inputMode="numeric"
            name="age"
            placeholder="Enter your age"
            type="text"
            value={state.age}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              if (raw && parseInt(raw, 10) > 90) {
                setAgeError("Maximum allowed age is 90.");
                onChange("age", "90");
              } else {
                setAgeError("");
                onChange("age", raw);
              }
            }}
          />
        </div>
        <div style={{ minHeight: "18px", marginTop: "2px" }}>
          {ageError && <div style={{ color: "#c62828", fontSize: "0.82rem" }}>{ageError}</div>}
        </div>
      </div>
      <div className="panel-card field-group">
        <div className="field-label">Gender</div>
        <div className="choice-grid" role="group" aria-label="Select your gender">
          {GENDERS.map((g) => (
            <button
              key={g}
              className={`choice-button${state.gender === g ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("gender", g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-card field-group">
        <div className="field-label">Diet Preference</div>
        <div className="choice-grid" role="group" aria-label="Select your diet preference">
          {[ 
            { key: "veg", label: "Vegetarian" }, 
            { key: "non-veg", label: "Non-Veg" } 
          ].map((p) => (
            <button
              key={p.key}
              className={`choice-button${state.dietPreference === p.key ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("dietPreference", p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="insight-strip">
        <strong>Why this matters:</strong>{" "}
        Personal details and preferences help us calibrate your plan with more care.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>Next</button>
      </div>
    </article>
  );
}
