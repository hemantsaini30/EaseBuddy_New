import { useEffect } from "react";

const FEATURES = [
  {
    icon: "📹",
    title: "Curated Video Lessons",
    desc: "Hand-picked YouTube videos for every chapter — no more wasting time searching.",
    color: "#EFF6FF",
    textColor: "#1E40AF",
  },
  {
    icon: "📄",
    title: "NCERT Solutions",
    desc: "Full NCERT textbook PDFs and solutions embedded directly — no downloads needed.",
    color: "#F0FDF4",
    textColor: "#15803D",
  },
  {
    icon: "📝",
    title: "Previous Year Questions",
    desc: "15 exam-ready PYQs per chapter with full answers, year tags and difficulty levels.",
    color: "#FFF7ED",
    textColor: "#C2410C",
  },
  {
    icon: "🧪",
    title: "MCQ Quiz Bank",
    desc: "45 MCQs per chapter (Easy / Medium / Hard) with timer, instant scoring and explanations.",
    color: "#F5F3FF",
    textColor: "#6D28D9",
  },
  {
    icon: "✨",
    title: "AI Easy Explain",
    desc: "Confused by an answer? One click gives you a simple explanation with a real-life Indian example.",
    color: "#FDF2F8",
    textColor: "#9D174D",
  },
  {
    icon: "🤖",
    title: "AI Doubt Solver",
    desc: "Ask any doubt about a chapter and get an instant AI answer — available on every page.",
    color: "#ECFDF5",
    textColor: "#065F46",
  },
  {
    icon: "🔥",
    title: "Study Streaks",
    desc: "Build daily habits with streak tracking. Miss a day and it resets — stay consistent!",
    color: "#FFF7ED",
    textColor: "#92400E",
  },
  {
    icon: "📊",
    title: "Performance Dashboard",
    desc: "Visual radar chart showing your strength across all subjects. Know exactly where to focus.",
    color: "#EFF6FF",
    textColor: "#1E40AF",
  },
  {
    icon: "❌",
    title: "Mistake Book",
    desc: "Every wrong MCQ is saved automatically. Reattempt them until you master the concept.",
    color: "#FFF1F2",
    textColor: "#9F1239",
  },
  {
    icon: "🔖",
    title: "Smart Bookmarks",
    desc: "Bookmark any chapter and find it instantly, grouped by subject.",
    color: "#F0FDF4",
    textColor: "#15803D",
  },
  {
    icon: "⏱️",
    title: "Pomodoro Timer",
    desc: "Built-in focus timer — 25 min study + 5 min break. Your study time is tracked automatically.",
    color: "#F5F3FF",
    textColor: "#6D28D9",
  },
  {
    icon: "📐",
    title: "Formula Sheets",
    desc: "All key formulas for Maths and Science chapters in one place. Download as PDF anytime.",
    color: "#FEFCE8",
    textColor: "#92400E",
  },
];

const SUBJECTS = [
  { name: "Mathematics", icon: "📐", chapters: 14 },
  { name: "Science",     icon: "⚗️",  chapters: 15 },
  { name: "English",     icon: "📖", chapters: 22 },
  { name: "Hindi",       icon: "🖊️",  chapters: 20 },
  { name: "Social Science", icon: "🌏", chapters: 27 },
];

const AboutModal = ({ onClose }) => {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:rounded-3xl"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-8 text-center">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -right-4 top-4 h-20 w-20 rounded-full bg-white/5" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-xl p-1.5 text-white/60 hover:bg-white/20 hover:text-white transition"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          <div className="relative">
            <p className="mb-2 text-4xl">📚</p>
            <h1 className="text-2xl font-black text-white">EaseBuddy</h1>
            <p className="mt-1 text-sm text-indigo-200">CBSE Class 6–10 Study Hub</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-indigo-100">
              Everything a CBSE student needs — in one place. No more switching between
              10 different tabs just to study one chapter.
            </p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Stats bar */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100 dark:divide-gray-800 dark:border-gray-800">
            {[
              { value: "37+",  label: "Chapters" },
              { value: "1,665+", label: "MCQ Questions" },
              { value: "12",   label: "Features" },
            ].map((s) => (
              <div key={s.label} className="py-4 text-center">
                <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="px-5 py-5">

            {/* Subjects covered */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Subjects covered
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-800"
                >
                  <span className="text-sm">{s.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                  <span className="text-xs text-gray-400">{s.chapters} ch</span>
                </div>
              ))}
            </div>

            {/* Features grid */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              What's inside
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 p-3.5 dark:border-gray-800"
                  style={{
                    backgroundColor: f.color,
                  }}
                >
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white text-base shadow-sm dark:bg-gray-900">
                    {f.icon}
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: f.textColor }}
                    >
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
              How it works
            </p>
            <div className="flex flex-col gap-0">
              {[
                { step: "1", label: "Login",         desc: "Create a free account with your class level" },
                { step: "2", label: "Pick a subject", desc: "Choose from Maths, Science, English, Hindi or SST" },
                { step: "3", label: "Open a chapter", desc: "Find videos, notes, PYQs and quizzes under each tab" },
                { step: "4", label: "Mark as done",   desc: "Each section you complete builds your streak" },
                { step: "5", label: "Track progress", desc: "See your strengths and weak spots on the Performance page" },
              ].map((item, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {item.step}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="my-0.5 w-px flex-1 bg-gray-100 dark:bg-gray-800" style={{ minHeight: "16px" }} />
                    )}
                  </div>
                  <div className="pb-3 pt-0.5">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              Made for CBSE students · Free to use
            </p>
            <button
              onClick={onClose}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition"
            >
              Start studying →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;