// Base URL for all API calls
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Subject metadata: color, icon, route
export const SUBJECTS = [
  {
    id: "mathematics",
    label: "Mathematics",
    icon: "📐",
    color: "blue",
    accentColor: "#3B82F6",
    bgClass: "bg-blue-50 dark:bg-blue-950",
    borderClass: "border-blue-400",
    textClass: "text-blue-600",
  },
  {
    id: "science",
    label: "Science",
    icon: "⚗️",
    color: "green",
    accentColor: "#22C55E",
    bgClass: "bg-green-50 dark:bg-green-950",
    borderClass: "border-green-400",
    textClass: "text-green-600",
  },
  {
    id: "english",
    label: "English",
    icon: "📖",
    color: "yellow",
    accentColor: "#EAB308",
    bgClass: "bg-yellow-50 dark:bg-yellow-950",
    borderClass: "border-yellow-400",
    textClass: "text-yellow-600",
  },
  {
    id: "hindi",
    label: "Hindi",
    icon: "🅗",
    color: "orange",
    accentColor: "#F97316",
    bgClass: "bg-orange-50 dark:bg-orange-950",
    borderClass: "border-orange-400",
    textClass: "text-orange-600",
  },
  {
    id: "social-science",
    label: "Social Science",
    icon: "🌍",
    color: "purple",
    accentColor: "#A855F7",
    bgClass: "bg-purple-50 dark:bg-purple-950",
    borderClass: "border-purple-400",
    textClass: "text-purple-600",
  },
];

export const CLASS_LEVELS = [6, 7, 8, 9, 10];

export const RESOURCE_TABS = [
  { id: "video", label: "📹 Videos" },
  { id: "ncert", label: "📄 NCERT" },
  { id: "pyq", label: "📝 PYQs" },
  { id: "book", label: "📚 Books" },
  { id: "mcq", label: "🧪 Quiz" },
];

export const MOTIVATIONAL_TIPS = [
  "Consistency beats perfection. Study a little every day.",
  "Every chapter you complete brings you closer to your goal.",
  "Your future self will thank you for studying today.",
  "Break big topics into small pieces — one at a time.",
  "Review yesterday's notes before starting today's chapter.",
];
