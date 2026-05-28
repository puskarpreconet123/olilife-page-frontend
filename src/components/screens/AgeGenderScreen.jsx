import React, { useState } from "react";

const GENDERS = ["female", "male", "other"];

const REGIONAL_OPTIONS = [
  { key: "Kolkata_Bengali", label: "Kolkata Bengali" },
  { key: "South_Indian", label: "South Indian" },
  { key: "Andhra_Telangana", label: "Andhra / Telangana" },
  { key: "Assamese_Northeast", label: "Assamese / Northeast" },
  { key: "Bihari_Jharkhandi", label: "Bihari / Jharkhandi" },
  { key: "Odia", label: "Odia" },
  { key: "Punjabi_North_Indian", label: "Punjabi / North Indian" },
  { key: "Gujarati", label: "Gujarati" },
  { key: "Marathi_Maharashtrian", label: "Marathi / Maharashtrian" }
];

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
      <div className="panel-card field-group">
        <label className="field-label" htmlFor="preferredRegionalMealSelect">Preferred Regional Meal Type</label>
        <div className="input-shell">
          <select
            className="text-input"
            id="preferredRegionalMealSelect"
            value={state.preferredRegionalMeal || ""}
            onChange={(e) => onChange("preferredRegionalMeal", e.target.value)}
            style={{ cursor: "pointer", appearance: "none", WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%233e2723' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
          >
            <option value="">Select regional type</option>
            {REGIONAL_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
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
