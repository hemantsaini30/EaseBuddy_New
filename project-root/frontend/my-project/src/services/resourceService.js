import api from "./api";


export const resourceService = {
  /** Fetch all chapters for a subject + class */
  getChapters: async (subject, classLevel, book = null) => {
    const { data } = await api.get("/chapters", {
      params: { subject, classLevel, ...(book && { book }) },
    });
    return data.data;
  },

  /** Fetch chapter details by slug */
  getChapterBySlug: async (slug) => {
    const { data } = await api.get(`/chapters/${slug}`);
    return data.data;
  },

  /**
   * Fetch resources for a chapter
   * @param {string} chapterId - MongoDB ObjectId
   * @param {string} [type] - "video" | "ncert" | "pyq" | "book" | "mcq"
   */
  getResources: async (chapterId, type = null) => {
    const { data } = await api.get(`/resources/${chapterId}`, {
      params: type ? { type } : {},
    });
    return data.data;
  },

  /** Get current user's progress */
  getMyProgress: async () => {
    const { data } = await api.get("/progress/me");
    return data.data;
  },

  /**
   * Mark a section as complete
   * @param {string} chapterId
   * @param {string} subject
   * @param {number} classLevel
   * @param {string} section - "video" | "ncert" | "pyq" | "book" | "mcq"
   */
  markSectionComplete: async (chapterId, subject, classLevel, section, mcqScore = undefined) => {
    const { data } = await api.put("/progress/mark-section", {
      chapterId,
      subject,
      classLevel,
      section,
       ...(mcqScore !== undefined && { mcqScore }),
    });
    return data;
  },
};
