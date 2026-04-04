import api from "./api";

export const formulaService = {
  getByChapter: async (chapterId) => {
    const { data } = await api.get(`/formulas/${chapterId}`);
    return data.data;
  },
};