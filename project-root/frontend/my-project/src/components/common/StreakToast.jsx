import { useEffect, useState } from "react";
import { useAuth }             from "../../context/AuthContext";

/**
 * Listens for streak changes and shows a toast.
 * Mount this once inside Layout.
 */
const StreakToast = () => {
  const { user }                  = useAuth();
  const [toast, setToast]         = useState(null);
  const [prevStreak, setPrevStreak] = useState(null);

  useEffect(() => {
    if (user?.streak === undefined) return;

    // On first load, just record
    if (prevStreak === null) {
      setPrevStreak(user.streak);
      return;
    }

    // Streak increased
    if (user.streak > prevStreak) {
      const msg = user.streak === 1
        ? "🔥 Streak started! Study every day to keep it."
        : user.streak % 7 === 0
        ? `🏆 ${user.streak} day streak! One week of consistency!`
        : user.streak % 30 === 0
        ? `🌟 ${user.streak} days! You're unstoppable!`
        : `🔥 ${user.streak} day streak! Keep going!`;

      setToast({ msg, type: "streak" });
      setPrevStreak(user.streak);
    }
    // Streak reset detected
    else if (user.streak === 1 && prevStreak > 1) {
      setToast({ msg: `Streak reset — but you're back! 💪`, type: "reset" });
      setPrevStreak(user.streak);
    }
  }, [user?.streak]);

  // Auto dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-5 py-3 shadow-xl
        transition-all duration-300 sm:bottom-6
        ${toast.type === "streak"
          ? "bg-amber-500 text-white"
          : "bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900"}`}
      style={{ maxWidth: "calc(100vw - 32px)" }}
    >
      <p className="text-sm font-semibold whitespace-nowrap">{toast.msg}</p>
    </div>
  );
};

export default StreakToast;