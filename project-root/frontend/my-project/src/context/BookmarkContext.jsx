import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { bookmarkService } from "../services/bookmarkService";
import { useAuth } from "./AuthContext";

const BookmarkContext = createContext(null);

export const BookmarkProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks]   = useState([]);
  const [loading, setLoading]       = useState(false);
  // Set of chapterIds for O(1) lookup — used by the icon
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Sync Set whenever bookmarks array changes
  const syncSet = (list) => {
    setBookmarkedIds(new Set(list.map((b) => b.chapterId?.toString())));
  };

  // Fetch on login
  useEffect(() => {
    if (!user) { setBookmarks([]); setBookmarkedIds(new Set()); return; }
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await bookmarkService.getAll();
        setBookmarks(data);
        syncSet(data);
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  // Check if a chapter is bookmarked — used by the icon
  const isBookmarked = useCallback(
    (chapterId) => bookmarkedIds.has(chapterId?.toString()),
    [bookmarkedIds]
  );

  // Toggle — add if not bookmarked, remove if bookmarked
  const toggleBookmark = useCallback(async (chapterData) => {
    const id = chapterData.chapterId?.toString();
    try {
      if (bookmarkedIds.has(id)) {
        // Optimistic remove
        const updated = bookmarks.filter(
          (b) => b.chapterId?.toString() !== id
        );
        setBookmarks(updated);
        syncSet(updated);
        await bookmarkService.remove(id);
      } else {
        // Optimistic add
        const newBookmark = { ...chapterData, addedAt: new Date().toISOString() };
        const updated = [newBookmark, ...bookmarks];
        setBookmarks(updated);
        syncSet(updated);
        await bookmarkService.add(chapterData);
      }
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
      // Revert on failure
      const data = await bookmarkService.getAll();
      setBookmarks(data);
      syncSet(data);
    }
  }, [bookmarks, bookmarkedIds]);

  const clearAll = useCallback(async () => {
    setBookmarks([]);
    setBookmarkedIds(new Set());
    await bookmarkService.clearAll();
  }, []);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, loading, isBookmarked, toggleBookmark, clearAll }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within <BookmarkProvider>");
  return ctx;
};