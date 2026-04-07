import React, { useEffect, useRef, useState } from "react";
import {
  generateDietPlan, getDietTotals, getMealTotals, getAlternativeItemsForState,
  getAlternativeMeals, getMetrics, getInputSignature, titleCase, roundOne, round
} from "../../utils/dietEngine";
import BottomSheet from "../shared/BottomSheet";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function DietGenerator({ state, savedDiet, onRequestAuth, onDietSaved }) {
  const { isLoggedIn } = useAuth();
  const [meals, setMeals]     = useState(null);
  const [stale, setStale]     = useState(false);
  const [sheet, setSheet]     = useState({ open: false, title: "", subtitle: "", options: [] });
  const saveTimer = useRef(null);

  // Restore saved diet from DB on mount / when savedDiet prop changes
  useEffect(() => {
    if (!savedDiet?.meals?.length) return;
    const currentSig = getInputSignature(state);
    setMeals(savedDiet.meals);
    setStale(savedDiet.inputSignature !== currentSig);
  }, [savedDiet]); // eslint-disable-line react-hooks/exhaustive-deps

  // When profile changes after diet is loaded, mark as stale
  useEffect(() => {
    if (!meals) return;
    const currentSig = getInputSignature(state);
    setStale(savedDiet?.inputSignature !== currentSig);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const persistDiet = (updatedMeals) => {
    if (!isLoggedIn) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const sig = getInputSignature(state);
      api.put("/api/user/diet", { meals: updatedMeals, inputSignature: sig })
        .then((res) => { if (onDietSaved) onDietSaved(res.data.savedDietPlan); })
        .catch(() => {});
    }, 800);
  };

  const applyMeals = (updatedMeals) => {
    setMeals(updatedMeals);
    setStale(false);
    persistDiet(updatedMeals);
  };

  const handleGenerate = () => {
    if (!isLoggedIn) { onRequestAuth(); return; }
    applyMeals(generateDietPlan(state));
  };

  const handleClear = () => {
    setMeals(null);
    setStale(false);
    if (isLoggedIn) api.delete("/api/user/diet").catch(() => {});
  };

  const closeSheet = () => setSheet((s) => ({ ...s, open: false }));

  const openItemSheet = (mealIndex, itemIndex) => {
    const meal = meals[mealIndex];
    const item = meal.items[itemIndex];
    setSheet({
      open: true,
      title: `Swap ${item.name}`,
      subtitle: `Choose a similar ${item.category} option within the same meal window.`,
      options: getAlternativeItemsForState(meal, item, state).map((c) => ({
        label: c.name,
        subtitle: `${titleCase(c.category)} | ${c.calories} kcal | ${roundOne(c.protein)}P / ${roundOne(c.carbs)}C / ${roundOne(c.fats)}F`,
        value: { type: "item", mealIndex, itemIndex, item: c }
      }))
    });
  };

  const openMealSheet = (mealIndex) => {
    const meal = meals[mealIndex];
    setSheet({
      open: true,
      title: `Replace ${meal.label}`,
      subtitle: "Pick a fresh combo that still fits your calorie and macro balance.",
      options: getAlternativeMeals(meal, mealIndex, state).map((c) => {
        const totals = getMealTotals(c.items);
        return {
          label: c.label,
          subtitle: `Meal | ${totals.calories} kcal | ${roundOne(totals.protein)}P / ${roundOne(totals.carbs)}C / ${roundOne(totals.fats)}F`,
          foods: c.items.map((i) => i.name).join(", "),
          value: { type: "meal", mealIndex, meal: c }
        };
      })
    });
  };

  const applySheetOption = (index) => {
    const option = sheet.options[index];
    if (!option || !meals) { closeSheet(); return; }
    const updated = meals.map((m, i) => {
      if (option.value.type === "item" && i === option.value.mealIndex) {
        const newItems = [...m.items];
        newItems[option.value.itemIndex] = option.value.item;
        return { ...m, items: newItems };
      }
      if (option.value.type === "meal" && i === option.value.mealIndex) return option.value.meal;
      return m;
    });
    applyMeals(updated);
    closeSheet();
  };

  const metrics = getMetrics(state);

  if (!meals) {
    return (
      <>
        <div className="diet-toolbar">
          <button className="btn btn-primary" type="button" onClick={handleGenerate}>Generate Diet Chart</button>
        </div>
        <div className="empty-state">
          Generate a 5-meal chart built around your goal, diabetic status, allergies, and chronic health conditions.
          {!isLoggedIn && (
            <em style={{ display: "block", marginTop: 8, fontSize: "0.84rem" }}>
              You'll be asked to log in or sign up — your chart is then saved automatically.
            </em>
          )}
        </div>
      </>
    );
  }

  const totals    = getDietTotals(meals);
  const remaining = metrics.dailyCalories - totals.calories;

  return (
    <>
      {/* Stale banner */}
      {stale && (
        <div className="insight-strip" style={{ background: "rgba(198,40,40,0.08)", color: "#c62828", marginBottom: 4 }}>
          <strong>Constraints changed.</strong>
          <span style={{ marginLeft: 8 }}>Your saved plan was built with different inputs.</span>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleGenerate}
            style={{ marginLeft: "auto", padding: "8px 14px", fontSize: "0.82rem", borderRadius: 14 }}
          >
            Regenerate
          </button>
        </div>
      )}

      <div className="diet-toolbar">
        <button className="btn btn-primary" type="button" onClick={handleGenerate}>Regenerate Diet</button>
        <button className="btn btn-secondary" type="button" onClick={handleClear}>Clear Plan</button>
      </div>

      {/* Saved timestamp */}
      {savedDiet?.generatedAt && (
        <p style={{ margin: "0 0 4px", fontSize: "0.78rem", color: "rgba(62,39,35,0.52)", textAlign: "right" }}>
          Last saved: {formatDate(savedDiet.generatedAt)}
        </p>
      )}

      <div className="diet-summary">
        <div className="diet-summary-card">
          <span className="stat-label">Planned Calories</span>
          <strong className="stat-value">{totals.calories}</strong>
          <div className="stat-sub">{remaining >= 0 ? `Remaining ${remaining} kcal` : `Exceeded by ${Math.abs(remaining)} kcal`}</div>
        </div>
        <div className="diet-summary-card">
          <span className="stat-label">Live Macros</span>
          <strong className="stat-value">{round(totals.protein)}P / {round(totals.carbs)}C / {round(totals.fats)}F</strong>
          <div className="stat-sub">Updated with every swap</div>
        </div>
      </div>

      <div className="meal-list">
        {meals.map((meal, mealIndex) => {
          const mealTotals = getMealTotals(meal.items);
          const icon = meal.label.toLowerCase().includes("breakfast") ? "🍳" :
                       meal.label.toLowerCase().includes("lunch") ? "🍱" :
                       meal.label.toLowerCase().includes("dinner") ? "🥗" :
                       meal.label.toLowerCase().includes("snack") ? "🍏" : "🍴";

          // Calculate macro percentages for the bar
          const totalMacros = mealTotals.protein + mealTotals.carbs + mealTotals.fats || 1;
          const pPct = (mealTotals.protein / totalMacros) * 100;
          const cPct = (mealTotals.carbs / totalMacros) * 100;
          const fPct = (mealTotals.fats / totalMacros) * 100;

          return (
            <div
              key={mealIndex}
              className="meal-card"
              style={{
                animation: `slideUpFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards ${mealIndex * 0.15}s`,
                opacity: 0,
                marginBottom: "32px"
              }}
            >
              <div className="meal-top">
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, minWidth: 0 }}>
                  <span className="meal-badge">{icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4 className="meal-title">{meal.label}</h4>
                    <div className="meal-target">Target {meal.targetCalories} kcal | Actual {mealTotals.calories} kcal</div>
                  </div>
                </div>
                <button className="meal-action" type="button" onClick={() => openMealSheet(mealIndex)}>Replace</button>
              </div>

              <div className="food-list">
                {meal.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className={`food-swap ${item.category.toLowerCase()}`}
                    type="button"
                    onClick={() => openItemSheet(mealIndex, itemIndex)}
                  >
                    <div className="food-main">
                      <span className={`food-category-tag ${item.category.toLowerCase()}`}>{item.category}</span>
                      <strong style={{ display: "block", marginBottom: "2px" }}>{item.name}</strong>
                      <span style={{ fontSize: "0.8rem" }}>{item.portionFactor.toFixed(1)}x serving | {roundOne(item.protein)}P / {roundOne(item.carbs)}C / {roundOne(item.fats)}F</span>
                    </div>
                    <div className="food-calories">{item.calories} kcal</div>
                  </button>
                ))}
              </div>

              <div className="meal-macro-bar" title="Protein / Carbs / Fats balance">
                <div className="meal-macro-segment protein" style={{ width: `${pPct}%` }} />
                <div className="meal-macro-segment carb" style={{ width: `${cPct}%` }} />
                <div className="meal-macro-segment fat" style={{ width: `${fPct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <BottomSheet
        open={sheet.open}
        title={sheet.title}
        subtitle={sheet.subtitle}
        options={sheet.options}
        onClose={closeSheet}
        onSelect={applySheetOption}
      />
    </>
  );
}
