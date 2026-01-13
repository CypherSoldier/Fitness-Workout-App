import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // as const -> TYPESCRIPT
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Barbell Bench Press',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

function Analytics() {
  return (
      <Bar options={options} data={data} />
  );
}

export default Analytics;

/*
    <div style={{minHeight: '100vh', backgroundColor: '#1e2225'}} className="bar-grid">
      <ModernSidebar />
      
      <div className="chart"><Bar options={options} data={data} /></div>
      <div className="chart"><Bar options={options} data={data} /></div>
      <div className="chart"><Bar options={options} data={data} /></div>
    </div>
    */