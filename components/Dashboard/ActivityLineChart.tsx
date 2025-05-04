import {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Activity = {
    id: number;
    user_id: string;
    action: string;
    metadata: {
        event_category: string;
        event_id: string;
      };
    created_at: string;
}

const ActivityLineChart = ({activity}: {activity:Activity[]}) => {
  
  const [firstWeek, setFirstWeek] = useState(0);
  const [secondWeek, setSecondWeek] = useState(0);
  const [thirdWeek, setThirdWeek] = useState(0);
  const [fourthWeek, setFourthWeek] = useState(0);

  useEffect(() => {
    const today = new Date();
  
    // Week 1: 0–7 days ago
    const week1 = activity.filter((e:Activity) => {
        const createdAt = new Date(e.created_at);
        return createdAt >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) && createdAt <= today;
    });
    setFirstWeek(week1.length);

    // Week 2: 7–14 days ago
    const week2 = activity.filter((e:Activity) => {
        const createdAt = new Date(e.created_at);
        return createdAt >= new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000) &&
                createdAt < new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    });
    setSecondWeek(week2.length);

    // Week 3: 14–21 days ago
    const week3 = activity.filter((e:Activity) => {
        const createdAt = new Date(e.created_at);
        return createdAt >= new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000) &&
                createdAt < new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    });
    setThirdWeek(week3.length);

    // Week 4: 21–28 days ago
    const week4 = activity.filter((e:Activity) => {
        const createdAt = new Date(e.created_at);
        return createdAt >= new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000) &&
                createdAt < new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000);
    });
    setFourthWeek(week4.length);
    console.log("rendered")
    }, [activity]);

    return (
        <Line
            datasetIdKey="line"
            data={{
            labels: ['3 weeks ago', '2 weeks ago', 'Last week', 'This week'],
            datasets: [
                {
                label: 'Your Activity',
                data: [fourthWeek, thirdWeek, secondWeek, firstWeek],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
            }}
            options={{
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                },
                title: {
                display: true,
                text: 'Your Activity This Month',
                },
            },
            }}
        />
    )
}

export default ActivityLineChart