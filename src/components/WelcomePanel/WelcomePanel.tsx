import { useState } from "react";
import IsMocked from "../../utils/isMocked";
import Greetings from "../Greetings/Greetings";
import Graphs from "../graphs/Graphs";
import NutritionSummary from "../NutritionSummary/NutritionSummary";


const WelcomePanel = () => {
  const [isApi, setIsApi] = useState(false);

  return (
    <div className="flex flex-col w-full sticky m-auto left-0 2xl:max-w-[1440px] md:max-w-[800px]">
      <Greetings isApi={isApi} />
      <p className="text-lg">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
      <div className="mt-4">
        <IsMocked isApi={isApi} setIsApi={setIsApi} />
      </div>
      <div className="flex flex-col gap-8 flex-grow w-full max-w-[1200px] 2xl:max-w- 2xl:flex-row">
        <Graphs isApi={isApi} />
        <NutritionSummary isApi={isApi} />
      </div>
    </div>
  );
};

export default WelcomePanel;
