import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import TabGroup from "../components/ui/TabGroup";
import VideoSection from "../components/chapter/VideoSection";
import NotesSection from "../components/chapter/NotesSection";
import PYQSection from "../components/chapter/PYQSection";
import QuestionBank from "../components/chapter/QuestionBank";
import { resourceService } from "../services/resourceService";
import { useProgress } from "../hooks/useProgress";
import BookmarkButton from "../components/common/BookmarkButton";
import FormulaSheet, { FORMULA_SUBJECTS } from "../components/chapter/FormulaSheet";
import BackButton from "../components/common/BackButton";

// ── Move getTabs OUTSIDE the component ───────────────────
// so it doesn't get recreated on every render
const getTabs = (subject) => {
  const base = [
    { id: "video",   label: "📹 Videos"   },
    { id: "ncert",   label: "📄 NCERT"    },
    { id: "pyq",     label: "📝 PYQs"     },
    { id: "book",    label: "📚 Books"    },
    { id: "formula", label: "📐 Formulas" },
    { id: "mcq",     label: "🧪 Quiz"     },
  ];
  if (!FORMULA_SUBJECTS.includes(subject)) {
    return base.filter((t) => t.id !== "formula");
  }
  return base;
};

const ChapterDetails = () => {
  const { slug } = useParams();
  const [chapter, setChapter]   = useState(null);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState("video");
  const [loading, setLoading]   = useState(true);
  const { markSection, getChapterProgress } = useProgress();
  const [done, setDone] = useState(false);

  // tabs depends on chapter.subject — recomputes whenever chapter changes
  const tabs = getTabs(chapter?.subject);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ch = await resourceService.getChapterBySlug(slug);
        setChapter(ch);
        const res = await resourceService.getResources(ch._id);
        setResources(res);
      } catch (err) {
        console.error("Failed to load chapter:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <Layout><Loader /></Layout>;
  if (!chapter) return <Layout><p className="text-red-500">Chapter not found.</p></Layout>;

  const byType  = (type) => resources.filter((r) => r.type === type);
  const progress = getChapterProgress(chapter._id);

  const handleMarkSection = async (section) => {
    setLoading(true);
    try {
       await markSection(chapter._id, chapter.subject, chapter.classLevel, section);
       setDone(true);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <Layout
      activeSubject={chapter.subject?.toLowerCase().replace(" ", "-")}
      chapterTitle={chapter.title}
      subject={chapter.subject}
    >
       <BackButton className="mb-4" />
      {/* Chapter header */}
      <div className="mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
          {chapter.subject} · Chapter {chapter.chapterNumber}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {chapter.title}
          </h1>
          <BookmarkButton
            chapterId={chapter._id}
            chapterTitle={chapter.title}
            subject={chapter.subject}
            classLevel={chapter.classLevel}
            slug={chapter.slug}
            subjectId={chapter.subject?.toLowerCase().replace(" ", "-")}
            bookName={chapter.book}
            size="lg"
            showLabel
          />
        </div>
        {chapter.description && (
          <p className="mt-1 text-sm text-gray-500">{chapter.description}</p>
        )}
      </div>

      {/* Progress pills — now uses `tabs` instead of RESOURCE_TABS */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs
          .filter((tab) => tab.id !== "formula") // formulas don't need a completion pill
          .map((tab) => {
            const done = progress?.completedSections?.[tab.id];
            return (
              <span
                key={tab.id}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  done
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {done ? "✓" : "○"} {tab.label.replace(/^\S+\s/, "")}
              </span>
            );
          })}
        {progress?.isChapterComplete && (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            🎉 Chapter Complete!
          </span>
        )}
      </div>

      {/* Tab strip */}
      <TabGroup tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "video"   && <VideoSection videos={byType("video")} />}
        {activeTab === "ncert"   && <NotesSection resource={byType("ncert")[0]} />}
        {activeTab === "pyq"     && <PYQSection pyqs={byType("pyq")} subject={chapter.subject} />}
        {activeTab === "formula" && (
          <FormulaSheet
            chapterId={chapter._id}
            chapterName={chapter.title}
            subject={chapter.subject}
          />
        )}
        {activeTab === "mcq" && (
          <QuestionBank
            questions={byType("mcq")}
            chapterId={chapter._id}
            subject={chapter.subject}
            classLevel={chapter.classLevel}
          />
        )}
        {activeTab === "book" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {byType("book").length === 0 ? (
              <p className="col-span-2 text-center text-sm text-gray-400">
                Reference books coming soon.
              </p>
            ) : (
              byType("book").map((b) => (
                <div key={b._id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-white">{b.bookTitle}</p>
                  <p className="text-sm text-gray-500">{b.bookAuthor}</p>
                  {b.driveFileId && (
                    <a
                      href={`https://drive.google.com/file/d/${b.driveFileId}/preview`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-indigo-500 hover:underline"
                    >
                      📄 Preview PDF
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Mark Complete — hidden on formula tab */}
        {activeTab !== "formula" && !progress?.completedSections?.[activeTab] && (
          <div className="mt-8">
            <button
              onClick={() => handleMarkSection(activeTab)}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              ✅ Mark {tabs.find((t) => t.id === activeTab)?.label} as Complete
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChapterDetails;