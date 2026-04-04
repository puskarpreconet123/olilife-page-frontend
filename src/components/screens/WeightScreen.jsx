import React from "react";

export default function WeightScreen({ state, onChange, onNext, onBack, canAdvance }) {
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
            onChange={(e) => onChange("weight", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))}
          />
          <span className="input-suffix">kg</span>
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
