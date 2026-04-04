import api from "./api";

export const bookmarkService = {
  getAll: async () => {
    const { data } = await api.get("/bookmarks");
    return data.data;
  },

  add: async (chapterData) => {
    const { data } = await api.post("/bookmarks", chapterData);
    return data.data;
  },

  remove: async (chapterId) => {
    const { data } = await api.delete(`/bookmarks/${chapterId}`);
    return data.data;
  },

  clearAll: async () => {
    const { data } = await api.delete("/bookmarks");
    return data.data;
  },
};