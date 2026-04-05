import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { mistakeService } from "../services/mistakeService";
import { useAuth } from "./AuthContext";

const MistakeContext = createContext(null);

export const MistakeProvider = ({ children }) => {
  const { user } = useAuth();
  const [mistakes, setMistakes] = useState([]);
  const [stats,    setStats]    = useState({});
  const [loading,  setLoading]  = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [all, st] = await Promise.all([
        mistakeService.getAll(),
        mistakeService.getStats(),
      ]);
      setMistakes(all);
      setStats(st);
    } catch (err) {
      console.error("Failed to load mistakes:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  // Called after every quiz submission
  const saveQuizMistakes = useCallback(async (wrongQuestions) => {
    if (!wrongQuestions?.length) return;
    try {
      const saved = await mistakeService.saveBulk(wrongQuestions);
      // Merge into local state
      setMistakes((prev) => {
        const existingIds = new Set(prev.map((m) => m.resourceId?.toString()));
        const newOnes = saved.filter((m) => !existingIds.has(m.resourceId?.toString()));
        return [...newOnes, ...prev];
      });
      await refresh(); // refresh stats
    } catch (err) {
      console.error("Failed to save mistakes:", err);
    }
  }, [refresh]);

  const reattempt = useCallback(async (mistakeId, answerIndex) => {
    const updated = await mistakeService.reattempt(mistakeId, answerIndex);
    setMistakes((prev) =>
      prev.map((m) => (m._id === mistakeId ? updated : m))
    );
    await mistakeService.getStats().then(setStats);
    return updated;
  }, []);

  const remove = useCallback(async (mistakeId) => {
    await mistakeService.remove(mistakeId);
    setMistakes((prev) => prev.filter((m) => m._id !== mistakeId));
    await mistakeService.getStats().then(setStats);
  }, []);

  // Total unseen + reattempted (not yet mastered)
  const pendingCount = mistakes.filter(
    (m) => m.status !== "mastered"
  ).length;

  return (
    <MistakeContext.Provider value={{
      mistakes, stats, loading, pendingCount,
      saveQuizMistakes, reattempt, remove, refresh,
    }}>
      {children}
    </MistakeContext.Provider>
  );
};

export const useMistakes = () => {
  const ctx = useContext(MistakeContext);
  if (!ctx) throw new Error("useMistakes must be inside <MistakeProvider>");
  return ctx;
};