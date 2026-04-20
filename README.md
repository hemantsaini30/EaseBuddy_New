<div align="center">

<img src="https://img.shields.io/badge/CBSE-Class%206--10-6366F1?style=for-the-badge&logoColor=white" alt="CBSE Class 6-10" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />

<br /><br />

# 📚 EaseBuddy — CBSE Study Hub

**Everything a CBSE student needs. In one place.**

Videos · NCERT PDFs · PYQs · MCQ Quizzes · AI Explanations · Streak Tracking · Performance Analytics

<br />

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-easebuddy.vercel.app-6366F1?style=for-the-badge)](https://easebuddy.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-hemantsaini30-181717?style=for-the-badge&logo=github)](https://github.com/hemantsaini30)

<br />

![EaseBuddy Banner](https://img.shields.io/badge/Class%206--Ready-✓-green?style=flat-square) ![Class 7](https://img.shields.io/badge/Class%207--Ready-✓-green?style=flat-square) ![Class 8](https://img.shields.io/badge/Class%208--Ready-✓-green?style=flat-square) ![Class 9](https://img.shields.io/badge/Class%209--Ready-✓-green?style=flat-square) ![Class 10](https://img.shields.io/badge/Class%2010--Ready-✓-green?style=flat-square)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Seed Data](#-seed-data)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🎯 Overview

EaseBuddy is a full-stack MERN EdTech platform built specifically for **CBSE Class 6–10 students**. The goal is simple — instead of switching between YouTube, PDF drives, WhatsApp groups and random websites to study one chapter, everything is organised in one clean interface.

> A student can open any chapter, watch the best video for it, read the NCERT, practise PYQs, take an MCQ quiz, get AI explanations for anything they don't understand, and track their progress — all without leaving the tab.

### Why EaseBuddy?

| Problem | EaseBuddy Solution |
|---|---|
| Students waste time searching for "best video for Chapter X" | Curated YouTube videos per chapter |
| PYQs are scattered across PDFs and old papers | 15 exam-ready PYQs per chapter, organised |
| No way to test yourself chapter-wise | 45 MCQs (Easy / Medium / Hard) per chapter |
| Can't identify weak areas | Performance radar chart across all subjects |
| No motivation to study consistently | Streak system + daily goals + activity calendar |
| Confusing textbook answers | One-click AI explanation with Indian examples |

---

## 🚀 Live Demo

**[https://easebuddy.vercel.app](https://easebuddy.vercel.app)**

> Create a free account to explore all features. No payment, no ads, ever.

---

## ✨ Features

### 📖 Study Content
- **Curated Video Lessons** — Hand-picked YouTube videos for every chapter
- **NCERT PDFs** — Full textbooks embedded directly via Google Drive, no downloads
- **Previous Year Questions (PYQs)** — 15 per chapter with full answers, difficulty tags and year markers
- **Formula Sheets** — All key Maths and Science formulas per chapter, downloadable as PDF

### 🧪 Practice & Testing
- **MCQ Quiz Bank** — 45 MCQs per chapter split into Easy, Medium and Hard
- **Timed Tests** — Built-in countdown timer (30 / 45 / 60 min depending on difficulty)
- **Detailed Result Screen** — See every correct, wrong and skipped answer with explanations
- **Mistake Book** — Every wrong or skipped MCQ is auto-saved; reattempt until mastered

### 🤖 AI-Powered Features
- **AI Easy Explain** — Click any PYQ answer or MCQ explanation to get a simpler version with a real-life Indian example (powered by Groq)
- **AI Doubt Solver** — A floating chat assistant available on every chapter page; ask anything about the topic (powered by Anthropic Claude)

### 📊 Progress & Analytics
- **Study Streaks** — Mark any section as done to build a daily streak; resets if you miss a day
- **Longest Streak Tracking** — Your personal best is always saved
- **Performance Dashboard** — SVG radar chart showing strength across all subjects; identifies weak and strong chapters
- **Daily Goal Widget** — Set a personal daily target (Light 2/day, Regular 5/day, Intense 10/day)
- **Activity Calendar** — GitHub-style contribution calendar showing study activity over the last 365 days
- **Subject Breakdown** — Visual bars showing which subjects you spend the most time on

### 🗂️ Organisation
- **Bookmarks** — Save any chapter; accessible from the sidebar, grouped by subject
- **Pomodoro Timer** — Floating focus timer (25 min study + 5 min break); study time is tracked automatically per chapter

### 🔐 Auth & Account
- Email/password authentication with JWT
- Forgot password via email (Nodemailer + Gmail App Password)
- Profile page with full activity history

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Context API | State management (Auth, Bookmarks, Mistakes) |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | Password reset emails |

### AI & External APIs
| Service | Usage |
|---|---|
| Anthropic Claude | AI Doubt Solver (direct browser API call) |
| Groq (LLaMA 3) | AI Easy Explain modal |
| YouTube Embed | Video lessons |
| Google Drive Embed | NCERT PDFs |

---

## 📁 Project Structure

```
easebuddy/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chapterController.js
│   │   └── progressController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Chapter.js
│   │   ├── Resource.js
│   │   ├── Progress.js
│   │   ├── Formula.js
│   │   ├── Mistake.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chapterRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── mockTestRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   ├── formulaRoutes.js
│   │   ├── mistakeRoutes.js
│   │   └── activityRoutes.js
│   ├── seeders/
│   │   ├── mathSeed.js
│   │   ├── englishSeed.js
│   │   ├── historySeed.js
│   │   └── geographySeed.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    └── my-project/
        └── src/
            ├── components/
            │   ├── chapter/          # VideoSection, PYQSection, QuestionBank, FormulaSheet
            │   ├── common/           # Layout, Navbar, Sidebar, BackButton, AIExplainModal, DoubtSolver
            │   ├── dashboard/        # SubjectCard, ProgressRing, DailyGoal
            │   └── profile/          # ActivityCalendar
            ├── context/              # AuthContext, BookmarkContext, MistakeContext
            ├── hooks/                # useProgress, useDarkMode, useAnalytics
            ├── pages/                # Dashboard, ChapterDetails, MockTest, Profile, etc.
            ├── services/             # api.js, authService, resourceService, activityService
            └── utils/                # constants.js, helpers.js
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Groq API key — [console.groq.com](https://console.groq.com)
- Anthropic API key — [console.anthropic.com](https://console.anthropic.com)
- Gmail account with App Password enabled

### 1. Clone the repository

```bash
git clone https://github.com/hemantsaini30/easebuddy.git
cd easebuddy
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend/my-project
npm install
```

### 4. Configure environment variables

See [Environment Variables](#-environment-variables) below.

### 5. Seed the database

```bash
cd backend

# Step 1 — Create all chapters (run this first, always)
node seed.js

# Step 2 — Seed subject question banks
node seeders/mathSeed.js
node seeders/englishSeed.js
node seeders/historySeed.js
node seeders/geographySeed.js
```

### 6. Start the servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend/my-project
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:5000`

---

## 🔐 Environment Variables

### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/easebuddy
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Email (for forgot password)
EMAIL_USER=your.gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> To generate a Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords

### `frontend/my-project/.env`

```env
VITE_API_URL=http://localhost:5000/api

# AI Doubt Solver (Anthropic Claude — used in DoubtSolver.jsx)
VITE_ANTHROPIC_API_KEY=sk-ant-api03-...

# AI Easy Explain (Groq — used in AIExplainModal.jsx)
GROQ_API_KEY=gsk_...
```

---

## 🌱 Seed Data

The database is seeded with real exam-quality content:

| Subject | Chapters Seeded | PYQs | MCQs |
|---|---|---|---|
| Mathematics | Real Numbers (Ch 1) | 15 | 45 |
| English (First Flight) | Mandela, Flying, Anne Frank | 15 each | 45 each |
| History | All 5 chapters | 15 each | 45 each |
| Geography | Resources, Forest, Water | 15 each | 45 each |

**Per chapter content standard:**
- 15 PYQs with full answers, year, marks and difficulty
- 15 Easy MCQs
- 15 Medium MCQs
- 15 Hard MCQs (include Assertion-Reason, Case-based, Extract-based)
- All MCQs have detailed explanations (3–5 sentences)
- Zero placeholders — all real exam content

Seeders are idempotent — safe to run multiple times. They clear existing resources before inserting.

---

## 📡 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new student | ❌ |
| POST | `/api/auth/login` | Login, returns JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/forgot-password` | Send reset email | ❌ |
| POST | `/api/auth/reset-password/:token` | Reset password + auto-login | ❌ |
| GET | `/api/chapters` | List chapters (filter: subject, classLevel, book) | ✅ |
| GET | `/api/chapters/:slug` | Single chapter | ✅ |
| GET | `/api/resources/:chapterId` | Resources for a chapter | ✅ |
| GET | `/api/progress/me` | All progress for logged-in user | ✅ |
| PUT | `/api/progress/mark-section` | Mark section done, update streak | ✅ |
| PUT | `/api/progress/add-time` | Add Pomodoro study time | ✅ |
| POST | `/api/mock-test/generate` | Generate random MCQ test | ✅ |
| GET | `/api/analytics/performance` | Radar chart data | ✅ |
| GET | `/api/bookmarks` | User's bookmarks | ✅ |
| POST | `/api/bookmarks` | Add bookmark | ✅ |
| DELETE | `/api/bookmarks/:chapterId` | Remove bookmark | ✅ |
| GET | `/api/formulas/:chapterId` | Formulas for chapter | ✅ |
| GET | `/api/mistakes` | All mistakes for user | ✅ |
| POST | `/api/mistakes/bulk` | Save array of wrong/skipped MCQs | ✅ |
| PUT | `/api/mistakes/:id/reattempt` | Submit reattempt answer | ✅ |
| GET | `/api/activity/calendar` | 365-day activity calendar | ✅ |
| GET | `/api/activity/recent` | Recent activity feed | ✅ |
| GET | `/api/activity/stats` | Activity statistics | ✅ |

---

## 📱 Screenshots

> *(Add screenshots here after deployment)*

| Page | Description |
|---|---|
| Dashboard | Subject cards, daily goal, streak |
| Chapter Details | Tabs — Videos, NCERT, PYQs, Quiz, Formulas |
| MCQ Quiz | Timer, progress dots, submit |
| Result Screen | Correct/wrong/skipped review with AI Explain |
| Performance | Radar chart, weak/strong chapters |
| Profile | Activity calendar, streaks, recent activity |
| AI Doubt Solver | Floating chat assistant |

---

## 🗺️ Roadmap

- [x] Authentication with JWT
- [x] Chapter content (Videos, NCERT, PYQs, MCQs, Formulas)
- [x] MCQ Quiz with timer and detailed results
- [x] Mistake Book with reattempt system
- [x] Bookmarks
- [x] Performance Dashboard (radar chart)
- [x] AI Easy Explain (Groq)
- [x] AI Doubt Solver (Anthropic)
- [x] Pomodoro timer with time tracking
- [x] Streak system with instant update
- [x] Activity Calendar (GitHub-style)
- [x] Daily Goals
- [x] Profile page
- [x] Forgot / Reset password via email
- [x] Dark mode
- [ ] Google OAuth login
- [ ] Remaining Math chapters (2–14)
- [ ] All Geography chapters
- [ ] Civics and Economics seed data
- [ ] Hindi chapters seed data
- [ ] Science chapters seed data
- [ ] Real YouTube video IDs
- [ ] Global chapter search
- [ ] Admin panel for content management
- [ ] PWA / offline mode
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome — especially for:

- Adding seed data for unseeded chapters
- Suggesting better YouTube video links for chapters
- Reporting content errors in PYQs or MCQs
- UI/UX improvements

### How to contribute

```bash
# Fork the repository
git clone https://github.com/hemantsaini30/easebuddy.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add polynomials chapter seed data"

# Push and open a pull request
git push origin feature/your-feature-name
```

Please follow the existing code style and seeder pattern. All MCQ seed contributions must include a detailed `mcqExplanation` for every question.

---

## 👤 Author

**Hemant Saini**

[![GitHub](https://img.shields.io/badge/GitHub-hemantsaini30-181717?style=flat-square&logo=github)](https://github.com/hemantsaini30)
[![Email](https://img.shields.io/badge/Email-hemantsaini9310@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:hemantsaini9310@gmail.com)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ for CBSE students across India

**[⭐ Star this repo if it helped you](https://github.com/hemantsaini30/easebuddy)**

</div>
