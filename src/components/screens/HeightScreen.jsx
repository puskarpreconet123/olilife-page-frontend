import React from "react";

export default function HeightScreen({ state, onChange, onNext, onBack, canAdvance }) {
  return (
    <article className="screen active" aria-labelledby="heightTitle">
      <div className="panel-card">
        <h2 className="panel-title" id="heightTitle">What is your height?</h2>
        <p className="panel-copy">We support centimeters and feet so the flow feels natural for you.</p>
      </div>
      <div className="panel-card field-group">
        <div className="field-label">Preferred unit</div>
        <div className="segment-grid" role="group" aria-label="Choose your height unit">
          {["cm", "ft"].map((unit) => (
            <button
              key={unit}
              className={`unit-button${state.heightUnit === unit ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("heightUnit", unit)}
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
            onChange={(e) => onChange("height", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))}
          />
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
