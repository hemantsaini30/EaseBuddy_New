import { useState, useEffect } from "react";
import { analyticsService } from "../services/analyticsService";
import { useAuth } from "../context/AuthContext";

export const useAnalytics = () => {
  const { user } = useAuth();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [noData, setNoData]   = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await analyticsService.getPerformance();
        if (res.message === "no_data") { setNoData(true); }
        else { setData(res.data); }
      } catch (err) {
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return { data, loading, error, noData };
};