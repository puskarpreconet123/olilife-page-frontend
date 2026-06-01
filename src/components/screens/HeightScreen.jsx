import React, { useState, useEffect } from "react";

export default function HeightScreen({ state, onChange, onNext, onBack, canAdvance }) {
  const [error, setError] = useState("");
  const [localFt, setLocalFt] = useState("");
  const [localIn, setLocalIn] = useState("");

  useEffect(() => {
    if (state.heightUnit === "ft") {
      if (state.height) {
        const val = Number(state.height);
        if (!isNaN(val)) {
          const f = Math.floor(val);
          const i = Math.round((val - f) * 12);
          const localVal = (Number(localFt || 0) + Number(localIn || 0) / 12);
          if (Math.abs(val - localVal) > 0.01 || (localFt === "" && localIn === "")) {
            setLocalFt(f.toString());
            setLocalIn(i === 0 && val === f ? "" : i.toString());
          }
        } else {
          setLocalFt("");
          setLocalIn("");
        }
      } else {
        setLocalFt("");
        setLocalIn("");
      }
    }
  }, [state.height, state.heightUnit]);

  const updateParentHeight = (feetStr, inchStr) => {
    if (!feetStr && !inchStr) {
      onChange("height", "");
      return;
    }
    const f = feetStr ? parseInt(feetStr, 10) : 0;
    const i = inchStr ? parseInt(inchStr, 10) : 0;
    
    if (f === 0 && i === 0) {
      onChange("height", "");
    } else {
      onChange("height", (f + i / 12).toFixed(2));
    }
  };

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
        <label className="field-label" htmlFor={state.heightUnit === "cm" ? "heightInput" : "heightFtInput"}>Height</label>
        {state.heightUnit === "cm" ? (
          <div className="input-shell">
            <input
              className="text-input"
              id="heightInput"
              inputMode="decimal"
              name="height"
              placeholder="Enter your height in cm"
              type="text"
              value={state.height}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                const max = 300;
                
                if (raw && parseFloat(raw) > max) {
                  setError(`Maximum allowed height is ${max} cm.`);
                  onChange("height", max.toString());
                } else {
                  setError("");
                  onChange("height", raw);
                }
              }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <div className="input-shell">
                <input
                  className="text-input"
                  id="heightFtInput"
                  inputMode="numeric"
                  placeholder="Feet"
                  type="text"
                  value={localFt}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val) {
                      const f = parseInt(val, 10);
                      if (f > 10) {
                        setError("Maximum height is 10 feet.");
                        val = "10";
                      } else {
                        setError("");
                      }
                    } else {
                      setError("");
                    }
                    setLocalFt(val);
                    updateParentHeight(val, localIn);
                  }}
                />
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--brown-600, #3e2723)", opacity: 0.7, marginTop: "4px", display: "inline-block" }}>Feet (ft)</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="input-shell">
                <input
                  className="text-input"
                  id="heightInInput"
                  inputMode="numeric"
                  placeholder="Inches"
                  type="text"
                  value={localIn}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val) {
                      const i = parseInt(val, 10);
                      if (i >= 12) {
                        setError("Inches must be less than 12.");
                        val = "11";
                      } else {
                        setError("");
                      }
                    } else {
                      setError("");
                    }
                    setLocalIn(val);
                    updateParentHeight(localFt, val);
                  }}
                />
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--brown-600, #3e2723)", opacity: 0.7, marginTop: "4px", display: "inline-block" }}>Inches (in)</span>
            </div>
          </div>
        )}
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
