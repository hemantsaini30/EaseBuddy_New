import { useState, useEffect, useRef } from "react";
import { useAuth }         from "../context/AuthContext";
import { useProgress }     from "../hooks/useProgress";
import { useMistakes }     from "../context/MistakeContext";
import api                 from "../services/api";
import Layout              from "../components/common/Layout";
import BackButton          from "../components/common/BackButton";

// ── Constants ─────────────────────────────────────────────
const DIFFICULTIES = [
  { value: "mixed",  label: "Mixed",  icon: "🎲", desc: "All levels"   },
  { value: "easy",   label: "Easy",   icon: "🟢", desc: "Warm up"      },
  { value: "medium", label: "Medium", icon: "🟡", desc: "Board level"  },
  { value: "hard",   label: "Hard",   icon: "🔴", desc: "Challenge"    },
];

const QUESTION_COUNTS = [10, 15, 20, 30];

const SUBJECT_COLORS = {
  Mathematics:    { bg: "bg-blue-50   dark:bg-blue-950",   border: "border-blue-200  dark:border-blue-800",   text: "text-blue-700   dark:text-blue-300",   dot: "bg-blue-500",   icon: "📐" },
  Science:        { bg: "bg-green-50  dark:bg-green-950",  border: "border-green-200 dark:border-green-800",  text: "text-green-700  dark:text-green-300",  dot: "bg-green-500",  icon: "⚗️"  },
  English:        { bg: "bg-amber-50  dark:bg-amber-950",  border: "border-amber-200 dark:border-amber-800",  text: "text-amber-700  dark:text-amber-300",  dot: "bg-amber-500",  icon: "📖" },
  Hindi:          { bg: "bg-orange-50 dark:bg-orange-950", border: "border-orange-200 dark:border-orange-800", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500", icon: "🖊️"  },
  "Social Science":{ bg: "bg-purple-50 dark:bg-purple-950",border: "border-purple-200 dark:border-purple-800",text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500", icon: "🌏" },
};

const DEFAULT_COLOR = {
  bg: "bg-gray-50 dark:bg-gray-800", border: "border-gray-200 dark:border-gray-700",
  text: "text-gray-700 dark:text-gray-300", dot: "bg-gray-400", icon: "📚",
};

const getColor = (subject) => SUBJECT_COLORS[subject] || DEFAULT_COLOR;

// ── Timer hook ────────────────────────────────────────────
const useTimer = (seconds, onExpire) => {
  const [left, setLeft] = useState(seconds);
  const ref = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    ref.current = setInterval(() => {
      setLeft((t) => {
        if (t <= 1) {
          clearInterval(ref.current);
          if (!firedRef.current) { firedRef.current = true; onExpire(); }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return { left, display: fmt(left) };
};

// ── Result Screen ─────────────────────────────────────────
const ResultScreen = ({ score, total, questions, answers, onRetake, onBack }) => {
  const pct     = Math.round((score / total) * 100);
  const correct = questions.filter((q, i) => answers[i] === q.mcqCorrectIndex).length;
  const wrong   = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.mcqCorrectIndex).length;
  const skipped = questions.filter((_, i) => answers[i] === undefined).length;
  const [filter, setFilter] = useState("all");
  const [showReview, setShowReview] = useState(false);

  const grade =
    pct >= 80 ? { label: "Excellent! 🎉", color: "text-green-600 dark:text-green-400" }
    : pct >= 60 ? { label: "Good effort! 👍", color: "text-blue-600 dark:text-blue-400" }
    : pct >= 40 ? { label: "Keep going! 💪", color: "text-amber-600 dark:text-amber-400" }
    :             { label: "Need more practice", color: "text-red-500" };

  const list = questions.filter((q, i) => {
    if (filter === "correct") return answers[i] === q.mcqCorrectIndex;
    if (filter === "wrong")   return answers[i] !== q.mcqCorrectIndex;
    return true;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Score card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="border-b-4 border-indigo-500 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 text-center dark:from-indigo-950 dark:to-violet-950">
          <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-indigo-400 bg-white dark:bg-gray-900">
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{score}/{total}</p>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{pct}%</p>
            </div>
          </div>
          <p className={`text-lg font-bold ${grade.color}`}>{grade.label}</p>
          <p className="text-sm text-gray-400">Mock Test completed</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
          {[
            { label: "Correct", value: correct, color: "text-green-600" },
            { label: "Wrong",   value: wrong,   color: "text-red-500"   },
            { label: "Skipped", value: skipped, color: "text-gray-400"  },
          ].map((s) => (
            <div key={s.label} className="py-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onRetake} className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">
          🔄 New Test
        </button>
        <button onClick={onBack} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition">
          ← Configure
        </button>
      </div>

      {/* Review toggle */}
      <button
        onClick={() => setShowReview((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        <span>📋 Review All Answers ({total} questions)</span>
        <span>{showReview ? "▲" : "▼"}</span>
      </button>

      {showReview && (
        <div className="flex flex-col gap-3">
          {/* Filter chips */}
          <div className="flex gap-2">
            {[
              { id: "all",     label: `All (${total})`         },
              { id: "correct", label: `✓ Correct (${correct})` },
              { id: "wrong",   label: `✗ Wrong (${wrong})`     },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition
                  ${filter === f.id
                    ? f.id === "correct" ? "bg-green-600 text-white"
                    : f.id === "wrong"   ? "bg-red-500 text-white"
                    :                     "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Question cards */}
          {list.map((q, idx) => {
            const origIdx   = questions.indexOf(q);
            const userAns   = answers[origIdx];
            const isCorrect = userAns === q.mcqCorrectIndex;
            const isSkipped = userAns === undefined;
            const col       = getColor(q.subject);

            return (
              <div key={q._id || idx}
                className={`overflow-hidden rounded-2xl border-2
                  ${isCorrect ? "border-green-300 dark:border-green-700"
                  : isSkipped ? "border-gray-200 dark:border-gray-700"
                  : "border-red-300 dark:border-red-800"}`}>

                {/* Question header */}
                <div className={`flex items-start gap-3 p-4
                  ${isCorrect ? "bg-green-50 dark:bg-green-950"
                  : isSkipped ? "bg-gray-50 dark:bg-gray-900"
                  : "bg-red-50 dark:bg-red-950"}`}>
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white
                    ${isCorrect ? "bg-green-500" : isSkipped ? "bg-gray-400" : "bg-red-500"}`}>
                    {isCorrect ? "✓" : isSkipped ? "—" : "✗"}
                  </span>
                  <div className="flex-1">
                    {/* Chapter label */}
                    {q.chapterTitle && (
                      <p className={`mb-1 text-[10px] font-semibold uppercase tracking-wider ${col.text}`}>
                        {col.icon} {q.chapterTitle}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      Q{origIdx + 1}. {q.mcqQuestion}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-1.5 bg-white p-4 dark:bg-gray-900">
                  {q.mcqOptions.map((opt, oi) => {
                    const isOpt    = oi === q.mcqCorrectIndex;
                    const wasChosen = oi === userAns;
                    let optStyle = "border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800";
                    let tag = null;
                    if (isOpt)                { optStyle = "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950"; tag = <span className="ml-auto text-xs font-bold text-green-600">Correct</span>; }
                    if (wasChosen && !isOpt)  { optStyle = "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950"; tag = <span className="ml-auto text-xs font-bold text-red-500">Your answer</span>; }
                    return (
                      <div key={oi} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${optStyle}`}>
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {["A","B","C","D"][oi]}
                        </span>
                        <span className="flex-1 text-gray-700 dark:text-gray-200">{opt}</span>
                        {tag}
                      </div>
                    );
                  })}
                  {q.mcqExplanation && (
                    <div className="mt-2 rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                      💡 {q.mcqExplanation}
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

// ── Quiz Screen ───────────────────────────────────────────
const QuizScreen = ({ questions, timeLimit, onFinish }) => {
  const [current,      setCurrent]      = useState(0);
  const [answers,      setAnswers]      = useState({});
  const [submitted,    setSubmitted]    = useState(false);
  const [finalAnswers, setFinalAnswers] = useState({});
  const { saveQuizMistakes } = useMistakes();

  const handleSubmit = async () => {
    if (submitted) return;
    const snapshot = { ...answers };
    setFinalAnswers(snapshot);
    setSubmitted(true);

    // Save wrong/skipped to Mistake Book
    const toSave = questions
      .map((q, i) => {
        const userAns   = snapshot[i];
        const isCorrect = userAns === q.mcqCorrectIndex;
        const skipped   = userAns === undefined;
        if (isCorrect) return null;
        return {
          resourceId:      q._id,
          chapterId:       q.chapterId,
          chapterTitle:    q.chapterTitle || "Unknown",
          subject:         q.subject      || "Unknown",
          classLevel:      q.classLevel   || 10,
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

    if (toSave.length) await saveQuizMistakes(toSave);
  };

  const { left, display } = useTimer(timeLimit, handleSubmit);
  const timePct = (left / timeLimit) * 100;
  const q       = questions[current];

  const score = questions.reduce(
    (a, q, i) => a + (finalAnswers[i] === q.mcqCorrectIndex ? 1 : 0), 0
  );

  if (submitted) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        questions={questions}
        answers={finalAnswers}
        onRetake={onFinish}
        onBack={onFinish}
      />
    );
  }

  const answeredCount = Object.keys(answers).length;
  const col = getColor(q.subject);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${col.bg} ${col.text} ${col.border} border`}>
            {col.icon} {q.subject}
          </span>
          <span className="text-sm text-gray-400">{current + 1} / {questions.length}</span>
        </div>
        <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 ${left < 60 ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
          <span className="text-xs text-gray-400">Time</span>
          <span className={`font-mono text-base font-bold ${left < 60 ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
            {display}
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${left < 60 ? "bg-red-500" : "bg-indigo-500"}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Chapter label */}
      {q.chapterTitle && (
        <p className={`-mb-2 text-xs font-semibold ${col.text}`}>
          From: {q.chapterTitle}
        </p>
      )}

      {/* Question */}
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
        <p className="mb-5 text-sm font-semibold leading-relaxed text-gray-900 dark:text-white whitespace-pre-line">
          {q.mcqQuestion}
        </p>
        <div className="flex flex-col gap-2">
          {q.mcqOptions.map((opt, oi) => {
            const selected = answers[current] === oi;
            return (
              <button
                key={oi}
                onClick={() => setAnswers((p) => ({ ...p, [current]: oi }))}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition
                  ${selected
                    ? `${col.border} bg-gray-50 dark:bg-gray-800`
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}
              >
                <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold
                  ${selected ? `${col.border} ${col.text}` : "border-gray-300 text-gray-400 dark:border-gray-600"}`}>
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

        {/* Dot navigator */}
        <div className="flex flex-wrap justify-center gap-1.5 flex-1">
          {questions.map((_, i) => {
            const subCol = getColor(questions[i].subject);
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === current
                    ? subCol.dot
                    : answers[i] !== undefined
                    ? "bg-gray-400"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                title={`Q${i+1} — ${questions[i].chapterTitle || questions[i].subject}`}
              />
            );
          })}
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
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        )}
      </div>

      {/* Progress summary */}
      <p className="text-center text-xs text-gray-400">
        {answeredCount} of {questions.length} answered
        {Object.keys(answers).length > 0 && (
          <button onClick={handleSubmit} className="ml-3 text-indigo-500 hover:underline">
            Submit now
          </button>
        )}
      </p>
    </div>
  );
};

// ── Chapter Selector Modal ────────────────────────────────
const ChapterSelectorModal = ({ chapters, selectedChapterIds, onToggle, onClose }) => {
  const [search, setSearch] = useState("");

  // Group by subject
  const grouped = chapters.reduce((acc, ch) => {
    if (!acc[ch.subject]) acc[ch.subject] = [];
    acc[ch.subject].push(ch);
    return acc;
  }, {});

  const filtered = Object.entries(grouped).reduce((acc, [subject, chs]) => {
    const matching = chs.filter(ch =>
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      subject.toLowerCase().includes(search.toLowerCase())
    );
    if (matching.length) acc[subject] = matching;
    return acc;
  }, {});

  const totalSelected = selectedChapterIds.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:rounded-3xl"
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-white">Select Chapters</p>
            <p className="text-xs text-gray-400">
              {totalSelected === 0
                ? "All chapters will be used"
                : `${totalSelected} chapter${totalSelected > 1 ? "s" : ""} selected`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {totalSelected > 0 && (
              <button
                onClick={() => { selectedChapterIds.forEach(id => onToggle(id)); }}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950 transition"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-xl border border-indigo-200 bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition"
            >
              Done
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-gray-100 px-5 py-3 dark:border-gray-800">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-gray-400">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chapters..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Chapter list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {Object.entries(filtered).length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No chapters found</p>
          ) : (
            Object.entries(filtered).map(([subject, chs]) => {
              const col = getColor(subject);
              const allSelected = chs.every(ch => selectedChapterIds.includes(ch._id));

              const toggleSubject = () => {
                if (allSelected) {
                  chs.forEach(ch => { if (selectedChapterIds.includes(ch._id)) onToggle(ch._id); });
                } else {
                  chs.forEach(ch => { if (!selectedChapterIds.includes(ch._id)) onToggle(ch._id); });
                }
              };

              return (
                <div key={subject} className="mb-5">
                  {/* Subject header row */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${col.bg} ${col.text}`}>
                        {col.icon} {subject}
                      </span>
                      <span className="text-xs text-gray-400">
                        {chs.filter(ch => selectedChapterIds.includes(ch._id)).length}/{chs.length} selected
                      </span>
                    </div>
                    <button
                      onClick={toggleSubject}
                      className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
                    >
                      {allSelected ? "Deselect all" : "Select all"}
                    </button>
                  </div>

                  {/* Chapter chips */}
                  <div className="flex flex-col gap-1.5">
                    {chs.map((ch) => {
                      const isSelected = selectedChapterIds.includes(ch._id);
                      return (
                        <button
                          key={ch._id}
                          onClick={() => onToggle(ch._id)}
                          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition
                            ${isSelected
                              ? `${col.border} ${col.bg}`
                              : "border-gray-100 bg-gray-50 hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700"}`}
                        >
                          {/* Checkbox */}
                          <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition
                            ${isSelected
                              ? `${col.dot} border-transparent`
                              : "border-gray-300 dark:border-gray-600"}`}>
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="white">
                                <path d="M10 3L5 8.5L2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isSelected ? col.text : "text-gray-700 dark:text-gray-300"}`}>
                              Ch {ch.chapterNumber} · {ch.title}
                            </p>
                          </div>
                          {isSelected && (
                            <div className={`h-2 w-2 flex-shrink-0 rounded-full ${col.dot}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// ── Config Screen ─────────────────────────────────────────
const ConfigScreen = ({ onStart, classLevel }) => {
  const [allChapters,       setAllChapters]       = useState([]);
  const [selectedChapterIds, setSelectedChapterIds] = useState([]);
  const [difficulty,        setDifficulty]        = useState("mixed");
  const [questionCount,     setQuestionCount]     = useState(15);
  const [timePerQ,          setTimePerQ]          = useState(2); // minutes per question
  const [loading,           setLoading]           = useState(false);
  const [fetching,          setFetching]          = useState(true);
  const [showSelector,      setShowSelector]      = useState(false);
  const [error,             setError]             = useState("");

  // Load all available chapters that have MCQs
  useEffect(() => {
    const load = async () => {
      setFetching(true);
      try {
        const { data } = await api.get(`/chapters?classLevel=${classLevel}`);
        const chapters  = data.data || [];
        setAllChapters(chapters);
      } catch {
        setError("Could not load chapters. Make sure the backend is running.");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [classLevel]);

  const toggleChapter = (id) => {
    setSelectedChapterIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Selected chapter objects
  const selectedChapters = allChapters.filter(ch => selectedChapterIds.includes(ch._id));

  // Group selected chapters by subject for preview
  const selectedBySubject = selectedChapters.reduce((acc, ch) => {
    if (!acc[ch.subject]) acc[ch.subject] = [];
    acc[ch.subject].push(ch);
    return acc;
  }, {});

  const totalTime = questionCount * timePerQ;

  const handleStart = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        classLevel,
        totalQuestions: questionCount,
        difficulty,
        ...(selectedChapterIds.length > 0 && { chapterIds: selectedChapterIds }),
      };
      const { data } = await api.post("/mock-test/generate", payload);
      const questions = data.data || [];
      if (!questions.length) {
        setError("No questions found. Try selecting different chapters or difficulty.");
        return;
      }
      onStart(questions, totalTime * 60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectionLabel =
    selectedChapterIds.length === 0
      ? `All chapters (${allChapters.length})`
      : `${selectedChapterIds.length} chapter${selectedChapterIds.length > 1 ? "s" : ""} selected`;

  return (
    <>
      <div className="flex flex-col gap-5">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mock Test</h1>
          <p className="text-sm text-gray-400">Customise your test then hit Start</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Chapter Selection ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Chapters</p>
              <p className="text-xs text-gray-400">Pick specific chapters or test across all</p>
            </div>
          </div>

          {/* Selection button */}
          <button
            onClick={() => setShowSelector(true)}
            disabled={fetching}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600 dark:hover:bg-indigo-950"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">📚</span>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {fetching ? "Loading chapters..." : selectionLabel}
                </p>
                {selectedChapterIds.length === 0 && !fetching && (
                  <p className="text-xs text-gray-400">Questions drawn from all chapters</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-500">
              <span className="text-xs font-medium">Change</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </button>

          {/* Selected chapters preview */}
          {selectedChapterIds.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {Object.entries(selectedBySubject).map(([subject, chs]) => {
                const col = getColor(subject);
                return (
                  <div key={subject}>
                    <p className={`mb-1.5 text-[10px] font-semibold uppercase tracking-wider ${col.text}`}>
                      {col.icon} {subject}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {chs.map((ch) => (
                        <span
                          key={ch._id}
                          className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${col.bg} ${col.border} ${col.text}`}
                        >
                          Ch {ch.chapterNumber} · {ch.title.length > 25 ? ch.title.slice(0, 25) + "…" : ch.title}
                          <button
                            onClick={() => toggleChapter(ch._id)}
                            className="ml-1 opacity-60 hover:opacity-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Difficulty ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-3 text-sm font-bold text-gray-800 dark:text-white">Difficulty</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition
                  ${difficulty === d.value
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/50"}`}
              >
                <span className="text-xl">{d.icon}</span>
                <p className={`text-xs font-semibold ${difficulty === d.value ? "text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>
                  {d.label}
                </p>
                <p className="text-[10px] text-gray-400">{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Questions + Time ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Question count */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-3 text-sm font-bold text-gray-800 dark:text-white">Questions</p>
            <div className="flex flex-col gap-1.5">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition
                    ${questionCount === n
                      ? "border-indigo-400 bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "border-gray-100 text-gray-600 hover:border-gray-200 dark:border-gray-800 dark:text-gray-400"}`}
                >
                  {n} Qs
                  {questionCount === n && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time per question */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-3 text-sm font-bold text-gray-800 dark:text-white">Time / Q</p>
            <div className="flex flex-col gap-1.5">
              {[1, 1.5, 2, 3].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimePerQ(t)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition
                    ${timePerQ === t
                      ? "border-indigo-400 bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "border-gray-100 text-gray-600 hover:border-gray-200 dark:border-gray-800 dark:text-gray-400"}`}
                >
                  {t} min
                  {timePerQ === t && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Test Summary ── */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950">
          <p className="mb-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Test Summary
          </p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Questions", value: questionCount        },
              { label: "Total Time", value: `${totalTime} min` },
              { label: "Difficulty", value: DIFFICULTIES.find(d => d.value === difficulty)?.label },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-lg font-black text-indigo-700 dark:text-indigo-300">{s.value}</p>
                <p className="text-xs text-indigo-500 dark:text-indigo-400">{s.label}</p>
              </div>
            ))}
          </div>
          {selectedChapterIds.length > 0 && (
            <p className="mt-2 text-center text-xs text-indigo-500 dark:text-indigo-400">
              From {selectedChapterIds.length} selected chapter{selectedChapterIds.length > 1 ? "s" : ""}
              {Object.keys(selectedBySubject).length > 1 && ` across ${Object.keys(selectedBySubject).length} subjects`}
            </p>
          )}
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full rounded-2xl bg-indigo-600 py-4 text-base font-bold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Generating test...
            </span>
          ) : (
            `Start Test →`
          )}
        </button>
      </div>

      {/* Chapter selector modal */}
      {showSelector && (
        <ChapterSelectorModal
          chapters={allChapters}
          selectedChapterIds={selectedChapterIds}
          onToggle={toggleChapter}
          onClose={() => setShowSelector(false)}
        />
      )}
    </>
  );
};

// ── Main MockTest Page ────────────────────────────────────
const MockTest = () => {
  const { user }   = useAuth();
  const [screen,   setScreen]   = useState("config"); // config | quiz
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(1800);

  const handleStart = (qs, time) => {
    setQuestions(qs);
    setTimeLimit(time);
    setScreen("quiz");
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl pb-20">
        <BackButton className="mb-4" />

        {screen === "config" ? (
          <ConfigScreen
            onStart={handleStart}
            classLevel={user?.classLevel || 10}
          />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setScreen("config")}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ← Back to config
              </button>
              <p className="text-sm text-gray-400">{questions.length} questions</p>
            </div>
            <QuizScreen
              questions={questions}
              timeLimit={timeLimit}
              onFinish={() => setScreen("config")}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default MockTest;