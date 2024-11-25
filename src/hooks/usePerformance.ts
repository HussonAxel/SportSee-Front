import { useState, useEffect } from "react";
import { userService, PerformanceResponse } from "../services/api";
import userPerformance from "../mocks/userPerformance.json";

const PERFORMANCE_MAPPING = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Énergie",
  6: "Cardio",
} as const;

const ORDERED_SUBJECTS = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Énergie",
  "Cardio",
] as const;

interface FormattedPerformance {
  subject: string;
  value: number;
}

export const usePerformance = (isApi: boolean, userId: number = 18) => {
  const [data, setData] = useState<FormattedPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatData = (performance: PerformanceResponse["data"]) => {
    const mappedData = performance.data.map((item) => ({
      subject:
        PERFORMANCE_MAPPING[item.kind as keyof typeof PERFORMANCE_MAPPING],
      value: item.value,
    }));

    return ORDERED_SUBJECTS.map(
      (subject) =>
        mappedData.find((item) => item.subject === subject) || {
          subject,
          value: 0,
        }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (isApi) {
          const performance = await userService.getPerformance(userId);
          setData(formatData(performance));
        } else {
          setData(formatData(userPerformance.data));
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
