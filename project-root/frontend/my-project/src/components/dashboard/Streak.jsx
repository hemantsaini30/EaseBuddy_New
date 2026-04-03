/**
 * Displays current day streak and today's motivational tip
 */
const Streak = ({ streak = 0, tip = "" }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950 sm:flex-row sm:items-center">
    <div className="flex items-center gap-3">
      <span className="text-4xl">🔥</span>
      <div>
        <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{streak} Days</p>
        <p className="text-xs text-amber-700 dark:text-amber-300">Study Streak</p>
      </div>
    </div>
    <div className="sm:border-l sm:border-amber-200 sm:pl-4 sm:dark:border-amber-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
        💡 Today's Tip
      </p>
      <p className="mt-0.5 text-sm text-amber-800 dark:text-amber-200">{tip}</p>
    </div>
  </div>
);

export default Streak;
