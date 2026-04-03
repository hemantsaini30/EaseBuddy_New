import { useState, useEffect, useRef } from "react";

const TEST_CONFIG = {
  easy:   { label: "Easy Test",   duration: 30 * 60, questions: 15, color: "green",  icon: "◎" },
  medium: { label: "Medium Test", duration: 45 * 60, questions: 15, color: "amber",  icon: "◈" },
  hard:   { label: "Hard Test",   duration: 60 * 60, questions: 15, color: "red",    icon: "◆" },
};

const COLOR = {
  green: {
    card:   "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
    badge:  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    btn:    "bg-green-600 hover:bg-green-700 text-white",
    text:   "text-green-700 dark:text-green-300",
    ring:   "border-green-500",
    bar:    "bg-green-500",
  },
  amber: {
    card:   "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950",
    badge:  "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    btn:    "bg-amber-500 hover:bg-amber-600 text-white",
    text:   "text-amber-700 dark:text-amber-300",
    ring:   "border-amber-500",
    bar:    "bg-amber-500",
  },
  red: {
    card:   "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
    badge:  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    btn:    "bg-red-600 hover:bg-red-700 text-white",
    text:   "text-red-700 dark:text-red-300",
    ring:   "border-red-500",
    bar:    "bg-red-500",
  },
};

// ── Timer hook ────────────────────────────────────────────
const useTimer = (initialSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const ref = useRef(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(ref.current); onExpire(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return { timeLeft, display: fmt(timeLeft) };
};

// ── Result screen ─────────────────────────────────────────
const ResultScreen = ({ score, total, level, onRetake, onBack }) => {
  const cfg = TEST_CONFIG[level];
  const c = COLOR[cfg.color];
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good effort!" : "Keep practicing!";

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className={`flex h-28 w-28 items-center justify-center rounded-full border-4 ${c.ring}`}>
        <div className="text-center">
          <p className="text-3xl font-black text-gray-900 dark:text-white">{score}/{total}</p>
          <p className={`text-sm font-semibold ${c.text}`}>{pct}%</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800 dark:text-white">{grade}</p>
        <p className="text-sm text-gray-500">{cfg.label} completed</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onRetake} className={`rounded-xl px-5 py-2 text-sm font-semibold ${c.btn}`}>
          Retake Test
        </button>
        <button onClick={onBack} className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300">
          Back to Tests
        </button>
      </div>
    </div>
  );
};

// ── Active quiz screen ────────────────────────────────────
const QuizScreen = ({ questions, level, onFinish }) => {
  const cfg = TEST_CONFIG[level];
  const c   = COLOR[cfg.color];
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});
  const [submitted, setSubmit]  = useState(false);

  const handleExpire = () => setSubmit(true);
  const { display, timeLeft } = useTimer(cfg.duration, handleExpire);

  const q = questions[current];
  const timePct = (timeLeft / cfg.duration) * 100;
  const score = questions.reduce((a, q, i) => a + (answers[i] === q.mcqCorrectIndex ? 1 : 0), 0);

  if (submitted) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        level={level}
        onRetake={() => { setAnswers({}); setSubmit(false); setCurrent(0); }}
        onBack={() => onFinish()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>
            {cfg.label}
          </span>
          <span className="text-sm text-gray-500">{current + 1} / {questions.length}</span>
        </div>
        {/* Timer */}
        <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 ${timeLeft < 60 ? "border-red-400" : c.ring}`}>
          <span className="text-xs text-gray-500">Time</span>
          <span className={`font-mono text-base font-bold ${timeLeft < 60 ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
            {display}
          </span>
        </div>
      </div>

      {/* Timer progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className={`h-full rounded-full transition-all duration-1000 ${timeLeft < 60 ? "bg-red-500" : c.bar}`}
          style={{ width: `${timePct}%` }} />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
        <p className="mb-5 text-base font-semibold text-gray-900 dark:text-white">{q.mcqQuestion}</p>
        <div className="flex flex-col gap-2">
          {q.mcqOptions.map((opt, oi) => {
            const selected  = answers[current] === oi;
            const isCorrect = oi === q.mcqCorrectIndex;
            let style = "border-gray-200 dark:border-gray-700 hover:border-gray-400";
            if (submitted) {
              style = isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-950"
                : selected
                ? "border-red-400 bg-red-50 dark:bg-red-950"
                : "border-gray-200 dark:border-gray-700 opacity-50";
            } else if (selected) {
              style = `${c.ring} bg-gray-50 dark:bg-gray-800`;
            }
            return (
              <button key={oi} onClick={() => !submitted && setAnswers((p) => ({ ...p, [current]: oi }))}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${style}`}>
                <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold
                  ${selected ? `${c.ring} ${c.text}` : "border-gray-300 text-gray-400 dark:border-gray-600"}`}>
                  {["A","B","C","D"][oi]}
                </span>
                <span className="text-gray-800 dark:text-white">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => setCurrent((p) => Math.max(0, p - 1))} disabled={current === 0}
          className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40 dark:border-gray-700">
          ← Prev
        </button>

        {/* Question dots */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current ? c.bar :
                answers[i] !== undefined ? "bg-gray-400" : "bg-gray-200 dark:bg-gray-700"
              }`} />
          ))}
        </div>

        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent((p) => p + 1)}
            className="rounded-xl border px-4 py-2 text-sm dark:border-gray-700">
            Next →
          </button>
        ) : (
          <button onClick={() => setSubmit(true)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${c.btn}`}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

// ── Test selection cards (landing screen) ─────────────────
const QuestionBank = ({ questions = [] }) => {
  const [activeTest, setActiveTest] = useState(null);

  if (!questions.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">🧪</p>
        <p className="mt-2 text-sm text-gray-400">Question bank not available yet.</p>
      </div>
    );
  }

  // Group questions by testLevel
  const grouped = { easy: [], medium: [], hard: [] };
  questions.forEach((q) => { if (grouped[q.testLevel]) grouped[q.testLevel].push(q); });

  if (activeTest) {
    return (
      <QuizScreen
        questions={grouped[activeTest].slice(0, TEST_CONFIG[activeTest].questions)}
        level={activeTest}
        onFinish={() => setActiveTest(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose a test to begin. Timer starts immediately after you click.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(TEST_CONFIG).map(([level, cfg]) => {
          const c = COLOR[cfg.color];
          const count = grouped[level].length;
          const mins = cfg.duration / 60;
          const available = count >= 1;

          return (
            <button key={level} onClick={() => available && setActiveTest(level)} disabled={!available}
              className={`group relative flex flex-col gap-4 rounded-2xl border-2 p-5 text-left transition
                ${available ? `${c.card} hover:-translate-y-1 hover:shadow-md cursor-pointer` : "border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 opacity-50 cursor-not-allowed"}`}>

              {/* Icon + badge */}
              <div className="flex items-start justify-between">
                <span className={`text-3xl ${c.text}`}>{cfg.icon}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${c.badge}`}>
                  {level}
                </span>
              </div>

              {/* Label */}
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{cfg.label}</p>
                <p className={`mt-0.5 text-sm font-medium ${c.text}`}>{mins} minutes</p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 border-t border-gray-200 pt-3 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Questions</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {Math.min(count, cfg.questions)} / {cfg.questions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Per question</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {Math.round((mins * 60) / cfg.questions)}s
                  </p>
                </div>
              </div>

              {!available && (
                <p className="text-xs text-gray-400">No questions added yet</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBank;