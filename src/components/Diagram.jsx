import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Diagram = () => {
  const data = {
    labels: ["Amis", "Likes", "Followers"],
    datasets: [
      {
        label: "Mes Statistiques",
        data: [120, 85, 300],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-5">
      <h2 className="text-center text-2xl mb-4">Mes Statistiques</h2>
      <Bar
        data={data}
        options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
      />
    </div>
  );
};

export default Diagram;
