import { useMemo, useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["","Mon","","Wed","","Fri",""];

/**
 * GitHub / LeetCode-style activity calendar
 * @param {Object} data — { "2024-01-15": 3, "2024-01-16": 1, ... }
 */
const ActivityCalendar = ({ data = {} }) => {
  const [tooltip, setTooltip] = useState(null); // { x, y, date, count }

  // Build 52 weeks × 7 days grid
  const { weeks, monthLabels } = useMemo(() => {
    const today    = new Date();
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - 363); // 52 weeks back
    // Align to Sunday
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeks      = [];
    const monthSeen  = {};
    const monthLbls  = [];

    let cur = new Date(startDay);
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = cur.toISOString().split("T")[0];
        const count   = data[dateStr] || 0;
        const isFuture = cur > today;

        // Track month label position
        if (cur.getDate() <= 7 && !monthSeen[cur.getMonth()]) {
          monthSeen[cur.getMonth()] = true;
          monthLbls.push({ week: w, label: MONTHS[cur.getMonth()] });
        }

        week.push({ dateStr, count, isFuture, dow: d });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    return { weeks, monthLabels: monthLbls };
  }, [data]);

  const getColor = (count, isFuture) => {
    if (isFuture) return "bg-gray-100 dark:bg-gray-800";
    if (count === 0) return "bg-gray-200 dark:bg-gray-700";
    if (count === 1) return "bg-green-200 dark:bg-green-900";
    if (count === 2) return "bg-green-400 dark:bg-green-700";
    if (count <= 4) return "bg-green-500 dark:bg-green-600";
    return "bg-green-700 dark:bg-green-500";
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
  };

  const totalActive = Object.values(data).filter(v => v > 0).length;
  const totalDone   = Object.values(data).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full">
      {/* Summary */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-white">{totalDone}</span>{" "}
          sections done across{" "}
          <span className="font-semibold text-gray-800 dark:text-white">{totalActive}</span>{" "}
          days in the last year
        </p>
        {/* Legend */}
        <div className="hidden items-center gap-1 sm:flex">
          <span className="text-xs text-gray-400">Less</span>
          {["bg-gray-200 dark:bg-gray-700","bg-green-200 dark:bg-green-900","bg-green-400 dark:bg-green-700","bg-green-500 dark:bg-green-600","bg-green-700 dark:bg-green-500"].map((c, i) => (
            <span key={i} className={`h-3 w-3 rounded-sm ${c}`} />
          ))}
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-0 min-w-max">

          {/* Month labels */}
          <div className="mb-1 flex gap-[3px] pl-8">
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find(m => m.week === wi);
              return (
                <div key={wi} className="w-[11px] text-[9px] text-gray-400">
                  {lbl ? lbl.label : ""}
                </div>
              );
            })}
          </div>

          {/* Grid rows (days of week) */}
          {[0,1,2,3,4,5,6].map((dow) => (
            <div key={dow} className="flex items-center gap-0">
              {/* Day label */}
              <span className="w-7 pr-1 text-right text-[9px] text-gray-400 flex-shrink-0">
                {DAYS[dow]}
              </span>
              {/* Cells */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => {
                  const cell = week[dow];
                  if (!cell) return <div key={wi} className="h-[11px] w-[11px]" />;
                  return (
                    <div
                      key={wi}
                      className={`relative h-[11px] w-[11px] cursor-pointer rounded-sm transition-transform hover:scale-125 ${getColor(cell.count, cell.isFuture)}`}
                      onMouseEnter={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        setTooltip({ dateStr: cell.dateStr, count: cell.count });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      title={cell.isFuture ? "" : `${formatDate(cell.dateStr)}: ${cell.count} section${cell.count !== 1 ? "s" : ""} done`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && !tooltip.isFuture && (
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white dark:bg-gray-100 dark:text-gray-900">
          <span className={`h-2 w-2 rounded-sm ${getColor(tooltip.count, false)}`} />
          <span className="font-medium">{formatDate(tooltip.dateStr)}</span>
          <span className="text-gray-300 dark:text-gray-500">—</span>
          <span>{tooltip.count} section{tooltip.count !== 1 ? "s" : ""} done</span>
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;