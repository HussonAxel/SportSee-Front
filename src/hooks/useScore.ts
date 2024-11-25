import { useState, useEffect } from "react";
import { userService } from "../services/api";
import UserInfos from "../mocks/userInfos.json";

interface ScoreData {
  value: number;
}

export const useScore = (isApi: boolean, userId: number = 18) => {
  const [data, setData] = useState<ScoreData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatScore = (score: number | undefined) => {
    if (score === undefined) return 0;
    return score * 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (isApi) {
          const userInfo = await userService.getUserInfo(userId);
          const score = formatScore(userInfo.score ?? userInfo.todayScore);
          setData([{ value: score }]);
        } else {
          const score = formatScore(UserInfos.data.todayScore);
          setData([{ value: score }]);
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

  return { data, score: data[0]?.value ?? 0, isLoading, error };
};
