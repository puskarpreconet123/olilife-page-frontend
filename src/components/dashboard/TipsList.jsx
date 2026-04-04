import React from "react";
import { getPersonalizedTips, getMetrics } from "../../utils/dietEngine";

export default function TipsList({ state }) {
  const metrics = getMetrics(state);
  const tips = getPersonalizedTips(state, metrics);
  return (
    <div className="tips-list" id="tipsList">
      {tips.map((tip, i) => (
        <div key={i} className="tip-item">{tip}</div>
      ))}
    </div>
  );
}
