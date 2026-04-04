import { useState, useEffect, useRef } from "react";
import { formulaService } from "../../services/formulaService";

// ── Subjects that get a formula tab ──────────────────────
export const FORMULA_SUBJECTS = ["Mathematics", "Science"];

// ── Simple formula renderer ───────────────────────────────
// Renders the formula string with styled special characters.
// No LaTeX library needed — handles the patterns CBSE uses.
const FormulaText = ({ text, large = false }) => {
  if (!text) return null;

  // Replace common math patterns with styled spans
  const render = (str) => {
    return str
      // Superscripts: x², a³, b²
      .replace(/([a-zA-Z0-9])²/g,  "$1<sup>2</sup>")
      .replace(/([a-zA-Z0-9])³/g,  "$1<sup>3</sup>")
      .replace(/\^([0-9]+)/g,       "<sup>$1</sup>")
      // Subscripts: R₁ R₂ H₂O
      .replace(/([a-zA-Z])([₀₁₂₃₄₅₆₇₈₉]+)/g, "$1<sub>$2</sub>")
      // Square root
      .replace(/√\(([^)]+)\)/g,    "√<span style='text-decoration:overline'>$1</span>")
      .replace(/√([a-zA-Z0-9]+)/g, "√$1")
      // Fractions: a/b wrapped in spans when surrounded by spaces
      .replace(/ ([^/\s]+)\/([^/\s]+) /g,
        " <span class='frac'><span>$1</span><span>$2</span></span> ")
      // Greek letters
      .replace(/\btheta\b/gi, "θ")
      .replace(/\balpha\b/gi, "α")
      .replace(/\bbeta\b/gi,  "β")
      // Arrows
      .replace(/->/g, "→");
  };

  return (
    <span
      className={`formula-text font-mono ${large ? "text-xl" : "text-base"}`}
      dangerouslySetInnerHTML={{ __html: render(text) }}
    />
  );
};

