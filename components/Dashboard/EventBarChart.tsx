'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categories = ["Music", "Tech", "Sports", "Education", "Health", "Food", "Networking", "Outdoor"];

type Activity = {
  id: number;
  user_id: string;
  action: string;
  metadata: {
    event_category: string;
    event_id: string;
  };
  created_at: string;
};

const EventBarChart = ({ activity }: { activity: Activity[] }) => {
  // Count occurrences of each category
  const categoryCounts = categories.map((category) => {
    return activity.filter((act) => act.metadata.event_category === category).length;
  });

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Activity Count',
        data: categoryCounts,
        backgroundColor: '#2B2D42',
        borderColor: '#8D99AE',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Event Activity by Category',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Activity Count',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default EventBarChart;