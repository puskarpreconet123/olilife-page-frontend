import React, { useState } from "react";

export default function WeightScreen({ state, onChange, onNext, onBack, canAdvance }) {
  const [weightError, setWeightError] = useState("");
  return (
    <article className="screen active" aria-labelledby="weightTitle">
      <div className="panel-card">
        <h2 className="panel-title" id="weightTitle">And your weight?</h2>
        <p className="panel-copy">We use your current weight as one of the anchors for goal-based guidance.</p>
      </div>
      <div className="panel-card field-group">
        <label className="field-label" htmlFor="weightInput">Weight</label>
        <div className="input-shell with-suffix">
          <input
            className="text-input"
            id="weightInput"
            inputMode="decimal"
            name="weight"
            placeholder="Enter your weight"
            type="text"
            value={state.weight}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
              if (raw && parseFloat(raw) > 150) {
                setWeightError("Maximum allowed weight is 150 kg.");
                onChange("weight", "150");
              } else {
                setWeightError("");
                onChange("weight", raw);
              }
            }}
          />
          <span className="input-suffix">kg</span>
        </div>
        <div style={{ minHeight: "18px", marginTop: "2px" }}>
          {weightError && <div style={{ color: "#c62828", fontSize: "0.82rem" }}>{weightError}</div>}
        </div>
      </div>
      <div className="insight-strip">
        <strong>Thoughtful detail:</strong>{" "}
        A precise weight entry helps later plan recommendations feel more intentional.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>Next</button>
      </div>
    </article>
  );
}
