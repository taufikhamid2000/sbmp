"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = ["Weekend Combo", "Loyalty 10%", "New Store Launch", "Happy Hour", "Bundle Deal"];

export function PromotionsChart() {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Redemptions",
            data: [312, 540, 198, 421, 265],
            backgroundColor: "#2a78d6",
            borderRadius: 6,
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
