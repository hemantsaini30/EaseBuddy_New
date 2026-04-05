import api from "./api";


export const mistakeService = {
  getAll: async (filters = {}) => {
    const { data } = await api.get("/mistakes", { params: filters });
    return data.data;
  },

  getStats: async () => {
    const { data } = await api.get("/mistakes/stats");
    return data.data;
  },

  // Save wrong/skipped questions after quiz
  saveBulk: async (mistakes) => {
    const { data } = await api.post("/mistakes/bulk", { mistakes });
    return data.data;
  },

  reattempt: async (mistakeId, userAnswerIndex) => {
    const { data } = await api.put(`/mistakes/${mistakeId}/reattempt`, { userAnswerIndex });
    return data.data;
  },

  remove: async (mistakeId) => {
    await api.delete(`/mistakes/${mistakeId}`);
  },
};