import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import userAverageSession from "../../../mocks/userAverageSession.json";

interface SessionChartProps {
  isApi: boolean;
}

export default function SessionChart({ isApi }: SessionChartProps) {
    const [data, setData] = useState<
      Array<{
        day: number;
        sessionLength: number;
      }>
    >([]);

    const dayMap: { [key: number]: string } = {
      1: 'L',
      2: 'M',
      3: 'M',
      4: 'J',
      5: 'V',
      6: 'S',
      7: 'D'
    };

    const formatDay = (day: number) => dayMap[day];

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (isApi) {
            const response = await fetch(
              "http://localhost:3000/user/18/average-sessions"
            );
            const result = await response.json();
            setData(result.data.sessions);
          } else {
            setData(userAverageSession.data.sessions);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
        }
      };

      fetchData();
    }, [isApi]);

  return (
    <div className="bg-red-600 rounded-lg w-[258px] h-[263px]">
      <h2 className="text-white/70 text-base font-medium my-4 px-4 max-w-[150px] leading-5">
        Durée moyenne des sessions
      </h2>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 15, left: 15, bottom: 20 }}
          onMouseMove={(e) => {
            if (e.isTooltipActive && e.activeTooltipIndex !== undefined) {
              const container = document.querySelector('.bg-red-600');
              if (container) {
                const activeIndex = e.activeTooltipIndex;
                const gradientDiv = document.createElement('div');
                gradientDiv.className = 'absolute top-0 right-0 h-full bg-black/10';
                gradientDiv.style.width = `${(data.length - activeIndex) * (100 / data.length)}%`;
              }
            }
          }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", opacity: 0.5 }}
            padding={{ left: 15, right: 15}}
            tickFormatter={formatDay}
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
              if (active && payload && payload.length) {
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
