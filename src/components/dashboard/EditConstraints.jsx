import React, { useState } from "react";

const GENDERS     = ["female", "male", "other"];
const ACTIVITIES  = [
  { key: "sedentary", label: "Sedentary" },
  { key: "light",     label: "Light" },
  { key: "moderate",  label: "Moderate" },
  { key: "active",    label: "Active" }
];
const GOALS = [
  { key: "weight-loss", label: "Weight Loss" },
  { key: "weight-gain", label: "Weight Gain" },
  { key: "maintain",    label: "Maintain" },
  { key: "detox",       label: "Detox" },
  { key: "energy",      label: "Energy" }
];
const DIABETIC_OPTIONS = ["non-diabetic", "pre-diabetic", "diabetic"];
const ALLERGIES        = ["dairy", "nuts", "gluten", "seafood", "eggs"];
const CONDITIONS = [
  { key: "none",      label: "None" },
  { key: "liver",     label: "Liver" },
  { key: "kidney",    label: "Kidney" },
  { key: "lung",      label: "Lung" },
  { key: "heart",     label: "Heart" },
  { key: "thyroid",   label: "Thyroid" },
  { key: "digestive", label: "Digestive" }
];

function titleCase(v) {
  return String(v).split(/[\s-]+/).filter(Boolean).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

// Compact toggle row for small button groups
function ToggleRow({ label, options, value, onChange, multi = false }) {
  return (
    <div className="field-group" style={{ gap: 8 }}>
      <div className="field-label" style={{ fontSize: "0.82rem" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => {
          const key   = typeof opt === "string" ? opt : opt.key;
          const lbl   = typeof opt === "string" ? titleCase(opt) : opt.label;
          const active = multi ? (value || []).includes(key) : value === key;
          return (
            <button
              key={key}
              type="button"
              className={`chip-button${active ? " selected" : ""}`}
              style={{ fontSize: "0.78rem", padding: "8px 12px" }}
              onClick={() => {
                if (!multi) { onChange(key); return; }
                const cur = value || [];
                if (key === "none") { onChange(["none"]); return; }
                if (cur.includes(key)) onChange(cur.filter((c) => c !== key));
                else onChange(cur.filter((c) => c !== "none").concat(key));
              }}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EditConstraints({ profile, onSave, saving }) {
  const [open, setOpen]     = useState(false);
  const [draft, setDraft]   = useState(profile);

  // Sync draft when profile changes from outside (e.g. initial load)
  React.useEffect(() => { setDraft(profile); }, [profile]);

  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    onSave(draft);
    setOpen(false);
  };

  const handleDiscard = () => {
    setDraft(profile);
    setOpen(false);
  };

  // Summary line shown in collapsed state
  const summary = [
    draft.age && `Age ${draft.age}`,
    draft.weight && `${draft.weight} kg`,
    draft.goal && titleCase(draft.goal),
    draft.activityLevel && titleCase(draft.activityLevel),
    draft.diabeticStatus && titleCase(draft.diabeticStatus)
  ].filter(Boolean).join(" · ");

  return (
    <div className="panel-card section-card" style={{ marginBottom: 0 }}>
      {/* Header — always visible */}
      <div
        className="section-head"
        style={{ cursor: "pointer", userSelect: "none", marginBottom: open ? 16 : 0 }}
        onClick={() => setOpen((o) => !o)}
        role="button"
        aria-expanded={open}
      >
        <div>
          <h3 style={{ margin: 0 }}>Edit Constraints</h3>
          {!open && summary && (
            <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "rgba(62,39,35,0.62)" }}>{summary}</p>
          )}
        </div>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(76,175,80,0.12)", color: "var(--green-900)",
          fontSize: "1rem", fontWeight: 700, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 220ms ease"
        }}>
          +
        </span>
      </div>

      {open && (
        <div className="field-group" style={{ gap: 18 }}>

          {/* Body metrics row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field-group" style={{ gap: 6 }}>
              <label className="field-label" style={{ fontSize: "0.82rem" }} htmlFor="ec-age">Age</label>
              <input
                className="text-input"
                id="ec-age"
                inputMode="numeric"
                placeholder="Age"
                type="number"
                min="1" max="120"
                value={draft.age}
                onChange={(e) => set("age", e.target.value.replace(/[^\d]/g, ""))}
                style={{ padding: "12px 14px" }}
              />
            </div>
            <div className="field-group" style={{ gap: 6 }}>
              <label className="field-label" style={{ fontSize: "0.82rem" }} htmlFor="ec-weight">Weight (kg)</label>
              <input
                className="text-input"
                id="ec-weight"
                inputMode="decimal"
                placeholder="kg"
                type="text"
                value={draft.weight}
                onChange={(e) => set("weight", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))}
                style={{ padding: "12px 14px" }}
              />
            </div>
          </div>

          {/* Height */}
          <div className="field-group" style={{ gap: 6 }}>
            <div className="field-label" style={{ fontSize: "0.82rem" }}>Height</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <input
                  className="text-input"
                  inputMode="decimal"
                  placeholder={draft.heightUnit === "cm" ? "cm" : "feet"}
                  type="text"
                  value={draft.height}
                  onChange={(e) => set("height", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))}
                  style={{ padding: "12px 14px" }}
                />
              </div>
              {["cm","ft"].map((u) => (
                <button
                  key={u}
                  type="button"
                  className={`chip-button${draft.heightUnit === u ? " selected" : ""}`}
                  style={{ fontSize: "0.78rem", padding: "10px 14px", flexShrink: 0 }}
                  onClick={() => set("heightUnit", u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow label="Gender"         options={GENDERS}          value={draft.gender}         onChange={(v) => set("gender", v)} />
          <ToggleRow label="Activity level" options={ACTIVITIES}        value={draft.activityLevel}  onChange={(v) => set("activityLevel", v)} />
          <ToggleRow label="Primary goal"   options={GOALS}             value={draft.goal}           onChange={(v) => set("goal", v)} />
          <ToggleRow label="Diabetic status" options={DIABETIC_OPTIONS} value={draft.diabeticStatus} onChange={(v) => set("diabeticStatus", v)} />

          {/* Allergies */}
          <div className="field-group" style={{ gap: 8 }}>
            <div className="field-label" style={{ fontSize: "0.82rem" }}>Allergies</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["No","Yes"].map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`chip-button${(draft.hasAllergies ? "Yes" : "No") === v ? " selected" : ""}`}
                  style={{ fontSize: "0.78rem", padding: "8px 12px" }}
                  onClick={() => {
                    const has = v === "Yes";
                    set("hasAllergies", has);
                    if (!has) { set("allergyList", []); set("customAllergy", ""); }
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            {draft.hasAllergies && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                {ALLERGIES.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`chip-button${(draft.allergyList || []).includes(a) ? " selected" : ""}`}
                    style={{ fontSize: "0.78rem", padding: "8px 12px" }}
                    onClick={() => {
                      const cur = draft.allergyList || [];
                      set("allergyList", cur.includes(a) ? cur.filter((x) => x !== a) : cur.concat(a));
                    }}
                  >
                    {titleCase(a)}
                  </button>
                ))}
                <input
                  className="text-input"
                  placeholder="Other allergies (comma-separated)"
                  type="text"
                  value={draft.customAllergy || ""}
                  onChange={(e) => set("customAllergy", e.target.value)}
                  style={{ padding: "10px 14px", fontSize: "0.84rem", marginTop: 4 }}
                />
              </div>
            )}
          </div>

          <ToggleRow
            label="Chronic conditions"
            options={CONDITIONS}
            value={draft.chronicConditions}
            onChange={(v) => set("chronicConditions", v)}
            multi
          />

          {/* Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
            <button className="btn btn-primary" type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save & Apply"}
            </button>
            <button className="btn btn-secondary" type="button" onClick={handleDiscard}>Discard</button>
          </div>
        </div>
      )}
    </div>
  );
}