// ── Single formula card ───────────────────────────────────
const FormulaCard = ({ formula, subjectColor }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 transition
        ${formula.isKeyFormula
          ? `${subjectColor.keyBorder} ${subjectColor.keyBg}`
          : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
        }`}
    >
      {/* Card header */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {formula.isKeyFormula && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold
                ${subjectColor.badge}`}>
                ★ KEY
              </span>
            )}
            {formula.category && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800">
                {formula.category}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-white">
          {formula.title}
        </h3>

        {/* Formula display box */}
        <div className={`flex items-center justify-center rounded-xl px-4 py-4
          ${subjectColor.formulaBg}`}
        >
          <FormulaText text={formula.formula} large />
        </div>

        {/* Description */}
        {formula.description && (
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {formula.description}
          </p>
        )}
      </div>

      {/* Variables + Example (expandable) */}
      {(formula.variables?.length > 0 || formula.example) && (
        <>
          <button
            onClick={() => setExpanded((p) => !p)}
            className={`flex w-full items-center justify-between border-t px-4 py-2.5 text-xs font-medium transition
              ${formula.isKeyFormula
                ? `${subjectColor.keyDivider} ${subjectColor.expandText}`
                : "border-gray-100 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
          >
            <span>{expanded ? "Hide details" : "Variables & example"}</span>
            <span className="text-gray-400">{expanded ? "▲" : "▼"}</span>
          </button>

          {expanded && (
            <div className={`border-t px-4 py-3 ${
              formula.isKeyFormula
                ? subjectColor.keyDivider
                : "border-gray-100 dark:border-gray-700"
            }`}>
              {/* Variables table */}
              {formula.variables?.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Variables
                  </p>
                  <div className="flex flex-col gap-1">
                    {formula.variables.map((v, i) => (
                      <div key={i} className="flex items-baseline gap-2">
                        <code className={`flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-xs font-bold
                          ${subjectColor.varBg} ${subjectColor.varText}`}>
                          {v.symbol}
                        </code>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {v.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example */}
              {formula.example && (
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Example
                  </p>
                  <p className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {formula.example}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ── Subject colour themes ─────────────────────────────────
const THEMES = {
  Mathematics: {
    keyBorder:   "border-blue-400 dark:border-blue-600",
    keyBg:       "bg-blue-50 dark:bg-blue-950",
    keyDivider:  "border-blue-100 dark:border-blue-800",
    expandText:  "text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900",
    formulaBg:   "bg-blue-50 dark:bg-blue-950",
    badge:       "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
    varBg:       "bg-blue-100 dark:bg-blue-900",
    varText:     "text-blue-800 dark:text-blue-200",
    accent:      "#3B82F6",
    icon:        "📐",
  },
  Science: {
    keyBorder:   "border-green-400 dark:border-green-600",
    keyBg:       "bg-green-50 dark:bg-green-950",
    keyDivider:  "border-green-100 dark:border-green-800",
    expandText:  "text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900",
    formulaBg:   "bg-green-50 dark:bg-green-950",
    badge:       "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
    varBg:       "bg-green-100 dark:bg-green-900",
    varText:     "text-green-800 dark:text-green-200",
    accent:      "#22C55E",
    icon:        "⚗️",
  },
};

// ── PDF download ──────────────────────────────────────────
const downloadPDF = (formulas, chapterName, subject) => {
  // Build clean HTML for the PDF window
  const rows = formulas.map((f) => `
    <div class="formula-card ${f.isKeyFormula ? "key" : ""}">
      <div class="card-header">
        <span class="title">${f.title}</span>
        <span class="tags">
          ${f.isKeyFormula ? '<span class="key-tag">★ KEY</span>' : ""}
          ${f.category ? `<span class="cat-tag">${f.category}</span>` : ""}
        </span>
      </div>
      <div class="formula-box">${f.formula}</div>
      ${f.description ? `<p class="desc">${f.description}</p>` : ""}
      ${f.variables?.length ? `
        <div class="vars">
          ${f.variables.map((v) => `
            <div class="var-row">
              <code>${v.symbol}</code>
              <span>${v.meaning}</span>
            </div>
          `).join("")}
        </div>
      ` : ""}
      ${f.example ? `<div class="example">Example: ${f.example}</div>` : ""}
    </div>
  `).join("");

  const accentColor = subject === "Mathematics" ? "#3B82F6" : "#22C55E";
  const icon        = subject === "Mathematics" ? "📐" : "⚗️";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${chapterName} — Formula Sheet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a;
           background: #fff; padding: 2cm; font-size: 12px; }
    .page-header { border-bottom: 3px solid ${accentColor};
                   padding-bottom: 16px; margin-bottom: 24px; }
    .page-header h1 { font-size: 22px; font-weight: 700; color: ${accentColor}; }
    .page-header p  { font-size: 13px; color: #666; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .formula-card { border: 1.5px solid #e5e7eb; border-radius: 10px;
                    padding: 14px; break-inside: avoid; }
    .formula-card.key { border-color: ${accentColor};
                        background: ${accentColor}10; }
    .card-header { display: flex; justify-content: space-between;
                   align-items: flex-start; margin-bottom: 8px; }
    .title { font-weight: 600; font-size: 13px; }
    .tags  { display: flex; gap: 4px; flex-wrap: wrap; }
    .key-tag { background: ${accentColor}; color: white; border-radius: 20px;
               padding: 1px 7px; font-size: 9px; font-weight: 700; }
    .cat-tag { background: #f3f4f6; color: #6b7280; border-radius: 20px;
               padding: 1px 7px; font-size: 9px; }
    .formula-box { background: ${accentColor}15; border-radius: 7px;
                   padding: 10px; text-align: center; font-family: monospace;
                   font-size: 15px; font-weight: 600; margin: 8px 0;
                   color: #1a1a1a; letter-spacing: 0.5px; }
    .desc { font-size: 11px; color: #6b7280; margin: 6px 0;
            line-height: 1.5; }
    .vars { margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 8px; }
    .var-row { display: flex; gap: 8px; align-items: baseline;
               margin-bottom: 3px; }
    .var-row code { background: ${accentColor}20; color: ${accentColor};
                    border-radius: 4px; padding: 1px 5px;
                    font-size: 10px; font-weight: 700; flex-shrink: 0; }
    .var-row span { font-size: 10px; color: #6b7280; }
    .example { margin-top: 8px; background: #f9fafb; border-radius: 6px;
               padding: 6px 9px; font-family: monospace;
               font-size: 10px; color: #374151; }
    .footer { margin-top: 28px; border-top: 1px solid #e5e7eb;
              padding-top: 12px; text-align: center;
              font-size: 10px; color: #9ca3af; }
    @media print { body { padding: 1cm; } }
  </style>
</head>
<body>
  <div class="page-header">
    <h1>${icon} ${chapterName} — Formula Sheet</h1>
    <p>${subject} · Class 10 CBSE · EaseBuddy</p>
  </div>
  <div class="grid">${rows}</div>
  <div class="footer">
    EaseBuddy · ${chapterName} · Downloaded ${new Date().toLocaleDateString("en-IN")}
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  // Open in a new tab → browser print dialog → save as PDF
  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
};

// ── Main FormulaSheet component ───────────────────────────
const FormulaSheet = ({ chapterId, chapterName, subject }) => {
  const [formulas, setFormulas]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("all"); // "all" | "key" | category
  const theme = THEMES[subject] || THEMES.Mathematics;

  useEffect(() => {
    if (!chapterId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await formulaService.getByChapter(chapterId);
        setFormulas(data);
      } catch (err) {
        console.error("Failed to load formulas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!formulas.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">{theme.icon}</p>
        <p className="mt-2 text-sm text-gray-400">
          No formulas added yet for this chapter.
          {/* TODO: Add formulas via seed.js or admin panel */}
        </p>
      </div>
    );
  }

  // Get unique categories
  const categories = [...new Set(formulas.map((f) => f.category).filter(Boolean))];
  const keyCount   = formulas.filter((f) => f.isKeyFormula).length;

  // Apply filter
  const filtered =
    filter === "all" ? formulas
    : filter === "key" ? formulas.filter((f) => f.isKeyFormula)
    : formulas.filter((f) => f.category === filter);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {/* Filter chips */}
          {[
            { id: "all", label: `All (${formulas.length})` },
            { id: "key", label: `★ Key (${keyCount})` },
            ...categories.map((c) => ({ id: c, label: c })),
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition
                ${filter === chip.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                }`}
              style={filter === chip.id ? { backgroundColor: theme.accent } : {}}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Download button */}
        <button
          onClick={() => downloadPDF(formulas, chapterName, subject)}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          style={{ borderColor: theme.accent + "60", color: theme.accent }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Download PDF
        </button>
      </div>

      {/* Summary stats */}
      <div className="mb-5 flex flex-wrap gap-3">
        {[
          { label: "Total formulas", value: formulas.length },
          { label: "Key formulas",   value: keyCount },
          { label: "Categories",     value: categories.length },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg px-3 py-2"
            style={{ background: theme.accent + "15" }}
          >
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-lg font-black" style={{ color: theme.accent }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Formula grid */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No formulas match this filter.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((formula) => (
            <FormulaCard
              key={formula._id}
              formula={formula}
              subjectColor={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormulaSheet;