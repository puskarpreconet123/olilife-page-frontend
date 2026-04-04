import React from "react";

export default function MacroTargets({ metrics }) {
  const rows = [
    { label: "Protein", percent: metrics.macroPercents.protein * 100, grams: metrics.macroTargets.protein, className: "protein" },
    { label: "Carbs",   percent: metrics.macroPercents.carbs   * 100, grams: metrics.macroTargets.carbs,   className: "carb" },
    { label: "Fats",    percent: metrics.macroPercents.fats    * 100, grams: metrics.macroTargets.fats,    className: "fat" }
  ];
  return (
    <div className="macro-stack" id="macroTargets">
      {rows.map((row) => (
        <div key={row.label} className="macro-row">
          <div className="macro-meta">
            <strong>{row.label}</strong>
            <span>{row.grams} g | {row.percent}%</span>
          </div>
          <div className="macro-track">
            <div className={`macro-fill ${row.className}`} style={{ width: `${row.percent}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
