<div align="center">

<br />

<img src="https://img.shields.io/badge/LearnEase-E--Learning%20Platform-4f46e5?style=for-the-badge&logo=bookopen&logoColor=white" alt="LearnEase" />

<br /><br />

# 📚 LearnEase
### *Learn smarter. Navigate easier.*

**A modern, fully functional e-learning website prototype built for a university HCI course project.**  
*Usability Evaluation of E-Learning Platforms*

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

<br />

🌐 **[Live Demo](https://olibbeto.github.io/E-Learning-Platform/)** &nbsp;|&nbsp; 📂 **[Source Code](https://github.com/olibbeto/E-Learning-Platform)**

<br />

---

</div>

## 🎯 What is LearnEase?

LearnEase is a **student-centered e-learning platform** designed to fix the real usability failures found in traditional Learning Management Systems like Moodle, Blackboard, and Canvas.

Built as a **Human-Computer Interaction (HCI) university assignment**, every design decision is backed by a usability principle — from Nielsen's 10 Heuristics to Fitts' Law and Hick's Law. The goal was to answer one core research question:

> *"Why are students frustrated with existing e-learning platforms — and how can we fix it?"*

---

## ✨ Features

<table>
  <tr>
    <td>🏠</td>
    <td><strong>Smart Dashboard</strong></td>
    <td>All enrolled courses, upcoming deadlines, and recent grades on one screen</td>
  </tr>
  <tr>
    <td>📚</td>
    <td><strong>Course Catalog</strong></td>
    <td>Browse, filter by category/difficulty, and enrol in 8 courses instantly</td>
  </tr>
  <tr>
    <td>🎥</td>
    <td><strong>Learning Interface</strong></td>
    <td>Focused lesson view with video player UI, collapsible course sidebar, and lesson progress</td>
  </tr>
  <tr>
    <td>📝</td>
    <td><strong>Assignments</strong></td>
    <td>Submit files with drag-and-drop, confirmation modal, colour-coded status badges</td>
  </tr>
  <tr>
    <td>🧠</td>
    <td><strong>Interactive Quiz</strong></td>
    <td>Timed quiz engine with live countdown, instant scoring, and per-question explanations</td>
  </tr>
  <tr>
    <td>📊</td>
    <td><strong>Grades Overview</strong></td>
    <td>Auto-calculated GPA, letter grades, and per-course breakdown with charts</td>
  </tr>
  <tr>
    <td>📈</td>
    <td><strong>Progress Tracking</strong></td>
    <td>Weekly activity chart, circular progress rings, and unlockable achievements</td>
  </tr>
  <tr>
    <td>📅</td>
    <td><strong>Academic Calendar</strong></td>
    <td>Monthly grid with colour-coded events — assignments 🟡, quizzes 🟣, lectures 🔵, exams 🔴</td>
  </tr>
  <tr>
    <td>🔔</td>
    <td><strong>Notifications</strong></td>
    <td>Live unread badge, All/Unread filter tabs, one-click mark all as read</td>
  </tr>
  <tr>
    <td>🔍</td>
    <td><strong>Global Search</strong></td>
    <td>Search across courses, lessons, and assignments from any page</td>
  </tr>
  <tr>
    <td>👤</td>
    <td><strong>Profile & Settings</strong></td>
    <td>Edit profile, notification preferences, appearance, and accessibility options</td>
  </tr>
</table>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/olibbeto/E-Learning-Platform.git

# Navigate into the project
cd E-Learning-Platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 🔑 Demo Credentials

| Field    | Value                              |
|----------|------------------------------------|
| Email    | `alex.johnson@university.edu`      |
| Password | `password123`                      |

> Click **"Use Demo Credentials"** on the login page to auto-fill.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.x | App Router framework, static export |
| **React** | 19 | Component-based UI model |
| **TypeScript** | 5.x | Static type safety |
| **Tailwind CSS** | 4.x | Utility-first styling & responsive design |
| **Lucide React** | Latest | 200+ consistent SVG icons |
| **Recharts** | Latest | Progress and grade charts |
| **next/font** | — | Google Inter font (self-hosted) |

---

## 🗺️ All Pages & Routes

| Route | Page | Type |
|-------|------|------|
| `/` | Landing page | Static |
| `/login` | Login with demo credentials | Static |
| `/register` | Register with password strength meter | Static |
| `/dashboard` | Student dashboard | Static |
| `/courses` | Course catalog with filters | Static |
| `/courses/[id]` | Course detail & enrol | Dynamic |
| `/my-learning` | Enrolled courses & progress | Static |
| `/learn/[courseId]/[lessonId]` | Focused learning interface | Dynamic |
| `/search` | Global search results | Static |
| `/assignments` | All assignments list | Static |
| `/assignments/[id]` | Assignment detail & submission | Dynamic |
| `/quiz/[id]` | Timed interactive quiz | Dynamic |
| `/quiz/[id]/results` | Quiz results & explanations | Dynamic |
| `/grades` | GPA & grades overview | Static |
| `/progress` | Learning progress & achievements | Static |
| `/calendar` | Academic calendar | Static |
| `/notifications` | Notification center | Static |
| `/profile` | User profile & editing | Static |
| `/settings` | Account settings & accessibility | Static |

---

## 📁 Project Structure

```
learnease/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD (auto-deploys to GitHub Pages)
│
├── src/
│   ├── app/                    ← Every page (Next.js App Router)
│   │   ├── globals.css         ← Design system, CSS variables, fonts
│   │   ├── layout.tsx          ← Root layout wrapping all pages
│   │   ├── page.tsx            ← Landing page
│   │   ├── dashboard/
│   │   ├── courses/[id]/
│   │   ├── learn/[courseId]/[lessonId]/
│   │   ├── assignments/[id]/
│   │   ├── quiz/[id]/results/
│   │   ├── grades/ · progress/ · calendar/
│   │   ├── notifications/ · profile/ · settings/
│   │   └── login/ · register/ · search/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← Sticky responsive top navigation
│   │   │   └── CourseSidebar.tsx   ← Lesson sidebar with accordion modules
│   │   └── ui/
│   │       ├── CourseCard.tsx      ← 3-variant course card component
│   │       ├── AssignmentCard.tsx  ← Assignment card with status badge
│   │       ├── ProgressBar.tsx     ← Accessible ARIA progress bar
│   │       ├── Toast.tsx           ← Animated toast notification system
│   │       ├── Modal.tsx           ← Confirmation dialog with focus trap
│   │       ├── EmptyState.tsx      ← Empty state placeholder with CTA
│   │       └── LoadingSpinner.tsx  ← Loading animation
│   │
│   ├── context/
│   │   └── AppContext.tsx      ← Global state (enrollment, progress, notifications)
│   │
│   ├── data/
│   │   └── mock-data.ts        ← All demo data (8 courses, assignments, quiz, grades)
│   │
│   ├── lib/
│   │   └── utils.ts            ← Helper functions (cn, formatDate, getProgress...)
│   │
│   └── types/
│       └── index.ts            ← TypeScript interfaces (Course, User, Assignment...)
│
├── HCI_IMPLEMENTATION.md       ← Full HCI principles → code mapping
├── README.md
├── next.config.ts              ← Static export config for GitHub Pages
└── package.json
```

---

## 🏛️ HCI Principles Applied

This project visibly demonstrates **Jakob Nielsen's 10 Usability Heuristics**:

| # | Heuristic | Where in LearnEase |
|---|-----------|-------------------|
| H1 | **Visibility of System Status** | Progress bars, lesson checkmarks, notification badge, status badges |
| H2 | **Match Between System & Real World** | Academic calendar layout, familiar education terms |
| H3 | **User Control & Freedom** | Cancel buttons, confirmation dialogs, back navigation |
| H4 | **Consistency & Standards** | Same Navbar, button styles, and card layouts on every page |
| H5 | **Error Prevention** | File type validation, submission confirmation modal, password meter |
| H6 | **Recognition Rather Than Recall** | Breadcrumbs, active nav highlight, persistent lesson sidebar |
| H7 | **Flexibility & Efficiency** | Search with filters, keyboard navigation, responsive layout |
| H8 | **Aesthetic & Minimalist Design** | Clean white UI, 5 nav links, only essential info on cards |
| H9 | **Help Users Recover from Errors** | Descriptive error messages, empty states with action buttons |
| H10 | **Help & Documentation** | Placeholder text, explanatory labels, quiz answer explanations |

> 📄 See **[HCI_IMPLEMENTATION.md](./HCI_IMPLEMENTATION.md)** for the full detailed breakdown.

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA roles — `aria-valuenow/min/max` on all progress bars
- Visible focus rings — 2px indigo outline on every interactive element
- Reduced motion — all animations respect `prefers-reduced-motion`
- Screen-reader text on icon-only buttons via `sr-only` spans
- Keyboard navigable — every button, link, and form is fully accessible

---

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| 📱 Mobile `< 640px` | Single column, hamburger menu, slide-in sidebar drawer |
| 💻 Tablet `640–1024px` | Two-column grid, condensed navigation |
| 🖥️ Desktop `> 1024px` | Multi-column layout, persistent sidebar, full Navbar |

---

## 📄 License

MIT — Built for academic demonstration purposes as part of a university HCI course.

---

<div align="center">

Made with ❤️ for the **Human-Computer Interaction** course · 2026

**[⬆ Back to top](#-learnease)**

</div>
