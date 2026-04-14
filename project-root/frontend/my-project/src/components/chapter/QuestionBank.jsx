import { useState, useEffect, useRef } from "react";
import { useMistakes } from "../../context/MistakeContext";
import { useProgress } from "../../hooks/useProgress";
import AIExplainButton from "../common/AIExplainButton";

const TEST_CONFIG = {
  easy:   { label: "Easy Test",   duration: 30 * 60, questions: 15, color: "green",  icon: "◎" },
  medium: { label: "Medium Test", duration: 45 * 60, questions: 15, color: "amber",  icon: "◈" },
  hard:   { label: "Hard Test",   duration: 60 * 60, questions: 15, color: "red",    icon: "◆" },
};

const COLOR = {
  green: {
    card:  "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    btn:   "bg-green-600 hover:bg-green-700 text-white",
    text:  "text-green-700 dark:text-green-300",
    ring:  "border-green-500",
    bar:   "bg-green-500",
    hex:   "#22C55E",
  },
  amber: {
    card:  "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    btn:   "bg-amber-500 hover:bg-amber-600 text-white",
    text:  "text-amber-700 dark:text-amber-300",
    ring:  "border-amber-500",
    bar:   "bg-amber-500",
    hex:   "#F59E0B",
  },
  red: {
    card:  "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    btn:   "bg-red-600 hover:bg-red-700 text-white",
    text:  "text-red-700 dark:text-red-300",
    ring:  "border-red-500",
    bar:   "bg-red-500",
    hex:   "#EF4444",
  },
};

// ── Timer hook ────────────────────────────────────────────
const useTimer = (initialSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const ref        = useRef(null);
  const expiredRef = useRef(false); // prevent double-fire

  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(ref.current);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return { timeLeft, display: fmt(timeLeft) };
};

