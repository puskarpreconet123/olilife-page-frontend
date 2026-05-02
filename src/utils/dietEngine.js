// ─── Constants ────────────────────────────────────────────────────────────────

// Calorie share (`percentage`) and macro share (`macroShare`) must match per slot
// because calories = 4·P + 4·C + 9·F. If they disagree, the slot's calorie and
// macro targets are internally inconsistent and the engine cannot satisfy both —
// it ends up hitting one and overshooting the other.
// The four real meals sum to 1.00 on both fields. Dessert is a calorie-only
// bonus (5% of baseCalories, gated on BMI<25) and contributes 0 to macro targets.
export const MEAL_CONFIGS = [
  { key: "breakfast", label: "Breakfast", percentage: 0.30, macroShare: 0.30 },
  { key: "lunch",     label: "Lunch",     percentage: 0.35, macroShare: 0.35 },
  { key: "dinner",    label: "Dinner",    percentage: 0.25, macroShare: 0.25 },
  { key: "snacks",    label: "Snacks",    percentage: 0.10, macroShare: 0.10 },
  { key: "dessert",   label: "Dessert",   percentage: 0.05, macroShare: 0    }
];

export const ACTIVITY_MULTIPLIERS = {
  sedentary:   1.2,
  light:       1.375,
  moderate:    1.55,
  very_active: 1.725,
  athlete:     1.9
};

export const GOAL_ADJUSTMENTS = {
  "weight-loss": -400,
  "weight-gain":  400,
  maintain:         0,
  detox:         -200,
  energy:           0
};


export const CONDITION_PREFERENCES = {
  liver:      { support: ["detox-friendly", "low-fat"],             avoid: ["high-fat", "fried"] },
  kidney:     { support: ["controlled-protein", "low-sodium"],      avoid: ["protein-heavy", "high-sodium"] },
  lung:       { support: ["anti-inflammatory"],                      avoid: ["fried"] },
  heart:      { support: ["low-fat", "low-sodium"],                 avoid: ["high-fat", "high-sodium", "fried"] },
  thyroid:    { support: ["balanced-iodine"],                        avoid: [] },
  digestive:  { support: ["easy-digest"],                            avoid: ["fried", "heavy"] }
};

// ─── Food Database (populated from API via loadFoodDatabase) ─────────────────

let foodDatabase = [];

export async function loadFoodDatabase() {
  const base = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || "";
  const res = await fetch(`${base}/api/meals`);
  if (!res.ok) throw new Error("Failed to load meal database");
  const rawMeals = await res.json();
  foodDatabase = buildFoodDatabase(rawMeals);
}

// ─── Build Food Database (transforms raw DB meals into engine format) ─────────

export function buildFoodDatabase(rawMeals) {
  return rawMeals.map((meal, idx) => {
    let category = "carb";
    if (meal.protein > meal.carbs && meal.protein > meal.fats) {
      category = "protein";
    } else if (meal.fats > meal.carbs && meal.fats > meal.protein) {
      category = "fat";
    }

    const tags = [];
    if (meal.vegetarian === "Yes") tags.push("veg");
    if (meal.diabetic_friendly === "Yes") tags.push("diabetic-friendly");
    if (meal.allergens) {
      if (Array.isArray(meal.allergens)) {
        meal.allergens.forEach(a => {
          const trimmed = String(a).trim().toLowerCase();
          if (trimmed) tags.push(trimmed);
        });
      } else if (typeof meal.allergens === "string") {
        meal.allergens.split(",").forEach(a => {
          const trimmed = a.trim().toLowerCase();
          if (trimmed) tags.push(trimmed);
        });
      }
    }
    if (meal.fats <= 5) tags.push("low-fat");
    if (meal.calories <= 100) tags.push("light");
    if (meal.fiber >= 5) tags.push("high-fiber");
    if (meal.protein >= 15) tags.push("protein-heavy");

    return {
      id: meal._id ? String(meal._id) : `meal-${idx + 1}`,
      name: meal.name,
      category,
      calories: meal.calories,
      calorie_range: meal.calorie_range || null,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      fiber: meal.fiber,
      mealType: meal.type,
      tags,
      vegetarian: meal.vegetarian === "Yes",
      diabeticFriendly: meal.diabetic_friendly === "Yes"
    };
  });
}

// ─── Constants & Product Catalog ──────────────────────────────────────────

