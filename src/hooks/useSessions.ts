import { useState, useEffect } from "react";
import { userService, SessionData } from "../services/api";
import userAverageSession from "../mocks/userAverageSession.json";

export const useSessions = (isApi: boolean, userId: number = 18) => {
  const [data, setData] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (isApi) {
          const sessions = await userService.getAverageSessions(userId);
          setData(sessions);
        } else {
          setData(userAverageSession.data.sessions);
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
