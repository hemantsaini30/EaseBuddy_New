import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 text-center dark:bg-gray-950">
    <span className="text-7xl">📭</span>
    <h1 className="mt-4 text-4xl font-black text-gray-800 dark:text-white">404</h1>
    <p className="mt-2 text-gray-500">Page not found. Let's get you back on track.</p>
    <Link
      to="/dashboard"
      className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
    >
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;
