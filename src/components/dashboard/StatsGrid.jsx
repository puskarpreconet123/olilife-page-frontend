import React from "react";
import { formatGoal, titleCase } from "../../utils/dietEngine";

export default function StatsGrid({ metrics, state }) {
  return (
    <div className="stats-grid" id="overviewStats">
      <div className="stat-card">
        <span className="stat-label">BMI</span>
        <strong className="stat-value">{metrics.bmi ? metrics.bmi.toFixed(1) : "--"}</strong>
        <div className="stat-sub">{metrics.bmiCategory}</div>
      </div>
      <div className="stat-card">
        <span className="stat-label">BMR</span>
        <strong className="stat-value">{metrics.bmr}</strong>
        <div className="stat-sub">Calories at rest</div>
      </div>
      <div className="stat-card">
        <span className="stat-label">Daily Calories</span>
        <strong className="stat-value">{metrics.dailyCalories}</strong>
        <div className="stat-sub">Goal-adjusted target</div>
      </div>
      <div className="stat-card">
        <span className="stat-label">Goal & Activity</span>
        <strong className="stat-value">{formatGoal(state.goal)}</strong>
        <div className="stat-sub">{titleCase(state.activityLevel || "")}</div>
      </div>
    </div>
  );
}
