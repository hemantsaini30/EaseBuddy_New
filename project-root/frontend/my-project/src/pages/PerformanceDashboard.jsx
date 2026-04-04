import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useAnalytics } from "../hooks/useAnalytics";
import { useAuth } from "../context/AuthContext";
import { SUBJECTS } from "../utils/constants";
import { useEffect, useRef } from "react";

// ── Colour map per subject ────────────────────────────────
const SUBJECT_COLORS = {
  Mathematics:    { stroke: "#3B82F6", fill: "rgba(59,130,246,0.15)",  label: "Math"    },
  Science:        { stroke: "#22C55E", fill: "rgba(34,197,94,0.15)",   label: "Science" },
  English:        { stroke: "#EAB308", fill: "rgba(234,179,8,0.15)",   label: "English" },
  Hindi:          { stroke: "#F97316", fill: "rgba(249,115,22,0.15)",  label: "Hindi"   },
  "Social Science":{ stroke: "#A855F7", fill: "rgba(168,85,247,0.15)", label: "SST"     },
};

// ── Radar Chart (pure SVG, no library needed) ─────────────
const RadarChart = ({ subjects }) => {
  const cx = 200, cy = 200, r = 150;
  const levels = [20, 40, 60, 80, 100];
  const n = subjects.length;

  // Angle for each axis (start from top, go clockwise)
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

  // Point on axis at a given value (0-100)
  const pt = (i, val) => {
    const a = angle(i);
    const d = (val / 100) * r;
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
  };

  // Label position (slightly beyond the axis end)
  const labelPt = (i) => {
    const a = angle(i);
    const d = r + 28;
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
  };

  // Build polygon path from an array of values
  const polygon = (values) =>
    values
      .map((v, i) => {
        const p = pt(i, v);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z";

  // Grid polygon for a given level
  const gridPoly = (level) =>
    Array.from({ length: n }, (_, i) => pt(i, level))
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ") + " Z";

  const scores      = subjects.map((s) => s.overallScore);
  const completions = subjects.map((s) => s.completionScore);

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-sm mx-auto"
      style={{ overflow: "visible" }}
    >
      {/* Grid levels */}
      {levels.map((level) => (
        <path
          key={level}
          d={gridPoly(level)}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-gray-200 dark:text-gray-700"
        />
      ))}

      {/* Level labels on first axis */}
      {levels.map((level) => {
        const p = pt(0, level);
        return (
          <text
            key={level}
            x={p.x + 4}
            y={p.y}
            fontSize="9"
            fill="currentColor"
            className="text-gray-400 dark:text-gray-500"
            dominantBaseline="middle"
          >
            {level}
          </text>
        );
      })}

      {/* Axis lines */}
      {subjects.map((_, i) => {
        const p = pt(i, 100);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x.toFixed(1)} y2={p.y.toFixed(1)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-200 dark:text-gray-700"
          />
        );
      })}

      {/* Completion area (faint) */}
      <path
        d={polygon(completions)}
        fill="rgba(99,102,241,0.08)"
        stroke="rgba(99,102,241,0.3)"
        strokeWidth="1"
        strokeDasharray="4,3"
      />

      {/* Overall score area */}
      <path
        d={polygon(scores)}
        fill="rgba(99,102,241,0.2)"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {subjects.map((s, i) => {
        const p = pt(i, s.overallScore);
        const col = SUBJECT_COLORS[s.subject];
        return (
          <circle
            key={i}
            cx={p.x.toFixed(1)}
            cy={p.y.toFixed(1)}
            r="5"
            fill={col?.stroke || "#6366F1"}
            stroke="white"
            strokeWidth="2"
          />
        );
      })}

      {/* Axis labels */}
      {subjects.map((s, i) => {
        const lp  = labelPt(i);
        const col = SUBJECT_COLORS[s.subject];
        return (
          <g key={i}>
            <text
              x={lp.x.toFixed(1)}
              y={lp.y.toFixed(1)}
              fontSize="12"
              fontWeight="500"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={col?.stroke || "#6366F1"}
            >
              {col?.label || s.subject}
            </text>
            <text
              x={lp.x.toFixed(1)}
              y={(lp.y + 13).toFixed(1)}
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              className="text-gray-400"
            >
              {s.overallScore}%
            </text>
          </g>
        );
      })}

      {/* Centre dot */}
      <circle cx={cx} cy={cy} r="3" fill="#6366F1" />
    </svg>
  );
};

