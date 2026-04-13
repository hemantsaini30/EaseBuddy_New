import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { resourceService } from "../services/resourceService";
import { BOOKS, BOOK_COLORS } from "../data/bookConfig";
import { SUBJECTS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";
import BookmarkButton from "../components/common/BookmarkButton";
import BackButton from "../components/common/BackButton";

const BookChapters = () => {
  const { subjectId, bookId } = useParams();
  const navigate              = useNavigate();
  const { user }              = useAuth();
  const { getChapterProgress } = useProgress();

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Look up book and subject metadata
  const subject    = SUBJECTS.find((s) => s.id === subjectId);
  const booksForSubject = BOOKS[subjectId] || [];
  const book       = booksForSubject.find((b) => b.id === bookId);
  const bookColors = book ? BOOK_COLORS[book.color] : null;

  useEffect(() => {
    if (!book) return;
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await resourceService.getChapters(
          book.dbSubject,
          user?.classLevel,
          book.dbBook        // ← pass book name as filter
        );
        setChapters(data);
      } catch (err) {
        setError("Failed to load chapters.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [bookId, user?.classLevel]);

  if (!book || !subject) {
    return (
      <Layout>
        <p className="text-red-500">Book not found.</p>
      </Layout>
    );
  }

  return (
    <Layout activeSubject={subjectId}>
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
        <button onClick={() => navigate("/dashboard")} className="hover:text-gray-600 dark:hover:text-gray-300">
          Dashboard
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(`/subject/${subjectId}`)}
          className="hover:text-gray-600 dark:hover:text-gray-300"
        >
          {subject.label}
        </button>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">{book.title}</span>
      </div>

      {/* Breadcrumb back buttons */}
    <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
      <BackButton to="/dashboard" label="Dashboard" />
      <span>/</span>
      <BackButton
        to={`/subject/${subjectId}`}
        label={subject?.label}
      />
    </div>

      {/* Book header */}
      <div className={`mb-8 flex items-center gap-4 rounded-2xl border-2 p-6 ${bookColors.bg} ${bookColors.border}`}>
        <span className="text-5xl">{book.icon}</span>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${bookColors.badge}`}>
              {book.subtitle}
            </span>
          </div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">
            {book.title}
          </h1>
          <p className={`text-sm font-semibold ${bookColors.text}`}>
            Class {user?.classLevel} · {chapters.length} chapters
          </p>
        </div>
      </div>

      {/* Back to books button */}
      <button
        onClick={() => navigate(`/subject/${subjectId}`)}
        className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition
          hover:shadow-sm ${bookColors.border} ${bookColors.text} ${bookColors.bg}`}
      >
        ← All {subject.label} Books
      </button>

      {/* Chapter list */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      ) : chapters.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
          <p className="text-4xl">{book.icon}</p>
          <p className="mt-2 text-gray-400">
            No chapters found for {book.title}.
            {/* TODO: Make sure seed.js has book: "{book.dbBook}" on these chapters */}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter, idx) => {
            const prog       = getChapterProgress(chapter._id);
            const isComplete = prog?.isChapterComplete;
            return (
              <Link
                key={chapter._id}
                to={`/chapter/${chapter.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4
                  transition hover:border-indigo-300 hover:shadow-md
                  dark:border-gray-700 dark:bg-gray-900"
              >
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold
                  ${isComplete
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : `${bookColors.bg} ${bookColors.text}`
                  }`}>
                  {isComplete ? "✓" : chapter.chapterNumber || idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 dark:text-white">
                    {chapter.title}
                  </p>
                  {chapter.description && (
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                      {chapter.description}
                    </p>
                  )}
                </div>
                <BookmarkButton
                  chapterId={chapter._id}
                  chapterTitle={chapter.title}
                  subject={chapter.subject}
                  classLevel={chapter.classLevel}
                  slug={chapter.slug}
                  subjectId={subjectId}                // already available from useParams
                  bookName={book?.dbBook || null}      // from BookChapters only
                  bookId={bookId}                      // from BookChapters only
                  size="sm"
                />
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default BookChapters;