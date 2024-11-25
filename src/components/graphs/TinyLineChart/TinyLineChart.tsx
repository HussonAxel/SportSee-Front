import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useSessions } from "../../../hooks/useSessions";

const DAY_MAP: { [key: number]: string } = {
  1: "L",
  2: "M",
  3: "M",
  4: "J",
  5: "V",
  6: "S",
  7: "D",
};

interface SessionChartProps {
  isApi: boolean;
  userId?: number;
}

export default function SessionChart({
  isApi,
  userId = 18,
}: SessionChartProps) {
  const { data, isLoading, error } = useSessions(isApi, userId);

  if (isLoading) {
    return (
      <div className="bg-red-600 rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-600 rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Une erreur est survenue</p>
      </div>
    );
  }

  return (
    <div className="bg-red-600 rounded-lg w-[258px] h-[263px]">
      <h2 className="text-white/70 text-base font-medium my-4 px-4 max-w-[150px] leading-5">
        Durée moyenne des sessions
      </h2>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 15, left: 15, bottom: 20 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", opacity: 0.5 }}
            padding={{ left: 15, right: 15 }}
            tickFormatter={(day) => DAY_MAP[day]}
            dy={25}
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "white",
              strokeWidth: 8,
              fill: "white",
              r: 4,
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                return (
                  <div className="bg-white p-2 text-xs">
                    <p>{`${payload[0].value} min`}</p>
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
