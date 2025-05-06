'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {supabase} from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'

const EventAttendeesPage = () => {
  
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('eventId') // ✅ Ensure `id` is retrieved
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    //Get event and verify if the user is the organiser
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: user } = await supabase.auth.getUser()
        const response = await fetch('/api/fetchEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId: id }),
        });
      
        if (!response.ok) {
          const error = await response.json();
          console.error('Error fetching event:', error.error);
          return;
        }
      
        const eventData = await response.json();
        if (eventData.organiser_id !== user.user?.id) {
          router.back()
          return
        }
      } catch (error) {
        console.error('Error in fetchData:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [router])


  if(loading){
    <div className="flex items-center justify-center h-screen">
      Loading...
    </div>
  }
  
  return (
    <div>
      <h1>Event Attendees</h1>
      <p>Event ID: {id}</p>
      <p>Event Attendees List</p>
      {/* Add your logic to display the list of attendees here */}
      <p>{}</p>
    </div>
  )
}

export default EventAttendeesPage