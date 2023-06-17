import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const AreaChart = ({ chartTitle, rgb }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle ?? "Chart.js Line Chart",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: `Dataset ${new Date().getTime()}`,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: rgb,
        backgroundColor: rgb,
      },
    ],
  };
  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default AreaChart;
