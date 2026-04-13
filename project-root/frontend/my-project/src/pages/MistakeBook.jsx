import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useMistakes } from "../context/MistakeContext";
import { SUBJECTS } from "../utils/constants";
import BackButton from "../components/common/BackButton";

// ── Status config ─────────────────────────────────────────
const STATUS = {
  unseen:      { label: "Not revised",  color: "red",    dot: "bg-red-400"    },
  reattempted: { label: "In progress",  color: "amber",  dot: "bg-amber-400"  },
  mastered:    { label: "Mastered",     color: "green",  dot: "bg-green-400"  },
};

const DIFF_STYLE = {
  easy:   "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  hard:   "bg-red-100   text-red-700   dark:bg-red-900   dark:text-red-300",
};

// ── Reattempt card ────────────────────────────────────────
const ReattemptCard = ({ mistake, onAnswer, onSkip }) => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const handleConfirm = () => {
    onAnswer(selected);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 dark:border-indigo-800 dark:bg-gray-900">
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFF_STYLE[mistake.difficulty]}`}>
          {mistake.difficulty}
        </span>
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {mistake.chapterTitle}
        </span>
        <span className="text-xs text-gray-400">
          Attempt #{mistake.attempts + 1}
        </span>
      </div>

      {/* Question */}
      <p className="mb-4 text-sm font-semibold leading-relaxed text-gray-900 dark:text-white">
        {mistake.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-4">
        {mistake.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect  = i === mistake.correctIndex;
          let style = "border-gray-200 dark:border-gray-700 hover:border-gray-400";
          if (revealed) {
            if (isCorrect)       style = "border-green-500 bg-green-50 dark:bg-green-950";
            else if (isSelected) style = "border-red-400 bg-red-50 dark:bg-red-950";
            else                 style = "border-gray-100 opacity-50 dark:border-gray-800";
          } else if (isSelected) {
            style = "border-indigo-500 bg-indigo-50 dark:bg-indigo-950";
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && setSelected(i)}
              className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${style}`}
            >
              <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold
                ${isSelected && !revealed ? "border-indigo-500 bg-indigo-500 text-white" : "border-gray-300 text-gray-400 dark:border-gray-600"}`}>
                {["A","B","C","D"][i]}
              </span>
              <span className="text-gray-800 dark:text-white">{opt}</span>
              {revealed && isCorrect && (
                <span className="ml-auto text-green-600 font-bold">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after reveal) */}
      {revealed && mistake.explanation && (
        <div className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          💡 {mistake.explanation}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {!revealed ? (
          <>
            <button
              onClick={handleReveal}
              disabled={selected === null}
              className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              Check Answer
            </button>
            <button
              onClick={onSkip}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:border-gray-700"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            onClick={handleConfirm}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white
              ${selected === mistake.correctIndex
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {selected === mistake.correctIndex ? "✓ Correct — Mark Mastered" : "✗ Wrong — Keep Practising"}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Mistake list card ─────────────────────────────────────
const MistakeCard = ({ mistake, onReattempt, onRemove }) => {
  const [expanded, setExpanded] = useState(false);
  const st = STATUS[mistake.status];
  const userAnswered = mistake.userAnswerIndex !== -1;
  const isMastered   = mistake.status === "mastered";

  return (
    <div className={`overflow-hidden rounded-2xl border-2 transition
      ${isMastered
        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
        : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      }`}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`h-2 w-2 flex-shrink-0 rounded-full ${st.dot}`} />
            <span className="text-xs text-gray-400">{st.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFF_STYLE[mistake.difficulty]}`}>
              {mistake.difficulty}
            </span>
            {mistake.addedReason === "skipped" && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
                Skipped
              </span>
            )}
            {mistake.attempts > 1 && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-950">
                {mistake.attempts} attempts
              </span>
            )}
          </div>
          <button
            onClick={onRemove}
            className="flex-shrink-0 rounded-lg p-1 text-gray-300 hover:bg-red-50 hover:text-red-400 dark:text-gray-700"
            title="Remove from mistake book"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Question */}
        <p className="mb-3 text-sm font-semibold leading-relaxed text-gray-800 dark:text-white">
          {mistake.question}
        </p>

        {/* Your answer vs correct */}
        <div className="flex flex-col gap-1.5 mb-3">
          {userAnswered && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 dark:bg-red-950">
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">Your answer:</span>
              <span className="text-xs text-red-700 dark:text-red-300">
                {mistake.options?.[mistake.userAnswerIndex] ?? "—"}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-950">
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Correct answer:</span>
            <span className="text-xs text-green-700 dark:text-green-300">
              {mistake.options?.[mistake.correctIndex] ?? "—"}
            </span>
          </div>
        </div>

        {/* Explanation toggle */}
        {mistake.explanation && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="mb-3 flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700"
          >
            <span>💡</span>
            <span>{expanded ? "Hide" : "Show"} explanation</span>
            <span>{expanded ? "▲" : "▼"}</span>
          </button>
        )}
        {expanded && mistake.explanation && (
          <div className="mb-3 rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-800 dark:bg-blue-950 dark:text-blue-200">
            {mistake.explanation}
          </div>
        )}

        {/* Chapter label + Reattempt */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{mistake.chapterTitle}</span>
          {!isMastered && (
            <button
              onClick={onReattempt}
              className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Reattempt →
            </button>
          )}
          {isMastered && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
              ✓ Mastered
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────
const MistakeBook = () => {
  const navigate = useNavigate();
  const { mistakes, stats, loading, reattempt, remove } = useMistakes();

  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter,  setStatusFilter]  = useState("all");
  const [reattemptId,   setReattemptId]   = useState(null); // which mistake is being reattempted

  // Filter list
  const filtered = mistakes.filter((m) => {
    if (subjectFilter !== "all" && m.subject !== subjectFilter) return false;
    if (statusFilter  !== "all" && m.status  !== statusFilter)  return false;
    return true;
  });

  const activeSubjects = [...new Set(mistakes.map((m) => m.subject))];
  const totalPending   = mistakes.filter((m) => m.status !== "mastered").length;
  const totalMastered  = mistakes.filter((m) => m.status === "mastered").length;
  const masterPct      = mistakes.length
    ? Math.round((totalMastered / mistakes.length) * 100) : 0;

  // The mistake currently being reattempted
  const reattemptMistake = mistakes.find((m) => m._id === reattemptId);

  const handleReattempt = async (mistakeId, answerIndex) => {
    await reattempt(mistakeId, answerIndex);
    setReattemptId(null);
  };

  return (
    <Layout>
      <BackButton to="/dashboard" label="Dashboard" className="mb-4" />
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          Mistake Book
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Every wrong or skipped question — automatically saved for revision.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : mistakes.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center dark:border-gray-700">
          <span className="text-6xl">📒</span>
          <div>
            <p className="text-lg font-bold text-gray-700 dark:text-white">
              Mistake book is empty!
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Take some MCQ tests — wrong and skipped questions will appear here automatically.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Go take a quiz →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">

          {/* ── Summary bar ── */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total mistakes", value: mistakes.length,  color: "text-red-500"    },
              { label: "Pending",        value: totalPending,      color: "text-amber-500"  },
              { label: "Mastered",       value: totalMastered,     color: "text-green-600"  },
              { label: "Success rate",   value: `${masterPct}%`,   color: "text-indigo-600" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className={`mt-1 text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Mastery progress bar ── */}
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
              <span>Overall mastery progress</span>
              <span className="font-semibold text-green-600">{masterPct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{ width: `${masterPct}%` }}
              />
            </div>
          </div>

          {/* ── Subject stats cards ── */}
          {Object.keys(stats).length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(stats).map(([subject, s]) => {
                const meta = SUBJECTS.find((sub) => sub.label === subject);
                const pct  = s.total ? Math.round((s.mastered / s.total) * 100) : 0;
                return (
                  <div
                    key={subject}
                    onClick={() => setSubjectFilter(subject)}
                    className={`cursor-pointer rounded-xl border p-4 transition hover:shadow-sm
                      ${subjectFilter === subject
                        ? `border-2 ${meta?.borderClass}`
                        : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                      }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{meta?.icon}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {subject}
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span className="text-red-500 font-medium">{s.unseen} unseen</span>
                      <span className="text-amber-500 font-medium">{s.reattempted} in progress</span>
                      <span className="text-green-600 font-medium">{s.mastered} mastered</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Reattempt mode ── */}
          {reattemptMistake && (
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  🔄 Reattempt Mode
                </p>
                <button
                  onClick={() => setReattemptId(null)}
                  className="text-xs text-indigo-500 hover:text-indigo-700"
                >
                  ✕ Cancel
                </button>
              </div>
              <ReattemptCard
                mistake={reattemptMistake}
                onAnswer={(ans) => handleReattempt(reattemptMistake._id, ans)}
                onSkip={() => setReattemptId(null)}
              />
            </div>
          )}

          {/* ── Filters ── */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSubjectFilter("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition
                  ${subjectFilter === "all" ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"}`}
              >
                All subjects
              </button>
              {activeSubjects.map((subj) => {
                const meta = SUBJECTS.find((s) => s.label === subj);
                return (
                  <button
                    key={subj}
                    onClick={() => setSubjectFilter(subj)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition
                      ${subjectFilter === subj
                        ? `${meta?.bgClass} ${meta?.textClass}`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                  >
                    {meta?.icon} {subj}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <span className="text-gray-200 dark:text-gray-700">|</span>

            {/* Status filter */}
            {["all", "unseen", "reattempted", "mastered"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition
                  ${statusFilter === st
                    ? st === "unseen"      ? "bg-red-500 text-white"
                    : st === "reattempted" ? "bg-amber-500 text-white"
                    : st === "mastered"    ? "bg-green-600 text-white"
                    :                       "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }`}
              >
                {st === "all" ? `All (${mistakes.length})` : st}
              </button>
            ))}
          </div>

          {/* ── Mistake list ── */}
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No mistakes match this filter.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((mistake) => (
                <MistakeCard
                  key={mistake._id}
                  mistake={mistake}
                  onReattempt={() => setReattemptId(mistake._id)}
                  onRemove={() => remove(mistake._id)}
                />
              ))}
            </div>
          )}

        </div>
      )}
    </Layout>
  );
};

export default MistakeBook;