import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { usePerformance } from "../../../hooks/usePerformance";

interface PerformanceChartProps {
  isApi: boolean;
  userId?: number;
}

export default function PerformanceChart({
  isApi,
  userId = 18,
}: PerformanceChartProps) {
  const { data, isLoading, error } = usePerformance(isApi, userId);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Une erreur est survenue</p>
      </div>
    );
  }

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
