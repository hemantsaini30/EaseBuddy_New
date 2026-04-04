import { NavLink } from "react-router-dom";
import { SUBJECTS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, onClose, chapters = [], activeSubject = null }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Class badge */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
          <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 dark:bg-indigo-950">
            <span className="text-lg">🎓</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current Class</p>
              <p className="font-semibold text-indigo-700 dark:text-indigo-300">
                Class {user?.classLevel || 10} — CBSE
              </p>
            </div>
          </div>
        </div>

        {/* Subject navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Subjects
          </p>
          {SUBJECTS.map((subject) => (
            <NavLink
              key={subject.id}
              to={`/subject/${subject.id}`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                 ${
                   isActive
                     ? `${subject.bgClass} ${subject.textClass} font-semibold`
                     : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                 }`
              }
            >
              <span className="text-xl">{subject.icon}</span>
              {subject.label}
            </NavLink>
          ))}
          {/* Mock Test link */}
          <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
            <NavLink
              to="/mock-test"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span className="text-xl">📝</span>
              Mock Test
            </NavLink>
            <NavLink
              to="/performance"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span className="text-xl">📊</span>
              Performance
            </NavLink>
          </div>

          {/* Chapter list (shown when a subject is selected) */}
          {activeSubject && chapters.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Chapters
              </p>
              {chapters.map((ch, idx) => (
                <NavLink
                  key={ch._id || ch.slug || idx}
                  to={`/chapter/${ch.slug}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition
                     ${
                       isActive
                         ? "bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950 dark:text-indigo-300"
                         : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                     }`
                  }
                >
                  <span
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                      ch.completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                  {ch.title}
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        {/* Footer: streak */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>🔥</span>
            <span>{user?.streak || 0} day streak</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
