import { useBookmarks } from "../../context/BookmarkContext";

/**
 * Bookmark toggle button.
 * Pass all chapter metadata so it can be saved without
 * a separate API call when adding.
 *
 * Props:
 *   chapterId, chapterTitle, subject, classLevel,
 *   slug, subjectId, bookName (optional), bookId (optional)
 *   size: "sm" | "md" | "lg"
 *   showLabel: show "Bookmark" / "Bookmarked" text
 */
const BookmarkButton = ({
  chapterId,
  chapterTitle,
  subject,
  classLevel,
  slug,
  subjectId,
  bookName  = null,
  bookId    = null,
  size      = "md",
  showLabel = false,
  className = "",
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(chapterId);

  const sizeMap = {
    sm: { icon: "16", pad: "p-1.5",  text: "text-xs" },
    md: { icon: "18", pad: "p-2",    text: "text-sm" },
    lg: { icon: "20", pad: "p-2.5",  text: "text-sm" },
  };
  const s = sizeMap[size];

  const handleClick = (e) => {
    // Stop propagation so clicking bookmark on a card
    // doesn't also navigate to the chapter
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark({
      chapterId, chapterTitle, subject,
      classLevel, slug, subjectId,
      bookName, bookId,
    });
  };

  return (
    <button
      onClick={handleClick}
      title={saved ? "Remove bookmark" : "Bookmark this chapter"}
      className={`flex items-center gap-1.5 rounded-lg transition
        ${s.pad}
        ${saved
          ? "text-amber-500 hover:text-amber-600"
          : "text-gray-400 hover:text-amber-500"
        }
        hover:bg-amber-50 dark:hover:bg-amber-950
        ${className}`}
    >
      {/* Bookmark SVG — filled when saved */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>

      {showLabel && (
        <span className={`font-medium ${s.text} ${saved ? "text-amber-500" : "text-gray-500"}`}>
          {saved ? "Bookmarked" : "Bookmark"}
        </span>
      )}
    </button>
  );
};

export default BookmarkButton;