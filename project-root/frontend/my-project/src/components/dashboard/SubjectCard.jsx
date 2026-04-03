import { useNavigate } from "react-router-dom";

/**
 * Large clickable card for each subject on the dashboard
 */
const SubjectCard = ({ subject, stats }) => {
  const navigate = useNavigate();
  const pct = stats?.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <button
      onClick={() => navigate(`/subject/${subject.id}`)}
      className={`group relative w-full overflow-hidden rounded-2xl border-2 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0
        ${subject.bgClass} ${subject.borderClass}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-4xl">{subject.icon}</span>
        <span className={`text-sm font-bold ${subject.textClass}`}>{pct}%</span>
      </div>
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-white">{subject.label}</h3>
      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        {stats?.completed ?? 0} / {stats?.total ?? "—"} chapters done
      </p>
      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: subject.accentColor }}
        />
      </div>
    </button>
  );
};

export default SubjectCard;
