<div align="center">

<img src="public/olilife_logo-300x95.webp" alt="Olilife Logo" width="260" />

# Olilife — Personalized Wellness Platform

**AI-powered diet planning and health tracking, built for real lives.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-olilife--page--frontend.onrender.com-brightgreen?style=for-the-badge&logo=render)](https://olilife-page-frontend.onrender.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## What is Olilife?

Olilife is a health-first web application that generates personalized diet plans based on your body metrics, activity level, health conditions, and dietary preferences. It combines a guided onboarding flow with a fully interactive dashboard — giving users a complete wellness snapshot from day one.

> Live at: **[olilife-page-frontend.onrender.com](https://olilife-page-frontend.onrender.com/)**

---

## Features

### Guided Onboarding (7 Steps)
A smooth, mobile-first multi-screen flow that collects just what's needed:

| Step | Screen | What it captures |
|------|--------|-----------------|
| 1 | Welcome | Introduction & auth options |
| 2 | Age & Gender | Demographics |
| 3 | Height | cm or ft/in |
| 4 | Weight | kg |
| 5 | Activity Level | Sedentary → Very Active |
| 6 | Goal | Weight loss, muscle gain, maintenance |
| 7 | Health | Diabetic status, chronic conditions, allergies |

### Personalized Dashboard
- **Health Overview** — BMI, TDEE, and body metric cards
- **Macro Targets** — Protein, carbs, and fat goals tuned to your TDEE and objective
- **5-Meal Diet Plan** — Generated and saved to your account; individual meals can be swapped
- **Personalized Tips** — Guidance tailored to your goal, diabetic profile, and conditions
- **Product Recommendations** — Curated Olilife product suggestions based on your health profile
- **Email Your Plan** — Send your full diet chart to your inbox with one click
- **Edit Constraints** — Update any detail inline without re-doing the full onboarding

### Auth & Accounts
- Signup / Login / Logout with JWT sessions
- Progress auto-saved — resume onboarding where you left off
- Diet plan persisted to your account across devices

### Admin Panel
Separate `/admin` route for platform management (role-gated).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router DOM 6 |
| HTTP Client | Axios |
| Styling | Plain CSS (custom design system) |
| Animations | Custom `useScrollReveal` hook |
| Deployment | Render (static site) |

---

## Project Structure

```
client/
├── public/
│   └── olilife_logo-300x95.webp
├── src/
│   ├── components/
│   │   ├── auth/            # LoginModal, SignupModal, ForgotPasswordModal
│   │   ├── dashboard/       # DietGenerator, StatsGrid, MacroTargets, TipsList, ProductSection, EditConstraints
│   │   ├── screens/         # Onboarding step screens (Welcome → Health)
│   │   └── shared/          # BottomSheet, ProductCarousel, ProgressBar, Toast
│   ├── context/
│   │   └── AuthContext.jsx  # Global auth state via React Context
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useScrollReveal.js
│   ├── pages/
│   │   ├── OnboardingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── AdminPage.jsx
│   ├── utils/
│   │   ├── api.js           # Axios instance with base URL & interceptors
│   │   └── dietEngine.js    # TDEE, macro, and tip calculation logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (see [olilife-backend](https://github.com/puskarpreconet123))

### Installation

```bash
# Clone the repository
git clone https://github.com/puskarpreconet123/olilife-page-frontend.git
cd olilife-page-frontend

# Install dependencies
npm install

# Start the dev server (proxies /api → localhost:5000)
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment

Create a `.env` file in the project root if you need to override the API base URL:

```env
VITE_API_URL=http://localhost:5000
```

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## API Proxy

In development, Vite proxies all `/api/*` requests to `http://localhost:5000` — no CORS config needed. In production the frontend calls the deployed backend directly.

---

## How the Diet Engine Works

All calculation logic lives in `src/utils/dietEngine.js` — no external API calls needed for core features:

1. **BMR** calculated via the Mifflin-St Jeor equation
2. **TDEE** = BMR × activity multiplier
3. **Goal adjustment** shifts calories ±15–20%
4. **Macros** split based on goal (protein priority for muscle gain, moderate for loss)
5. **5-meal plan** distributes calories across breakfast, mid-morning, lunch, snack, and dinner
6. **Tips and product recommendations** filtered by diabetic status, chronic conditions, and allergies

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a PR

Please keep PRs focused — one feature or fix per PR.

---

## License

MIT © [Olilife / Preconet India](https://preconetindia.com)

---

<div align="center">

Made with care by the **Olilife** team · [preconetindia.com](https://preconetindia.com)

</div>
