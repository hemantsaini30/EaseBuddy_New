import { useState } from "react";
import AboutModal from "./AboutModal";
import FeedbackModal from "./FeedbackModal";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <footer className="border-t border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 text-xs text-gray-400">

          {/* Brand */}
          <span className="font-semibold text-gray-500 dark:text-gray-400">
            📚 EaseBuddy
          </span>

          <span className="hidden text-gray-200 dark:text-gray-700 sm:inline">|</span>

          {/* About button */}
          <button
            onClick={() => setShowAbout(true)}
            className="hover:text-indigo-500 transition"
          >
            About the project
          </button>

          {/* Support email */}
          <a
            href="mailto:hemantsaini9310@gmail.com"
            className="hover:text-indigo-500 transition"
          >
            Support
          </a>

          {/* Feedback */}
          <button
            onClick={() => setShowFeedback(true)}
            className="hover:text-indigo-500 transition"
          >
            Feedback
          </button>

          {/* Privacy */}
          <button
            onClick={() =>
              alert(
                "Privacy Policy: EaseBuddy does not sell or share your data. Your study data is only used to show you your own progress."
              )
            }
            className="hover:text-indigo-500 transition"
          >
            Privacy Policy
          </button>

          <span className="text-gray-300 dark:text-gray-700">·</span>
          <span>
            © {new Date().getFullYear()} EaseBuddy — Made with ❤️ for CBSE students
          </span>
        </div>
      </footer>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
};

export default Footer;