export interface SimpleRadarChartProps {
  isApi: boolean;
}

export interface UserPerformance {
  data: {
    data: Array<{
      kind: number;
      value: number;
    }>;
    kind: { [key: number]: string };
  };
}
