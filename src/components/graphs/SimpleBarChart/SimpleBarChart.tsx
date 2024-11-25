import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useActivity } from "../../../hooks/useActivity";
import { CustomTooltip, CustomLegend } from "../../ActivityChart/ActivityChart";

interface ActivityChartProps {
  isApi: boolean;
  userId?: number;
}

export default function ActivityChart({
  isApi,
  userId = 18,
}: ActivityChartProps) {
  const { data, isLoading, error } = useActivity(isApi, userId);

  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-lg 2xlm:w-full 2xl:max-w-[1200px] md:max-w-[800px] h-[320px] flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-lg 2xlm:w-full 2xl:max-w-[1200px] md:max-w-[800px] h-[320px] flex items-center justify-center">
        <p>Une erreur est survenue</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg 2xlm:w-full 2xl:max-w-[1200px] md:max-w-[800px]">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fill: "#9B9EAC" }}
            dy={10}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            domain={["dataMin - 1", "dataMax + 1"]}
          />
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
          />
          <Legend
            content={<CustomLegend />}
            align="right"
            verticalAlign="top"
          />
          <Bar
            yAxisId="right"
            dataKey="poids"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
