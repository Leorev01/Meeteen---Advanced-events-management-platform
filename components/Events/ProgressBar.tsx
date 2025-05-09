import {useEffect, useState} from 'react';
import {supabase} from "@/lib/supabase";

const ProgressBar = ({eventId, capacity} : {eventId: string, capacity: number}) => {

  const [attendeeAmount, setAttendeeAmount] = useState(0);

  useEffect(() => {
    const fetchAttendeeAmount = async () => {
      try{
        const {data, error} = await supabase.from('event_registrations').select('*').eq('event_id', eventId)
        if (error) {
          console.error('Error fetching attendee amount:', error.message);
        } else {
          setAttendeeAmount(data.length);
        }
      }catch{
        console.error('Error fetching attendee amount');
      }
    }
    fetchAttendeeAmount()
  })

  return (
    <>
      <progress className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700" value={attendeeAmount} max={capacity}></progress>
      <p>Spaces left: {capacity - attendeeAmount}</p>
    </>
  )
}

export default ProgressBar