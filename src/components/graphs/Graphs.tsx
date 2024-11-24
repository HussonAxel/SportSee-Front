import SimpleRadarChart from "./SimpleRadarChart/SimpleRadarChart";
import TinyLineChart from "./TinyLineChart/TinyLineChart";
import SimpleRadialBarChart from "./SimpleRadialBarChart/SimpleRadialBarChart";
import SimpleBarChart from "./SimpleBarChart/SimpleBarChart";

interface GraphsProps {
  isApi: boolean;
}

const Graphs = ({ isApi }: GraphsProps) => {
  return (
    <div className="flex flex-wrap gap-8 flex-col w-full">
      <SimpleBarChart isApi={isApi} />
      <div className="flex flex-row justify-evenly 2xl:justify-between 2xl:w-full 2xl:max-w-[1440px] md:max-w-[800px]">
        <TinyLineChart isApi={isApi} />
        <SimpleRadarChart isApi={isApi} />
        <SimpleRadialBarChart isApi={isApi} />
      </div>
    </div>
  );
};

export default Graphs;
