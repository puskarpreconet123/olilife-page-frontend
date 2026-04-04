import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BottomSheet({ open, title, subtitle, options, onClose, onSelect }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) return null;

  return createPortal(
    <div className={`sheet-backdrop${open ? " show" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-head">
          <div>
            <h4>{title || "Swap options"}</h4>
            <p>{subtitle || "Pick a smart alternative without breaking your calorie and macro balance."}</p>
          </div>
          <button className="sheet-close" type="button" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="sheet-options">
          {options && options.length
            ? options.map((option, index) => (
                <button key={index} className="sheet-option" type="button" onClick={() => onSelect(index)}>
                  <strong>{option.label}</strong>
                  <span>{option.subtitle}</span>
                </button>
              ))
            : <div className="empty-state">No alternatives available for this choice right now.</div>
          }
        </div>
      </div>
    </div>,
    document.body
  );
}
