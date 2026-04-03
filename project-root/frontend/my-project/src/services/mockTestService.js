import api from "./api";

export const mockTestService = {
  generate: async ({ subject, classLevel, totalQuestions, difficulty }) => {
    const { data } = await api.post("/mock-test/generate", {
      subject,
      classLevel,
      totalQuestions,
      difficulty,
    });
    return data.data;
  },
};