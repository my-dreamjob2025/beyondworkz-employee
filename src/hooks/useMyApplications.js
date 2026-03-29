import { useState, useEffect, useCallback } from "react";
import { applicationsService } from "../services/applicationsService";

/**
 * Loads the signed-in employee's applications (same payload as GET /employee/applications).
 */
export default function useMyApplications() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [byStatus, setByStatus] = useState({
    submitted: 0,
    shortlisted: 0,
    interview_scheduled: 0,
    rejected: 0,
    hired: 0,
  });
  const [interviewCount, setInterviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsService.list();
      if (data?.success) {
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setByStatus({
          submitted: data.byStatus?.submitted ?? 0,
          shortlisted: data.byStatus?.shortlisted ?? 0,
          interview_scheduled: data.byStatus?.interview_scheduled ?? 0,
          rejected: data.byStatus?.rejected ?? 0,
          hired: data.byStatus?.hired ?? 0,
        });
        setInterviewCount(typeof data.interviewCount === "number" ? data.interviewCount : data.byStatus?.interview_scheduled ?? 0);
      } else {
        setError(data?.message || "Could not load applications.");
        setItems([]);
        setTotal(0);
      }
    } catch {
      setError("Could not load applications.");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    items,
    total,
    byStatus,
    interviewCount,
    loading,
    error,
    refetch,
  };
}