export const PRODUCT_CATALOG = [
  {
    key:     "glucoamrit",
    name:    "Olilife GlucoAmrit",
    benefit: "Advanced Ayurvedic herbal juice for healthy blood sugar levels — for diabetic and pre-diabetic profiles.",
    link:    "https://olilife.in/product/olilife-glucoamrit-advanced-ayurvedic-herbal-wellness-juice/",
    image:   "https://olilife.in/wp-content/uploads/2026/01/web-site-glucoamrit-final-226x300.jpg"
  },
  {
    key:     "oliliv",
    name:    "Oliliv Juice",
    benefit: "Ayurvedic herbal liver wellness juice — pairs with detox-focused or low-fat meal plans.",
    link:    "https://olilife.in/product/oliliv-juice/",
    image:   "https://olilife.in/wp-content/uploads/2026/01/oliliv-creative-web-final-226x300.jpg"
  },
  {
    key:     "digestowell",
    name:    "Digestowell Syrup",
    benefit: "Ayurvedic digestive care for high-fibre, protein-rich, or spiced diets.",
    link:    "https://olilife.in/product/digestowell-syrup/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/digestowel-dosage-web-final-226x300.jpg"
  },
  {
    key:     "laxonova",
    name:    "Laxonova Powder",
    benefit: "Plant-based Ayurvedic digestive relief for protein-heavy or low-fibre meal plans.",
    link:    "https://olilife.in/product/laxonova/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/laxonova-creative-web-final-226x300.jpg"
  },
  {
    key:     "respipure",
    name:    "Respipure",
    benefit: "Ayurvedic lung and respiratory support — recommended for lung and respiratory conditions.",
    link:    "https://olilife.in/product/respipure/",
    image:   "https://olilife.in/wp-content/uploads/2025/10/A.jpg"
  },
  {
    key:     "revira",
    name:    "Revira",
    benefit: "Ayurvedic energy and vitality booster — recommended for improving stamina and everyday energy.",
    link:    "https://olilife.in/product/revira/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/revira-web-image-3-final.jpg"
  }
];

export const productCatalog = PRODUCT_CATALOG.map((p) => ({ ...p }));

// ─── Helpers ──────────────────────────────────────────────────────────────
 
export function round(value) { return Math.round(value); }
export function roundOne(value) { return Math.round(value * 10) / 10; }
export function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

// Round a set of fractions to 1 decimal place such that they sum to exactly 1.0
// (largest-remainder method). Input is first normalized so sum = 1, so this is
// safe even when the raw fractions slightly over/undershoot due to gram rounding.
function roundFractionsToOne(values) {
  const total = values.reduce((s, v) => s + v, 0);
  if (total <= 0) return values.map(() => 0);
  const scaled = values.map(v => (v / total) * 10);
  const floors = scaled.map(Math.floor);
  const deficit = 10 - floors.reduce((s, f) => s + f, 0);
  const order = scaled
    .map((s, i) => ({ remainder: s - Math.floor(s), i }))
    .sort((a, b) => b.remainder - a.remainder);
  for (let k = 0; k < deficit && k < order.length; k++) floors[order[k].i] += 1;
  return floors.map(f => f / 10);
}

export function titleCase(value) {
  return String(value).split(/[\s-]+/).filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
export function formatGoal(goal) {
  return goal === "weight-loss" ? "Weight Loss" : goal === "weight-gain" ? "Weight Gain" : titleCase(goal || "");
}
export function formatDiabeticStatus(status) { return status ? titleCase(status) : "Not set"; }
export function formatConditions(conditions) {
  if (!conditions || !conditions.length) return "Not set";
  if (conditions.includes("none")) return "None";
  return conditions.map(titleCase).join(", ");
}

// ─── Metrics ──────────────────────────────────────────────────────────────

export function getHeightCm(height, heightUnit) {
  const value = Number(height);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return heightUnit === "cm" ? value : value * 30.48;
}

export function getWeightKg(weight) {
  const value = Number(weight);
  return Number.isFinite(value) && value > 0 ? value : 0;
}


// ─── g/kg Research-Backed Macro Targets ───────────────────────────────────
const MACRO_GRAMS_PER_KG = {
  "weight-loss": { proteinPerKg: 1.4, fatPerKg: 0.8 },
  // High protein → preserve muscle during deficit
  // Lower fat → create room for carbs, reduce calories

  "weight-gain": { proteinPerKg: 1.8, fatPerKg: 1.0 },
  // Moderate protein → build muscle (not excess)
  // Moderate fat → hormones, testosterone, recovery

  "maintain":    { proteinPerKg: 1.2, fatPerKg: 0.9 },
  // Balanced — just sustain current body composition

  "detox":       { proteinPerKg: 1.1, fatPerKg: 0.7 },
  // Lower protein → less liver load
  // Lower fat → easier digestion
  // More carbs (from fiber-rich foods) → cleansing

  "energy":      { proteinPerKg: 1.3, fatPerKg: 0.9 },
  // Moderate protein → sustained energy
  // Carbs fill the rest → primary fuel source
};

// ─── Condition-Based Adjustments ──────────────────────────────────────────

const CONDITION_MACRO_ADJUSTMENTS = {
  kidney:     { proteinPerKgDelta: -0.4, fatPerKgDelta:  0.0 },
  // Kidney disease → significantly reduce protein
  // Excess protein = more urea = kidney strain

  liver:      { proteinPerKgDelta: -0.2, fatPerKgDelta: -0.1 },
  // Liver disease → moderate protein reduction
  // Lower fat → less burden on bile production

  heart:      { proteinPerKgDelta:  0.0, fatPerKgDelta: -0.2 },
  // Heart → reduce fat (esp. saturated)
  // Protein stays same

  digestive:  { proteinPerKgDelta: -0.1, fatPerKgDelta: -0.1 },
  // Digestive issues → slightly reduce both
  // Easier to process

  lung:       { proteinPerKgDelta:  0.1, fatPerKgDelta:  0.0 },
  // Lung conditions → slightly more protein
  // Supports respiratory muscle strength

  thyroid:    { proteinPerKgDelta:  0.0, fatPerKgDelta:  0.0 },
  // Thyroid → no macro change, just food quality matters
};

// ─── Diabetic Adjustment ──────────────────────────────────────────────────

// For diabetic/pre-diabetic: reduce carbs, increase protein slightly
// Carbs cause blood sugar spikes → need to be controlled
const DIABETIC_ADJUSTMENT = {
  proteinPerKgDelta: +0.2,  // More protein → better satiety, less glucose spike
  fatPerKgDelta:     +0.1,  // Slightly more fat → slows glucose absorption
};

// ─── Core Macro Calculator (replaces getMacroPercents) ────────────────────

export function calculateMacroTargets(weightKg, targetCalories, goal, chronicConditions = [], diabeticStatus = "non-diabetic") {
  // Step 1: Base g/kg from goal
  const base = MACRO_GRAMS_PER_KG[goal] || MACRO_GRAMS_PER_KG["maintain"];
  let proteinPerKg = base.proteinPerKg;
  let fatPerKg     = base.fatPerKg;

  // Step 2: Multi-condition safe merge
  const activeConditions = (chronicConditions || [])
    .filter(c => c !== "none" && CONDITION_MACRO_ADJUSTMENTS[c]);

  if (activeConditions.length > 0) {
    const proteinDeltas = activeConditions.map(c => CONDITION_MACRO_ADJUSTMENTS[c].proteinPerKgDelta);
    const fatDeltas     = activeConditions.map(c => CONDITION_MACRO_ADJUSTMENTS[c].fatPerKgDelta);

    const proteinReductions = proteinDeltas.filter(d => d < 0);
    const proteinBoosts     = proteinDeltas.filter(d => d > 0);
    const fatReductions     = fatDeltas.filter(d => d < 0);
    const fatBoosts         = fatDeltas.filter(d => d > 0);

    // Reductions always win — most conservative reduction applied
    // Boosts only apply when no condition restricts that macro
    if (proteinReductions.length > 0) {
      proteinPerKg += Math.min(...proteinReductions);
    } else if (proteinBoosts.length > 0) {
      proteinPerKg += Math.max(...proteinBoosts);
    }

    if (fatReductions.length > 0) {
      fatPerKg += Math.min(...fatReductions);
    } else if (fatBoosts.length > 0) {
      fatPerKg += Math.max(...fatBoosts);
    }
  }

  // Step 3: Diabetic adjustment — skip protein boost when any condition restricts protein
  // (e.g. kidney: excess protein → more urea → kidney strain, which outranks diabetic satiety)
  if (diabeticStatus === "diabetic" || diabeticStatus === "pre-diabetic") {
    const proteinRestricted = activeConditions.some(
      c => (CONDITION_MACRO_ADJUSTMENTS[c]?.proteinPerKgDelta || 0) < 0
    );
    if (!proteinRestricted) proteinPerKg += DIABETIC_ADJUSTMENT.proteinPerKgDelta;
    fatPerKg += DIABETIC_ADJUSTMENT.fatPerKgDelta;
  }

  // Step 4: Safety clamps
  proteinPerKg = clamp(proteinPerKg, 0.8, 2.5);
  fatPerKg     = clamp(fatPerKg,     0.5, 1.5);

  // Step 5: Calculate grams
  const proteinG    = round(weightKg * proteinPerKg);
  const fatG        = round(weightKg * fatPerKg);

  // Step 6: Carbs = remaining calories
  const proteinKcal = proteinG * 4;
  const fatKcal     = fatG * 9;
  const carbsG      = round(Math.max(targetCalories - proteinKcal - fatKcal, 0) / 4);

  // Step 7: % for backward compatibility — use largest-remainder rounding so the
  // three displayed fractions always sum to exactly 1.0 (avoids stacked rounding
  // drift like 0.2 + 0.3 + 0.6 = 1.1).
  const [protein, fats, carbs] = roundFractionsToOne([
    proteinKcal / targetCalories,
    fatKcal     / targetCalories,
    (carbsG * 4) / targetCalories,
  ]);

  return {
    proteinG, carbsG, fatG,
    proteinPerKg: roundOne(proteinPerKg),
    fatPerKg:     roundOne(fatPerKg),
    protein,
    carbs,
    fats,
  };
}

export function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return heightM > 0 ? weightKg / (heightM * heightM) : 0;
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBMR(age, gender, heightCm, weightKg) {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * Number(age);
  if (gender === "male") bmr += 5;
  else if (gender === "female") bmr -= 161;
  else bmr -= 78;
  return Math.max(0, round(bmr));
}

export function calculateTDEE(bmr, activityLevel) {
  return round(bmr * (ACTIVITY_MULTIPLIERS[activityLevel] || 1.2));
}

export function calculateTargetCalories(tdee, goal) {
  return clamp(round(tdee + (GOAL_ADJUSTMENTS[goal] || 0)), 1200, 3500);
}

export function getGoalFromBMI(bmi) {
  if (bmi < 18.5) return "weight-gain";
  if (bmi < 25)   return "maintain";
  return "weight-loss";
}

export function getMetrics(state) {
  const age      = Number(state.age) || 0;
  const heightCm = getHeightCm(state.height, state.heightUnit);
  const weightKg = getWeightKg(state.weight);

  const bmi         = calculateBMI(heightCm, weightKg);
  const bmiCategory = getBMICategory(bmi);
  const bmr         = calculateBMR(age, state.gender, heightCm, weightKg);
  const actKey      = state.activityLevel === "active" ? "very_active" : state.activityLevel;
  const tdee        = calculateTDEE(bmr, actKey);
  const goalFromBMI = getGoalFromBMI(bmi);
  const goal        = state.goal || goalFromBMI;
  const baseCalories    = calculateTargetCalories(tdee, goal);
  const dessertConfig   = MEAL_CONFIGS.find(c => c.key === "dessert");
  const dessertPct      = dessertConfig?.percentage || 0;
  const dessertCalories = bmi < 25 ? round(baseCalories * dessertPct) : 0;
  const dailyCalories   = baseCalories + dessertCalories;

  // Macro targets are derived from baseCalories (not dailyCalories): the 4 main meals'
  // macroShare sums to 1.00, so they already target 100% of daily macros. Dessert has
  // macroShare 0 and any macros it contributes are treated as a small overshoot on top.
  const macroTargets = calculateMacroTargets(
    weightKg,
    baseCalories,
    goal,
    state.chronicConditions || [],
    state.diabeticStatus || "non-diabetic"
  );

  return {
    age, heightCm, weightKg, bmi, bmiCategory, bmr, tdee,
    goal, baseCalories, dessertCalories, dailyCalories,

    // Keep macroPercents for backward compat (used in getMacroPercents calls)
    macroPercents: {
      protein: macroTargets.protein,
      carbs:   macroTargets.carbs,
      fats:    macroTargets.fats,
    },

    // ✅ Actual gram targets now personalized
    macroTargets: {
      protein: macroTargets.proteinG,
      carbs:   macroTargets.carbsG,
      fats:    macroTargets.fatG,
    },

    // ✅ Extra insight for UI display
    macroPerKg: {
      protein: macroTargets.proteinPerKg,
      fat:     macroTargets.fatPerKg,
    }
  };
}

// ─── Allergy helpers ──────────────────────────────────────────────────────

export function getCustomAllergyTokens(customAllergy) {
  return (customAllergy || "").toLowerCase().split(",").map((t) => t.trim()).filter(Boolean);
}

const ALLERGY_MAP = {
  dairy:   ["dairy", "milk", "cheese", "paneer", "curd", "yogurt", "ghee", "butter"],
  nuts:    ["nut", "peanut", "cashew", "almond", "walnut", "pistachio", "makhana"],
  seafood: ["seafood", "fish", "prawn", "shrimp", "crab", "rohu", "pomfret", "sardine", "hilsa"],
  eggs:    ["egg"],
  gluten:  ["gluten", "wheat", "flour", "maida", "sooji", "semolina", "rawa"]
};

export function getAllergySummary(state) {
  if (!state.hasAllergies) return "No allergies selected";
  const common = (state.allergyList || []).map(titleCase);
  const custom = getCustomAllergyTokens(state.customAllergy).map(titleCase);
  const all = [...common, ...custom];
  return all.length ? all.join(", ") : "Allergies toggle on";
}

function parseCalorieRange(rangeStr, fallbackCalories = null) {
  const buildFallback = () => {
    if (!Number.isFinite(fallbackCalories) || fallbackCalories <= 0) return null;
    return { min: fallbackCalories - 50, max: fallbackCalories + 50 };
  };

  if (!rangeStr) return buildFallback();

  const rangeMatch = String(rangeStr).match(/(\d+)\s*[-–—]\s*(\d+)/);
  if (rangeMatch) {
    const a = parseInt(rangeMatch[1], 10);
    const b = parseInt(rangeMatch[2], 10);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return { min: Math.min(a, b), max: Math.max(a, b) };
    }
  }

  const singleMatch = String(rangeStr).match(/^\s*(\d+)\s*$/);
  if (singleMatch) {
    const n = parseInt(singleMatch[1], 10);
    if (Number.isFinite(n)) return { min: n - 50, max: n + 50 };
  }

  return buildFallback();
}

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function allergyHits(food, alias) {
  const a = String(alias).toLowerCase().trim();
  if (!a) return false;
  // Tags are discrete tokens already — exact match only.
  if ((food.tags || []).includes(a)) return true;
  // Name: whole-word match so "nut" doesn't hit "donut", "egg" doesn't hit "eggplant".
  return new RegExp(`\\b${escapeRegex(a)}\\b`, "i").test(food.name || "");
}

