// ─── Constants ────────────────────────────────────────────────────────────────

export const MEAL_CONFIGS = [
  { key: "breakfast", label: "Breakfast", percentage: 0.30, macroShare: 0.25 },
  { key: "lunch",     label: "Lunch",     percentage: 0.35, macroShare: 0.30 },
  { key: "dinner",    label: "Dinner",    percentage: 0.25, macroShare: 0.25 },
  { key: "snacks",    label: "Snacks",    percentage: 0.10, macroShare: 0.20 },
  { key: "dessert",   label: "Dessert",   percentage: 0.05, macroShare: 0    } // Percentage of base C
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

  // Step 3: Diabetic adjustment
  if (diabeticStatus === "diabetic" || diabeticStatus === "pre-diabetic") {
    proteinPerKg += DIABETIC_ADJUSTMENT.proteinPerKgDelta;
    fatPerKg     += DIABETIC_ADJUSTMENT.fatPerKgDelta;
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

  // Step 7: % for backward compatibility
  const protein = proteinKcal / targetCalories;
  const fats    = fatKcal     / targetCalories;
  const carbs   = (carbsG * 4) / targetCalories;

  return {
    proteinG, carbsG, fatG,
    proteinPerKg: roundOne(proteinPerKg),
    fatPerKg:     roundOne(fatPerKg),
    protein: roundOne(protein),
    carbs:   roundOne(carbs),
    fats:    roundOne(fats),
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
  const dessertCalories = bmi < 25 ? round(baseCalories * 0.05) : 0;
  const dailyCalories   = baseCalories + dessertCalories;

  // ✅ NEW: Use g/kg method instead of fixed %
  const macroTargets = calculateMacroTargets(
    weightKg,
    dailyCalories,
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

function parseCalorieRange(rangeStr) {
  if (!rangeStr) return { min: 0, max: 5000 };
  const parts = String(rangeStr).split(/[-–—]/).map(p => parseInt(p.trim(), 10));
  if (parts.length === 2) return { min: parts[0], max: parts[1] };
  if (parts.length === 1) return { min: parts[0] - 50, max: parts[0] + 50 };
  return { min: 0, max: 5000 };
}

function filterByAllergies(food, state) {
  if (!state.hasAllergies) return true;
  
  const customTokens = getCustomAllergyTokens(state.customAllergy);
  const selectedCommon = state.allergyList || [];
  const name = food.name.toLowerCase();
  const tags = food.tags || [];

  // 1. Check Common Allergies (using Aliases)
  for (const allergyKey of selectedCommon) {
    const aliases = ALLERGY_MAP[allergyKey] || [allergyKey];
    if (aliases.some(alias => name.includes(alias) || tags.some(t => t.includes(alias)))) {
      return false;
    }
  }

  // 2. Check Custom Allergies (Substring Match)
  if (customTokens.some(token => name.includes(token) || tags.some(t => t.includes(token)))) {
    return false;
  }

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

function scaleFood(food, factor) {
  const protein = roundOne(food.protein * factor);
  const carbs   = roundOne(food.carbs   * factor);
  const fats    = roundOne(food.fats    * factor);
  return {
    ...food,
    baseId:        food.id,
    portionFactor: roundOne(factor),
    protein,
    carbs,
    fats,
    // Derive calories from scaled macros to avoid rounding drift
    calories:      round(protein * 4 + carbs * 4 + fats * 9),
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

export function generateMealOption(config, seed, excludeSignatures, state) {
  const metrics = getMetrics(state);
  const targetCalories = config.key === "dessert"
    ? metrics.dessertCalories
    : round(metrics.baseCalories * config.percentage);

  if (targetCalories <= 0) return null;

  // Per-slot macro gram targets from the reference card macroShare
  const share = config.macroShare || 0;
  const slotProtein = metrics.macroTargets.protein * share;
  const slotCarbs   = metrics.macroTargets.carbs   * share;
  const slotFats    = metrics.macroTargets.fats    * share;

  const candidates = getMealCandidates(config.key, state, metrics);
  const rotated = rotateList(candidates, seed);

  let best = null;

  rotated.forEach((meal) => {
    const signature = meal.id;
    if (excludeSignatures.has(signature)) return;

    const { min, max } = parseCalorieRange(meal.calorie_range);
    const isInRange = targetCalories >= min && targetCalories <= max;

    const factor = clamp(targetCalories / Math.max(meal.calories, 1), 0.4, 2.5);
    const scaled = scaleFood(meal, factor);

    // calorieDiffScore: only meaningful when factor hits the clamp boundary
    const calorieDiffScore = Math.abs(scaled.calories - targetCalories) / Math.max(targetCalories, 1);

    // Macro gram match: avg relative diff vs per-slot gram targets
    const macroScore = share > 0
      ? (
          Math.abs(scaled.protein - slotProtein) / Math.max(slotProtein, 1) +
          Math.abs(scaled.carbs   - slotCarbs)   / Math.max(slotCarbs,   1) +
          Math.abs(scaled.fats    - slotFats)    / Math.max(slotFats,    1)
        ) / 3
      : 0;

    // In-range bonus: prefer meals in the natural calorie range, but macros can override
    const rangeBonus = isInRange ? -0.15 : 0;

    const diseaseScore = meal._score / 50;
    const finalScore = calorieDiffScore * 0.2 + macroScore * 0.65 + rangeBonus - diseaseScore;

    const result = {
      mealType: config.key,
      label: config.label,
      targetCalories,
      items: [scaled],
      signature,
      score: finalScore
    };

    if (!best || finalScore < best.score) best = result;
  });

  return best;
}

// Average relative deviation of actual vs target macros (0 = perfect, 1 = 100% off each macro)
function getMacroDeviation(actual, targets) {
  return (
    Math.abs(actual.protein - targets.protein) / Math.max(targets.protein, 1) +
    Math.abs(actual.carbs   - targets.carbs)   / Math.max(targets.carbs,   1) +
    Math.abs(actual.fats    - targets.fats)    / Math.max(targets.fats,    1)
  ) / 3;
}

export function generateDietPlan(state) {
  const metrics = getMetrics(state);
  const meals = [];

  MEAL_CONFIGS.forEach((config, index) => {
    const meal = generateMealOption(config, index + 1, new Set(), state);
    if (meal) meals.push(meal);
  });

  // Post-generation: for each slot that misses its macro target by >20%,
  // try alternate seeds to find a better meal
  meals.forEach((meal, i) => {
    const config = MEAL_CONFIGS.find(c => c.key === meal.mealType);
    if (!config || !config.macroShare) return;

    const share = config.macroShare;
    const slotTargets = {
      protein: metrics.macroTargets.protein * share,
      carbs:   metrics.macroTargets.carbs   * share,
      fats:    metrics.macroTargets.fats    * share,
    };

    let currentDev = getMacroDeviation(getMealTotals(meal.items), slotTargets);
    if (currentDev <= 0.20) return;

    const triedSigs = new Set([meal.signature]);
    for (let seed = 10; seed <= 30; seed++) {
      const alt = generateMealOption(config, seed, triedSigs, state);
      if (!alt) continue;
      const altDev = getMacroDeviation(getMealTotals(alt.items), slotTargets);
      if (altDev < currentDev * 0.9) {
        meals[i] = alt;
        currentDev = altDev;
      }
      triedSigs.add(alt.signature);
    }
  });

  // Final daily totals check: if any macro is still >15% short, swap the
  // meal slot most responsible for that shortfall (seeds 31–50)
  const totals = getDietTotals(meals);
  const dailyTargets = metrics.macroTargets;
  const gaps = [
    { macro: "protein", gap: (totals.protein - dailyTargets.protein) / Math.max(dailyTargets.protein, 1) },
    { macro: "carbs",   gap: (totals.carbs   - dailyTargets.carbs)   / Math.max(dailyTargets.carbs,   1) },
    { macro: "fats",    gap: (totals.fats    - dailyTargets.fats)    / Math.max(dailyTargets.fats,    1) },
  ];
  const worstGap = gaps.sort((a, b) => a.gap - b.gap)[0];

  if (worstGap.gap < -0.15) {
    const macro = worstGap.macro;
    // Find the slot delivering the lowest fraction of its macro share target
    let worstI = -1, worstRatio = Infinity;
    meals.forEach((meal, i) => {
      const config = MEAL_CONFIGS.find(c => c.key === meal.mealType);
      if (!config?.macroShare) return;
      const slotTarget = dailyTargets[macro] * config.macroShare;
      const slotActual = getMealTotals(meal.items)[macro];
      const ratio = slotActual / Math.max(slotTarget, 1);
      if (ratio < worstRatio) { worstRatio = ratio; worstI = i; }
    });

    if (worstI >= 0) {
      const config = MEAL_CONFIGS.find(c => c.key === meals[worstI].mealType);
      const triedSigs = new Set([meals[worstI].signature]);
      const currentMacro = getMealTotals(meals[worstI].items)[macro];
      for (let seed = 31; seed <= 50; seed++) {
        const alt = generateMealOption(config, seed, triedSigs, state);
        if (!alt) continue;
        if (getMealTotals(alt.items)[macro] > currentMacro * 1.1) {
          meals[worstI] = alt;
          break;
        }
        triedSigs.add(alt.signature);
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

export function getAlternativeItems(meal, currentItem) {
  const stubState = { hasAllergies: false, allergyList: [], customAllergy: "", chronicConditions: [], diabeticStatus: "non-diabetic", goal: "maintain" };
  const scaled = getMealCandidates(meal.mealType, stubState, getMetrics(stubState));
  const factor = currentItem.portionFactor || 1;
  const candidates = scaled.filter((c) => c.id !== currentItem.baseId).map((c) => scaleFood(c, factor));
  const close = candidates.filter((c) => Math.abs(c.calories - currentItem.calories) <= currentItem.calories * 0.2);
  return close.length >= 5 ? close.slice(0, 8) : candidates.sort((a, b) => Math.abs(a.calories - currentItem.calories) - Math.abs(b.calories - currentItem.calories)).slice(0, 8);
}

export function getAlternativeItemsForState(meal, currentItem, state) {
  const scaled = getMealCandidates(meal.mealType, state, getMetrics(state));
  const factor = currentItem.portionFactor || 1;
  const candidates = scaled.filter((c) => c.id !== currentItem.baseId).map((c) => scaleFood(c, factor));
  const close = candidates.filter((c) => Math.abs(c.calories - currentItem.calories) <= currentItem.calories * 0.2);
  return close.length >= 5 ? close.slice(0, 8) : candidates.sort((a, b) => Math.abs(a.calories - currentItem.calories) - Math.abs(b.calories - currentItem.calories)).slice(0, 8);
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
  return JSON.stringify({
    age: state.age, gender: state.gender, height: state.height, heightUnit: state.heightUnit,
    weight: state.weight, activityLevel: state.activityLevel, goal: state.goal,
    diabeticStatus: state.diabeticStatus, hasAllergies: state.hasAllergies,
    allergyList: state.allergyList, customAllergy: (state.customAllergy || "").trim().toLowerCase(),
    chronicConditions: state.chronicConditions, dietPreference: state.dietPreference
  });
}
