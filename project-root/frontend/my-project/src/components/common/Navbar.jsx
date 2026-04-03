import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../hooks/useDarkMode";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">EaseBuddy</span>
        </Link>
      </div>

      {/* Center: Search bar */}
      <div className="hidden flex-1 max-w-md mx-6 md:block">
        <input
          type="search"
          placeholder="Search chapter or topic…"
          className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Right: Dark mode + User */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="rounded-full p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-gray-600 dark:text-gray-300 md:block">{user.name}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {user.name?.charAt(0).toUpperCase()}
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