function filterByAllergies(food, state) {
  if (!state.hasAllergies) return true;

  const selectedCommon = state.allergyList || [];
  for (const allergyKey of selectedCommon) {
    const aliases = ALLERGY_MAP[allergyKey];
    if (!aliases) continue; // Unknown key has no reliable mapping — skip rather than substring-match the key
    if (aliases.some(alias => allergyHits(food, alias))) return false;
  }

  const customTokens = getCustomAllergyTokens(state.customAllergy);
  if (customTokens.some(token => allergyHits(food, token))) return false;

  return true;
}

// ─── Scoring ──────────────────────────────────────────────────────────────

function getHardAvoidTags(conditions) {
  const tags = new Set();
  (conditions || []).filter((c) => c !== "none").forEach((c) => {
    (CONDITION_PREFERENCES[c]?.avoid || []).forEach((t) => tags.add(t));
  });
  return tags;
}

function getSupportTags(conditions) {
  const tags = new Set();
  (conditions || []).filter((c) => c !== "none").forEach((c) => {
    (CONDITION_PREFERENCES[c]?.support || []).forEach((t) => tags.add(t));
  });
  return tags;
}

function getCandidateScore(food, state, metrics) {
  let score = 0;
  const supportTags = getSupportTags(state.chronicConditions);
  const avoidTags   = getHardAvoidTags(state.chronicConditions);
  const isDiabetic  = state.diabeticStatus === "pre-diabetic" || state.diabeticStatus === "diabetic";

  // Hard avoidance — highest priority
  if (food.tags.some((t) => avoidTags.has(t))) score -= 16;

  // Condition support tags
  supportTags.forEach((t) => { if (food.tags.includes(t)) score += 3; });

  // Diabetic friendly bonus
  if (isDiabetic && food.tags.includes("diabetic-friendly")) score += 4;

  // Macro ratio alignment — calorie-based (protein/carbs = 4 kcal/g, fats = 9 kcal/g)
  // Gram-based ratios are wrong because 1g fat ≠ 1g protein in energy contribution
  const targets   = metrics.macroTargets;
  const dailyCals = Math.max(metrics.dailyCalories, 1);
  const foodCals  = Math.max(food.calories, 1);

  const tProteinPct = (targets.protein * 4) / dailyCals;
  const tCarbsPct   = (targets.carbs   * 4) / dailyCals;
  const tFatsPct    = (targets.fats    * 9) / dailyCals;

  const fProteinPct = (food.protein * 4) / foodCals;
  const fCarbsPct   = (food.carbs   * 4) / foodCals;
  const fFatsPct    = (food.fats    * 9) / foodCals;

  // totalDiff: 0 (perfect) to ~2 (worst). Convert to 0–6 score.
  const totalDiff = Math.abs(fProteinPct - tProteinPct) +
                    Math.abs(fCarbsPct   - tCarbsPct)   +
                    Math.abs(fFatsPct    - tFatsPct);
  score += Math.max(0, (1 - totalDiff / 2) * 6);

  // Goal-specific bonuses
  if (state.goal === "detox"       && food.tags.includes("high-fiber")) score += 2;
  if (state.goal === "weight-loss" && food.tags.includes("low-fat"))    score += 1;
  if (state.goal === "weight-gain" && food.calories >= 400)              score += 1;

  return score;
}

