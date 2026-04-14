import { useState } from "react";
import AIExplainModal from "./AIExplainModal";

/**
 * Drop this button anywhere you have a question + answer/explanation
 *
 * Props:
 *   question    — the question text
 *   answer      — the answer text (for PYQs)
 *   explanation — the explanation text (for MCQs)
 *   subject     — "Science" | "Mathematics" etc
 *   size        — "sm" | "md"
 */
const AIExplainButton = ({
  question,
  answer      = "",
  explanation = "",
  subject     = "General",
  size        = "sm",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50
          font-medium text-violet-700 transition
          hover:bg-violet-100 hover:border-violet-300
          dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300 dark:hover:bg-violet-900
          ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
        title="Get AI easy explanation"
      >
        {/* Sparkle icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
        </svg>
        AI Explain
      </button>

      {open && (
        <AIExplainModal
          question={question}
          answer={answer}
          explanation={explanation}
          subject={subject}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default AIExplainButton;