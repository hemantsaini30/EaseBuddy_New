import api from "./api";

export const activityService = {
  getCalendar: async () => {
    const { data } = await api.get("/activity/calendar");
    return data.data; // { "2024-01-15": 3, ... }
  },

  getRecent: async (limit = 15) => {
    const { data } = await api.get("/activity/recent", { params: { limit } });
    return data.data;
  },

  getStats: async () => {
    const { data } = await api.get("/activity/stats");
    return data.data;
  },
};