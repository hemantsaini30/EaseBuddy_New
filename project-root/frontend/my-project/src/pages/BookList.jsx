import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { BOOKS, BOOK_COLORS, MULTI_BOOK_SUBJECTS } from "../data/bookConfig";
import { SUBJECTS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const BookList = () => {
  const { subjectId } = useParams();
  const navigate      = useNavigate();
  const { user }      = useAuth();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const books   = BOOKS[subjectId] || [];

  // Safety: if somehow a non-multi-book subject hits this page, redirect
  if (!MULTI_BOOK_SUBJECTS.includes(subjectId)) {
    navigate(`/subject/${subjectId}`, { replace: true });
    return null;
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
        <button onClick={() => navigate("/dashboard")} className="hover:text-gray-600 dark:hover:text-gray-300">
          Dashboard
        </button>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">{subject?.label}</span>
      </div>

      {/* Subject header */}
      <div className={`mb-8 flex items-center gap-4 rounded-2xl border-2 p-6 ${subject?.bgClass} ${subject?.borderClass}`}>
        <span className="text-5xl">{subject?.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {subject?.label}
          </h1>
          <p className={`text-sm font-semibold ${subject?.textClass}`}>
            Class {user?.classLevel} CBSE — {books.length} books
          </p>
        </div>
      </div>

      {/* Book grid */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-700 dark:text-gray-300">
          Select a Book
        </h2>
        <p className="text-sm text-gray-400">Choose a book to view its chapters</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const c = BOOK_COLORS[book.color];
          return (
            <button
              key={book.id}
              onClick={() => navigate(`/subject/${subjectId}/book/${book.id}`)}
              className={`group flex flex-col gap-4 rounded-2xl border-2 p-5 text-left transition
                hover:-translate-y-1 hover:shadow-md active:translate-y-0
                ${c.bg} ${c.border}`}
            >
              {/* Icon + badge */}
              <div className="flex items-start justify-between">
                <span className="text-4xl">{book.icon}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                  {book.subtitle}
                </span>
              </div>

              {/* Title */}
              <div>
                <p className={`font-bold text-base ${c.text}`}>{book.title}</p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  {book.description}
                </p>
              </div>

              {/* Chapter count */}
              <div className={`flex items-center gap-1.5 border-t pt-3 ${c.border} border-opacity-50`}>
                <span className="text-lg">📄</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {book.chapterCount} chapters
                </span>
                <span className={`ml-auto text-sm font-semibold ${c.text}`}>
                  View →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Layout>
  );
};

export default BookList;