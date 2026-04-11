import { useEffect, useRef, useState } from "react";
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

const MEAL_ICONS = {
  breakfast: "🍳",
  lunch:     "🍱",
  dinner:    "🥗",
  snacks:    "🍏",
  dessert:   "🍮",
};

const MACROS = [
  { key: "protein", label: "Protein", cls: "protein" },
  { key: "carbs",   label: "Carbs",   cls: "carb"    },
  { key: "fats",    label: "Fats",    cls: "fat"     },
];

export default function DietGenerator({ state, savedDiet, onRequestAuth, onDietSaved }) {
  const { isLoggedIn } = useAuth();
  const [meals, setMeals]   = useState(null);
  const [stale, setStale]   = useState(false);
  const [sheet, setSheet]   = useState({ open: false, title: "", subtitle: "", options: [] });
  const saveTimer = useRef(null);

  useEffect(() => {
    if (!savedDiet?.meals?.length) return;
    setMeals(savedDiet.meals);
    setStale(savedDiet.inputSignature !== getInputSignature(state));
  }, [savedDiet]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!meals) return;
    setStale(savedDiet?.inputSignature !== getInputSignature(state));
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
  const isOver    = remaining < 0;

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

      {savedDiet?.generatedAt && (
        <p style={{ margin: "0 0 4px", fontSize: "0.78rem", color: "rgba(62,39,35,0.52)", textAlign: "right" }}>
          Last saved: {formatDate(savedDiet.generatedAt)}
        </p>
      )}

      {/* ── Summary + Live Macros ──────────────────────────────── */}
      <div className="diet-overview">

        {/* Calorie card */}
        <div className="diet-cal-card">
          <span className="stat-label">Planned Calories</span>
          <div className="diet-cal-row">
            <strong className="stat-value">{totals.calories}</strong>
            <span className="diet-cal-unit">kcal</span>
          </div>
          <div className={`stat-sub ${isOver ? "stat-sub--over" : ""}`}>
            {isOver
              ? `${Math.abs(remaining)} kcal over target`
              : `${remaining} kcal remaining`}
          </div>
          {/* Calorie progress bar */}
          <div className="macro-track" style={{ marginTop: 10 }}>
            <div
              className="macro-fill protein"
              style={{ width: `${Math.min((totals.calories / Math.max(metrics.dailyCalories, 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Live macro bars */}
        <div className="live-macros-panel">
          <div className="live-macros-header">
            <span className="stat-label">Live Macros</span>
            <span className="live-macros-note">vs daily target</span>
          </div>
          {MACROS.map(({ key, label, cls }) => {
            const actual = round(totals[key]);
            const target = metrics.macroTargets[key];
            const pct    = Math.min((actual / Math.max(target, 1)) * 100, 100);
            const over   = actual > target;
            return (
              <div key={key} className="live-macro-row">
                <div className="live-macro-meta">
                  <span className={`live-macro-dot ${cls}`} />
                  <span className="live-macro-label">{label}</span>
                  <span className="live-macro-grams">
                    <strong className={over ? "live-macro-over" : ""}>{actual}g</strong>
                    <span className="live-macro-target"> / {target}g</span>
                  </span>
                </div>
                <div className="macro-track">
                  <div
                    className={`macro-fill ${cls}`}
                    style={{ width: `${pct}%`, opacity: over ? 0.65 : 1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Meal list ──────────────────────────────────────────── */}
      <div className="meal-list">
        {meals.map((meal, mealIndex) => {
          const mealTotals = getMealTotals(meal.items);
          const icon = MEAL_ICONS[meal.mealType] || "🍴";

          const totalMacroG = mealTotals.protein + mealTotals.carbs + mealTotals.fats || 1;
          const pPct = (mealTotals.protein / totalMacroG) * 100;
          const cPct = (mealTotals.carbs   / totalMacroG) * 100;
          const fPct = (mealTotals.fats    / totalMacroG) * 100;

          return (
            <div key={mealIndex} className="meal-card" style={{ marginBottom: "32px" }}>

              <div className="meal-top">
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span className="meal-badge" style={{ marginTop: "2px" }}>{icon}</span>
                  <div>
                    <h4>{meal.label}</h4>
                    <div className="meal-target">
                      {meal.targetCalories} kcal target · {mealTotals.calories} kcal actual
                    </div>
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
                      <strong className="food-name">{item.name}</strong>
                      <div className="food-macros-row">
                        <span className="food-portion">{item.portionFactor.toFixed(1)}× serving</span>
                        <span className="food-macro-pill protein">{roundOne(item.protein)}g P</span>
                        <span className="food-macro-pill carb">{roundOne(item.carbs)}g C</span>
                        <span className="food-macro-pill fat">{roundOne(item.fats)}g F</span>
                      </div>
                    </div>
                    <div className="food-calories">
                      {item.calories}
                      <small style={{ fontSize: "0.65rem", display: "block", fontWeight: 600, opacity: 0.6 }}>kcal</small>
                    </div>
                  </button>
                ))}
              </div>

              {/* Macro distribution bar */}
              <div className="meal-macro-bar" title="Protein / Carbs / Fats balance">
                <div className="meal-macro-segment protein" style={{ width: `${pPct}%` }} />
                <div className="meal-macro-segment carb"    style={{ width: `${cPct}%` }} />
                <div className="meal-macro-segment fat"     style={{ width: `${fPct}%` }} />
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
