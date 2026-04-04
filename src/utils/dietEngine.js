// ─── Constants ────────────────────────────────────────────────────────────────

export const MEAL_CONFIGS = [
  { key: "breakfast", label: "Breakfast", percentage: 0.25 },
  { key: "lunch",     label: "Lunch",     percentage: 0.30 },
  { key: "snacks",    label: "Snacks",    percentage: 0.15 },
  { key: "dinner",    label: "Dinner",    percentage: 0.25 },
  { key: "dessert",   label: "Dessert",   percentage: 0.05 }
];

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light:     1.375,
  moderate:  1.55,
  active:    1.725
};

export const GOAL_ADJUSTMENTS = {
  "weight-loss": -500,
  "weight-gain":  400,
  maintain:         0,
  detox:         -200,
  energy:           0
};

export const MACRO_TARGETS_BY_GOAL = {
  "weight-loss": { protein: 0.4, carbs: 0.3, fats: 0.3 },
  "weight-gain": { protein: 0.3, carbs: 0.5, fats: 0.2 },
  maintain:      { protein: 0.3, carbs: 0.4, fats: 0.3 },
  detox:         { protein: 0.3, carbs: 0.4, fats: 0.3 },
  energy:        { protein: 0.3, carbs: 0.4, fats: 0.3 }
};

export const CONDITION_PREFERENCES = {
  liver:      { support: ["detox-friendly", "low-fat"],             avoid: ["high-fat", "fried"] },
  kidney:     { support: ["controlled-protein", "low-sodium"],      avoid: ["protein-heavy", "high-sodium"] },
  lung:       { support: ["anti-inflammatory"],                      avoid: ["fried"] },
  heart:      { support: ["low-fat", "low-sodium"],                 avoid: ["high-fat", "high-sodium", "fried"] },
  thyroid:    { support: ["balanced-iodine"],                        avoid: [] },
  digestive:  { support: ["easy-digest"],                            avoid: ["fried", "heavy"] }
};

