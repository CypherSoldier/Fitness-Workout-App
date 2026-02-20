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
  Legend,
  Filler // optional for area fill
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
  Legend,
  Filler
);

function AnalyticsChart({ type, title, data }) {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb', // gray-200
          font: { size: 13, weight: '500' }
        }
      },
      title: {
        display: true,
        text: title,
        color: '#f3f4f6', // gray-100
        font: { size: 16, weight: '600' },
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)', // gray-900 with opacity
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: type === 'line' ? {
      x: {
        grid: { color: '#1f2937' }, // gray-800
        ticks: { color: '#9ca3af' } // gray-400
      },
      y: {
        grid: { color: '#1f2937' },
        ticks: { color: '#9ca3af' }
      }
    } : undefined,
  };

  // Enhance pie chart with better spacing & cutout
  if (type === 'pie') {
    baseOptions.cutout = '60%';
    baseOptions.plugins.legend.position = 'right';
  }

  // Example: add subtle fill to line charts
  const enhancedData = type === 'line' ? {
    ...data,
    datasets: data.datasets.map(ds => ({
      ...ds,
      tension: 0.3,
      fill: true,
      backgroundColor: ds.backgroundColor ? ds.backgroundColor.replace('rgb', 'rgba').replace(')', ', 0.15)') : undefined,
    }))
  } : data;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 shadow-inner h-full">
      {type === 'pie' ? (
        <Pie options={baseOptions} data={enhancedData} />
      ) : (
        <Line options={baseOptions} data={enhancedData} />
      )}
    </div>
  );
}

export default AnalyticsChart;