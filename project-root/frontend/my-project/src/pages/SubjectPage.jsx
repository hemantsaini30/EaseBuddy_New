import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { resourceService } from "../services/resourceService";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";
import { SUBJECTS } from "../utils/constants";
import { MULTI_BOOK_SUBJECTS } from "../data/bookConfig";  // NEW IMPORT
import BookList from "./BookList";                           // NEW IMPORT

const SubjectPage = () => {
  const { subjectId } = useParams();
  const { user }      = useAuth();
  const { getChapterProgress } = useProgress();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const subject = SUBJECTS.find((s) => s.id === subjectId);

  

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await resourceService.getChapters(
          subject?.label,
          user?.classLevel
        );
        setChapters(data);
      } catch (err) {
        setError("Failed to load chapters.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [subjectId, user?.classLevel]);
  // ── KEY CHANGE: multi-book subjects show BookList instead ──
  if (MULTI_BOOK_SUBJECTS.includes(subjectId)) {
    return <BookList />;
  }

  if (!subject) return <Layout><p className="text-red-500">Subject not found.</p></Layout>;

  return (
    <Layout activeSubject={subjectId} chapters={chapters}>
      <div className={`mb-8 flex items-center gap-4 rounded-2xl border-2 p-6 ${subject.bgClass} ${subject.borderClass}`}>
        <span className="text-5xl">{subject.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">{subject.label}</h1>
          <p className={`text-sm font-semibold ${subject.textClass}`}>
            Class {user?.classLevel} CBSE — {chapters.length} chapters
          </p>
        </div>
      </div>

      {loading ? <Loader /> : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
      ) : chapters.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
          <p className="text-4xl">{subject.icon}</p>
          <p className="mt-2 text-gray-400">No chapters found for Class {user?.classLevel}.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter, idx) => {
            const prog = getChapterProgress(chapter._id);
            const isComplete = prog?.isChapterComplete;
            return (
              <Link key={chapter._id} to={`/chapter/${chapter.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold
                  ${isComplete ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : `${subject.bgClass} ${subject.textClass}`}`}>
                  {isComplete ? "✓" : chapter.chapterNumber || idx + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 dark:text-white">{chapter.title}</p>
                  {chapter.description && (
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">{chapter.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default SubjectPage;