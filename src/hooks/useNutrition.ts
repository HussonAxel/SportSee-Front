import { useState, useEffect } from "react";
import { userService } from "../services/api";
import userInfos from "../mocks/userInfos.json";
import { UserMainData } from "../services/api";

export const useNutrition = (isApi: boolean, userId: number = 18) => {
  const [keyData, setKeyData] = useState<UserMainData["keyData"]>(
    userInfos.data.keyData
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isApi) {
          const userData = await userService.getUserInfo(userId);
          setKeyData(userData.keyData);
        } else {
          setKeyData(userInfos.data.keyData);
        }
      } catch (err) {
        console.error("Error fetching nutrition data:", err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setKeyData(userInfos.data.keyData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isApi, userId]);

  return { keyData, isLoading, error };
};
