export interface ActivityChartProps {
  isApi: boolean;
}

export interface Session {
  kilogram: number;
  calories: number;
}

export interface TooltipProps {
  active?: boolean;
  payload?: {
    value: number; kilogram: number; calories: number 
}[];
}

export interface LegendProps {
  payload?: Array<{
    color: string;
    value: string;
  }>;
}
