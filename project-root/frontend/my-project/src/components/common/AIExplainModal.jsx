import { useState, useEffect, useRef } from "react";

const AIExplainModal = ({ question, answer, explanation, subject, onClose }) => {
  const [content, setContent]   = useState("");
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState("");
  const contentRef              = useRef(null);

  useEffect(() => {
    fetchExplanation();
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Auto scroll to bottom as content streams in
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content]);

  const fetchExplanation = async () => {
    setLoading(true);
    setError("");
    setContent("");

    const prompt = `You are an expert CBSE tutor explaining concepts to a Class 10 student in India.

A student answered a ${subject} question but wants a simpler explanation.

QUESTION:
${question}

CORRECT ANSWER / EXPLANATION:
${answer || explanation || "No explanation provided."}

Your task:
1. Re-explain this in the SIMPLEST possible language a 14-year-old student can understand
2. Use 1-2 real-world Indian examples (things students see in daily life)
3. Use an analogy if possible to make the concept stick
4. Highlight the KEY POINT to remember for the exam (max 1 sentence)
5. Keep it SHORT — max 150 words total

Format your response exactly like this:
🧠 **Simple Explanation**
[2-3 sentences in plain simple language]

🏠 **Real-World Example**
[1-2 sentences with a relatable Indian example]

💡 **Remember This**
[1 key sentence for the exam]`;

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/ai/doubt`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("easebuddy_token")}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      systemPrompt: "",
    }),
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API request failed");
      }

      const text = data.choices?.[0]?.message?.content || "Could not generate explanation.";
      setContent(text);
    } catch (err) {
      setError("Could not load AI explanation. Check your API key.");
      console.error("AI Explain error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown-like renderer
  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-2" />;

      // Bold: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="font-semibold text-gray-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={j}>{part}</span>;
      });

      // Section headers (lines starting with emoji)
      const isHeader = /^[🧠🏠💡]/.test(line);

      return (
        <p
          key={i}
          className={`leading-relaxed ${
            isHeader
              ? "mt-4 mb-1 text-sm font-bold text-indigo-700 dark:text-indigo-300 first:mt-0"
              : "text-sm text-gray-700 dark:text-gray-300"
          }`}
        >
          {parts}
        </p>
      );
    });
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:rounded-2xl"
        style={{ maxHeight: "85vh" }}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Easy Explanation</p>
              <p className="text-xs text-indigo-200">Simplified just for you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/20 hover:text-white transition"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Question preview */}
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Question</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {question}
          </p>
        </div>

        {/* Content area */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-5 py-4"
          style={{ minHeight: "200px" }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              {/* Animated thinking dots */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">Making it simpler for you...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchExplanation}
                className="mt-2 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="prose-sm">
              {renderContent(content)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/50">
          {!loading && !error && (
            <button
              onClick={fetchExplanation}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 .49-3.91"/>
              </svg>
              Explain differently
            </button>
          )}
          {loading && <span />}
          {error && <span />}
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition"
          >
            Got it ✓
          </button>
        </div>

      </div>
    </div>
  );
};

export default AIExplainModal;