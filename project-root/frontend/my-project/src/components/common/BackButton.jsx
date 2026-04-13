import { useNavigate } from "react-router-dom";

/**
 * Reusable back button
 * @param {string} to       — optional: explicit path to go back to
 * @param {string} label    — optional: custom label (default: "Back")
 * @param {string} className — optional: extra classes
 */
const BackButton = ({ to = null, label = "Back", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      // Go back in browser history
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium
        text-gray-500 transition hover:bg-gray-100 hover:text-gray-800
        dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white
        ${className}`}
    >
      {/* Left arrow */}
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;