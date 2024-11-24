import { useState, useEffect } from "react";
import userInfos from "../../mocks/userInfos.json";
import CaloriesIcon from "../svg/CaloriesIcon";
import FatIcon from "../svg/FatIcon";
import ProteinIcon from "../svg/ProteinIcon";
import CarbsIcon from "../svg/CarbsIcon";

interface NutritionSummaryProps {
  isApi: boolean;
}

interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

const NutritionSummary = ({ isApi }: NutritionSummaryProps) => {
  const [keyData, setKeyData] = useState<KeyData>(userInfos.data.keyData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isApi) {
          const response = await fetch("http://localhost:3000/user/18");
          const result = await response.json();
          setKeyData(result.data.keyData);
        } else {
          setKeyData(userInfos.data.keyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setKeyData(userInfos.data.keyData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isApi]);

  const nutritionSummaryData = [
    {
      id: 1,
      src: <CaloriesIcon />,
      measure: "kCal",
      data: keyData.calorieCount,
      dataName: "Calories",
    },
    {
      id: 2,
      src: <ProteinIcon />,
      measure: "g",
      data: keyData.proteinCount,
      dataName: "Protéines",
    },
    {
      id: 3,
      src: <CarbsIcon />,
      measure: "g",
      data: keyData.carbohydrateCount,
      dataName: "Glucides",
    },
    {
      id: 4,
      src: <FatIcon />,
      measure: "g",
      data: keyData.lipidCount,
      dataName: "Lipides",
    },
  ];

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <aside className="w-full 2xl:w-1/3">
      <div className="grid grid-cols-2 2xl:grid-cols-1 gap-4 lg:gap-6 h-full 2xl:w-full 2xl:max-w-[1200px] md:max-w-[800px] justify-between">
        {nutritionSummaryData.map((item) => (
          <div
            key={item.id}
            className="bg-[#FBFBFB] flex items-center p-4 lg:p-6 rounded-lg h-[124px] w-[260px]"
          >
            <div className="flex-shrink-0">{item.src}</div>
            <div className="ml-4">
              <p className="font-bold text-lg lg:text-xl">
                {item.data}
                {item.measure}
              </p>
              <p className="text-[#74798C] text-sm lg:text-md">
                {item.dataName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NutritionSummary;
