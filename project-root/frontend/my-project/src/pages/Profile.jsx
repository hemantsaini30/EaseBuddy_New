import { useState, useEffect } from "react";
import { useNavigate }          from "react-router-dom";
import Layout                   from "../components/common/Layout";
import Loader                   from "../components/common/Loader";
import ActivityCalendar         from "../components/profile/ActivityCalendar";
import { useAuth }              from "../context/AuthContext";
import { activityService }      from "../services/activityService";
import { SUBJECTS }             from "../utils/constants";

// ── Section chip ──────────────────────────────────────────
const SECTION_LABELS = {
  video:   { label: "Video",    icon: "📹", color: "bg-blue-100   text-blue-700   dark:bg-blue-900   dark:text-blue-300"   },
  ncert:   { label: "NCERT",    icon: "📄", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
  pyq:     { label: "PYQ",      icon: "📝", color: "bg-amber-100  text-amber-700  dark:bg-amber-900  dark:text-amber-300"  },
  book:    { label: "Book",     icon: "📚", color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  mcq:     { label: "Quiz",     icon: "🧪", color: "bg-green-100  text-green-700  dark:bg-green-900  dark:text-green-300"  },
  formula: { label: "Formulas", icon: "📐", color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
};

// ── Stat card ─────────────────────────────────────────────
const StatCard = ({ label, value, icon, color }) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
    <div className="mb-1 flex items-center gap-1.5">
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

// ── Activity feed item ─────────────────────────────────────
const ActivityItem = ({ activity }) => {
  const sec    = SECTION_LABELS[activity.section] || { label: activity.section, icon: "✅", color: "bg-gray-100 text-gray-600" };
  const subj   = SUBJECTS.find(s => s.label === activity.subject);
  const time   = new Date(activity.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const date   = new Date(activity.timestamp);
  const today  = new Date();
  const isToday    = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString();
  const dateLabel  = isToday ? "Today" : isYesterday ? "Yesterday" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      {/* Subject icon circle */}
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm
        ${subj?.bgClass || "bg-gray-100 dark:bg-gray-800"}`}>
        {subj?.icon || "📖"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {activity.chapterTitle || activity.subject || "Chapter"}
        </p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sec.color}`}>
            {sec.icon} {sec.label}
          </span>
          {activity.subject && (
            <span className="text-[10px] text-gray-400">{activity.subject}</span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-[10px] text-gray-400">{dateLabel}</p>
        <p className="text-[10px] text-gray-300 dark:text-gray-600">{time}</p>
      </div>
    </div>
  );
};

// ── Streak fire display ───────────────────────────────────
const StreakDisplay = ({ streak, longestStreak }) => {
  const flameSize = Math.min(streak * 4 + 40, 80);
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950">
      <div style={{ fontSize: `${flameSize}px`, lineHeight: 1 }}>🔥</div>
      <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{streak}</p>
      <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Day Streak</p>
      {longestStreak > 0 && (
        <p className="text-xs text-amber-600 dark:text-amber-400 opacity-70">
          Best: {longestStreak} days
        </p>
      )}
    </div>
  );
};

// ── Subject breakdown bar ─────────────────────────────────
const SubjectBar = ({ subject, count, max }) => {
  const meta = SUBJECTS.find(s => s.label === subject);
  const pct  = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 text-center text-sm flex-shrink-0">{meta?.icon || "📚"}</span>
      <div className="flex-1">
        <div className="mb-0.5 flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">{subject}</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{count}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: meta?.accentColor || "#6366F1" }}
          />
        </div>
      </div>
    </div>
  );
};