// [name, calories, protein, carbs, fats, mealTypes, tags]
const FOOD_SEEDS = {
  protein: [
    ["Moong Dal Chilla",   118, 10, 14, 3, "breakfast|lunch|dinner", "veg|diabetic-friendly|low-fat|easy-digest|detox-friendly"],
    ["Besan Chilla",       124,  8, 14, 4, "breakfast|snacks|dinner", "veg|easy-digest|low-fat"],
    ["Paneer Bhurji",      138, 13,  5, 7, "breakfast|lunch|dinner",  "veg|dairy|balanced-energy|protein-heavy"],
    ["Sprouts Chaat",       98,  8, 12, 2, "breakfast|snacks|lunch",  "veg|diabetic-friendly|low-fat|easy-digest|detox-friendly"],
    ["Greek Yogurt Bowl",   92, 10,  5, 3, "breakfast|snacks|dessert","veg|dairy|diabetic-friendly|low-fat|easy-digest"],
    ["Egg White Bhurji",    92, 13,  2, 3, "breakfast|lunch|dinner",  "nonveg|eggs|diabetic-friendly|low-fat|protein-heavy"],
    ["Boiled Eggs",         96,  8,  1, 6, "breakfast|snacks|lunch",  "nonveg|eggs|balanced-energy"],
    ["Tofu Scramble",      104, 11,  4, 5, "breakfast|lunch|dinner",  "veg|soy|diabetic-friendly|low-fat|balanced-iodine"],
    ["Grilled Chicken Tikka",148,20, 3, 6, "lunch|dinner|snacks",    "nonveg|low-fat|protein-heavy|low-sodium"],
    ["Chicken Curry",      158, 18,  5, 7, "lunch|dinner",            "nonveg|balanced-energy|protein-heavy"],
    ["Fish Curry",         152, 19,  4, 6, "lunch|dinner",            "nonveg|seafood|anti-inflammatory|low-fat"],
    ["Dal Tadka",          128,  9, 16, 3, "lunch|dinner",            "veg|diabetic-friendly|low-fat|easy-digest"],
    ["Rajma Bowl",         138,  9, 18, 4, "lunch|dinner",            "veg|balanced-energy|protein-heavy"],
    ["Kala Chana Bowl",    132, 10, 17, 3, "lunch|snacks|dinner",     "veg|diabetic-friendly|low-fat"],
    ["Sambar",              96,  6, 12, 2, "breakfast|lunch|dinner",  "veg|easy-digest|low-fat|detox-friendly"],
    ["Roasted Chana",       78,  5, 11, 1, "snacks|dessert|lunch",    "veg|diabetic-friendly|low-fat"],
    ["Soya Chunk Masala",   146, 19,  8, 4, "lunch|dinner|snacks",     "veg|soy|protein-heavy|balanced-energy"],
    ["Hung Curd Mousse",    54,  6,  4, 1, "dessert|snacks|breakfast","veg|dairy|low-fat|easy-digest"],
    ["Paneer Tikka",       142, 14,  4, 7, "lunch|dinner|snacks",     "veg|dairy|balanced-energy|protein-heavy"],
    ["Lentil Soup",         88,  7, 11, 2, "lunch|dinner|snacks",     "veg|easy-digest|detox-friendly|low-fat"]
  ],
  carb: [
    ["Poha",               124, 3, 23, 2, "breakfast|snacks",         "veg|easy-digest"],
    ["Vegetable Upma",     118, 3, 20, 3, "breakfast|snacks",         "veg|easy-digest"],
    ["Oats Porridge",      110, 4, 18, 2, "breakfast|dessert|snacks", "veg|diabetic-friendly|low-gi|easy-digest"],
    ["Idli",                84, 3, 16, 0.5,"breakfast|snacks",        "veg|easy-digest"],
    ["Dosa",               112, 3, 18, 3, "breakfast|dinner",         "veg|easy-digest"],
    ["Multigrain Roti",    102, 3, 18, 2, "lunch|dinner",             "veg|gluten|balanced-energy"],
    ["Brown Rice",         118, 3, 24, 1, "lunch|dinner",             "veg|diabetic-friendly|low-gi"],
    ["Red Rice",           116, 3, 24, 1, "lunch|dinner",             "veg|low-gi"],
    ["Quinoa Pulao",       126, 4, 22, 2, "lunch|dinner",             "veg|diabetic-friendly|balanced-energy|low-gi"],
    ["Millet Khichdi",     114, 4, 19, 2, "breakfast|lunch|dinner",   "veg|easy-digest|detox-friendly"],
    ["Sweet Potato Chaat", 106, 2, 24, 0.4,"breakfast|snacks|dinner", "veg|low-gi|balanced-energy"],
    ["Apple Cinnamon Bowl", 74, 0.5,18, 0.2,"breakfast|snacks|dessert","veg|easy-digest|diabetic-friendly|low-gi"],
    ["Papaya Bowl",         54, 0.7,13, 0.2,"breakfast|snacks|dessert","veg|easy-digest|detox-friendly"],
    ["Guava Slices",        56, 1, 12, 0.4,"snacks|dessert",          "veg|diabetic-friendly|low-gi"],
    ["Fruit Chaat",         68, 1, 16, 0.3,"snacks|dessert",          "veg|high-sugar|easy-digest"],
    ["Barley Khichdi",     112, 4, 21, 1, "lunch|dinner",             "veg|diabetic-friendly|low-gi|easy-digest"],
    ["Oats Idli",           88, 4, 15, 1, "breakfast|snacks",         "veg|diabetic-friendly|easy-digest"],
    ["Vegetable Dalia",    116, 4, 20, 2, "breakfast|dinner",         "veg|gluten|easy-digest"],
    ["Steamed Corn",        96, 3, 19, 1, "lunch|snacks",             "veg|balanced-energy"],
    ["Baked Apple",         48, 0.3,11, 0.1,"dessert|breakfast",      "veg|easy-digest|diabetic-friendly"],
    ["Beetroot Rice",      124, 3, 24, 2, "lunch|dinner",             "veg|balanced-energy|detox-friendly"]
  ],
  fat: [
    ["Almonds",             42, 1.5, 1.6, 3.6,"breakfast|snacks|dessert","veg|nuts|low-gi|balanced-energy"],
    ["Walnuts",             46, 1.1, 0.9, 4.4,"breakfast|snacks|dessert","veg|nuts|anti-inflammatory"],
    ["Peanuts",             48, 2,   1.8, 3.8,"breakfast|snacks|lunch",  "veg|nuts|balanced-energy"],
    ["Peanut Chutney",      54, 2,   2,   4.5,"breakfast|lunch|dinner",  "veg|nuts|balanced-energy"],
    ["Coconut Chutney",     44, 1,   2.5, 3.5,"breakfast|dinner",        "veg|easy-digest"],
    ["Flaxseed Mix",        40, 1.4, 2,   3,  "breakfast|snacks|dessert","veg|anti-inflammatory|low-fat"],
    ["Pumpkin Seeds",       44, 2.2, 1.4, 3.4,"breakfast|snacks|dessert","veg|balanced-iodine|low-gi"],
    ["Sesame Seeds",        40, 1.3, 1.5, 3.3,"lunch|dinner|snacks",     "veg|easy-digest"],
    ["Ghee Drizzle",        45, 0,   0,   5,  "breakfast|lunch|dinner",  "veg|high-fat|balanced-energy"],
    ["Olive Oil Saute",     40, 0,   0,   4.5,"lunch|dinner",            "veg|low-fat|anti-inflammatory"],
    ["Avocado Slices",      48, 0.6, 2.4, 4.2,"breakfast|lunch|dinner",  "veg|low-fat|easy-digest"],
    ["Coconut Slices",      36, 0.4, 1.2, 3.3,"snacks|dessert|breakfast","veg|easy-digest"],
    ["Cashew Crumble",      48, 1.5, 2.5, 3.8,"dessert|snacks|lunch",    "veg|nuts|balanced-energy"],
    ["Tahini Drizzle",      42, 1.3, 1.4, 3.5,"lunch|dinner|snacks",     "veg|low-fat"],
    ["Chia Seeds",          34, 1.2, 3,   2.2,"breakfast|dessert|snacks","veg|anti-inflammatory|easy-digest"],
    ["Pistachio Dust",      28, 1.1, 1.3, 2.1,"dessert|snacks",          "veg|nuts"],
    ["Sunflower Seeds",     38, 1.6, 1.5, 3.1,"breakfast|snacks|lunch",  "veg|low-sodium"],
    ["Almond Butter",       52, 1.8, 2,   4.5,"breakfast|snacks|dessert","veg|nuts|balanced-energy"],
    ["Mustard Oil Tempering",34, 0,  0,   3.8,"lunch|dinner",            "veg|anti-inflammatory"]
  ]
};

export const PRODUCT_CATALOG = [
  {
    key:     "glucoamrit",
    name:    "Olilife GlucoAmrit",
    benefit: "Advanced Ayurvedic herbal juice formulated to support healthy blood sugar levels — recommended for diabetic and pre-diabetic profiles.",
    link:    "https://olilife.in/product/olilife-glucoamrit-advanced-ayurvedic-herbal-wellness-juice/",
    image:   "https://olilife.in/wp-content/uploads/2026/01/web-site-glucoamrit-final-226x300.jpg"
  },
  {
    key:     "oliliv",
    name:    "Oliliv Juice",
    benefit: "Ayurvedic herbal liver wellness juice — pairs best with detox-focused or low-fat meal plans to support natural cleansing.",
    link:    "https://olilife.in/product/oliliv-juice/",
    image:   "https://olilife.in/wp-content/uploads/2026/01/oliliv-creative-web-final-226x300.jpg"
  },
  {
    key:     "digestowell",
    name:    "Digestowell Syrup",
    benefit: "Ayurvedic digestive care syrup — supports smoother digestion when your diet is high-fibre, protein-rich, or heavily spiced.",
    link:    "https://olilife.in/product/digestowell-syrup/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/digestowel-dosage-web-final-226x300.jpg"
  },
  {
    key:     "laxonova",
    name:    "Laxonova Powder",
    benefit: "Plant-based Ayurvedic digestive relief — ideal when your meal plan is protein-heavy or low in natural fibre.",
    link:    "https://olilife.in/product/laxonova/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/laxonova-creative-web-final-226x300.jpg"
  },
  {
    key:     "painreliva",
    name:    "Pain Reliva Capsules",
    benefit: "Ayurvedic joint and bone care — complements high-protein or weight-gain diets and supports an active lifestyle.",
    link:    "https://olilife.in/product/painreliva-capsule-ayurvedic-joint-pain-medicine/",
    image:   "https://olilife.in/wp-content/uploads/2025/11/pain-reliva-capsule-image-website-final-226x300.jpg"
  }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitPipe(value) { return value.split("|").filter(Boolean); }
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

export function createProductImage(label) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%231B5E20'/><stop offset='100%' stop-color='%234CAF50'/></linearGradient></defs><rect width='220' height='220' rx='34' fill='url(%23g)'/><circle cx='172' cy='48' r='34' fill='rgba(255,255,255,0.12)'/><circle cx='48' cy='178' r='44' fill='rgba(255,255,255,0.12)'/><text x='110' y='96' fill='%23F5F5DC' font-family='Arial, sans-serif' font-size='28' font-weight='700' text-anchor='middle'>Olilife</text><text x='110' y='138' fill='%23FFFFFF' font-family='Arial, sans-serif' font-size='24' text-anchor='middle'>${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// ─── Food database ────────────────────────────────────────────────────────────

export function buildFoodDatabase() {
  const foods = [];
  let id = 0;
  Object.keys(FOOD_SEEDS).forEach((category) => {
    FOOD_SEEDS[category].forEach((seed) => {
      splitPipe(seed[5]).forEach((mealType) => {
        id += 1;
        foods.push({
          id: `${category}-${id}`,
          name: seed[0],
          category,
          calories: seed[1],
          protein: seed[2],
          carbs: seed[3],
          fats: seed[4],
          mealType,
          tags: splitPipe(seed[6])
        });
      });
    });
  });
  return foods;
}

export const foodDatabase = buildFoodDatabase();

export const productCatalog = PRODUCT_CATALOG.map((p) => ({ ...p }));

// ─── Metrics ──────────────────────────────────────────────────────────────────

export function getHeightCm(height, heightUnit) {
  const value = Number(height);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return heightUnit === "cm" ? value : value * 30.48;
}

export function getWeightKg(weight) {
  const value = Number(weight);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function getMacroPercents(goal) {
  return MACRO_TARGETS_BY_GOAL[goal] || MACRO_TARGETS_BY_GOAL.maintain;
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

export function getMetrics(state) {
  const age = Number(state.age) || 0;
  const heightCm = getHeightCm(state.height, state.heightUnit);
  const weightKg = getWeightKg(state.weight);
  const bmi = calculateBMI(heightCm, weightKg);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(age, state.gender, heightCm, weightKg);
  const tdee = calculateTDEE(bmr, state.activityLevel);
  const dailyCalories = calculateTargetCalories(tdee, state.goal);
  const macroPercents = getMacroPercents(state.goal);
  return {
    age, heightCm, weightKg, bmi, bmiCategory, bmr, tdee, dailyCalories, macroPercents,
    macroTargets: {
      protein: round((dailyCalories * macroPercents.protein) / 4),
      carbs:   round((dailyCalories * macroPercents.carbs)   / 4),
      fats:    round((dailyCalories * macroPercents.fats)    / 9)
    }
  };
}

// ─── Allergy helpers ──────────────────────────────────────────────────────────

export function getCustomAllergyTokens(customAllergy) {
  return (customAllergy || "").toLowerCase().split(",").map((t) => t.trim()).filter(Boolean);
}

export function getAllergySummary(state) {
  if (!state.hasAllergies) return "No allergies selected";
  const common = (state.allergyList || []).map(titleCase);
  const custom = getCustomAllergyTokens(state.customAllergy).map(titleCase);
  const all = [...common, ...custom];
  return all.length ? all.join(", ") : "Allergies toggle on";
}

function filterByAllergies(food, state) {
  if (!state.hasAllergies) return true;
  const customTokens = getCustomAllergyTokens(state.customAllergy);
  const allergySet = new Set(state.allergyList || []);
  const name = food.name.toLowerCase();
  if (food.tags.some((tag) => allergySet.has(tag))) return false;
  return !customTokens.some((token) => name.includes(token) || food.tags.includes(token));
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

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

function getCandidateScore(food, state) {
  let score = 0;
  const supportTags = getSupportTags(state.chronicConditions);
  const avoidTags   = getHardAvoidTags(state.chronicConditions);
  const isDiabetic  = state.diabeticStatus === "pre-diabetic" || state.diabeticStatus === "diabetic";
  if (isDiabetic && food.tags.includes("high-sugar")) score -= 100;
  if (food.tags.some((t) => avoidTags.has(t))) score -= 16;
  supportTags.forEach((t) => { if (food.tags.includes(t)) score += 3; });
  if (isDiabetic) {
    if (food.tags.includes("diabetic-friendly")) score += 4;
    if (food.tags.includes("low-gi")) score += 3;
  }
  if (state.goal === "weight-loss") {
    if (food.tags.includes("low-fat"))    score += 2;
    if (food.tags.includes("easy-digest")) score += 1;
    if (food.category === "protein")       score += food.protein / 5;
  }
  if (state.goal === "weight-gain") {
    if (food.tags.includes("balanced-energy")) score += 3;
    score += food.calories / 90;
  }
  if (state.goal === "detox") {
    if (food.tags.includes("detox-friendly")) score += 3;
    if (food.tags.includes("easy-digest"))    score += 1.5;
  }
  if (state.goal === "energy") {
    if (food.tags.includes("balanced-energy"))  score += 2;
    if (food.tags.includes("anti-inflammatory")) score += 1.5;
  }
  return score;
}

function getMealCandidates(category, mealType, state) {
  const avoidTags = getHardAvoidTags(state.chronicConditions);
  const isDiabetic = state.diabeticStatus !== "non-diabetic";
  let base = foodDatabase.filter((f) => f.category === category && f.mealType === mealType && filterByAllergies(f, state));
  const diabeticSafe = base.filter((f) => !(isDiabetic && f.tags.includes("high-sugar")));
  const filtered = diabeticSafe.filter((f) => !f.tags.some((t) => avoidTags.has(t)));
  const pool = filtered.length >= 6 ? filtered : diabeticSafe;
  return pool.map((f) => ({ ...f, _score: getCandidateScore(f, state) })).sort((a, b) => b._score - a._score || a.calories - b.calories);
}

function rotateList(list, offset) {
  if (!list.length) return list;
  const safe = ((offset % list.length) + list.length) % list.length;
  return list.slice(safe).concat(list.slice(0, safe));
}

function scaleFood(food, factor) {
  return {
    ...food,
    baseId:        food.id,
    portionFactor: roundOne(factor),
    calories:      round(food.calories * factor),
    protein:       roundOne(food.protein * factor),
    carbs:         roundOne(food.carbs * factor),
    fats:          roundOne(food.fats * factor)
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

function getMacroShare(calories, grams, divisor) {
  return calories ? (grams * divisor) / calories : 0;
}

export function generateMealOption(config, seed, excludeSignatures, state) {
  const metrics = getMetrics(state);
  const targetCalories = round(metrics.dailyCalories * config.percentage);
  const proteins = rotateList(getMealCandidates("protein", config.key, state), seed).slice(0, 10);
  const carbs    = rotateList(getMealCandidates("carb",    config.key, state), seed * 2 + 1).slice(0, 10);
  const fats     = rotateList(getMealCandidates("fat",     config.key, state), seed * 3 + 2).slice(0, 10);
  const macroGoal = getMacroPercents(state.goal);
  let best = null;
  proteins.forEach((protein) => {
    carbs.forEach((carb) => {
      fats.forEach((fat) => {
        const signature = `${protein.id}|${carb.id}|${fat.id}`;
        if (excludeSignatures.has(signature)) return;
        const baseItems  = [protein, carb, fat];
        const baseTotals = getMealTotals(baseItems);
        const factor     = clamp(targetCalories / Math.max(baseTotals.calories, 1), 0.8, 2.2);
        const items      = baseItems.map((i) => scaleFood(i, factor));
        const totals     = getMealTotals(items);
        const score =
          (Math.abs(totals.calories - targetCalories) / Math.max(targetCalories, 1)) * 6 +
          Math.abs(getMacroShare(totals.calories, totals.protein, 4) - macroGoal.protein) +
          Math.abs(getMacroShare(totals.calories, totals.carbs,   4) - macroGoal.carbs)   +
          Math.abs(getMacroShare(totals.calories, totals.fats,    9) - macroGoal.fats)    -
          (protein._score + carb._score + fat._score) / 40;
        if (!best || score < best.score) {
          best = { mealType: config.key, label: config.label, targetCalories, items, signature, score };
        }
      });
    });
  });
  return best;
}

export function generateDietPlan(state) {
  const meals = [];
  MEAL_CONFIGS.forEach((config, index) => {
    const meal = generateMealOption(config, index + 1, new Set(), state);
    if (meal) meals.push(meal);
  });
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
  const scaled = getMealCandidates(currentItem.category, meal.mealType, {
    hasAllergies: false, allergyList: [], customAllergy: "", chronicConditions: [],
    diabeticStatus: "non-diabetic", goal: "maintain"
  });
  const factor = currentItem.portionFactor || 1;
  const candidates = scaled.filter((c) => c.id !== currentItem.baseId).map((c) => scaleFood(c, factor));
  const close = candidates.filter((c) => Math.abs(c.calories - currentItem.calories) <= currentItem.calories * 0.2);
  return close.length >= 5 ? close.slice(0, 8) : candidates.sort((a, b) => Math.abs(a.calories - currentItem.calories) - Math.abs(b.calories - currentItem.calories)).slice(0, 8);
}

export function getAlternativeItemsForState(meal, currentItem, state) {
  const scaled = getMealCandidates(currentItem.category, meal.mealType, state);
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

// dietTotals = { calories, protein, carbs, fats } from the generated meal plan (optional)
export function getProductRecommendations(state, dietTotals) {
  const { goal, chronicConditions = [], activityLevel, diabeticStatus } = state;
  const metrics   = getMetrics(state);
  const isDiabetic = diabeticStatus === "diabetic" || diabeticStatus === "pre-diabetic";
  const picks     = new Set();

  // ── GlucoAmrit: ONLY for confirmed diabetic / pre-diabetic ───────────────────
  if (isDiabetic) picks.add("glucoamrit");

  // ── Oliliv Juice: liver condition, detox goal, weight-loss, kidney ───────────
  if (chronicConditions.includes("liver"))                                   picks.add("oliliv");
  if (goal === "detox" || goal === "weight-loss")                            picks.add("oliliv");
  if (chronicConditions.includes("kidney"))                                  picks.add("oliliv");

  // ── Digestowell Syrup: digestive condition, heart condition, sedentary ───────
  if (chronicConditions.includes("digestive"))                               picks.add("digestowell");
  if (chronicConditions.includes("heart"))                                   picks.add("digestowell");
  // Sedentary lifestyle slows digestion
  if (activityLevel === "sedentary")                                         picks.add("digestowell");

  // ── Laxonova: weight-gain (dense diet), high-protein diet from plan ──────────
  if (goal === "weight-gain")                                                picks.add("laxonova");
  if (dietTotals && dietTotals.protein > metrics.macroTargets.protein * 1.2) picks.add("laxonova");

  // ── Pain Reliva: active users, lung condition, maintain goal ─────────────────
  if (activityLevel === "active" || activityLevel === "moderate")            picks.add("painreliva");
  if (chronicConditions.includes("lung"))                                    picks.add("painreliva");

  // ── Goal fallbacks when nothing matched yet ───────────────────────────────────
  if (!picks.size && goal === "energy")   picks.add("digestowell");
  if (!picks.size && goal === "maintain") picks.add("digestowell");
  if (!picks.size)                        picks.add("oliliv");

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
  if (state.diabeticStatus === "diabetic" || state.diabeticStatus === "pre-diabetic") tips.push("Low-GI carbs and evenly spaced meals can help keep energy steadier across the day.");
  if ((state.chronicConditions || []).includes("digestive")) tips.push("Gentle, lower-spice meals and simpler pairings usually sit better when digestion needs extra support.");
  if ((state.chronicConditions || []).includes("heart")) tips.push("Choose lower-sodium meals and leaner fat sources more often to keep the plan heart-aware.");
  if ((state.chronicConditions || []).includes("liver")) tips.push("A lighter fat load and more detox-friendly dishes keep the plan aligned with liver support.");
  if ((state.chronicConditions || []).includes("kidney")) tips.push("Moderate portions of richer protein dishes and prioritize lower-sodium cooking where possible.");
  if (!tips.length) tips.push("Keep hydration steady, stay consistent with meal timing, and let the swap tools refine the plan around your preferences.");
  tips.push(`Suggested hydration: ${Math.max(2, roundOne((metrics?.weightKg || 60) * 0.035))} L water across the day.`);
  return tips.slice(0, 5);
}

export function getInputSignature(state) {
  return JSON.stringify({
    age: state.age, gender: state.gender, height: state.height, heightUnit: state.heightUnit,
    weight: state.weight, activityLevel: state.activityLevel, goal: state.goal,
    diabeticStatus: state.diabeticStatus, hasAllergies: state.hasAllergies,
    allergyList: state.allergyList, customAllergy: (state.customAllergy || "").trim().toLowerCase(),
    chronicConditions: state.chronicConditions
  });
}
