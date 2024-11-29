import { useNutrition } from "../../hooks/useNutrition";
import CaloriesIcon from "../svg/CaloriesIcon";
import FatIcon from "../svg/FatIcon";
import ProteinIcon from "../svg/ProteinIcon";
import CarbsIcon from "../svg/CarbsIcon";

interface NutritionSummaryProps {
  isApi: boolean;
  userId?: number;
}

const nutritionItems = [
  {
    id: 1,
    src: <CaloriesIcon />,
    measure: "kCal",
    dataKey: "calorieCount" as const,
    dataName: "Calories",
  },
  {
    id: 2,
    src: <ProteinIcon />,
    measure: "g",
    dataKey: "proteinCount" as const,
    dataName: "Protéines",
  },
  {
    id: 3,
    src: <CarbsIcon />,
    measure: "g",
    dataKey: "carbohydrateCount" as const,
    dataName: "Glucides",
  },
  {
    id: 4,
    src: <FatIcon />,
    measure: "g",
    dataKey: "lipidCount" as const,
    dataName: "Lipides",
  },
];

const NutritionSummary = ({ isApi, userId = 18 }: NutritionSummaryProps) => {
  const { keyData, isLoading, error } = useNutrition(isApi, userId);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading nutrition data
      </div>
    );
  }

  return (
    <aside className="">
      <div className="flex flex-wrap justify-between gap-4 lg:gap-6 2xl:flex-col 2xl:w-full 2xl:max-w-[1200px] md:max-w-[800px] h-full">
        {nutritionItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#FBFBFB] flex items-center p-4 lg:p-6 rounded-lg h-[124px] w-[260px]"
          >
            <div className="flex-shrink-0">{item.src}</div>
            <div className="ml-4">
              <p className="font-bold text-lg lg:text-xl">
                {keyData[item.dataKey]}
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