// ── Score bar for a single subject ────────────────────────
const SubjectBar = ({ subjectData }) => {
  const col = SUBJECT_COLORS[subjectData.subject];
  const meta = SUBJECTS.find(
    (s) => s.label === subjectData.subject
  );

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta?.icon}</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">
            {subjectData.subject}
          </span>
        </div>
        <span
          className="text-base font-black"
          style={{ color: col?.stroke }}
        >
          {subjectData.overallScore}%
        </span>
      </div>

      {/* Overall score bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${subjectData.overallScore}%`,
            backgroundColor: col?.stroke,
          }}
        />
      </div>

      {/* Sub-stats */}
      <div className="flex gap-4 text-xs text-gray-500">
        <span>
          📄 {subjectData.completedChapters}/{subjectData.totalChapters} chapters
        </span>
        {subjectData.mcqScore !== null && (
          <span>🧪 MCQ avg: {subjectData.mcqScore}%</span>
        )}
        {subjectData.timeSpentMinutes > 0 && (
          <span>⏱ {subjectData.timeSpentMinutes}m studied</span>
        )}
      </div>

      {/* Weak chapters for this subject */}
      {subjectData.weakChapters?.length > 0 && (
        <div className="mt-1 rounded-lg bg-red-50 px-3 py-1.5 dark:bg-red-950">
          <p className="text-xs text-red-600 dark:text-red-400">
            Needs work:{" "}
            {subjectData.weakChapters.map((c) => c.title).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

// ── Chapter strength row ──────────────────────────────────
const ChapterRow = ({ chapter, rank, type }) => {
  const isWeak   = type === "weak";
  const barColor = isWeak ? "#EF4444" : "#22C55E";
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold
        ${isWeak
          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        }`}>
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
          {chapter.title}
        </p>
        <p className="text-xs text-gray-400">{chapter.subject}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full rounded-full"
            style={{
              width: `${chapter.strengthScore}%`,
              backgroundColor: barColor,
            }}
          />
        </div>
        <span className="text-xs font-semibold w-8 text-right"
          style={{ color: barColor }}>
          {chapter.strengthScore}%
        </span>
      </div>
    </div>
  );
};

// ── Empty state ───────────────────────────────────────────
const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
      <span className="text-6xl">📊</span>
      <div>
        <p className="text-lg font-bold text-gray-700 dark:text-white">
          No performance data yet
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Complete some chapters and take MCQ tests to see your analysis here.
        </p>
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Start Studying →
      </button>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────
const PerformanceDashboard = () => {
  const { user }               = useAuth();
  const { data, loading, error, noData } = useAnalytics();

  // Build personalised insight message
  const getInsight = () => {
    if (!data) return null;
    const weak   = data.globalWeak;
    const strong = data.globalStrong;
    const weakNames   = weak.map((c) => c.title).join(", ");
    const strongNames = strong.map((c) => c.title).join(", ");
    if (weak.length && strong.length)
      return `You're strongest in ${strongNames}. Focus more on ${weakNames}.`;
    if (weak.length)
      return `These chapters need more attention: ${weakNames}.`;
    if (strong.length)
      return `Great work on ${strongNames}! Keep it up.`;
    return "Complete more chapters to get personalised insights.";
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Performance Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.name}'s progress · Class {user?.classLevel} CBSE
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      ) : noData ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">

          {/* ── Insight banner ── */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
                  Personalised Insight
                </p>
                <p className="mt-0.5 text-sm text-indigo-700 dark:text-indigo-300">
                  {getInsight()}
                </p>
              </div>
            </div>
          </div>

          {/* ── Top stat cards ── */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "Chapters done",
                value: data.totalChaptersCompleted,
                icon: "✅",
                color: "text-green-600",
              },
              {
                label: "MCQ tests taken",
                value: data.totalMCQAttempted,
                icon: "🧪",
                color: "text-blue-600",
              },
              {
                label: "Time studied",
                value: `${data.totalTimeMinutes}m`,
                icon: "⏱",
                color: "text-purple-600",
              },
              {
                label: "Subjects active",
                value: data.subjects.length,
                icon: "📚",
                color: "text-amber-600",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
              >
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className={`mt-1 text-2xl font-black ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Radar chart + legend ── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-1 text-base font-bold text-gray-800 dark:text-white">
              Subject Strength Radar
            </h2>
            <p className="mb-6 text-xs text-gray-400">
              Outer edge = 100% · Solid fill = overall score · Dashed = completion only
            </p>
            <RadarChart subjects={data.subjects} />

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {data.subjects.map((s) => {
                const col = SUBJECT_COLORS[s.subject];
                return (
                  <div key={s.subject} className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: col?.stroke }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {col?.label} ({s.overallScore}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Subject breakdown bars ── */}
          <div>
            <h2 className="mb-3 text-base font-bold text-gray-800 dark:text-white">
              Subject Breakdown
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.subjects.map((s) => (
                <SubjectBar key={s.subject} subjectData={s} />
              ))}
            </div>
          </div>

          {/* ── Weak + Strong chapters ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Weak */}
            <div className="rounded-2xl border border-red-200 bg-white p-4 dark:border-red-900 dark:bg-gray-900">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">🔴</span>
                <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                  Needs Most Attention
                </h2>
              </div>
              {data.globalWeak.length === 0 ? (
                <p className="text-xs text-gray-400">
                  Take some MCQ tests to see weak areas.
                </p>
              ) : (
                data.globalWeak.map((ch, i) => (
                  <ChapterRow key={ch.chapterId} chapter={ch} rank={i + 1} type="weak" />
                ))
              )}
            </div>

            {/* Strong */}
            <div className="rounded-2xl border border-green-200 bg-white p-4 dark:border-green-900 dark:bg-gray-900">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">🟢</span>
                <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                  Your Strongest Areas
                </h2>
              </div>
              {data.globalStrong.length === 0 ? (
                <p className="text-xs text-gray-400">
                  Complete chapters with MCQ tests to see strengths.
                </p>
              ) : (
                data.globalStrong.map((ch, i) => (
                  <ChapterRow key={ch.chapterId} chapter={ch} rank={i + 1} type="strong" />
                ))
              )}
            </div>
          </div>

          {/* ── Per-subject chapter heatmap ── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-base font-bold text-gray-800 dark:text-white">
              Chapter-by-Chapter Heatmap
            </h2>
            <div className="flex flex-col gap-5">
              {data.subjects.map((s) => {
                const col = SUBJECT_COLORS[s.subject];
                return (
                  <div key={s.subject}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: col?.stroke }}>
                      {s.subject}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.chapters
                        .sort((a, b) => a.chapterNumber - b.chapterNumber)
                        .map((ch) => {
                          const score = ch.strengthScore;
                          // Color intensity based on score
                          const bg =
                            score === 0
                              ? "bg-gray-100 dark:bg-gray-800"
                              : score < 30
                              ? "bg-red-200 dark:bg-red-900"
                              : score < 50
                              ? "bg-orange-200 dark:bg-orange-900"
                              : score < 70
                              ? "bg-yellow-200 dark:bg-yellow-900"
                              : score < 85
                              ? "bg-green-200 dark:bg-green-900"
                              : "bg-green-400 dark:bg-green-700";
                          return (
                            <div
                              key={ch.chapterId}
                              title={`${ch.title} — ${score}%`}
                              className={`group relative h-8 w-8 cursor-pointer rounded-lg ${bg} transition hover:scale-110`}
                            >
                              <span className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                {ch.chapterNumber}
                              </span>
                              {/* Tooltip */}
                              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max max-w-[180px] -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                                {ch.title}<br />
                                <span className="text-gray-300">Score: {score}%</span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* Heatmap legend — show once */}
                    {s === data.subjects[0] && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <span>Low</span>
                        {["bg-red-200","bg-orange-200","bg-yellow-200","bg-green-200","bg-green-400"].map((c) => (
                          <span key={c} className={`h-3 w-5 rounded ${c}`} />
                        ))}
                        <span>High</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </Layout>
  );
};

export default PerformanceDashboard;