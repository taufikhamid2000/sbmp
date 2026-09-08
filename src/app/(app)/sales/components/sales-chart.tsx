"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function SalesChart() {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Revenue (RM)",
            data: [3200, 2800, 3600, 4100, 5200, 6100, 4280],
            borderColor: "#2a78d6",
            backgroundColor: "rgba(42, 120, 214, 0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 3,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      }}
    />
  );
}
