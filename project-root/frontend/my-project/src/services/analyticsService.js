import api from "./api";

export const analyticsService = {
  getPerformance: async () => {
    const { data } = await api.get("/analytics/performance");
    return data;
  },
};