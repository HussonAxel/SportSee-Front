import React from "react";

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
}

export interface LegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

export const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
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

export const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
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
