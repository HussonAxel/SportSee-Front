import { useState, useEffect } from "react";
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


import userActivity from "../../../mocks/userActivity.json";

import {
  ActivityChartProps,
  Session,
  TooltipProps,
  LegendProps,
} from "./SimpleBarChartProps";



export default function ActivityChart({ isApi }: ActivityChartProps) {
  const [data, setData] = useState<
    Array<{
      name: number;
      poids: number;
      calories: number;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isApi) {
          const response = await fetch(
            "http://localhost:3000/user/18/activity"
          );
          const result = await response.json();
          const formattedData = formatSessionsData(result.data.sessions);
          setData(formattedData);
        } else {
          const formattedData = formatSessionsData(userActivity.data.sessions);
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [isApi]);

  const formatSessionsData = (sessions: Session[]) => {
    return sessions.map((session, index) => ({
      name: index + 1,
      poids: session.kilogram,
      calories: session.calories,
    }));
  };

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-red-500 p-2 text-white text-xs relative left-14">
          <p className="mb-2">{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}kCal`}</p>  
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: LegendProps) => {
    if (!payload) return null;

    return (
      <div className="flex justify-between gap-8 mb-8">
        <h2 className="text-base font-medium mb-8 pl-8 pt-8">
          Activité quotidienne
        </h2>
        <div className="flex flex-row gap-8">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-500">
                {entry.value === "poids"
                  ? "Poids (kg)"
                  : "Calories brûlées (kCal)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
