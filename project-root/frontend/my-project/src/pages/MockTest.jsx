import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { mockTestService } from "../services/mockTestService";
import { useAuth } from "../context/AuthContext";
import { SUBJECTS } from "../utils/constants";

// ─────────────────────────────────────────────────────────
// STEP 1: CONFIG SCREEN
// ─────────────────────────────────────────────────────────
const ConfigScreen = ({ onStart, classLevel }) => {
  const [subject, setSubject]         = useState("");
  const [questions, setQuestions]     = useState(30);
  const [difficulty, setDifficulty]   = useState("mixed");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const DIFFICULTY_OPTIONS = [
    { value: "mixed",  label: "Mixed",  desc: "Easy + Medium + Hard combined", color: "indigo" },
    { value: "easy",   label: "Easy",   desc: "Concept-based, straightforward", color: "green" },
    { value: "medium", label: "Medium", desc: "Application-level questions",    color: "amber" },
    { value: "hard",   label: "Hard",   desc: "Analysis + 2-mark questions",    color: "red"   },
  ];

  const QUESTION_PRESETS = [
    { n: 15, label: "15 Qs",  time: "~22 mins", tag: "Quick" },
    { n: 25, label: "25 Qs",  time: "~37 mins", tag: "" },
    { n: 30, label: "30 Qs",  time: "~45 mins", tag: "Standard" },
    { n: 40, label: "40 Qs",  time: "~60 mins", tag: "Full length" },
  ];

  const COLOR = {
    indigo: { sel: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", badge: "bg-indigo-100 text-indigo-700" },
    green:  { sel: "border-green-500 bg-green-50 dark:bg-green-950",    text: "text-green-700 dark:text-green-300",   badge: "bg-green-100 text-green-700"  },
    amber:  { sel: "border-amber-500 bg-amber-50 dark:bg-amber-950",    text: "text-amber-700 dark:text-amber-300",   badge: "bg-amber-100 text-amber-700"  },
    red:    { sel: "border-red-500 bg-red-50 dark:bg-red-950",          text: "text-red-700 dark:text-red-300",       badge: "bg-red-100 text-red-700"      },
  };

  const handleGenerate = async () => {
    if (!subject) { setError("Please select a subject first."); return; }
    setError("");
    setLoading(true);
    try {
      const test = await mockTestService.generate({
        subject: SUBJECTS.find((s) => s.id === subject)?.label,
        classLevel,
        totalQuestions: questions,
        difficulty,
      });
      onStart(test);
    } catch (err) {
      setError(err.response?.data?.message || "Could not generate test. Make sure MCQs are seeded in the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mock Test Generator</h1>
        <p className="mt-1 text-sm text-gray-500">
          Randomly pulls questions from your chapter-wise question bank — just like a board paper.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Subject picker */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-left text-sm font-medium transition
                  ${subject === s.id
                    ? `${s.borderClass} ${s.bgClass} ${s.textClass}`
                    : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                  }`}
              >
                <span className="text-xl">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number of questions */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Number of Questions
          </label>
          <div className="grid grid-cols-4 gap-2">
            {QUESTION_PRESETS.map((p) => (
              <button
                key={p.n}
                onClick={() => setQuestions(p.n)}
                className={`relative rounded-xl border-2 py-3 text-center transition
                  ${questions === p.n
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                  }`}
              >
                {p.tag && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                    {p.tag}
                  </span>
                )}
                <p className={`text-base font-bold ${questions === p.n ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-white"}`}>
                  {p.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{p.time}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Difficulty Mix
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DIFFICULTY_OPTIONS.map((d) => {
              const c = COLOR[d.color];
              return (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`rounded-xl border-2 px-4 py-3 text-left transition
                    ${difficulty === d.value ? c.sel : "border-gray-200 hover:border-gray-300 dark:border-gray-700"}`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${difficulty === d.value ? c.text : "text-gray-700 dark:text-gray-200"}`}>
                      {d.label}
                    </p>
                    {difficulty === d.value && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.badge}`}>
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary card */}
        {subject && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950">
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Test Summary</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {[
                { label: "Subject",    value: SUBJECTS.find((s) => s.id === subject)?.label },
                { label: "Questions",  value: questions },
                { label: "Duration",   value: `~${Math.round(questions * 1.5)} mins` },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white p-2 text-center dark:bg-indigo-900">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950">
            {error}
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!subject || loading}
          className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating your paper…
            </span>
          ) : (
            "Generate Mock Test →"
          )}
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// STEP 2: TEST SCREEN
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

const useCountdown = (durationSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const ref = useRef();
  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(ref.current); onExpire(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  return { timeLeft, display: `${mm}:${ss}`, total: durationSeconds };
};

const DIFF_STYLE = {
  easy:   "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  hard:   "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const TestScreen = ({ test, onFinish }) => {
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const bottomRef = useRef();

  const { timeLeft, display, total } = useCountdown(
    test.durationMinutes * 60,
    () => setSubmitted(true)
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [current]);

  const q = test.questions[current];
  const answered   = Object.keys(answers).length;
  const unanswered = test.totalQuestions - answered;
  const timePct    = (timeLeft / total) * 100;
  const isLowTime  = timeLeft < 120;

  const handleSubmit = () => {
    if (unanswered > 0) {
      const ok = window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`);
      if (!ok) return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ResultScreen
        test={test}
        answers={answers}
        onRetake={() => onFinish("retake")}
        onNew={() => onFinish("new")}
        showReview={showReview}
        setShowReview={setShowReview}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Sticky header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div>
          <p className="text-xs text-gray-400">Mock Test</p>
          <p className="font-bold text-gray-900 dark:text-white">{test.subject} — Class {test.classLevel}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-xs text-gray-400">Answered</p>
            <p className="font-bold text-green-600">{answered}/{test.totalQuestions}</p>
          </div>
          <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 ${isLowTime ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
            <span className="text-xs text-gray-400">Time</span>
            <span className={`font-mono text-lg font-bold ${isLowTime ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
              {display}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
        {/* Timer bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isLowTime ? "bg-red-500" : "bg-indigo-500"}`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      </div>

      {/* Question + options */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        {/* Meta row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400">
            Q{current + 1} of {test.totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFF_STYLE[q.difficulty]}`}>
              {q.difficulty}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
              {q.marks} mark{q.marks > 1 ? "s" : ""}
            </span>
            <span className="max-w-[140px] truncate rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {q.chapterTitle}
            </span>
          </div>
        </div>

        <p className="mb-5 text-base font-semibold leading-relaxed text-gray-900 dark:text-white">
          {q.question}
        </p>

        <div className="flex flex-col gap-2">
          {q.options.map((opt, oi) => {
            const selected = answers[current] === oi;
            return (
              <button
                key={oi}
                onClick={() => setAnswers((p) => ({ ...p, [current]: oi }))}
                className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left text-sm transition
                  ${selected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
                  }`}
              >
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold
                  ${selected
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-300 text-gray-500 dark:border-gray-600"
                  }`}>
                  {["A", "B", "C", "D"][oi]}
                </span>
                <span className={selected ? "font-medium text-indigo-800 dark:text-indigo-200" : "text-gray-800 dark:text-gray-200"}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium disabled:opacity-40 dark:border-gray-700"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrent((p) => Math.min(test.totalQuestions - 1, p + 1))}
          disabled={current === test.totalQuestions - 1}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium disabled:opacity-40 dark:border-gray-700"
        >
          Next →
        </button>
      </div>

      {/* Question palette */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Question Palette
        </p>
        <div className="flex flex-wrap gap-2">
          {test.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-8 w-8 rounded-lg text-xs font-semibold transition
                ${i === current
                  ? "bg-indigo-600 text-white"
                  : answers[i] !== undefined
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-green-200" /> Answered ({answered})</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-gray-200 dark:bg-gray-700" /> Unanswered ({unanswered})</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-indigo-500" /> Current</span>
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// STEP 3: RESULT SCREEN
// ─────────────────────────────────────────────────────────
const ResultScreen = ({ test, answers, onRetake, onNew, showReview, setShowReview }) => {
  const score     = test.questions.reduce((s, q, i) => s + (answers[i] === q.correctIndex ? q.marks : 0), 0);
  const correct   = test.questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const wrong     = test.questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctIndex).length;
  const skipped   = test.questions.filter((_, i) => answers[i] === undefined).length;
  const pct       = Math.round((score / test.totalMarks) * 100);

  const grade = pct >= 90 ? { label: "Outstanding", color: "text-green-600" }
    : pct >= 75 ? { label: "Distinction",  color: "text-blue-600"  }
    : pct >= 60 ? { label: "First Class",  color: "text-indigo-600"}
    : pct >= 40 ? { label: "Pass",         color: "text-amber-600" }
    : { label: "Needs Work",  color: "text-red-600"   };

  // Group wrong answers by chapter for weak area analysis
  const weakChapters = {};
  test.questions.forEach((q, i) => {
    if (answers[i] !== q.correctIndex) {
      weakChapters[q.chapterTitle] = (weakChapters[q.chapterTitle] || 0) + 1;
    }
  });
  const weakList = Object.entries(weakChapters)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Score card */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="bg-indigo-600 p-6 text-center">
          <p className="text-sm font-medium text-indigo-200">Mock Test Completed</p>
          <p className="mt-1 text-4xl font-black text-white">{score}/{test.totalMarks}</p>
          <p className={`mt-1 text-lg font-bold ${grade.color.replace("600", "300")}`}>{grade.label}</p>
          <div className="mx-auto mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-indigo-800">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-sm text-indigo-200">{pct}% scored</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
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

      {/* Weak areas */}
      {weakList.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
          <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
            📌 Chapters to Revise
          </p>
          {weakList.map(([chapter, count]) => (
            <div key={chapter} className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-amber-900 dark:text-amber-100">{chapter}</span>
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                {count} wrong
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mb-6 flex gap-3">
        <button onClick={onRetake} className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Retake Same Test
        </button>
        <button onClick={onNew} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300">
          New Test
        </button>
      </div>

      {/* Answer review toggle */}
      <button
        onClick={() => setShowReview((p) => !p)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        <span>View Answer Review ({test.totalQuestions} questions)</span>
        <span>{showReview ? "▲" : "▼"}</span>
      </button>

      {/* Answer review list */}
      {showReview && (
        <div className="flex flex-col gap-3">
          {test.questions.map((q, i) => {
            const userAns  = answers[i];
            const isRight  = userAns === q.correctIndex;
            const skipped  = userAns === undefined;
            return (
              <div key={i} className={`overflow-hidden rounded-xl border-2 ${
                isRight ? "border-green-300 dark:border-green-700"
                : skipped ? "border-gray-200 dark:border-gray-700"
                : "border-red-300 dark:border-red-800"
              }`}>
                <div className={`flex items-start gap-3 p-4 ${
                  isRight ? "bg-green-50 dark:bg-green-950"
                  : skipped ? "bg-gray-50 dark:bg-gray-900"
                  : "bg-red-50 dark:bg-red-950"
                }`}>
                  <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    isRight ? "bg-green-500" : skipped ? "bg-gray-400" : "bg-red-500"
                  }`}>
                    {isRight ? "✓" : skipped ? "—" : "✗"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Q{i + 1}. {q.question}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      {!skipped && (
                        <span className={isRight ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-400"}>
                          Your answer: {q.options[userAns]}
                        </span>
                      )}
                      {!isRight && (
                        <span className="text-green-700 dark:text-green-300">
                          Correct: {q.options[q.correctIndex]}
                        </span>
                      )}
                    </div>
                    {q.explanation && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${DIFF_STYLE[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-gray-400">{q.chapterTitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// ROOT PAGE — orchestrates all 3 screens
// ─────────────────────────────────────────────────────────
const MockTest = () => {
  const { user } = useAuth();
  const [screen, setScreen] = useState("config"); // "config" | "test" | "result"
  const [testData, setTestData] = useState(null);

  const handleStart = (test) => {
    setTestData(test);
    setScreen("test");
  };

  const handleFinish = (action) => {
    if (action === "retake") {
      setScreen("test"); // restart with same testData
    } else {
      setTestData(null);
      setScreen("config");
    }
  };

  return (
    <Layout>
      <div className="pb-20">
        {screen === "config" && (
          <ConfigScreen onStart={handleStart} classLevel={user?.classLevel || 10} />
        )}
        {screen === "test" && testData && (
          <TestScreen test={testData} onFinish={handleFinish} />
        )}
      </div>
    </Layout>
  );
};

export default MockTest;