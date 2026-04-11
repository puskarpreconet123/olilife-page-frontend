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

// ─── REAL MEAL DATA FROM EXCEL DATABASE ────────────────────────────────────

const BREAKFAST_MEALS = [
  // ── 200–300 kcal ─────────────────────────────────────────────────────────
  { name: "Jowar Ambil (250ml fermented drink)", type: "breakfast", calorie_range: "200-300", calories: 210, protein: 6, carbs: 30, fats: 4, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Sattu Drink (40g roasted gram flour)", type: "breakfast", calorie_range: "200-300", calories: 220, protein: 12, carbs: 30, fats: 4, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Steamed Dhokla (150g)", type: "breakfast", calorie_range: "200-300", calories: 230, protein: 10, carbs: 36, fats: 5, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Ragi Porridge (40g + milk 100ml)", type: "breakfast", calorie_range: "200-300", calories: 240, protein: 9, carbs: 38, fats: 6, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Besan Chilla (80g batter)", type: "breakfast", calorie_range: "200-300", calories: 250, protein: 12, carbs: 30, fats: 8, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "2 Idli + Sambar", type: "breakfast", calorie_range: "200-300", calories: 260, protein: 9, carbs: 46, fats: 3, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Vegetable Poha (60g raw)", type: "breakfast", calorie_range: "200-300", calories: 265, protein: 7, carbs: 42, fats: 8, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Nuts"] },
  { name: "Ghugni (150g)", type: "breakfast", calorie_range: "200-300", calories: 280, protein: 12, carbs: 42, fats: 7, fiber: 9, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Spices"] },
  { name: "Bajra Raab (250ml)", type: "breakfast", calorie_range: "200-300", calories: 285, protein: 8, carbs: 40, fats: 7, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Boiled Sweet Potato (200g) + Mint Chutney", type: "breakfast", calorie_range: "200-300", calories: 290, protein: 4, carbs: 48, fats: 1, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Egg White Bhurji (4 whites) + Spinach", type: "breakfast", calorie_range: "200-300", calories: 235, protein: 28, carbs: 8, fats: 10, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Egg"] },

  // ── 300–400 kcal ─────────────────────────────────────────────────────────
  { name: "Sprouted Moong Salad (300g) + Roti", type: "breakfast", calorie_range: "300-400", calories: 310, protein: 16, carbs: 48, fats: 6, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Greek Yogurt Bowl (300g) + Nuts (15g)", type: "breakfast", calorie_range: "300-400", calories: 315, protein: 22, carbs: 18, fats: 12, fiber: 3, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Nuts"] },
  { name: "Thalipeeth (2 pcs) + Curd", type: "breakfast", calorie_range: "300-400", calories: 360, protein: 13, carbs: 48, fats: 12, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Handvo (150g)", type: "breakfast", calorie_range: "300-400", calories: 380, protein: 12, carbs: 52, fats: 14, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Upma (200g) + Coconut Chutney", type: "breakfast", calorie_range: "300-400", calories: 385, protein: 10, carbs: 56, fats: 14, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Idiyappam (3 pcs) + Vegetable Kurma", type: "breakfast", calorie_range: "300-400", calories: 390, protein: 8, carbs: 62, fats: 8, fiber: 3, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Paneer Bhurji (100g) + 1 Phulka", type: "breakfast", calorie_range: "300-400", calories: 395, protein: 24, carbs: 28, fats: 18, fiber: 2, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Aloo Paratha (2 small) + Green Chutney", type: "breakfast", calorie_range: "300-400", calories: 420, protein: 12, carbs: 60, fats: 12, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Egg Omelette (2 eggs) + Toast", type: "breakfast", calorie_range: "300-400", calories: 430, protein: 18, carbs: 30, fats: 20, fiber: 2, vegetarian: "No", diabetic_friendly: "No", allergens: ["Egg", "Gluten"] },

  // ── 400–500 kcal ─────────────────────────────────────────────────────────
  { name: "Ven Pongal (200g)", type: "breakfast", calorie_range: "400-500", calories: 450, protein: 14, carbs: 68, fats: 12, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Masala Dosa + Sambar", type: "breakfast", calorie_range: "400-500", calories: 460, protein: 12, carbs: 65, fats: 15, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Roti (2) + Aloo Tori Sabzi", type: "breakfast", calorie_range: "400-500", calories: 460, protein: 9, carbs: 72, fats: 14, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Masala Chole + Bread Toast (2 slices)", type: "breakfast", calorie_range: "400-500", calories: 470, protein: 14, carbs: 72, fats: 14, fiber: 10, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Poha + Kadala Curry", type: "breakfast", calorie_range: "400-500", calories: 480, protein: 14, carbs: 70, fats: 16, fiber: 8, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Chola Kulhe (1 cup + 2 bread)", type: "breakfast", calorie_range: "400-500", calories: 490, protein: 16, carbs: 78, fats: 14, fiber: 12, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Sprouted Moong (250g) + Roasted Chana", type: "breakfast", calorie_range: "400-500", calories: 485, protein: 30, carbs: 68, fats: 10, fiber: 14, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },

  // ── 500–600 kcal ─────────────────────────────────────────────────────────
  { name: "Moong Dal Chilla (120g batter) + Paneer", type: "breakfast", calorie_range: "500-600", calories: 520, protein: 40, carbs: 38, fats: 28, fiber: 8, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk"] },
  { name: "Vegetable Millet Upma (large bowl)", type: "breakfast", calorie_range: "500-600", calories: 520, protein: 18, carbs: 76, fats: 12, fiber: 8, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Grilled Cheese Sandwich (2 pcs)", type: "breakfast", calorie_range: "500-600", calories: 540, protein: 22, carbs: 52, fats: 24, fiber: 3, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] },
  { name: "Zunka + Bhakri (2 pcs)", type: "breakfast", calorie_range: "500-600", calories: 540, protein: 18, carbs: 68, fats: 18, fiber: 8, vegetarian: "Yes", diabetic_friendly: "No", allergens: [] },
  { name: "Fish Omelette (2 eggs + fish 80g)", type: "breakfast", calorie_range: "500-600", calories: 548, protein: 38, carbs: 8, fats: 36, fiber: 2, vegetarian: "No", diabetic_friendly: "No", allergens: ["Egg", "Seafood"] },
  { name: "Stuffed Methi Paratha (2 pcs) + Curd", type: "breakfast", calorie_range: "500-600", calories: 560, protein: 16, carbs: 75, fats: 18, fiber: 8, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] },
  { name: "Egg Bhurji (3 eggs) + 2 Phulka", type: "breakfast", calorie_range: "500-600", calories: 560, protein: 25, carbs: 40, fats: 28, fiber: 4, vegetarian: "No", diabetic_friendly: "No", allergens: ["Egg", "Gluten"] },
  { name: "Stuffed Paratha (2 pcs) + Curd", type: "breakfast", calorie_range: "500-600", calories: 595, protein: 32, carbs: 56, fats: 28, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] },
  { name: "Greek Curd (300g) + Chia + Almonds", type: "breakfast", calorie_range: "500-600", calories: 540, protein: 32, carbs: 22, fats: 36, fiber: 7, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Nuts"] },
  { name: "Grilled Chicken (220g) + Vegetables", type: "breakfast", calorie_range: "500-600", calories: 550, protein: 52, carbs: 18, fats: 30, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: [] },
  { name: "Kala Chana (300g boiled) + Curd", type: "breakfast", calorie_range: "500-600", calories: 580, protein: 40, carbs: 70, fats: 16, fiber: 16, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk"] },

  // ── 600–700 kcal ─────────────────────────────────────────────────────────
  { name: "Paneer Paratha (4 pcs) + Curd", type: "breakfast", calorie_range: "600-700", calories: 620, protein: 28, carbs: 72, fats: 25, fiber: 7, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] },
  { name: "Aloo Puri + Chole (plate)", type: "breakfast", calorie_range: "600-700", calories: 650, protein: 14, carbs: 90, fats: 24, fiber: 7, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Masala Paratha (4 pcs) + Achaar", type: "breakfast", calorie_range: "600-700", calories: 670, protein: 26, carbs: 92, fats: 26, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Chole Bhature (1 piece + chole)", type: "breakfast", calorie_range: "600-700", calories: 680, protein: 14, carbs: 92, fats: 28, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Paneer Keema Bhurji + Toast (2 slices)", type: "breakfast", calorie_range: "600-700", calories: 688, protein: 38, carbs: 48, fats: 40, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] },
  { name: "Chicken Keema (100g) + 2 Roti", type: "breakfast", calorie_range: "600-700", calories: 690, protein: 38, carbs: 56, fats: 28, fiber: 6, vegetarian: "No", diabetic_friendly: "No", allergens: ["Gluten"] },
  { name: "Chole Puri (full plate)", type: "breakfast", calorie_range: "600-700", calories: 695, protein: 18, carbs: 96, fats: 30, fiber: 12, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Gluten"] },

  // ── 700–800 kcal ─────────────────────────────────────────────────────────
  { name: "Paneer Tikka (200g) + Salad + Roti", type: "breakfast", calorie_range: "700-800", calories: 716, protein: 44, carbs: 18, fats: 52, fiber: 5, vegetarian: "Yes", diabetic_friendly: "No", allergens: ["Milk", "Gluten"] }
];

const LUNCH_MEALS = [
  // ── 200–300 kcal ─────────────────────────────────────────────────────────
  { name: "Moong Dal (150g cooked) + Brown Rice (100g) + Lauki Sabzi", type: "lunch", calorie_range: "200-300", calories: 292, protein: 14, carbs: 46, fats: 6, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Masoor Dal (150g cooked) + Phulka + Bhindi", type: "lunch", calorie_range: "200-300", calories: 298, protein: 13, carbs: 44, fats: 7, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Sambar (200ml) + Red Rice (100g) + Beans Poriyal", type: "lunch", calorie_range: "200-300", calories: 286, protein: 10, carbs: 48, fats: 5, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Rasam (200ml) + Rice (100g) + Cabbage Stir Fry", type: "lunch", calorie_range: "200-300", calories: 284, protein: 9, carbs: 50, fats: 4, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Odisha Dalma (150g cooked) + Rice (100g)", type: "lunch", calorie_range: "200-300", calories: 289, protein: 12, carbs: 44, fats: 6, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Gujarati Thin Kadhi (200ml) + Brown Rice (100g)", type: "lunch", calorie_range: "200-300", calories: 285, protein: 8, carbs: 46, fats: 6, fiber: 3, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Light Egg Curry (1 egg) + Rice (100g)", type: "lunch", calorie_range: "200-300", calories: 285, protein: 14, carbs: 38, fats: 10, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Egg"] },
  { name: "Light Rohu Fish Curry (80g) + Rice (100g)", type: "lunch", calorie_range: "200-300", calories: 290, protein: 20, carbs: 36, fats: 8, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },

  // ── 300–400 kcal ─────────────────────────────────────────────────────────
  { name: "Rajma (180g cooked) + Brown Rice (150g)", type: "lunch", calorie_range: "300-400", calories: 372, protein: 17, carbs: 64, fats: 7, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Chole (180g cooked) + Phulka (60g flour)", type: "lunch", calorie_range: "300-400", calories: 376, protein: 18, carbs: 66, fats: 9, fiber: 11, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Chicken Curry (120g cooked) + Brown Rice (120g)", type: "lunch", calorie_range: "300-400", calories: 369, protein: 30, carbs: 52, fats: 12, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: [] },
  { name: "Egg Curry (2 eggs) + Rice (120g)", type: "lunch", calorie_range: "300-400", calories: 365, protein: 22, carbs: 50, fats: 14, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Egg"] },
  { name: "Fish Curry (Rohu 120g) + Rice (120g)", type: "lunch", calorie_range: "300-400", calories: 378, protein: 30, carbs: 54, fats: 11, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Paneer Bhurji (80g) + Phulka (60g flour)", type: "lunch", calorie_range: "300-400", calories: 368, protein: 22, carbs: 44, fats: 18, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Bengali Musur Dal (200g) + Rice (150g) + Pumpkin Sabzi", type: "lunch", calorie_range: "300-400", calories: 362, protein: 14, carbs: 64, fats: 7, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },

  // ── 400–500 kcal ─────────────────────────────────────────────────────────
  { name: "Chicken Curry (150g) + Brown Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 445, protein: 35, carbs: 60, fats: 14, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: [] },
  { name: "Fish Curry (Rohu 150g) + Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 448, protein: 34, carbs: 58, fats: 14, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Paneer Bhurji (120g) + Phulka (60g) + Salad", type: "lunch", calorie_range: "400-500", calories: 458, protein: 26, carbs: 48, fats: 20, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Rajma (220g) + Brown Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 462, protein: 19, carbs: 70, fats: 8, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Chole (220g) + Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 465, protein: 20, carbs: 72, fats: 12, fiber: 11, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Bengali Shorshe Rohu (150g) + Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 468, protein: 34, carbs: 60, fats: 18, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Kerala Fish Curry (Sardine 150g) + Red Rice", type: "lunch", calorie_range: "400-500", calories: 472, protein: 36, carbs: 62, fats: 16, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Gujarati Undhiyu (250g) + Phulka", type: "lunch", calorie_range: "400-500", calories: 456, protein: 14, carbs: 60, fats: 14, fiber: 11, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Baingan Bharta (250g) + Phulka (60g)", type: "lunch", calorie_range: "400-500", calories: 448, protein: 11, carbs: 56, fats: 16, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Light Mutton Curry (120g lean) + Brown Rice (150g)", type: "lunch", calorie_range: "400-500", calories: 462, protein: 32, carbs: 60, fats: 18, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: [] },

  // ── 500–600 kcal ─────────────────────────────────────────────────────────
  { name: "Mutton Curry (150g lean) + Rice (180g)", type: "lunch", calorie_range: "500-600", calories: 565, protein: 38, carbs: 72, fats: 22, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: [] },
  { name: "Pomfret Curry (180g) + Rice (180g)", type: "lunch", calorie_range: "500-600", calories: 558, protein: 40, carbs: 70, fats: 18, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Chicken Thali (150g + Phulka + Dal)", type: "lunch", calorie_range: "500-600", calories: 572, protein: 45, carbs: 68, fats: 20, fiber: 9, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Vegetarian Thali (Paneer 150g + Rice + Dal)", type: "lunch", calorie_range: "500-600", calories: 568, protein: 32, carbs: 80, fats: 22, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Prawn Curry (180g) + Rice (180g)", type: "lunch", calorie_range: "500-600", calories: 578, protein: 42, carbs: 74, fats: 20, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Curd Rice (300g) + Vegetable Fry", type: "lunch", calorie_range: "500-600", calories: 542, protein: 14, carbs: 78, fats: 14, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Dal Tadka (250g) + Phulka (90g flour)", type: "lunch", calorie_range: "500-600", calories: 548, protein: 22, carbs: 82, fats: 16, fiber: 13, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },

  // ── 600–700 kcal ─────────────────────────────────────────────────────────
  { name: "Bengali Fish Thali (Rohu 180g + 200g Rice + Dal + Sabzi)", type: "lunch", calorie_range: "600-700", calories: 620, protein: 45, carbs: 94, fats: 20, fiber: 9, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Chicken Thali (200g + Phulka + Rajma)", type: "lunch", calorie_range: "600-700", calories: 638, protein: 55, carbs: 82, fats: 24, fiber: 11, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Gujarati Thali (Undhiyu + Dal + Phulka + Rice)", type: "lunch", calorie_range: "600-700", calories: 652, protein: 22, carbs: 98, fats: 18, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },

  // ── 700–800 kcal ─────────────────────────────────────────────────────────
  { name: "Paneer Butter Masala (200g) + Phulka + Rice", type: "lunch", calorie_range: "700-800", calories: 718, protein: 34, carbs: 98, fats: 34, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Hyderabadi Chicken Biryani (350g) + Raita", type: "lunch", calorie_range: "700-800", calories: 742, protein: 52, carbs: 96, fats: 30, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Prawn Curry (220g) + Rice (200g) + Vegetable Stir Fry", type: "lunch", calorie_range: "700-800", calories: 758, protein: 55, carbs: 96, fats: 26, fiber: 7, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Rajma Chawal Large Plate (300g + 250g + Salad)", type: "lunch", calorie_range: "700-800", calories: 728, protein: 30, carbs: 130, fats: 14, fiber: 18, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Chole Bhature (2 Medium, controlled oil)", type: "lunch", calorie_range: "700-800", calories: 762, protein: 24, carbs: 110, fats: 32, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten"] },

  // ── 800–900 kcal ─────────────────────────────────────────────────────────
  { name: "Chole Bhature Large (2 Large Pcs + Extra Chole)", type: "lunch", calorie_range: "800-900", calories: 790, protein: 28, carbs: 110, fats: 32, fiber: 15, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten", "Milk"] },
  { name: "Kerala Fish Thali (Sardine 220g + Red Rice + Dal + Thoran)", type: "lunch", calorie_range: "800-900", calories: 808, protein: 46, carbs: 88, fats: 32, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood", "Milk"] },
  { name: "Prawn Masala (220g) + Rice (220g) + Papad", type: "lunch", calorie_range: "800-900", calories: 820, protein: 48, carbs: 86, fats: 34, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Paneer Butter Masala Large (250g) + Naan (90g)", type: "lunch", calorie_range: "800-900", calories: 832, protein: 32, carbs: 78, fats: 42, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Bengali Hilsa Fish Curry (200g) + Rice (220g) + Sabzi", type: "lunch", calorie_range: "800-900", calories: 845, protein: 50, carbs: 82, fats: 36, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Mutton Biryani (300g) + Raita", type: "lunch", calorie_range: "800-900", calories: 858, protein: 52, carbs: 88, fats: 36, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Vegetable Biryani Large (350g) + Raita", type: "lunch", calorie_range: "800-900", calories: 865, protein: 24, carbs: 116, fats: 28, fiber: 14, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk"] },

  // ── 900–1000 kcal ────────────────────────────────────────────────────────
  { name: "Chole Bhature Extra Large (3 Pcs + Extra Chole)", type: "lunch", calorie_range: "900-1000", calories: 878, protein: 30, carbs: 122, fats: 35, fiber: 17, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Gluten", "Milk"] },
  { name: "Bengali Fish Thali Large (250g Rohu + 250g Rice + Dal + 2 Sabzi)", type: "lunch", calorie_range: "900-1000", calories: 895, protein: 52, carbs: 92, fats: 40, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Seafood"] },
  { name: "Chicken Thali Large (250g + Rice + Dal + Roti + Sabzi)", type: "lunch", calorie_range: "900-1000", calories: 920, protein: 58, carbs: 92, fats: 38, fiber: 7, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Mutton Curry Large (220g) + Rice (250g) + Phulka", type: "lunch", calorie_range: "900-1000", calories: 938, protein: 55, carbs: 96, fats: 42, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Paneer Tikka Masala (300g) + Naan (120g) + Rice (100g)", type: "lunch", calorie_range: "900-1000", calories: 952, protein: 36, carbs: 106, fats: 44, fiber: 9, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },

  // ── 1000–1100 kcal ───────────────────────────────────────────────────────
  { name: "Paneer Makhani Large (350g) + Naan (120g) + Rice (100g)", type: "lunch", calorie_range: "1000-1100", calories: 1020, protein: 38, carbs: 118, fats: 46, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] },
  { name: "Rajma Chawal Full Plate (350g + 300g + Salad + Papad)", type: "lunch", calorie_range: "1000-1100", calories: 1045, protein: 32, carbs: 130, fats: 40, fiber: 18, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: [] },
  { name: "Chicken Biryani Full Plate (450g) + Raita + Mirchi Salan", type: "lunch", calorie_range: "1000-1100", calories: 1065, protein: 60, carbs: 104, fats: 46, fiber: 8, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Milk"] },
  { name: "Mutton Rogan Josh (300g) + Rice (250g) + Naan", type: "lunch", calorie_range: "1000-1100", calories: 1080, protein: 65, carbs: 108, fats: 48, fiber: 8, vegetarian: "No", diabetic_friendly: "Yes", allergens: ["Gluten"] },
  { name: "Vegetarian Thali Full (Paneer + Rajma + Dal + 3 Phulka + Rice)", type: "lunch", calorie_range: "1000-1100", calories: 1095, protein: 42, carbs: 118, fats: 46, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: ["Milk", "Gluten"] }
];

const DINNER_MEALS = [
  // ── 200–300 kcal ─────────────────────────────────────────────────────────
  { name: "Moong Dal Clear Broth (300g, strained) + Steamed Spinach (150g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "200-300", calories: 230, protein: 14, carbs: 26, fats: 5, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Grilled Rohu (120g) + Lauki-Tomato Stew (180g) + 150g Steamed Rice", type: "dinner", calorie_range: "200-300", calories: 260, protein: 26, carbs: 10, fats: 14, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Egg White Bhurji (3 whites + 1 whole egg) + Sautéed Palak (150g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "200-300", calories: 255, protein: 24, carbs: 8, fats: 12, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Gujarati Thin Kadhi (300ml, low-fat) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "200-300", calories: 210, protein: 10, carbs: 20, fats: 9, fiber: 2, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Sprouted Moong Warm Salad (220g) + Lemon + 1 Small Ragi Roti (30g flour)", type: "dinner", calorie_range: "200-300", calories: 250, protein: 18, carbs: 32, fats: 6, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Kerala Vegetable Stew (Coconut light, 250g) + 2 Small Appam", type: "dinner", calorie_range: "200-300", calories: 280, protein: 8, carbs: 24, fats: 18, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Andhra Tomato Rasam (350ml) + Beans Poriyal (150g) + 120g Brown Rice", type: "dinner", calorie_range: "200-300", calories: 225, protein: 9, carbs: 28, fats: 6, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },

  // ── 300–400 kcal ─────────────────────────────────────────────────────────
  { name: "Grilled Chicken (150g) + Stir Fry Zucchini (150g) + 120g Brown Rice", type: "dinner", calorie_range: "300-400", calories: 360, protein: 36, carbs: 10, fats: 18, fiber: 3, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Paneer Tikka (150g) + Mint Chutney + 1 Small Jowar Roti (30g flour)", type: "dinner", calorie_range: "300-400", calories: 390, protein: 26, carbs: 12, fats: 28, fiber: 2, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Bengali Light Fish Jhol (Rohu 150g, minimal oil) + 150g Steamed Rice", type: "dinner", calorie_range: "300-400", calories: 320, protein: 30, carbs: 8, fats: 16, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Adai (2 small, 150g batter, no chutney)", type: "dinner", calorie_range: "300-400", calories: 340, protein: 18, carbs: 42, fats: 10, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Sundal (250g boiled chana, tempered light) + 1 Small Ragi Roti (30g flour)", type: "dinner", calorie_range: "300-400", calories: 370, protein: 19, carbs: 54, fats: 8, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Egg Curry (2 eggs, light gravy) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "300-400", calories: 330, protein: 20, carbs: 8, fats: 24, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Jowar Ambil (Fermented, 400ml) + Light Vegetable Stir Fry", type: "dinner", calorie_range: "300-400", calories: 310, protein: 12, carbs: 48, fats: 6, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },

  // ── 400–500 kcal ─────────────────────────────────────────────────────────
  { name: "Grilled Chicken (180g) + Sautéed Mixed Vegetables (200g) + 120g Brown Rice", type: "dinner", calorie_range: "400-500", calories: 430, protein: 44, carbs: 16, fats: 22, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Kerala Seer Fish Curry (180g, light coconut) + Beans Thoran (150g) + 120g Red Rice", type: "dinner", calorie_range: "400-500", calories: 460, protein: 38, carbs: 18, fats: 26, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Paneer Tikka (200g) + Stir Fry Capsicum (150g) + 1 Small Jowar Roti (30g flour)", type: "dinner", calorie_range: "400-500", calories: 480, protein: 32, carbs: 14, fats: 34, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Egg Masala (3 eggs, reduced oil) + Cabbage Peas Stir Fry (180g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "400-500", calories: 470, protein: 28, carbs: 20, fats: 32, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Sundal Bowl (300g boiled chana) + Cucumber Salad + 1 Small Ragi Roti (30g flour)", type: "dinner", calorie_range: "400-500", calories: 420, protein: 22, carbs: 62, fats: 10, fiber: 14, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Maharashtrian Zunka (Besan 120g cooked) + Bhindi Stir Fry (150g) + 1 Small Bajra Bhakri (40g flour)", type: "dinner", calorie_range: "400-500", calories: 450, protein: 24, carbs: 36, fats: 22, fiber: 9, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Bengali Light Chingri (Prawn 180g, minimal oil) + Lauki Sabzi (180g) + 150g Steamed Rice", type: "dinner", calorie_range: "400-500", calories: 480, protein: 42, carbs: 16, fats: 30, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Adai (2 medium) + Coconut Chutney (15g, controlled)", type: "dinner", calorie_range: "400-500", calories: 440, protein: 20, carbs: 48, fats: 18, fiber: 9, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Gujarati Handvo (200g, baked) + Mint Chutney", type: "dinner", calorie_range: "400-500", calories: 470, protein: 18, carbs: 52, fats: 18, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Hyderabadi Egg Keema (3 eggs scrambled) + Spinach (150g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "400-500", calories: 460, protein: 30, carbs: 10, fats: 34, fiber: 4, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },

  // ── 500–600 kcal ─────────────────────────────────────────────────────────
  { name: "Grilled Chicken (220g) + Broccoli-Carrot Stir Fry (200g) + 120g Brown Rice", type: "dinner", calorie_range: "500-600", calories: 540, protein: 52, carbs: 18, fats: 30, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Kerala Seer Fish (220g, light coconut gravy) + Cabbage Thoran (180g) + 120g Red Rice", type: "dinner", calorie_range: "500-600", calories: 560, protein: 44, carbs: 22, fats: 34, fiber: 7, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Paneer Tikka (220g) + Palak Stir Fry (200g) + 1 Small Jowar Roti (30g flour)", type: "dinner", calorie_range: "500-600", calories: 590, protein: 36, carbs: 18, fats: 40, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Egg Curry (4 eggs, reduced oil) + Beans-Carrot Sabzi (200g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "500-600", calories: 560, protein: 32, carbs: 22, fats: 38, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Maharashtrian Zunka (150g, besan cooked) + Bhindi (200g) + 1 Small Bajra Bhakri (40g flour)", type: "dinner", calorie_range: "500-600", calories: 520, protein: 28, carbs: 40, fats: 28, fiber: 11, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Bengali Chingri (220g prawn, light mustard gravy) + Lauki (200g) + 150g Steamed Rice", type: "dinner", calorie_range: "500-600", calories: 580, protein: 50, carbs: 18, fats: 38, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Adai (3 medium) + Mint Chutney (20g)", type: "dinner", calorie_range: "500-600", calories: 520, protein: 26, carbs: 62, fats: 20, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Gujarati Handvo (220g, baked) + Cucumber Raita (100g)", type: "dinner", calorie_range: "500-600", calories: 550, protein: 20, carbs: 58, fats: 22, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Hyderabadi Chicken Keema (200g) + Stir Fry Capsicum (200g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "500-600", calories: 590, protein: 48, carbs: 16, fats: 32, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Palak Paneer (220g, light) + Sautéed Mushroom (150g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "500-600", calories: 570, protein: 30, carbs: 18, fats: 42, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },

  // ── 600–700 kcal ─────────────────────────────────────────────────────────
  { name: "Tandoori Chicken (250g) + Grilled Vegetables (250g) + 120g Brown Rice", type: "dinner", calorie_range: "600-700", calories: 610, protein: 60, carbs: 24, fats: 36, fiber: 7, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Kerala Seer Fish Roast (250g) + Cabbage Thoran (200g) + 120g Red Rice", type: "dinner", calorie_range: "600-700", calories: 670, protein: 50, carbs: 20, fats: 46, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Paneer Tikka (250g) + Palak Mushroom Stir Fry (250g) + 1 Small Jowar Roti (30g flour)", type: "dinner", calorie_range: "600-700", calories: 690, protein: 40, carbs: 20, fats: 50, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Hyderabadi Chicken Keema (250g) + Sautéed Beans (250g) + 120g Brown Rice", type: "dinner", calorie_range: "600-700", calories: 680, protein: 56, carbs: 18, fats: 48, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Egg Masala (5 eggs, controlled oil) + Spinach (200g) + 1 Small Ragi Roti (30g flour)", type: "dinner", calorie_range: "600-700", calories: 650, protein: 38, carbs: 18, fats: 48, fiber: 5, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Maharashtrian Mutton Sukka (220g, lean) + Bhindi Fry (200g) + 1 Small Bajra Bhakri (40g flour)", type: "dinner", calorie_range: "600-700", calories: 700, protein: 52, carbs: 21, fats: 50, fiber: 7, vegetarian: "No", diabetic_friendly: "No", allergens: "Nut" },
  { name: "Gujarati Zunka (180g, besan) + Cabbage Peas (250g) + 1 Small Jowar Roti (30g flour)", type: "dinner", calorie_range: "600-700", calories: 620, protein: 32, carbs: 48, fats: 31, fiber: 12, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Bengali Mustard Prawn (250g) + Lauki (250g) + 150g Steamed Rice", type: "dinner", calorie_range: "600-700", calories: 690, protein: 56, carbs: 16, fats: 50, fiber: 6, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Adai (3 large) + Coconut Chutney (25g, controlled)", type: "dinner", calorie_range: "600-700", calories: 610, protein: 30, carbs: 72, fats: 22, fiber: 14, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Palak Paneer (250g) + Mushroom Stir Fry (200g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "600-700", calories: 660, protein: 34, carbs: 22, fats: 48, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },

  // ── 700–900 kcal ─────────────────────────────────────────────────────────
  { name: "Butter Chicken (300g, moderate oil) + 2 Phulka (60g flour)", type: "dinner", calorie_range: "700-900", calories: 760, protein: 60, carbs: 58, fats: 40, fiber: 6, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Hyderabadi Chicken Biryani (400g, controlled oil)", type: "dinner", calorie_range: "700-900", calories: 780, protein: 52, carbs: 92, fats: 30, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "" },
  { name: "Paneer Butter Masala (300g) + 2 Phulka", type: "dinner", calorie_range: "700-900", calories: 820, protein: 38, carbs: 60, fats: 50, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Milk, Gluten" },
  { name: "Kerala Seer Fish Fry (280g) + Cabbage Thoran (250g) + 120g Red Rice", type: "dinner", calorie_range: "700-900", calories: 730, protein: 60, carbs: 22, fats: 48, fiber: 6, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Bengali Ilish Bhapa (250g Hilsa, mustard steamed) + Lauki (250g) + 150g Steamed Rice", type: "dinner", calorie_range: "700-900", calories: 800, protein: 52, carbs: 18, fats: 58, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Mutton Rogan (250g lean) + 2 Phulka", type: "dinner", calorie_range: "700-900", calories: 850, protein: 58, carbs: 52, fats: 58, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Gujarati Undhiyu (350g) + Kadhi (250ml) + 1 Jowar Roti", type: "dinner", calorie_range: "700-900", calories: 720, protein: 21, carbs: 88, fats: 34, fiber: 14, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Prawn Masala (300g) + Sautéed Beans (250g) + 120g Brown Rice", type: "dinner", calorie_range: "700-900", calories: 840, protein: 70, carbs: 20, fats: 58, fiber: 7, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Seafood" },
  { name: "Chicken Tikka (300g) + Stir Fry Vegetables (300g) + 120g Brown Rice", type: "dinner", calorie_range: "700-900", calories: 720, protein: 66, carbs: 28, fats: 42, fiber: 8, vegetarian: "No", diabetic_friendly: "Yes", allergens: "" },
  { name: "Palak Paneer (300g) + Mushroom Stir Fry (250g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "700-900", calories: 780, protein: 42, carbs: 24, fats: 58, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },

  // ── 900–1000 kcal ────────────────────────────────────────────────────────
  { name: "Butter Chicken (350g) + 2 Butter Naan (100g flour total)", type: "dinner", calorie_range: "900-1000", calories: 940, protein: 68, carbs: 78, fats: 60, fiber: 6, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Hyderabadi Chicken Biryani (500g cooked, moderate oil) + Raita (200g)", type: "dinner", calorie_range: "900-1000", calories: 920, protein: 60, carbs: 110, fats: 38, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Milk" },
  { name: "Mutton Rogan (300g lean) + 2 Phulka (60g flour)", type: "dinner", calorie_range: "900-1000", calories: 960, protein: 70, carbs: 52, fats: 72, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Paneer Butter Masala (350g) + 2 Butter Naan", type: "dinner", calorie_range: "900-1000", calories: 880, protein: 46, carbs: 84, fats: 70, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Milk, Gluten" },
  { name: "Kerala Seer Fish Fry (320g) + 150g Red Rice", type: "dinner", calorie_range: "900-1000", calories: 910, protein: 68, carbs: 62, fats: 58, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Bengali Ilish Bhapa (300g) + 180g Rice", type: "dinner", calorie_range: "900-1000", calories: 950, protein: 62, carbs: 68, fats: 70, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Prawn Masala (350g) + 150g Rice", type: "dinner", calorie_range: "900-1000", calories: 980, protein: 76, carbs: 62, fats: 72, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Chicken Tikka (350g) + 2 Phulka", type: "dinner", calorie_range: "900-1000", calories: 900, protein: 80, carbs: 52, fats: 56, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Gujarati Undhiyu (400g) + Kadhi (300ml) + 1 Jowar Roti", type: "dinner", calorie_range: "900-1000", calories: 910, protein: 28, carbs: 120, fats: 42, fiber: 18, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Palak Paneer (350g) + Mushroom Stir Fry (300g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "900-1000", calories: 900, protein: 48, carbs: 30, fats: 72, fiber: 9, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },

  // ── 1000–1100 kcal ───────────────────────────────────────────────────────
  { name: "Butter Chicken (400g) + 2 Butter Naan (120g flour total)", type: "dinner", calorie_range: "1000-1100", calories: 1040, protein: 76, carbs: 92, fats: 72, fiber: 6, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Hyderabadi Chicken Biryani (600g cooked) + Raita (200g)", type: "dinner", calorie_range: "1000-1100", calories: 1030, protein: 70, carbs: 128, fats: 42, fiber: 7, vegetarian: "No", diabetic_friendly: "No", allergens: "Milk" },
  { name: "Mutton Rogan (350g lean) + 2 Butter Naan", type: "dinner", calorie_range: "1000-1100", calories: 1080, protein: 82, carbs: 84, fats: 82, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Paneer Butter Masala (400g) + 2 Butter Naan", type: "dinner", calorie_range: "1000-1100", calories: 1100, protein: 54, carbs: 92, fats: 86, fiber: 6, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Milk, Gluten" },
  { name: "Kerala Seer Fish Fry (350g) + 200g Red Rice", type: "dinner", calorie_range: "1000-1100", calories: 1010, protein: 78, carbs: 88, fats: 62, fiber: 7, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Bengali Ilish Bhapa (350g) + 200g Rice", type: "dinner", calorie_range: "1000-1100", calories: 1060, protein: 70, carbs: 82, fats: 82, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Prawn Masala (400g) + 180g Rice", type: "dinner", calorie_range: "1000-1100", calories: 1090, protein: 88, carbs: 84, fats: 86, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Seafood" },
  { name: "Chicken Tikka (400g) + 2 Phulka", type: "dinner", calorie_range: "1000-1100", calories: 1000, protein: 92, carbs: 52, fats: 66, fiber: 5, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Gujarati Undhiyu (450g) + Kadhi (350ml) + 1 Jowar Roti", type: "dinner", calorie_range: "1000-1100", calories: 1020, protein: 32, carbs: 140, fats: 50, fiber: 20, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Palak Paneer (400g) + Mushroom Stir Fry (350g) + 1 Small Phulka (30g flour)", type: "dinner", calorie_range: "1000-1100", calories: 1000, protein: 56, carbs: 38, fats: 80, fiber: 10, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" }
];

const SNACKS_MEALS = [
  { name: "Roasted Chana", type: "snacks", calorie_range: "120-180", calories: 150, protein: 8, carbs: 22, fats: 2, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Sprouted Moong Salad", type: "snacks", calorie_range: "150-210", calories: 180, protein: 10, carbs: 28, fats: 2, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Boiled Kala Chana", type: "snacks", calorie_range: "160-220", calories: 190, protein: 10, carbs: 32, fats: 2, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Chana + Onion + Lemon", type: "snacks", calorie_range: "160-220", calories: 190, protein: 10, carbs: 30, fats: 2, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Peanut + Gur", type: "snacks", calorie_range: "220-300", calories: 260, protein: 10, carbs: 20, fats: 16, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Roasted Makhana", type: "snacks", calorie_range: "100-150", calories: 120, protein: 4, carbs: 15, fats: 4, fiber: 2, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Makhana + Almonds", type: "snacks", calorie_range: "180-240", calories: 210, protein: 7, carbs: 18, fats: 12, fiber: 3, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Nuts" },
  { name: "Muri + Peanut", type: "snacks", calorie_range: "150-220", calories: 190, protein: 6, carbs: 28, fats: 7, fiber: 3, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Muri + Chana", type: "snacks", calorie_range: "160-230", calories: 200, protein: 8, carbs: 30, fats: 3, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Muri + Sprouts", type: "snacks", calorie_range: "180-250", calories: 220, protein: 9, carbs: 32, fats: 4, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Sattu Drink", type: "snacks", calorie_range: "150-220", calories: 180, protein: 10, carbs: 28, fats: 2, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Sattu + Yogurt", type: "snacks", calorie_range: "200-260", calories: 230, protein: 12, carbs: 30, fats: 6, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Sweet Potato Chaat", type: "snacks", calorie_range: "180-240", calories: 210, protein: 4, carbs: 38, fats: 2, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Boiled Corn", type: "snacks", calorie_range: "180-240", calories: 210, protein: 6, carbs: 30, fats: 3, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "" },
  { name: "Boiled Potato (Black Salt)", type: "snacks", calorie_range: "160-220", calories: 190, protein: 4, carbs: 35, fats: 1, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Fruit + Peanut Butter", type: "snacks", calorie_range: "200-260", calories: 230, protein: 7, carbs: 30, fats: 10, fiber: 5, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Apple + Peanut Butter", type: "snacks", calorie_range: "180-250", calories: 220, protein: 6, carbs: 25, fats: 12, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Peanuts" },
  { name: "Banana + Peanut Butter", type: "snacks", calorie_range: "250-320", calories: 290, protein: 10, carbs: 34, fats: 14, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Guava + Black Salt", type: "snacks", calorie_range: "100-140", calories: 120, protein: 3, carbs: 22, fats: 1, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Papaya Bowl", type: "snacks", calorie_range: "80-120", calories: 100, protein: 1, carbs: 24, fats: 0, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Mixed Nuts", type: "snacks", calorie_range: "220-300", calories: 260, protein: 8, carbs: 16, fats: 20, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Nuts" },
  { name: "Almond + Dates", type: "snacks", calorie_range: "200-280", calories: 240, protein: 7, carbs: 28, fats: 12, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Nuts" },
  { name: "Walnut + Fruit", type: "snacks", calorie_range: "220-300", calories: 260, protein: 6, carbs: 26, fats: 18, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Nuts" },
  { name: "Til + Flax Seeds Mix", type: "snacks", calorie_range: "200-260", calories: 230, protein: 8, carbs: 20, fats: 14, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Sesame" },
  { name: "Peanut + Roasted Chana", type: "snacks", calorie_range: "220-300", calories: 260, protein: 10, carbs: 22, fats: 16, fiber: 7, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Sprouted Chana", type: "snacks", calorie_range: "180-240", calories: 210, protein: 11, carbs: 30, fats: 3, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Sprouted Moong", type: "snacks", calorie_range: "180-250", calories: 220, protein: 12, carbs: 32, fats: 3, fiber: 8, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Boiled Egg", type: "snacks", calorie_range: "70-110", calories: 80, protein: 6, carbs: 1, fats: 5, fiber: 0, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Egg + Vegetable Salad", type: "snacks", calorie_range: "120-180", calories: 150, protein: 10, carbs: 5, fats: 8, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Omelette (1 egg + veggies)", type: "snacks", calorie_range: "150-220", calories: 180, protein: 12, carbs: 5, fats: 10, fiber: 2, vegetarian: "No", diabetic_friendly: "Yes", allergens: "Egg" },
  { name: "Paneer Cutlet", type: "snacks", calorie_range: "180-240", calories: 210, protein: 14, carbs: 6, fats: 12, fiber: 0, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Paneer + Black Salt", type: "snacks", calorie_range: "200-260", calories: 230, protein: 14, carbs: 6, fats: 14, fiber: 0, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Paneer + Flax Seeds", type: "snacks", calorie_range: "200-260", calories: 230, protein: 14, carbs: 8, fats: 14, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Hung Curd Dip + Veggies", type: "snacks", calorie_range: "180-240", calories: 210, protein: 12, carbs: 12, fats: 10, fiber: 6, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Yogurt + Fruit", type: "snacks", calorie_range: "150-220", calories: 180, protein: 9, carbs: 24, fats: 5, fiber: 3, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Chire + Yogurt", type: "snacks", calorie_range: "180-250", calories: 220, protein: 8, carbs: 40, fats: 4, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Milk" },
  { name: "Chire + Peanut", type: "snacks", calorie_range: "250-320", calories: 290, protein: 10, carbs: 45, fats: 12, fiber: 5, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Chire + Sprouts", type: "snacks", calorie_range: "220-300", calories: 260, protein: 10, carbs: 42, fats: 5, fiber: 7, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Poha + Vegetables", type: "snacks", calorie_range: "200-260", calories: 230, protein: 7, carbs: 38, fats: 5, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "" },
  { name: "Upma + Vegetables", type: "snacks", calorie_range: "220-300", calories: 260, protein: 8, carbs: 40, fats: 6, fiber: 5, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Vegetable Sandwich (Brown Bread)", type: "snacks", calorie_range: "200-280", calories: 240, protein: 9, carbs: 35, fats: 7, fiber: 5, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Gluten" },
  { name: "Peanut Butter Toast", type: "snacks", calorie_range: "250-320", calories: 290, protein: 12, carbs: 30, fats: 14, fiber: 4, vegetarian: "Yes", diabetic_friendly: "No", allergens: "Peanuts" },
  { name: "Whole Wheat Toast + Egg", type: "snacks", calorie_range: "220-300", calories: 260, protein: 13, carbs: 28, fats: 10, fiber: 4, vegetarian: "No", diabetic_friendly: "No", allergens: "Gluten, Egg" },
  { name: "Besan Chilla", type: "snacks", calorie_range: "180-240", calories: 210, protein: 10, carbs: 20, fats: 8, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Moong Chilla", type: "snacks", calorie_range: "160-220", calories: 190, protein: 12, carbs: 18, fats: 6, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Vegetable Soup", type: "snacks", calorie_range: "80-120", calories: 100, protein: 4, carbs: 18, fats: 2, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Dal Soup", type: "snacks", calorie_range: "120-180", calories: 150, protein: 8, carbs: 22, fats: 3, fiber: 5, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Tomato Soup", type: "snacks", calorie_range: "90-130", calories: 110, protein: 3, carbs: 20, fats: 2, fiber: 4, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "" },
  { name: "Buttermilk + Seeds", type: "snacks", calorie_range: "100-150", calories: 120, protein: 5, carbs: 10, fats: 4, fiber: 2, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Milk" },
  { name: "Green Tea + Nuts", type: "snacks", calorie_range: "120-180", calories: 150, protein: 4, carbs: 8, fats: 10, fiber: 3, vegetarian: "Yes", diabetic_friendly: "Yes", allergens: "Nuts" }
];

const DESSERT_MEALS = [
  { name: "Chhena + Nolen Gur (Fresh Paneer + Jaggery)", type: "dessert", calorie_range: "180-240", calories: 210, protein: 12, carbs: 18, fats: 9, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Curd + Honey", type: "dessert", calorie_range: "150-200", calories: 170, protein: 7, carbs: 22, fats: 5, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Fruit Chaat", type: "dessert", calorie_range: "80-120", calories: 100, protein: 2, carbs: 24, fats: 0, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Banana + Peanut", type: "dessert", calorie_range: "250-350", calories: 300, protein: 10, carbs: 35, fats: 14, fiber: 4, vegetarian: "Yes", allergens: "Peanuts" },
  { name: "Gur + Muri", type: "dessert", calorie_range: "120-180", calories: 150, protein: 3, carbs: 32, fats: 1, fiber: 2, vegetarian: "Yes", allergens: "None" },
  { name: "Boiled Sweet Potato + Gur", type: "dessert", calorie_range: "160-220", calories: 190, protein: 3, carbs: 40, fats: 1, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Apple + Peanut Butter", type: "dessert", calorie_range: "180-250", calories: 220, protein: 6, carbs: 25, fats: 12, fiber: 5, vegetarian: "Yes", allergens: "Peanuts" },
  { name: "Dates + Milk", type: "dessert", calorie_range: "200-280", calories: 240, protein: 8, carbs: 35, fats: 6, fiber: 3, vegetarian: "Yes", allergens: "Milk" },
  { name: "Roasted Makhana + Gur", type: "dessert", calorie_range: "120-180", calories: 150, protein: 5, carbs: 18, fats: 5, fiber: 2, vegetarian: "Yes", allergens: "Nuts" },
  { name: "Oats + Milk + Honey", type: "dessert", calorie_range: "200-280", calories: 240, protein: 9, carbs: 35, fats: 6, fiber: 5, vegetarian: "Yes", allergens: "Milk" },
  { name: "Chire + Milk + Dates", type: "dessert", calorie_range: "220-300", calories: 260, protein: 8, carbs: 45, fats: 5, fiber: 4, vegetarian: "Yes", allergens: "Milk" },
  { name: "Sattu + Gur + Milk", type: "dessert", calorie_range: "250-350", calories: 300, protein: 12, carbs: 40, fats: 8, fiber: 7, vegetarian: "Yes", allergens: "None" },
  { name: "Sprouted Moong + Honey", type: "dessert", calorie_range: "150-210", calories: 180, protein: 9, carbs: 28, fats: 2, fiber: 7, vegetarian: "Yes", allergens: "None" },
  { name: "Boiled Kala Chana + Gur", type: "dessert", calorie_range: "180-240", calories: 210, protein: 10, carbs: 35, fats: 2, fiber: 8, vegetarian: "Yes", allergens: "None" },
  { name: "Papaya + Lemon + Honey", type: "dessert", calorie_range: "120-170", calories: 140, protein: 2, carbs: 30, fats: 0, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Guava + Black Salt + Honey", type: "dessert", calorie_range: "100-150", calories: 120, protein: 3, carbs: 22, fats: 1, fiber: 6, vegetarian: "Yes", allergens: "None" },
  { name: "Pomegranate + Yogurt", type: "dessert", calorie_range: "150-200", calories: 180, protein: 6, carbs: 28, fats: 4, fiber: 3, vegetarian: "Yes", allergens: "Milk" },
  { name: "Mango + Chia", type: "dessert", calorie_range: "200-260", calories: 230, protein: 4, carbs: 35, fats: 8, fiber: 6, vegetarian: "Yes", allergens: "None" },
  { name: "Banana + Yogurt + Honey", type: "dessert", calorie_range: "220-300", calories: 250, protein: 8, carbs: 38, fats: 5, fiber: 4, vegetarian: "Yes", allergens: "Milk" },
  { name: "Almond + Dates", type: "dessert", calorie_range: "200-280", calories: 240, protein: 7, carbs: 28, fats: 12, fiber: 5, vegetarian: "Yes", allergens: "Nuts" },
  { name: "Peanut + Gur Ball", type: "dessert", calorie_range: "250-350", calories: 290, protein: 10, carbs: 30, fats: 15, fiber: 4, vegetarian: "Yes", allergens: "Peanuts" },
  { name: "Til + Gur", type: "dessert", calorie_range: "200-260", calories: 230, protein: 7, carbs: 22, fats: 12, fiber: 6, vegetarian: "Yes", allergens: "Sesame" },
  { name: "Coconut + Gur", type: "dessert", calorie_range: "250-330", calories: 290, protein: 4, carbs: 30, fats: 16, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Chia + Milk + Honey", type: "dessert", calorie_range: "200-260", calories: 230, protein: 8, carbs: 22, fats: 10, fiber: 7, vegetarian: "Yes", allergens: "Milk" },
  { name: "Flaxseed + Gur", type: "dessert", calorie_range: "180-240", calories: 210, protein: 6, carbs: 20, fats: 11, fiber: 7, vegetarian: "Yes", allergens: "None" },
  { name: "Boiled Corn + Honey", type: "dessert", calorie_range: "180-240", calories: 210, protein: 6, carbs: 30, fats: 3, fiber: 4, vegetarian: "Yes", allergens: "None" },
  { name: "Pumpkin + Gur", type: "dessert", calorie_range: "150-200", calories: 170, protein: 2, carbs: 35, fats: 0, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Lauki + Milk + Gur", type: "dessert", calorie_range: "160-220", calories: 190, protein: 6, carbs: 30, fats: 4, fiber: 4, vegetarian: "Yes", allergens: "Milk" },
  { name: "Chhena + Fruit Bowl", type: "dessert", calorie_range: "200-260", calories: 230, protein: 13, carbs: 20, fats: 10, fiber: 3, vegetarian: "Yes", allergens: "Milk" },
  { name: "Homemade Low Sugar Payesh", type: "dessert", calorie_range: "180-240", calories: 210, protein: 6, carbs: 30, fats: 6, fiber: 2, vegetarian: "Yes", allergens: "Milk" },
  { name: "Low Sugar Mishti Doi", type: "dessert", calorie_range: "150-220", calories: 190, protein: 7, carbs: 28, fats: 5, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Dark Chocolate + Almond", type: "dessert", calorie_range: "200-260", calories: 230, protein: 6, carbs: 20, fats: 14, fiber: 4, vegetarian: "Yes", allergens: "Nuts" },
  { name: "Cocoa + Banana", type: "dessert", calorie_range: "220-300", calories: 250, protein: 6, carbs: 38, fats: 8, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Golden Milk + Honey", type: "dessert", calorie_range: "150-200", calories: 170, protein: 7, carbs: 20, fats: 5, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Almond Milk + Dates", type: "dessert", calorie_range: "180-240", calories: 210, protein: 6, carbs: 28, fats: 9, fiber: 4, vegetarian: "Yes", allergens: "Nuts" },
  { name: "Chire + Banana + Honey", type: "dessert", calorie_range: "250-330", calories: 290, protein: 7, carbs: 50, fats: 5, fiber: 5, vegetarian: "Yes", allergens: "None" },
  { name: "Chire + Yogurt + Fruit", type: "dessert", calorie_range: "220-280", calories: 250, protein: 9, carbs: 40, fats: 4, fiber: 5, vegetarian: "Yes", allergens: "Milk" },
  { name: "Sprouts + Banana", type: "dessert", calorie_range: "250-330", calories: 300, protein: 11, carbs: 45, fats: 3, fiber: 8, vegetarian: "Yes", allergens: "None" },
  { name: "Mixed Sprouts + Honey", type: "dessert", calorie_range: "200-260", calories: 230, protein: 11, carbs: 32, fats: 3, fiber: 8, vegetarian: "Yes", allergens: "None" },
  { name: "Banana + Sesame + Honey", type: "dessert", calorie_range: "220-300", calories: 250, protein: 7, carbs: 38, fats: 8, fiber: 6, vegetarian: "Yes", allergens: "Sesame" },
  { name: "Coconut + Banana + Honey", type: "dessert", calorie_range: "260-340", calories: 300, protein: 5, carbs: 40, fats: 14, fiber: 6, vegetarian: "Yes", allergens: "None" },
  { name: "Peanut + Cocoa + Dates", type: "dessert", calorie_range: "260-340", calories: 300, protein: 11, carbs: 32, fats: 15, fiber: 6, vegetarian: "Yes", allergens: "Peanuts" },
  { name: "Oats + Cocoa + Milk", type: "dessert", calorie_range: "230-300", calories: 260, protein: 10, carbs: 40, fats: 7, fiber: 5, vegetarian: "Yes", allergens: "Milk" },
  { name: "Low Sugar Rasgulla (store-bought)", type: "dessert", calorie_range: "120-180", calories: 150, protein: 6, carbs: 20, fats: 4, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Baked Sandesh (store-bought)", type: "dessert", calorie_range: "150-220", calories: 190, protein: 9, carbs: 18, fats: 8, fiber: 1, vegetarian: "Yes", allergens: "Milk" },
  { name: "Sugar-free Mishti Doi (store-bought)", type: "dessert", calorie_range: "130-180", calories: 160, protein: 7, carbs: 22, fats: 4, fiber: 0, vegetarian: "Yes", allergens: "Milk" },
  { name: "Protein Yogurt Dessert (store)", type: "dessert", calorie_range: "180-240", calories: 210, protein: 15, carbs: 20, fats: 6, fiber: 2, vegetarian: "Yes", allergens: "Milk" },
  { name: "Date Ladoo (store)", type: "dessert", calorie_range: "200-260", calories: 230, protein: 4, carbs: 30, fats: 10, fiber: 4, vegetarian: "Yes", allergens: "Nuts" },
  { name: "Peanut Chikki (low sugar store)", type: "dessert", calorie_range: "180-260", calories: 220, protein: 8, carbs: 20, fats: 12, fiber: 3, vegetarian: "Yes", allergens: "Peanuts" },
  { name: "Til Ladoo (store)", type: "dessert", calorie_range: "200-260", calories: 230, protein: 7, carbs: 22, fats: 12, fiber: 5, vegetarian: "Yes", allergens: "Sesame" },
];

// ─── Build Food Database ──────────────────────────────────────────────────

export function buildFoodDatabase() {
  const foods = [];
  let id = 0;

  const mealMap = {
    breakfast: BREAKFAST_MEALS,
    lunch: LUNCH_MEALS,
    dinner: DINNER_MEALS,
    snacks: SNACKS_MEALS,
    dessert: DESSERT_MEALS
  };

  Object.entries(mealMap).forEach(([mealType, meals]) => {
    meals.forEach((meal) => {
      id += 1;
      // Determine category based on macros
      let category = 'carb';
      if (meal.protein > meal.carbs && meal.protein > meal.fats) {
        category = 'protein';
      } else if (meal.fats > meal.carbs && meal.fats > meal.protein) {
        category = 'fat';
      }

      // Build tags based on data
      const tags = [];
      if (meal.vegetarian === 'Yes') tags.push('veg');
      if (meal.diabetic_friendly === 'Yes') tags.push('diabetic-friendly');
      if (meal.allergens) {
        if (Array.isArray(meal.allergens)) {
          meal.allergens.forEach(a => {
            const trimmed = String(a).trim().toLowerCase();
            if (trimmed) tags.push(trimmed);
          });
        } else if (typeof meal.allergens === "string") {
          meal.allergens.split(',').forEach(a => {
            const trimmed = a.trim().toLowerCase();
            if (trimmed) tags.push(trimmed);
          });
        }
      }
      if (meal.fats <= 5) tags.push('low-fat');
      if (meal.calories <= 100) tags.push('light');
      if (meal.fiber >= 5) tags.push('high-fiber');
      if (meal.protein >= 15) tags.push('protein-heavy');

      foods.push({
        id: `meal-${id}`,
        name: meal.name,
        category,
        calories: meal.calories,
        calorie_range: meal.calorie_range || null,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        fiber: meal.fiber,
        mealType: mealType,
        tags,
        vegetarian: meal.vegetarian === 'Yes',
        diabeticFriendly: meal.diabetic_friendly === 'Yes'
      });
    });
  });

  return foods;
}

export const foodDatabase = buildFoodDatabase();

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
  const dessertCalories = bmi < 18.5 ? round(baseCalories * 0.05) : 0;
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