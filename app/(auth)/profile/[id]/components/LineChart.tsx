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
import {supabase} from '@/lib/supabase';

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

const LineChart = ({userId}: {userId: string}) => {
    
    const [firstWeek, setFirstWeek] = useState(0);
    const [secondWeek, setSecondWeek] = useState(0);
    const [thirdWeek, setThirdWeek] = useState(0);
    const [fourthWeek, setFourthWeek] = useState(0);

    useEffect(() => {
        const fetchEventActivity = async () => {
          try {
            const now = new Date();
            const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000); // 28 days ago
      
            const { data, error } = await supabase
              .from('event_registrations')
              .select('*')
              .eq('user_id', userId)
              .lte('registered_at', now.toISOString()) // Convert to ISO 8601
              .gte('registered_at', fourWeeksAgo.toISOString()); // Convert to ISO 8601
      
            if (error) {
              console.error('Error fetching event activity:', error);
              return;
            }
      
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
            const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
      
            setFirstWeek(
              data.filter((e) => {
                const createdAt = new Date(e.registered_at);
                return createdAt >= oneWeekAgo && createdAt <= now;
              }).length
            );
      
            setSecondWeek(
              data.filter((e) => {
                const createdAt = new Date(e.registered_at);
                return createdAt >= twoWeeksAgo && createdAt < oneWeekAgo;
              }).length
            );
      
            setThirdWeek(
              data.filter((e) => {
                const createdAt = new Date(e.registered_at);
                return createdAt >= threeWeeksAgo && createdAt < twoWeeksAgo;
              }).length
            );
      
            setFourthWeek(
              data.filter((e) => {
                const createdAt = new Date(e.registered_at);
                return createdAt >= fourWeeksAgo && createdAt < threeWeeksAgo;
              }).length
            );
          } catch (err) {
            console.error('Error fetching event activity:', err);
          }
        };
      
        fetchEventActivity();
      }, [userId]);
  return (
    <Line
        datasetIdKey="line"
        data={{
        labels: ['3 weeks ago', '2 weeks ago', 'Last week', 'This week'],
        datasets: [
            {
            label: 'Events Attended',
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
            text: 'Events Attended in the Last 4 Weeks',
            },
        },
        }}
    />
  )
}

export default LineChart