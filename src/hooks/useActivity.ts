import { useState, useEffect } from "react";
import { userService, ActivitySession } from "../services/api";
import userActivity from "../mocks/userActivity.json";

interface FormattedActivity {
  name: number;
  poids: number;
  calories: number;
}

export const useActivity = (isApi: boolean, userId: number = 18) => {
  const [data, setData] = useState<FormattedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatSessionsData = (sessions: ActivitySession[]) => {
    return sessions.map((session, index) => ({
      name: index + 1,
      poids: session.kilogram,
      calories: session.calories,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (isApi) {
          const sessions = await userService.getActivity(userId);
          setData(formatSessionsData(sessions));
        } else {
          setData(formatSessionsData(userActivity.data.sessions));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isApi, userId]);

  return { data, isLoading, error };
};
