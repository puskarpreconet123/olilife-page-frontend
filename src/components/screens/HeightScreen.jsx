import React, { useState } from "react";

export default function HeightScreen({ state, onChange, onNext, onBack, canAdvance }) {
  const [error, setError] = useState("");

  return (
    <article className="screen active" aria-labelledby="heightTitle">
      <h2 className="panel-title" id="heightTitle" style={{ marginBottom: "8px" }}>What is your height?</h2>
      <div className="panel-card field-group">
        <div className="field-label">Preferred unit</div>
        <div className="segment-grid" role="group" aria-label="Choose your height unit">
          {["cm", "ft"].map((unit) => (
            <button
              key={unit}
              className={`unit-button${state.heightUnit === unit ? " selected" : ""}`}
              type="button"
              onClick={() => {
                if (state.heightUnit !== unit) {
                  setError("");
                  onChange("heightUnit", unit);
                  onChange("height", "");
                }
              }}
            >
              {unit === "cm" ? "Centimeters" : "Feet"}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-card field-group">
        <label className="field-label" htmlFor="heightInput">Height</label>
        <div className="input-shell">
          <input
            className="text-input"
            id="heightInput"
            inputMode="decimal"
            name="height"
            placeholder={state.heightUnit === "cm" ? "Enter your height in cm" : "Enter your height in feet"}
            type="text"
            value={state.height}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
              const max = state.heightUnit === "cm" ? 300 : 10;
              
              if (raw && parseFloat(raw) > max) {
                setError(`Maximum allowed height is ${max} ${state.heightUnit}.`);
                onChange("height", max.toString());
              } else {
                setError("");
                onChange("height", raw);
              }
            }}
          />
        </div>
        <div style={{ minHeight: "18px", marginTop: "2px" }}>
          {error && <div style={{ color: "#c62828", fontSize: "0.82rem" }}>{error}</div>}
        </div>
      </div>
      <div className="insight-strip">
        <strong>Profile shaping:</strong>{" "}
        Height lets the next steps feel more grounded when we pair it with your body profile.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>Next</button>
      </div>
    </article>
  );
}
