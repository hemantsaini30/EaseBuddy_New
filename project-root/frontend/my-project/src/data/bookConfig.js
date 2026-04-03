// Subjects that have multiple books before showing chapters
export const MULTI_BOOK_SUBJECTS = ["english", "social-science", "hindi"];

export const BOOKS = {
  english: [
    {
      id: "first-flight",
      title: "First Flight",
      subtitle: "Main Textbook",
      icon: "✈️",
      color: "yellow",
      dbSubject: "English",         // matches Chapter.subject in MongoDB
      dbBook: "First Flight",       // matches Chapter.book field (add this below)
      chapterCount: 10,
      description: "Prose and poetry chapters",
    },
    {
      id: "footprints-without-feet",
      title: "Footprints Without Feet",
      subtitle: "Supplementary Reader",
      icon: "👣",
      color: "orange",
      dbSubject: "English",
      dbBook: "Footprints Without Feet",
      chapterCount: 10,
      description: "Short stories and novelettes",
    },
  ],

  hindi: [
    {
      id: "kshitij",
      title: "Kshitij",
      subtitle: "Gadya Khand + Kavya Khand",
      icon: "📜",
      color: "orange",
      dbSubject: "Hindi",
      dbBook: "Kshitij",
      chapterCount: 17,
      description: "Main Hindi textbook",
    },
    {
      id: "kritika",
      title: "Kritika",
      subtitle: "Supplementary Reader",
      icon: "🪔",
      color: "red",
      dbSubject: "Hindi",
      dbBook: "Kritika",
      chapterCount: 5,
      description: "Supplementary prose",
    },
    {
      id: "sparsh",
      title: "Sparsh",
      subtitle: "Gadya + Kavya",
      icon: "🎵",
      color: "purple",
      dbSubject: "Hindi",
      dbBook: "Sparsh",
      chapterCount: 17,
      description: "Class 10 prose and poetry",
    },
    {
      id: "sanchayan",
      title: "Sanchayan",
      subtitle: "Supplementary Reader",
      icon: "📚",
      color: "green",
      dbSubject: "Hindi",
      dbBook: "Sanchayan",
      chapterCount: 3,
      description: "Supplementary stories",
    },
  ],

  "social-science": [
    {
      id: "history",
      title: "India and the Contemporary World",
      subtitle: "History",
      icon: "🏛️",
      color: "amber",
      dbSubject: "Social Science",
      dbBook: "History",
      chapterCount: 5,
      description: "Rise of nationalism, industrialisation, print culture",
    },
    {
      id: "geography",
      title: "Contemporary India",
      subtitle: "Geography",
      icon: "🌏",
      color: "green",
      dbSubject: "Social Science",
      dbBook: "Geography",
      chapterCount: 7,
      description: "Resources, agriculture, forests, water, minerals",
    },
    {
      id: "civics",
      title: "Democratic Politics",
      subtitle: "Civics / Political Science",
      icon: "🏛️",
      color: "blue",
      dbSubject: "Social Science",
      dbBook: "Civics",
      chapterCount: 8,
      description: "Power sharing, federalism, democracy and diversity",
    },
    {
      id: "economics",
      title: "Understanding Economic Development",
      subtitle: "Economics",
      icon: "📊",
      color: "purple",
      dbSubject: "Social Science",
      dbBook: "Economics",
      chapterCount: 5,
      description: "Development, sectors, money, globalisation",
    },
  ],
};

// Color map for book cards
export const BOOK_COLORS = {
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    border: "border-yellow-300 dark:border-yellow-700",
    text: "text-yellow-700 dark:text-yellow-300",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950",
    border: "border-orange-300 dark:border-orange-700",
    text: "text-orange-700 dark:text-orange-300",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-700 dark:text-red-300",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-700 dark:text-green-300",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950",
    border: "border-purple-300 dark:border-purple-700",
    text: "text-purple-700 dark:text-purple-300",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
};