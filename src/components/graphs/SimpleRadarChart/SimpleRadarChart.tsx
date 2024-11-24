import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import userPerformance from "../../../mocks/userPerformance.json";

const PERFORMANCE_MAPPING = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Énergie",
  6: "Cardio",
};

interface SimpleRadarChartProps {
  isApi: boolean;
}

interface PerformanceData {
  value: number;
  kind: number;
}

interface UserPerformance {
  data: {
    data: PerformanceData[];
    kind: { [key: number]: string };
  };
}

export default function SimpleRadarChart({ isApi }: SimpleRadarChartProps) {
  const [data, setData] = useState<Array<{ subject: string; value: number }>>(
    []
  );

  const formatData = (userPerformance: UserPerformance) => {
    const mappedData = userPerformance.data.data.map((item) => ({
      subject:
        PERFORMANCE_MAPPING[item.kind as keyof typeof PERFORMANCE_MAPPING],
      value: item.value,
    }));

    const orderedSubjects = [
      "Intensité",
      "Vitesse",
      "Force",
      "Endurance",
      "Énergie",
      "Cardio",
    ];
    return orderedSubjects.map(
      (subject) =>
        mappedData.find((item) => item.subject === subject) || {
          subject,
          value: 0,
        }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isApi) {
          const response = await fetch(
            "http://localhost:3000/user/18/performance"
          );
          const result = await response.json();
          const formattedData = formatData(result);
          setData(formattedData);
        } else {
          // Using JSON data
          const formattedData = formatData(userPerformance);
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [isApi]);

  return (
    <div className="bg-gray-800 rounded-lg">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius={90}
        width={258}
        height={263}
        data={data}
      >
        <PolarGrid gridType="polygon" radialLines={false} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "white", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 250]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="value"
          stroke="#FF0101"
          fill="#FF0101"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>
  );
}
