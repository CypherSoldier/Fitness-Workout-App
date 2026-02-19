import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);



function AnalyticsChart({ type, title, data }) {
  const options = {
    responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      title: {
        display: true,
         text: 'Total volume (kg) progress overtime',
      },
    },
  };

  return type === 'pie' ? <Pie options={options} data={data} /> : <Line options={options} data={data} />;
}

export default AnalyticsChart;