import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

import Wrapper from "~/layouts/Wrapper";

interface ChartData {
  labels: string[];
  datasets: [
    {
      data: (string | number)[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }
  ];
}

type Props = {
  loading: boolean;
  data: ChartData;
  options?: any;
  error: string | null;
  chartType: string;
};

const Chart: React.FC<Props> = ({
  loading,
  data,
  error,
  chartType,
  options,
}) => {
  const renderChart = (chartType: string, chartData: ChartData) => {
    switch (chartType) {
      case "DOUGHNUT":
        return <Doughnut data={chartData} />;

      case "BAR":
        return <Bar data={chartData} options={options} />;

      case "LINE":
        return <Line data={chartData} options={options} />;

      default:
        return <></>;
    }
  };

  return (
    <Wrapper loading={loading} error={error}>
      {renderChart(chartType, data)}
    </Wrapper>
  );
};

export default Chart;
