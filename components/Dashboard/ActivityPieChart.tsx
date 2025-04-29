import {useState, useEffect} from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

  type Activity = {
    id: number;
    user_id: string;
    action: string;
    metadata: string;
    created_at: string;
  }

const ActivityPieChart = ({activity}:{activity:Activity[]}) => {

    const [eventsCreated, setEventsCreated] = useState(0);
    const [eventsJoined, setEventsJoined] = useState(0);
    const [eventsDeleted, setEventsDeleted] = useState(0);
    const [eventsEdited, setEventsEdited] = useState(0);
    const [messagesSent, setMessagesSent] = useState(0);
    const [loggedIn, setLoggedIn] = useState(0);

    useEffect(() => {
        const created = activity.filter((e:Activity)=> e.action === 'create_event')
        const joined = activity.filter((e:Activity)=> e.action === 'join_event')
        const deleted = activity.filter((e:Activity)=> e.action === 'delete_event')
        const edited = activity.filter((e:Activity)=> e.action === 'edit_event')
        const messages = activity.filter((e:Activity)=> e.action === 'send_message')
        const logIn = activity.filter((e:Activity) => e.action === 'login')
        setEventsCreated(created.length)
        setEventsJoined(joined.length)
        setEventsDeleted(deleted.length)
        setEventsEdited(edited.length)
        setMessagesSent(messages.length)
        setLoggedIn(logIn.length)
    }, [activity])

  return (
    <Pie
        datasetIdKey='pie' 
        data={{
        labels: ['Events Created', 'Events Joined', 'Events Deleted', 'Events edited', 'Messages Sent', 'Logged In'],
        datasets: [
          {
            label: 'Amount',
            data: [eventsCreated, eventsJoined, eventsDeleted, eventsEdited, messagesSent, loggedIn],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
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
            text: 'Types of Activity',
            },
        },
    }}
    />
  )
}

export default ActivityPieChart
