import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// ── Markdown-lite renderer (bold, inline code, newlines) ──
const renderText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code key={i} className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">
          {part.slice(1, -1)}
        </code>
      );
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
};

// ── Single message bubble ─────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold
        ${isUser
          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
          : "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
        }`}>
        {isUser ? "U" : "AI"}
      </div>
      {/* Bubble */}
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed
        ${isUser
          ? "rounded-tr-sm bg-indigo-600 text-white"
          : "rounded-tl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        }`}>
        {msg.loading ? (
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
          </span>
        ) : (
          renderText(msg.content)
        )}
      </div>
    </div>
  );
};

// ── Quick suggestion chips ────────────────────────────────
const SUGGESTIONS = [
  "Explain this in simple words",
  "Give me a real-life example",
  "What are the key points?",
  "How will this come in the exam?",
];

// ── Main widget ───────────────────────────────────────────
const DoubtSolver = ({ chapterTitle = null, subject = null }) => {
  const { user } = useAuth();
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when widget opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Greeting when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      const context = chapterTitle
        ? `I'm here to help you with **${chapterTitle}**. What's your doubt?`
        : "I'm your AI study assistant. Ask me anything about your chapter!";
      setMessages([{ role: "assistant", content: context }]);
    }
  }, [open]);

  const buildSystemPrompt = () => {
    const classInfo = user?.classLevel ? `Class ${user.classLevel} CBSE` : "CBSE";
    const chapterInfo = chapterTitle ? `The student is currently studying: "${chapterTitle}"` : "";
    const subjectInfo = subject ? `Subject: ${subject}` : "";

    return `You are an expert CBSE tutor helping a ${classInfo} student.
${chapterInfo}
${subjectInfo}

Rules:
- Answer ONLY questions related to the student's academics and current chapter
- Keep answers short, clear and student-friendly (max 4-5 sentences)
- Use simple language appropriate for a school student
- If the question is unrelated to studies, politely redirect them
- Use **bold** for key terms
- For formulas use backticks like \`F = ma\`
- Never give full answers to exam questions directly — guide them to think
- If they ask something outside the chapter, still help but mention it's a related topic`;
  };

  const sendMessage = async (text) => {
    const question = text || input.trim();
    if (!question || loading) return;
    setInput("");

    // Add user message
    const userMsg = { role: "user", content: question };
    const loadingMsg = { role: "assistant", content: "", loading: true };
    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    try {
      // Build conversation history for the API
      // (exclude the loading placeholder, include all real messages)
      const history = [...messages, userMsg]
        .filter((m) => !m.loading)
        .map((m) => ({ role: m.role, content: m.content }));

      
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}/ai/doubt`,
            
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("easebuddy_token")}`,
                },
                body: JSON.stringify({
                messages: history,
                systemPrompt: buildSystemPrompt(),
                }),
            }
            );

      const data = await response.json();
      console.log("AI RAW RESPONSE:", data);
      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that. Please try again.";

      // Replace loading bubble with actual reply
      setMessages((prev) => [
        ...prev.filter((m) => !m.loading),
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((m) => !m.loading),
        { role: "assistant", content: "Something went wrong. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setTimeout(() => {
      const context = chapterTitle
        ? `Chat cleared! Still here to help with **${chapterTitle}**.`
        : "Chat cleared! Ask me anything.";
      setMessages([{ role: "assistant", content: context }]);
    }, 100);
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200
          ${open
            ? "bg-gray-700 text-white hover:bg-gray-800"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        aria-label="Toggle AI Doubt Solver"
      >
        {open ? (
          // Close X
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          // Sparkle / AI icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor"/>
          </svg>
        )}
        {/* Unread dot — shown when closed and has messages */}
        {!open && messages.length > 1 && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-red-500" />
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className={`fixed bottom-24 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl
          dark:border-gray-700 dark:bg-gray-900 sm:w-96`}
          style={{ maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-indigo-600 px-4 py-3 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Doubt Solver</p>
                {chapterTitle && (
                  <p className="text-xs text-indigo-200 truncate max-w-[180px]">{chapterTitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Clear chat */}
              <button
                onClick={clearChat}
                title="Clear chat"
                className="rounded-lg p-1.5 text-indigo-200 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 8a1 1 0 012 0v3a1 1 0 11-2 0v-3zm4 0a1 1 0 012 0v3a1 1 0 11-2 0v-3z" clipRule="evenodd"/>
                </svg>
              </button>
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-indigo-200 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" style={{ minHeight: "280px", maxHeight: "320px" }}>
            {messages.map((msg, i) => (
              <Bubble key={i} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestion chips */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-2 dark:border-gray-800">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-gray-100 p-3 dark:border-gray-800">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your doubt here…"
                rows={1}
                style={{ resize: "none", minHeight: "36px", maxHeight: "90px" }}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-center text-xs text-gray-400">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DoubtSolver;