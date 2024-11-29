import { useState } from "react";
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
  const [hoveredX, setHoveredX] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="bg-[#ff0000] rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ff0000] rounded-lg w-[258px] h-[263px] flex items-center justify-center">
        <p className="text-white">Une erreur est survenue</p>
      </div>
    );
  }

  const handleMouseMove = (props: { activeCoordinate?: { x: number } }) => {
    if (props.activeCoordinate) {
      setHoveredX(props.activeCoordinate.x);
    }
  };

  const handleMouseLeave = () => {
    setHoveredX(null);
  };

  return (
    <div className="bg-[#ff0000] rounded-lg w-[258px] h-[263px] relative overflow-hidden">
      <h2 className="text-white/70 text-base font-medium pt-8 px-8 pb-0 max-w-[180px] leading-5 absolute">
        Durée moyenne des sessions
      </h2>

      {hoveredX !== null && (
        <div
          className="absolute top-0 right-0 h-full bg-black/10 z-10"
          style={{
            width: `${100 - (hoveredX / 258) * 100}%`,
            transition: "width 0.1s ease-out",
          }}
        />
      )}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 80, right: -10, left: -10, bottom: 40 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <XAxis
            interval="preserveStartEnd"
            dataKey="day"
            tick={{
              stroke: "white",
              strokeWidth: 0.6,
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(day) => DAY_MAP[day]}
            dy={10}
            padding={{ left: 30, right: 30 }}
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
                  <div className="bg-white px-2 py-1">
                    <p className="text-xs font-medium">{`${payload[0].value} min`}</p>
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