function getMealCandidates(mealType, state, metrics) {
  const isDiabetic = state.diabeticStatus === "diabetic" || state.diabeticStatus === "pre-diabetic";
  const avoidTags = getHardAvoidTags(state.chronicConditions);
  const dietPref = state.dietPreference || 'non-veg';

  // 1. Basic filtering (meal type and allergies)
  let candidates = foodDatabase.filter((f) => 
    f.mealType === mealType && 
    filterByAllergies(f, state)
  );

  // 2. Veg/Non-Veg Filter (PRIORITY)
  if (dietPref === 'veg') {
    candidates = candidates.filter(f => f.vegetarian);
  }

  // 3. Disease Filter (PRIORITY: Diabetic Friendly)
  if (isDiabetic) {
    candidates = candidates.filter(f => f.diabeticFriendly);
  }

  // 4. Chronic Condition Avoidance (PRIORITY)
  candidates = candidates.filter(f => !f.tags.some(t => avoidTags.has(t)));

  // 5. Score and sort by relevance
  return candidates
    .map((f) => ({ ...f, _score: getCandidateScore(f, state, metrics) }))
    .sort((a, b) => b._score - a._score || a.calories - b.calories);
}

function rotateList(list, offset) {
  if (!list.length) return list;
  const safe = ((offset % list.length) + list.length) % list.length;
  return list.slice(safe).concat(list.slice(0, safe));
}

