import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BottomSheet({ open, title, subtitle, options, onClose, onSelect }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // subtitle format: "Category | X kcal | P / C / F"
  function parseSubtitle(str) {
    if (!str) return { category: null, calories: null, macros: null, plain: str };
    const parts = str.split("|").map((s) => s.trim());
    if (parts.length >= 3) {
      return { category: parts[0], calories: parts[1], macros: parts[2], plain: null };
    }
    return { category: null, calories: null, macros: null, plain: str };
  }

  return createPortal(
    <div
      className={`sheet-backdrop${open ? " show" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-drag-handle" aria-hidden="true" />

        {/* Header */}
        <div className="sheet-head">
          <div className="sheet-head-icon">🔄</div>
          <div className="sheet-head-text">
            <h4>{title || "Swap options"}</h4>
            <p>{subtitle || "Pick a smart alternative without breaking your calorie and macro balance."}</p>
          </div>
          <button className="sheet-close" type="button" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Options */}
        <div className="sheet-options">
          {options && options.length
            ? options.map((option, index) => {
                const parsed = parseSubtitle(option.subtitle);
                return (
                  <button
                    key={index}
                    className="sheet-option"
                    type="button"
                    onClick={() => onSelect(index)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Title row */}
                    <div className="sheet-option-top">
                      <strong>{option.label}</strong>
                      {parsed.calories && (
                        <span className="sheet-option-cal">{parsed.calories}</span>
                      )}
                    </div>

                    {/* Macro chips */}
                    {parsed.macros && (
                      <div className="sheet-option-macros">
                        {parsed.macros.split("/").map((m, i) => (
                          <span key={i} className={`sheet-macro-chip ${["protein","carb","fat"][i] || ""}`}>
                            {m.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Category tag — hide if it just says "Meal" */}
                    {parsed.category && parsed.category.toLowerCase() !== "meal" && (
                      <span className="sheet-option-category">{parsed.category}</span>
                    )}

                    {/* Food items list (meal replace only) */}
                    {option.foods && (
                      <span className="sheet-option-foods">{option.foods}</span>
                    )}

                    {/* Fallback plain text */}
                    {parsed.plain && (
                      <span className="sheet-option-plain">{parsed.plain}</span>
                    )}

                    <div className="sheet-option-arrow">→</div>
                  </button>
                );
              })
            : <div className="empty-state">No alternatives available for this choice right now.</div>
          }
        </div>
      </div>
    </div>,
    document.body
  );
}
