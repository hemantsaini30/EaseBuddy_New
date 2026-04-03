/**
 * Get a random motivational tip
 */
export const getRandomTip = (tips) => tips[Math.floor(Math.random() * tips.length)];

/**
 * Calculate overall completion % across all subjects
 * @param {Array} progressArray - Progress records from API
 * @param {number} totalChapters - Total number of chapters
 */
export const calcOverallProgress = (progressArray, totalChapters) => {
  if (!totalChapters) return 0;
  const completed = progressArray.filter((p) => p.isChapterComplete).length;
  return Math.round((completed / totalChapters) * 100);
};

/**
 * Build Google Drive embed URL from file ID
 * @param {string} fileId - Google Drive file ID
 */
export const getDriveEmbedUrl = (fileId) => `https://drive.google.com/file/d/${fileId}/preview`;

/**
 * Build Google Drive download URL from file ID
 */
export const getDriveDownloadUrl = (fileId) => `https://drive.google.com/uc?export=download&id=${fileId}`;

/**
 * Build YouTube embed URL from video ID
 */
export const getYouTubeEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`;

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

/**
 * Format date to readable string
 */
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
