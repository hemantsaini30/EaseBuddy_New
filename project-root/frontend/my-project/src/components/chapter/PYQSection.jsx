import { useState } from "react";

const DIFFICULTY_COLOR = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

/**
 * Collapsible list of Previous Year Questions
 */
const PYQSection = ({ pyqs = [] }) => {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? pyqs : pyqs.filter((q) => q.difficulty === filter);

  if (!pyqs.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">📝</p>
        <p className="mt-2 text-sm text-gray-400">
          PYQs not added yet.
          {/* TODO: Add questions via admin panel or backend seeder */}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "easy", "medium", "hard"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition
              ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Question list */}
      <div className="flex flex-col gap-2">
        {filtered.map((q, idx) => (
          <div key={q._id || idx} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  Q{idx + 1}
                </span>
                <p className="text-sm text-gray-800 dark:text-white">{q.question}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                {q.year && <span className="text-xs text-gray-400">{q.year}</span>}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLOR[q.difficulty]}`}
                >
                  {q.difficulty}
                </span>
                <span className="text-gray-400">{open === idx ? "▲" : "▼"}</span>
              </div>
            </button>
            {open === idx && (
              <div className="border-t border-gray-100 bg-green-50 p-4 dark:border-gray-700 dark:bg-green-950">
                <p className="mb-1 text-xs font-semibold uppercase text-green-700 dark:text-green-400">Answer</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">{q.answer}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {q.marks} mark{q.marks > 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PYQSection;
