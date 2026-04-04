import React from "react";

const DIABETIC_OPTIONS = ["non-diabetic", "pre-diabetic", "diabetic"];
const ALLERGIES = ["dairy", "nuts", "gluten", "seafood", "eggs"];
const CONDITIONS = [
  { key: "none",       label: "None",       desc: "No ongoing chronic condition to account for." },
  { key: "liver",      label: "Liver",      desc: "Support lighter, detox-friendly food choices." },
  { key: "kidney",     label: "Kidney",     desc: "Favor balanced protein and lower sodium options." },
  { key: "lung",       label: "Lung",       desc: "Lean toward anti-inflammatory, gentle meals." },
  { key: "heart",      label: "Heart",      desc: "Keep the plan lower in fat and sodium." },
  { key: "thyroid",    label: "Thyroid",    desc: "Use steady, balanced nourishment patterns." },
  { key: "digestive",  label: "Digestive",  desc: "Prioritize easy-to-digest, comfortable meals.", wide: true }
];

function titleCase(v) {
  return String(v).split(/[\s-]+/).filter(Boolean).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

export default function HealthScreen({ state, onChange, onNext, onBack, canAdvance }) {
  const toggleCondition = (key) => {
    const current = state.chronicConditions || [];
    if (key === "none") {
      onChange("chronicConditions", ["none"]);
    } else if (current.includes(key)) {
      onChange("chronicConditions", current.filter((c) => c !== key));
    } else {
      onChange("chronicConditions", current.filter((c) => c !== "none").concat(key));
    }
  };

  const toggleAllergy = (allergy) => {
    const current = state.allergyList || [];
    if (current.includes(allergy)) {
      onChange("allergyList", current.filter((a) => a !== allergy));
    } else {
      onChange("allergyList", current.concat(allergy));
    }
  };

  return (
    <article className="screen active" aria-labelledby="healthTitle">
      <div className="panel-card">
        <h2 className="panel-title" id="healthTitle">Any health conditions we should note?</h2>
        <p className="panel-copy">This keeps your wellness plan more mindful, safer around sensitivities, and better tailored to long-term needs.</p>
      </div>

      <div className="panel-card field-group">
        <div className="field-label">Diabetic status</div>
        <div className="choice-grid" role="group" aria-label="Select diabetic status">
          {DIABETIC_OPTIONS.map((d) => (
            <button
              key={d}
              className={`choice-button${state.diabeticStatus === d ? " selected" : ""}`}
              type="button"
              onClick={() => onChange("diabeticStatus", d)}
            >
              {titleCase(d)}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card field-group">
        <div className="field-label">Allergies</div>
        <div className="segment-grid" role="group" aria-label="Does the user have allergies">
          {["no", "yes"].map((v) => (
            <button
              key={v}
              className={`unit-button${(state.hasAllergies ? "yes" : "no") === v ? " selected" : ""}`}
              type="button"
              onClick={() => {
                const has = v === "yes";
                onChange("hasAllergies", has);
                if (!has) { onChange("allergyList", []); onChange("customAllergy", ""); }
              }}
            >
              {v === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>
        <div className={`allergy-extra${state.hasAllergies ? "" : " hidden"}`}>
          <div className="field-group">
            <div className="field-label">Common allergies</div>
            <div className="chip-grid" role="group" aria-label="Select allergies">
              {ALLERGIES.map((a) => (
                <button
                  key={a}
                  className={`chip-button${(state.allergyList || []).includes(a) ? " selected" : ""}`}
                  type="button"
                  onClick={() => toggleAllergy(a)}
                >
                  {titleCase(a)}
                </button>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="customAllergyInput">Custom allergies</label>
            <div className="input-shell">
              <input
                className="text-input"
                id="customAllergyInput"
                name="customAllergy"
                placeholder="e.g. soy, mushroom, sesame"
                type="text"
                value={state.customAllergy || ""}
                onChange={(e) => onChange("customAllergy", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="panel-card field-group">
        <div className="field-label">Chronic health conditions</div>
        <p className="field-hint">Select at least one. Choosing "None" clears the rest.</p>
        <div className="option-grid" role="group" aria-label="Select chronic health conditions">
          {CONDITIONS.map((c) => (
            <button
              key={c.key}
              className={`condition-card${c.wide ? " wide" : ""}${(state.chronicConditions || []).includes(c.key) ? " selected" : ""}`}
              type="button"
              onClick={() => toggleCondition(c.key)}
            >
              <strong>{c.label}</strong>
              <span>{c.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="insight-strip">
        <strong>Care first:</strong>{" "}
        These details shape safer food choices, smarter substitutions, and more relevant product suggestions.
      </div>
      <div className="footer-actions">
        <button className="btn btn-secondary" type="button" onClick={onBack}>Back</button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={!canAdvance}>See Dashboard</button>
      </div>
    </article>
  );
}