// ── Main Profile Page ─────────────────────────────────────
const Profile = () => {
  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const [calendar, setCalendar] = useState({});
  const [recent,   setRecent]   = useState([]);
  const [stats,    setStats]    = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [cal, rec, st] = await Promise.all([
          activityService.getCalendar(),
          activityService.getRecent(20),
          activityService.getStats(),
        ]);
        setCalendar(cal);
        setRecent(rec);
        setStats(st);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const maxSubject = stats?.subjectBreakdown?.[0]?.count || 1;

  return (
    <Layout>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back
      </button>

      {loading ? <Loader /> : (
        <div className="flex flex-col gap-6 pb-12">

          {/* ── Profile header card ── */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

            {/* Cover banner */}
            <div
              className="h-24 w-full"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)"
              }}
            />

            {/* Avatar + info */}
            <div className="px-5 pb-5">
              <div className="flex items-end justify-between -mt-8 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-indigo-600 text-xl font-black text-white dark:border-gray-900">
                  {initials}
                </div>
                <button
                  onClick={logout}
                  className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                >
                  Logout
                </button>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-black text-gray-900 dark:text-white">{user?.name}</h1>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      Class {user?.classLevel} CBSE
                    </span>
                    {user?.school && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        🏫 {user.school}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Day Streak"    value={user?.streak || 0}              icon="🔥" color="text-amber-500"  />
            <StatCard label="Longest Streak" value={user?.longestStreak || 0}       icon="🏆" color="text-yellow-500" />
            <StatCard label="Active Days"   value={stats?.totalActiveDays || 0}    icon="📅" color="text-green-600"  />
            <StatCard label="Sections Done" value={user?.totalSectionsDone || stats?.totalSections || 0} icon="✅" color="text-indigo-600" />
          </div>

          {/* ── This week / this month ── */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <p className="text-xs text-green-600 dark:text-green-400 mb-1">This Week</p>
              <p className="text-2xl font-black text-green-700 dark:text-green-300">
                {stats?.thisWeekDays || 0}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">active days</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">This Month</p>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-300">
                {stats?.thisMonthDays || 0}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">active days</p>
            </div>
          </div>

          {/* ── Activity calendar ── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800 dark:text-white">
                Study Activity
              </h2>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                Last 365 days
              </span>
            </div>
            <ActivityCalendar data={calendar} />
          </div>

          {/* ── Subject breakdown ── */}
          {stats?.subjectBreakdown?.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h2 className="mb-4 text-base font-bold text-gray-800 dark:text-white">
                Activity by Subject
              </h2>
              <div className="flex flex-col gap-3">
                {stats.subjectBreakdown.map((s) => (
                  <SubjectBar
                    key={s._id}
                    subject={s._id}
                    count={s.count}
                    max={maxSubject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Recent activity ── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-base font-bold text-gray-800 dark:text-white">
              Recent Activity
            </h2>

            {recent.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-4xl">📖</p>
                <p className="mt-2 text-sm text-gray-400">
                  No activity yet — start studying to see your history here!
                </p>
              </div>
            ) : (
              <div>
                {recent.map((activity, i) => (
                  <ActivityItem key={activity._id || i} activity={activity} />
                ))}
              </div>
            )}
          </div>

          {/* ── Motivational footer ── */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-center dark:border-indigo-800 dark:bg-indigo-950">
            {(user?.streak || 0) >= 7 ? (
              <>
                <p className="text-2xl mb-1">🏆</p>
                <p className="font-bold text-indigo-700 dark:text-indigo-300">
                  {user.streak}+ day streak! You're on fire!
                </p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-0.5">
                  Keep going — consistency beats perfection.
                </p>
              </>
            ) : (user?.streak || 0) >= 3 ? (
              <>
                <p className="text-2xl mb-1">🔥</p>
                <p className="font-bold text-indigo-700 dark:text-indigo-300">
                  {user.streak} day streak — great momentum!
                </p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-0.5">
                  Study something today to keep it going.
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-1">📚</p>
                <p className="font-bold text-indigo-700 dark:text-indigo-300">
                  Start your streak today!
                </p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-0.5">
                  Mark any section as done to begin your 🔥 streak.
                </p>
              </>
            )}
          </div>

        </div>
      )}
    </Layout>
  );
};

export default Profile;