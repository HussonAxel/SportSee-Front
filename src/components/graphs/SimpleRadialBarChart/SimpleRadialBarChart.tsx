import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import UserInfos from "../../../mocks/userInfos.json";

interface SimpleRadialChartProps {
  isApi: boolean;
}

export default function SimpleRadialChart({ isApi }: SimpleRadialChartProps) {
  const [data, setData] = useState<
    Array<{
      value: number;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isApi) {
          const response = await fetch(
            "http://localhost:3000/user/18"
          );
          const result = await response.json();
          setData([{ value: result.data.score * 100 }]);
        } else {
          setData([{ value: UserInfos.data.todayScore * 100 }]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [isApi]);

  const score = data[0]?.value;


  return (
    <div className="relative bg-gray-50 rounded-lg w-[258px] h-[263px]">
      <h2 className="absolute left-8 top-6 text-base font-medium">Score</h2>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-4xl font-bold">{score}%</p>
        <p className="text-base text-gray-500 max-w-[70px] mx-auto leading-5">
          de votre objectif
        </p>
      </div>

      <RadialBarChart
        width={258}
        height={263}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="80%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={450}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="value"
          cornerRadius={10}
          fill="#FF0000"
        />
      </RadialBarChart>
    </div>
  );
}
