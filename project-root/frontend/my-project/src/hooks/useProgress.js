import { useState, useEffect } from "react";
import { resourceService } from "../services/resourceService";
import { useAuth } from "../context/AuthContext";

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const data = await resourceService.getMyProgress();
        setProgress(data);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user]);

  const sameChapter = (p, chapterId) => {
    const id = p.chapterId?._id ?? p.chapterId;
    return id != null && String(id) === String(chapterId);
  };

  const markSection = async (chapterId, subject, classLevel, section) => {
    try {
      const updated = await resourceService.markSectionComplete(
        chapterId,
        subject,
        classLevel,
        section
      );
      setProgress((prev) => {
        const idx = prev.findIndex((p) => sameChapter(p, chapterId));
        if (idx === -1) return [...prev, updated];
        return prev.map((p) => (sameChapter(p, chapterId) ? updated : p));
      });
      return updated;
    } catch (err) {
      console.error("Failed to mark section:", err);
    }
  };

  /** Get progress record for a specific chapter */
  const getChapterProgress = (chapterId) =>
    progress.find((p) => sameChapter(p, chapterId));

  /** Count chapters completed per subject */
  const getSubjectStats = (subject) => {
    const subjectRecords = progress.filter((p) => p.subject === subject);
    return {
      total: subjectRecords.length,
      completed: subjectRecords.filter((p) => p.isChapterComplete).length,
    };
  };

  return { progress, loading, markSection, getChapterProgress, getSubjectStats };
};
