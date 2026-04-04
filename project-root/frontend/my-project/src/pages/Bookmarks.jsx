import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import BookmarkButton from "../components/common/BookmarkButton";
import { useBookmarks } from "../context/BookmarkContext";
import { SUBJECTS } from "../utils/constants";

// ── Group bookmarks by subject ────────────────────────────
const groupBySubject = (bookmarks) => {
  const map = {};
  bookmarks.forEach((b) => {
    if (!map[b.subject]) map[b.subject] = [];
    map[b.subject].push(b);
  });
  return map;
};

// ── Single bookmark card ──────────────────────────────────
const BookmarkCard = ({ bookmark }) => {
  const subject = SUBJECTS.find((s) => s.label === bookmark.subject);
  const navigate = useNavigate();

  // Build the correct "back" path — respects book-level subjects
  const subjectPath = bookmark.bookId
    ? `/subject/${bookmark.subjectId}/book/${bookmark.bookId}`
    : `/subject/${bookmark.subjectId}`;

  return (
    <div className="group relative flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Chapter number circle */}
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold
        ${subject?.bgClass || "bg-gray-100"} ${subject?.textClass || "text-gray-600"}`}
      >
        📄
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/chapter/${bookmark.slug}`}
          className="text-sm font-semibold text-gray-800 hover:text-indigo-600 dark:text-white line-clamp-1"
        >
          {bookmark.chapterTitle}
        </Link>

        {/* Breadcrumb path */}
        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
          <span
            className="cursor-pointer hover:text-indigo-500"
            onClick={() => navigate(`/subject/${bookmark.subjectId}`)}
          >
            {bookmark.subject}
          </span>
          {bookmark.bookName && (
            <>
              <span>/</span>
              <span
                className="cursor-pointer hover:text-indigo-500"
                onClick={() => navigate(subjectPath)}
              >
                {bookmark.bookName}
              </span>
            </>
          )}
        </div>

        {/* Added date */}
        <p className="mt-1 text-xs text-gray-300 dark:text-gray-600">
          Saved{" "}
          {new Date(bookmark.addedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </p>
      </div>

      {/* Bookmark toggle (to remove) */}
      <BookmarkButton
        chapterId={bookmark.chapterId}
        chapterTitle={bookmark.chapterTitle}
        subject={bookmark.subject}
        classLevel={bookmark.classLevel}
        slug={bookmark.slug}
        subjectId={bookmark.subjectId}
        bookName={bookmark.bookName}
        bookId={bookmark.bookId}
        size="sm"
      />

      {/* Go to chapter arrow */}
      <Link
        to={`/chapter/${bookmark.slug}`}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:border-indigo-200 hover:text-indigo-600 dark:border-gray-700"
      >
        →
      </Link>
    </div>
  );
};

// ── Empty state ───────────────────────────────────────────
const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center dark:border-gray-700">
      <span className="text-6xl">🔖</span>
      <div>
        <p className="text-lg font-bold text-gray-700 dark:text-white">
          No bookmarks yet
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Click the bookmark icon on any chapter to save it here.
        </p>
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Browse Chapters →
      </button>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────
const BookmarksPage = () => {
  const { bookmarks, loading, clearAll } = useBookmarks();
  const [filter, setFilter] = useState("all");  // "all" | subject label
  const [confirmClear, setConfirmClear] = useState(false);
  const navigate = useNavigate();

  // Subjects that actually have bookmarks
  const activeSubjects = [
    ...new Set(bookmarks.map((b) => b.subject)),
  ];

  // Filtered list
  const filtered =
    filter === "all"
      ? bookmarks
      : bookmarks.filter((b) => b.subject === filter);

  const grouped = groupBySubject(filtered);

  const handleClearAll = async () => {
    await clearAll();
    setConfirmClear(false);
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            My Bookmarks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {bookmarks.length} chapter{bookmarks.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Clear all button */}
        {bookmarks.length > 0 && (
          <div>
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Remove all?</span>
                <button
                  onClick={handleClearAll}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
      ) : bookmarks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">

          {/* Subject filter chips */}
          {activeSubjects.length > 1 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition
                  ${filter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }`}
              >
                All ({bookmarks.length})
              </button>
              {activeSubjects.map((subj) => {
                const meta  = SUBJECTS.find((s) => s.label === subj);
                const count = bookmarks.filter((b) => b.subject === subj).length;
                return (
                  <button
                    key={subj}
                    onClick={() => setFilter(subj)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition
                      ${filter === subj
                        ? `${meta?.bgClass} ${meta?.textClass} font-semibold`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                  >
                    {meta?.icon} {subj} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Grouped by subject */}
          {Object.entries(grouped).map(([subject, items]) => {
            const meta = SUBJECTS.find((s) => s.label === subject);
            return (
              <div key={subject}>
                {/* Subject header — only shown when "all" filter active */}
                {filter === "all" && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg">{meta?.icon}</span>
                    <h2 className={`text-sm font-bold ${meta?.textClass || "text-gray-700 dark:text-white"}`}>
                      {subject}
                    </h2>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium
                      ${meta?.bgClass} ${meta?.textClass}`}>
                      {items.length}
                    </span>
                  </div>
                )}

                {/* Cards */}
                <div className="grid gap-2 sm:grid-cols-2">
                  {items.map((bookmark) => (
                    <BookmarkCard key={bookmark.chapterId} bookmark={bookmark} />
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      )}
    </Layout>
  );
};

export default BookmarksPage;