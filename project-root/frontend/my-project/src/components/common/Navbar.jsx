import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../hooks/useDarkMode";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
        >
          ☰
        </button>

        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            EaseBuddy
          </span>
        </Link>
      </div>

      {/* Center */}
      <div className="hidden flex-1 max-w-md mx-6 md:block">
        <input
          type="search"
          placeholder="Search chapter or topic…"
          className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="rounded-full p-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {user && (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-gray-600 dark:text-gray-300 md:block">
              {user.name}
            </span>

            {/* ✅ Clickable Avatar with Streak */}
            <div
              onClick={() => navigate("/profile")}
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 transition hover:ring-2 hover:ring-indigo-400 dark:bg-indigo-900 dark:text-indigo-300"
              title="View Profile"
            >
              {user.name?.charAt(0).toUpperCase()}

              {/* 🔥 Streak Badge */}
              {(user?.streak || 0) > 0 && (
                <div className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-400 px-0.5 text-[9px] font-bold text-white">
                  {user.streak > 99 ? "99+" : user.streak}
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="rounded-lg px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;