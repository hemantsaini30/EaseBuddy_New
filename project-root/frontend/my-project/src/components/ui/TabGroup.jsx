/**
 * Horizontal tab strip
 * @param {Array} tabs - [{ id, label }]
 * @param {string} active - currently active tab id
 * @param {Function} onChange - called with tab id on click
 */
const TabGroup = ({ tabs, active, onChange }) => (
  <div className="flex gap-1 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors
          ${
            active === tab.id
              ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabGroup;
