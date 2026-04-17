import { useState, useEffect } from "react";

const CATEGORIES = [
  { value: "bug",        label: "🐛 Bug report" },
  { value: "suggestion", label: "💡 Suggestion" },
  { value: "content",    label: "📝 Content issue" },
  { value: "other",      label: "💬 Other" },
];

const FeedbackModal = ({ onClose }) => {
  const [category, setCategory] = useState("suggestion");
  const [message,  setMessage]  = useState("");
  const [email,    setEmail]    = useState("");
  const [status,   setStatus]   = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setStatus("sending");

    const subject = encodeURIComponent(
      `EaseBuddy Feedback — ${CATEGORIES.find(c => c.value === category)?.label.replace(/[^\w\s]/gi,"").trim()}`
    );
    const body = encodeURIComponent(
      `Category: ${category}\n\nMessage:\n${message}\n\nFrom: ${email || "Anonymous"}`
    );

    // Opens email client with pre-filled content
    window.open(`mailto:hemantsaini9310@gmail.com?subject=${subject}&body=${body}`);
    setStatus("sent");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:rounded-3xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-base dark:bg-indigo-950">
              💌
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Send Feedback</p>
              <p className="text-xs text-gray-400">We read every message</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
            <div className="text-5xl">🎉</div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">Thanks for your feedback!</p>
            <p className="text-sm text-gray-400">Your email app should have opened. If not, copy your message and send it to hemantsaini9310@gmail.com</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-5 py-4">
            {/* Category chips */}
            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Category</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition
                    ${category === c.value
                      ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Message */}
            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Message</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind — a bug, an idea, anything..."
              rows={4}
              className="mb-4 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            {/* Optional email */}
            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Your email <span className="font-normal text-gray-400">(optional — if you want a reply)</span>
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mb-5 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <button
              onClick={handleSubmit}
              disabled={!message.trim() || status === "sending"}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {status === "sending" ? "Opening email..." : "Send Feedback →"}
            </button>
            <p className="mt-2 text-center text-xs text-gray-400">
              Opens your email app with this message pre-filled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;