// Atwater-derived kcal of a food — matches what scaleFood outputs. Using this
// as the scaling denominator (instead of the raw DB `calories` field) ensures
// the scaled portion hits targetCalories exactly when the DB value doesn't
// match 4·protein + 4·carbs + 9·fats (common in real food tables).
function atwaterCalories(food) {
  return Math.max(food.protein * 4 + food.carbs * 4 + food.fats * 9, 1);
}

function scaleFood(food, factor) {
  const protein = roundOne(food.protein * factor);
  const carbs   = roundOne(food.carbs   * factor);
  const fats    = roundOne(food.fats    * factor);
  const fiber   = roundOne((food.fiber || 0) * factor);
  return {
    ...food,
    baseId:        food.id,
    portionFactor: roundOne(factor),
    protein,
    carbs,
    fats,
    fiber,
    // Derive calories from scaled macros to avoid rounding drift
    calories:      round(protein * 4 + carbs * 4 + fats * 9),
  };
}

// Rescale an already-scaled item by a multiplier (preserves macro ratios,
// composes with existing portionFactor). Used by the final daily-calorie balance.
function rescaleItem(item, multiplier) {
  if (multiplier === 1) return item;
  const protein = roundOne(item.protein * multiplier);
  const carbs   = roundOne(item.carbs   * multiplier);
  const fats    = roundOne(item.fats    * multiplier);
  const fiber   = roundOne((item.fiber || 0) * multiplier);
  return {
    ...item,
    portionFactor: roundOne((item.portionFactor || 1) * multiplier),
    protein, carbs, fats, fiber,
    calories: round(protein * 4 + carbs * 4 + fats * 9),
  };
}

export function getMealTotals(items) {
  return items.reduce((t, i) => ({
    calories: t.calories + i.calories,
    protein:  t.protein  + i.protein,
    carbs:    t.carbs    + i.carbs,
    fats:     t.fats     + i.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

// Build every feasible meal option for a slot (one per candidate food, scaled to
// hit the slot's calorie target). Returned options are sorted by finalScore
// (ascending = best-first) so callers can either pick options[0] or iterate
// them all for multi-slot optimization.
function buildSlotOptions(config, excludeSignatures, state) {
  const metrics = getMetrics(state);
  const targetCalories = config.key === "dessert"
    ? metrics.dessertCalories
    : round(metrics.baseCalories * config.percentage);

  if (targetCalories <= 0) return [];

  const share = config.macroShare || 0;
  const slotProtein = metrics.macroTargets.protein * share;
  const slotCarbs   = metrics.macroTargets.carbs   * share;
  const slotFats    = metrics.macroTargets.fats    * share;

  const candidates = getMealCandidates(config.key, state, metrics);
  const options = [];

  candidates.forEach((meal) => {
    const signature = meal.id;
    if (excludeSignatures.has(signature)) return;

    const range = parseCalorieRange(meal.calorie_range, meal.calories);
    const isInRange = range ? (targetCalories >= range.min && targetCalories <= range.max) : false;

    // Atwater-derived scaling so the scaled portion hits targetCalories exactly.
    const factor = clamp(targetCalories / atwaterCalories(meal), 0.4, 2.5);
    const scaled = scaleFood(meal, factor);

    const calorieDiffScore = Math.abs(scaled.calories - targetCalories) / Math.max(targetCalories, 1);
    const macroScore = share > 0
      ? (
          Math.abs(scaled.protein - slotProtein) / Math.max(slotProtein, 1) +
          Math.abs(scaled.carbs   - slotCarbs)   / Math.max(slotCarbs,   1) +
          Math.abs(scaled.fats    - slotFats)    / Math.max(slotFats,    1)
        ) / 3
      : 0;
    const rangeBonus = isInRange ? -0.15 : 0;
    const diseaseScore = meal._score / 50;
    const score = calorieDiffScore * 0.2 + macroScore * 0.65 + rangeBonus - diseaseScore;

    options.push({
      mealType: config.key,
      label: config.label,
      targetCalories,
      items: [scaled],
      signature,
      score,
    });
  });

  options.sort((a, b) => a.score - b.score);
  return options;
}

// Back-compat thin wrapper: returns the single best option for a slot.
// `seed` is retained for callers that still pass it (e.g. getAlternativeMeals
// which uses it to produce a small set of diverse options).
export function generateMealOption(config, seed, excludeSignatures, state) {
  const options = buildSlotOptions(config, excludeSignatures, state);
  if (!options.length) return null;
  // Use seed to pick among the top few so getAlternativeMeals returns diverse suggestions.
  const n = options.length;
  const idx = ((seed % n) + n) % n;
  return options[idx];
}

// Sum of absolute relative deviations of daily macros vs daily targets.
// Lower is better. This is the objective the greedy optimizer minimizes.
function dailyMacroDeviation(totals, targets) {
  const p = Math.abs(totals.protein - targets.protein) / Math.max(targets.protein, 1);
  const c = Math.abs(totals.carbs   - targets.carbs)   / Math.max(targets.carbs,   1);
  const f = Math.abs(totals.fats    - targets.fats)    / Math.max(targets.fats,    1);
  return p + c + f;
}

export function generateDietPlan(state) {
  const metrics = getMetrics(state);
  const meals = [];

  MEAL_CONFIGS.forEach((config) => {
    const meal = generateMealOption(config, 0, new Set(), state);
    if (meal) meals.push(meal);
  });

  // Greedy daily-macro optimizer: at each iteration, evaluate EVERY candidate
  // for every slot as a potential swap and apply the one that most reduces
  // total daily macro deviation. Handles both overshoot and undershoot.
  const dailyTargets = metrics.macroTargets;
  const MAX_ITERATIONS = 8;

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    const currentTotals = getDietTotals(meals);
    const currentDev = dailyMacroDeviation(currentTotals, dailyTargets);
    if (currentDev < 0.05) break; // within ~5% total deviation, done

    let bestImprove = 0;
    let bestI = -1;
    let bestAlt = null;

    meals.forEach((meal, i) => {
      const config = MEAL_CONFIGS.find(c => c.key === meal.mealType);
      if (!config || !config.macroShare) return;

      const origItemsTotals = getMealTotals(meal.items);
      const slotOptions = buildSlotOptions(config, new Set([meal.signature]), state);

      for (const alt of slotOptions) {
        const altItemsTotals = getMealTotals(alt.items);
        const hypotheticalDaily = {
          protein: currentTotals.protein - origItemsTotals.protein + altItemsTotals.protein,
          carbs:   currentTotals.carbs   - origItemsTotals.carbs   + altItemsTotals.carbs,
          fats:    currentTotals.fats    - origItemsTotals.fats    + altItemsTotals.fats,
        };
        const improve = currentDev - dailyMacroDeviation(hypotheticalDaily, dailyTargets);
        if (improve > bestImprove) {
          bestImprove = improve;
          bestI = i;
          bestAlt = alt;
        }
      }
    });

    if (bestI < 0 || bestImprove < 0.005) break;
    meals[bestI] = bestAlt;
  }

  // Final calorie balance: scale each meal's items by a uniform multiplier so
  // the daily total lands near dailyCalories. Uniform scaling preserves each
  // meal's macro ratios.
  //  - If calories undershoot, scale UP — but cap by macro headroom so we
  //    don't push any macro more than MACRO_OVERSHOOT_TOL past its target.
  //    If macros are already over target (headroom < 1), leave calories alone
  //    rather than make the overshoot worse.
  //  - If calories overshoot, scale DOWN — always safe (reduces both calories
  //    and macros toward target).
  const dailyTotals = getDietTotals(meals);
  if (dailyTotals.calories > 0) {
    const calMult = metrics.dailyCalories / dailyTotals.calories;
    if (Math.abs(1 - calMult) >= 0.005) {
      const MACRO_OVERSHOOT_TOL = 1.03;
      const t = metrics.macroTargets;
      const headroom = (actual, target) =>
        actual > 0 && target > 0 ? (target / actual) * MACRO_OVERSHOOT_TOL : Infinity;

      let multiplier = 1;
      if (calMult > 1) {
        const safeMax = Math.min(
          headroom(dailyTotals.protein, t.protein),
          headroom(dailyTotals.fats,    t.fats),
          headroom(dailyTotals.carbs,   t.carbs)
        );
        multiplier = Math.min(calMult, Math.max(1, safeMax));
      } else {
        multiplier = calMult;
      }
      multiplier = clamp(multiplier, 0.85, 1.20);
      if (Math.abs(1 - multiplier) >= 0.005) {
        meals.forEach((meal) => {
          meal.items = meal.items.map((item) => rescaleItem(item, multiplier));
        });
      }
    }
  }

  return meals;
}

export function getDietTotals(meals) {
  if (!meals || !meals.length) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
  return meals.reduce((t, meal) => {
    const mt = getMealTotals(meal.items);
    return { calories: t.calories + mt.calories, protein: t.protein + mt.protein, carbs: t.carbs + mt.carbs, fats: t.fats + mt.fats };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

export function getAlternativeItemsForState(meal, currentItem, state) {
  const scaled = getMealCandidates(meal.mealType, state, getMetrics(state));
  const factor = currentItem.portionFactor || 1;
  const candidates = scaled.filter((c) => c.id !== currentItem.baseId).map((c) => scaleFood(c, factor));
  const close = candidates.filter((c) => Math.abs(c.calories - currentItem.calories) <= currentItem.calories * 0.2);
  return close.length >= 5 ? close.slice(0, 20) : candidates.sort((a, b) => Math.abs(a.calories - currentItem.calories) - Math.abs(b.calories - currentItem.calories)).slice(0, 20);
}

export function getAlternativeMeals(meal, mealIndex, state) {
  const options = [];
  const signatures = new Set([meal.signature]);
  const config = MEAL_CONFIGS.find((c) => c.key === meal.mealType);
  if (!config) return [];
  for (let seed = 1; seed <= 18 && options.length < 5; seed += 1) {
    const option = generateMealOption(config, seed + mealIndex, signatures, state);
    if (option && !signatures.has(option.signature)) {
      signatures.add(option.signature);
      options.push(option);
    }
  }
  return options;
}

export function getProductRecommendations(state) {
  const { goal, chronicConditions = [], diabeticStatus } = state;
  const isDiabetic = diabeticStatus === "diabetic" || diabeticStatus === "pre-diabetic";
  const picks     = new Set();

  if (isDiabetic) picks.add("glucoamrit");
  if (chronicConditions.includes("liver") || chronicConditions.includes("thyroid") || chronicConditions.includes("heart") || goal === "weight-loss") picks.add("oliliv");
  if (chronicConditions.includes("digestive")) { picks.add("laxonova"); picks.add("digestowell"); }
  if (chronicConditions.includes("lung")) picks.add("respipure");
  if (goal === "energy") picks.add("revira");

  if (!picks.size) picks.add("oliliv");

  return [...picks]
    .map((key) => productCatalog.find((p) => p.key === key))
    .filter(Boolean)
    .slice(0, 4);
}

export function getPersonalizedTips(state, metrics) {
  const tips = [];
  if (state.goal === "weight-loss") tips.push("Keep your larger meals earlier in the day and lean on protein-rich swaps to stay satisfied.");
  if (state.goal === "weight-gain") tips.push("Aim for steady meal timing and do not skip snacks so the calorie surplus feels manageable.");
  if (state.goal === "detox") tips.push("Favor lighter cooking styles, warm fluids, and easy-to-digest combinations to support a reset phase.");
  if (state.goal === "energy") tips.push("Anchor meals with steady carbs and protein to avoid sharp energy dips later in the day.");
  if ((state.diabeticStatus === "diabetic" || state.diabeticStatus === "pre-diabetic")) tips.push("Low-GI meals and evenly spaced meals can help keep energy steadier across the day.");
  if ((state.chronicConditions || []).includes("digestive")) tips.push("Gentle, lower-spice meals and simpler pairings usually sit better when digestion needs extra support.");
  if ((state.chronicConditions || []).includes("heart")) tips.push("Choose lower-sodium meals and leaner fat sources more often to keep the plan heart-aware.");
  if ((state.chronicConditions || []).includes("liver")) tips.push("A lighter fat load and more detox-friendly dishes keep the plan aligned with liver support.");
  if ((state.chronicConditions || []).includes("kidney")) tips.push("Moderate portions of richer protein dishes and prioritize lower-sodium cooking where possible.");
  if (!tips.length) tips.push("Keep hydration steady, stay consistent with meal timing, and let the swap tools refine the plan around your preferences.");
  const hydration = `Suggested hydration: ${Math.max(2, roundOne((metrics?.weightKg || 60) * 0.035))} L water across the day.`;
  return [...tips.slice(0, 4), hydration];
}

export function getInputSignature(state) {
  const sortedList = (arr) => [...(arr || [])].map(String).sort();
  return JSON.stringify({
    age: state.age, gender: state.gender, height: state.height, heightUnit: state.heightUnit,
    weight: state.weight, activityLevel: state.activityLevel, goal: state.goal,
    diabeticStatus: state.diabeticStatus, hasAllergies: state.hasAllergies,
    allergyList: sortedList(state.allergyList),
    customAllergy: getCustomAllergyTokens(state.customAllergy).sort().join(","),
    chronicConditions: sortedList(state.chronicConditions),
    dietPreference: state.dietPreference
  });
}