// ── Result screen with full review ───────────────────────
const ResultScreen = ({ score, total, level, questions, answers, onRetake, onBack, subject }) => {
  const cfg = TEST_CONFIG[level];
  const c   = COLOR[cfg.color];
  const pct = Math.round((score / total) * 100);
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all"); // all | wrong | correct

  const grade =
    pct >= 80 ? { label: "Excellent! 🎉",   color: "text-green-600" }
    : pct >= 60 ? { label: "Good effort! 👍", color: "text-blue-600"  }
    : pct >= 40 ? { label: "Keep going! 💪",  color: "text-amber-600" }
    :             { label: "Need more practice", color: "text-red-500" };

  const correct  = questions.filter((q, i) => answers[i] === q.mcqCorrectIndex).length;
  const wrong    = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.mcqCorrectIndex).length;
  const skipped  = questions.filter((_, i) => answers[i] === undefined).length;

  const reviewList = questions.filter((q, i) => {
    if (reviewFilter === "correct") return answers[i] === q.mcqCorrectIndex;
    if (reviewFilter === "wrong")   return answers[i] !== q.mcqCorrectIndex;
    return true;
  });

  return (
    <div className="flex flex-col gap-5">

      {/* ── Score card ── */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
        {/* Top coloured band */}
        <div className="p-6 text-center" style={{ backgroundColor: c.hex + "20", borderBottom: `3px solid ${c.hex}` }}>
          <div className={`inline-flex h-24 w-24 items-center justify-center rounded-full border-4 ${c.ring} bg-white dark:bg-gray-900`}>
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{score}/{total}</p>
              <p className="text-sm font-bold" style={{ color: c.hex }}>{pct}%</p>
            </div>
          </div>
          <p className={`mt-3 text-lg font-bold ${grade.color}`}>{grade.label}</p>
          <p className="text-sm text-gray-500">{cfg.label} completed</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
          {[
            { label: "Correct",  value: correct, color: "text-green-600" },
            { label: "Wrong",    value: wrong,   color: "text-red-500"   },
            { label: "Skipped",  value: skipped, color: "text-gray-400"  },
          ].map((s) => (
            <div key={s.label} className="py-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-3">
        <button
          onClick={onRetake}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold ${c.btn}`}
        >
          🔄 Retake Test
        </button>
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
        >
          ← Back to Tests
        </button>
      </div>

      {/* ── Answer review toggle ── */}
      <button
        onClick={() => setShowReview((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        <span>📋 Review All Answers ({total} questions)</span>
        <span>{showReview ? "▲" : "▼"}</span>
      </button>

      {/* ── Full answer review ── */}
      {showReview && (
        <div className="flex flex-col gap-3">
          {/* Filter chips */}
          <div className="flex gap-2">
            {[
              { id: "all",     label: `All (${total})`       },
              { id: "correct", label: `✓ Correct (${correct})` },
              { id: "wrong",   label: `✗ Wrong (${wrong})`    },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setReviewFilter(f.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition
                  ${reviewFilter === f.id
                    ? f.id === "correct" ? "bg-green-600 text-white"
                    : f.id === "wrong"   ? "bg-red-500 text-white"
                    :                     "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Question cards */}
          {reviewList.map((q, idx) => {
            // find original index in questions array
            const origIdx   = questions.indexOf(q);
            const userAns   = answers[origIdx];
            const isCorrect = userAns === q.mcqCorrectIndex;
            const isSkipped = userAns === undefined;

            return (
              <div
                key={q._id || idx}
                className={`overflow-hidden rounded-2xl border-2
                  ${isCorrect
                    ? "border-green-300 dark:border-green-700"
                    : isSkipped
                    ? "border-gray-200 dark:border-gray-700"
                    : "border-red-300 dark:border-red-800"
                  }`}
              >
                {/* Question header */}
                <div className={`flex items-start gap-3 p-4
                  ${isCorrect
                    ? "bg-green-50 dark:bg-green-950"
                    : isSkipped
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-red-50 dark:bg-red-950"
                  }`}
                >
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center
                    rounded-full text-xs font-bold text-white
                    ${isCorrect ? "bg-green-500" : isSkipped ? "bg-gray-400" : "bg-red-500"}`}>
                    {isCorrect ? "✓" : isSkipped ? "—" : "✗"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      Q{origIdx + 1}. {q.mcqQuestion}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-1.5 bg-white p-4 dark:bg-gray-900">
                  {q.mcqOptions.map((opt, oi) => {
                    const isOpt      = oi === q.mcqCorrectIndex;
                    const wasChosen  = oi === userAns;
                    let optStyle     = "border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800";
                    let label        = null;

                    if (isOpt) {
                      optStyle = "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950";
                      label    = <span className="ml-auto text-xs font-bold text-green-600 dark:text-green-400">Correct</span>;
                    }
                    if (wasChosen && !isOpt) {
                      optStyle = "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950";
                      label    = <span className="ml-auto text-xs font-bold text-red-500">Your answer</span>;
                    }

                    return (
                      <div key={oi}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${optStyle}`}>
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center
                          rounded-full bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {["A","B","C","D"][oi]}
                        </span>
                        <span className="flex-1 text-gray-700 dark:text-gray-200">{opt}</span>
                        {label}
                      </div>
                    );
                  })}

                  {/* Explanation + AI button row */}
                  {q.mcqExplanation && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Explanation
                        </p>
                        {/* ADD AI Explain button */}
                        <AIExplainButton
                          question={q.mcqQuestion}
                          explanation={q.mcqExplanation}
                          subject={subject}
                          size="sm"
                        />
                      </div>
                      <div className="rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        💡 {q.mcqExplanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Active quiz screen ────────────────────────────────────
const QuizScreen = ({ questions, level, onFinish, chapterId, subject, classLevel }) => {
  const cfg = TEST_CONFIG[level];
  const c   = COLOR[cfg.color];

  const [current,   setCurrent]   = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState({}); // snapshot at submit time

  const { saveQuizMistakes } = useMistakes();
  const { markSection }      = useProgress();

  const handleSubmit = async () => {
    if (submitted) return; // prevent double submit

    // Snapshot answers at submit time
    const snapshot = { ...answers };
    setFinalAnswers(snapshot);
    setSubmitted(true);

    // Calculate score from snapshot
    const score = questions.reduce(
      (acc, q, i) => acc + (snapshot[i] === q.mcqCorrectIndex ? 1 : 0),
      0
    );

    // ── 1. Save MCQ score to Progress (feeds Performance Dashboard) ──
    try {
      await markSection(chapterId, subject, classLevel, "mcq", score);
    } catch (err) {
      console.error("Failed to save MCQ progress:", err);
    }

    // ── 2. Save wrong/skipped to Mistake Book ──────────────
    const toSave = questions
      .map((q, i) => {
        const userAns   = snapshot[i];
        const isCorrect = userAns === q.mcqCorrectIndex;
        const skipped   = userAns === undefined;
        if (isCorrect) return null;

        return {
          resourceId:      q._id,
          chapterId:       chapterId || q.chapterId,
          chapterTitle:    q.chapterTitle || "Unknown Chapter",
          subject:         subject       || q.subject || "Unknown",
          classLevel:      classLevel    || q.classLevel || 10,
          question:        q.mcqQuestion,
          options:         q.mcqOptions,
          correctIndex:    q.mcqCorrectIndex,
          explanation:     q.mcqExplanation || "",
          difficulty:      q.testLevel      || "medium",
          userAnswerIndex: skipped ? -1 : userAns,
          addedReason:     skipped ? "skipped" : "wrong",
        };
      })
      .filter(Boolean);

    if (toSave.length) {
      await saveQuizMistakes(toSave);
    }
  };

  const handleExpire = () => handleSubmit();
  const { display, timeLeft } = useTimer(cfg.duration, handleExpire);

  const q       = questions[current];
  const timePct = (timeLeft / cfg.duration) * 100;
  const score   = questions.reduce(
    (a, q, i) => a + (answers[i] === q.mcqCorrectIndex ? 1 : 0), 0
  );

  // ── Show result screen after submit ──────────────────
  if (submitted) {
    return (
      <ResultScreen
        score={questions.reduce(
          (a, q, i) => a + (finalAnswers[i] === q.mcqCorrectIndex ? 1 : 0), 0
        )}
        total={questions.length}
        level={level}
        questions={questions}
        answers={finalAnswers}
        subject={subject}
        onRetake={() => {
          setAnswers({});
          setFinalAnswers({});
          setSubmitted(false);
          setCurrent(0);
        }}
        onBack={() => onFinish()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>
            {cfg.label}
          </span>
          <span className="text-sm text-gray-500">
            {current + 1} / {questions.length}
          </span>
        </div>
        <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5
          ${timeLeft < 60 ? "border-red-400" : c.ring}`}>
          <span className="text-xs text-gray-500">Time</span>
          <span className={`font-mono text-base font-bold
            ${timeLeft < 60 ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
            {display}
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full transition-all duration-1000
            ${timeLeft < 60 ? "bg-red-500" : c.bar}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
        <p className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
          {q.mcqQuestion}
        </p>
        <div className="flex flex-col gap-2">
          {q.mcqOptions.map((opt, oi) => {
            const selected = answers[current] === oi;
            let style = "border-gray-200 dark:border-gray-700 hover:border-gray-400";
            if (selected) style = `${c.ring} bg-gray-50 dark:bg-gray-800`;
            return (
              <button
                key={oi}
                onClick={() => setAnswers((p) => ({ ...p, [current]: oi }))}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${style}`}
              >
                <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center
                  rounded-full border text-xs font-bold
                  ${selected
                    ? `${c.ring} ${c.text}`
                    : "border-gray-300 text-gray-400 dark:border-gray-600"}`}>
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
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40 dark:border-gray-700"
        >
          ← Prev
        </button>

        <div className="flex flex-wrap justify-center gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current
                  ? c.bar
                  : answers[i] !== undefined
                  ? "bg-gray-400"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((p) => p + 1)}
            className="rounded-xl border px-4 py-2 text-sm dark:border-gray-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${c.btn}`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

// ── Test selection cards ──────────────────────────────────
const QuestionBank = ({ questions = [], chapterId, subject, classLevel }) => {
  const [activeTest, setActiveTest] = useState(null);

  if (!questions.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">🧪</p>
        <p className="mt-2 text-sm text-gray-400">
          Question bank not available yet.
        </p>
      </div>
    );
  }

  const grouped = { easy: [], medium: [], hard: [] };
  questions.forEach((q) => {
    if (grouped[q.testLevel]) grouped[q.testLevel].push(q);
  });

  if (activeTest) {
    return (
      <QuizScreen
        questions={grouped[activeTest].slice(0, TEST_CONFIG[activeTest].questions)}
        level={activeTest}
        onFinish={() => setActiveTest(null)}
        chapterId={chapterId}
        subject={subject}
        classLevel={classLevel}
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
          const c         = COLOR[cfg.color];
          const count     = grouped[level].length;
          const mins      = cfg.duration / 60;
          const available = count >= 1;

          return (
            <button
              key={level}
              onClick={() => available && setActiveTest(level)}
              disabled={!available}
              className={`group relative flex flex-col gap-4 rounded-2xl border-2 p-5 text-left transition
                ${available
                  ? `${c.card} hover:-translate-y-1 hover:shadow-md cursor-pointer`
                  : "border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 opacity-50 cursor-not-allowed"
                }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-3xl ${c.text}`}>{cfg.icon}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${c.badge}`}>
                  {level}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{cfg.label}</p>
                <p className={`mt-0.5 text-sm font-medium ${c.text}`}>{mins} minutes</p>
              </div>
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