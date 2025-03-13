'use client';
import { useEffect, useState } from 'react'
import HomePageEvents from '../Events/HomePageEvents'
import { supabase } from '@/lib/supabase'

const EventsSection = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data: events, error } = await supabase.from('events').select('*');
            if (error) {
                console.error('Error fetching events:', error);
            } else {
                if (events.length === 0) {
                    console.warn('No events found in the database.');
                } else {
                    setEvents(events);
                }
            }
        };
        fetchEvents();
    }, []);

  return (
    <div>
        <h3 className='text-3xl font-bold mt-20'>
          Events Near You
        </h3>
        <div className='flex flex-row justify-evenly'>
          {events.slice(0, 3).map((event) => (
            <HomePageEvents
              key={event.id}
              id={event.id}
              src={event.image_url || '/images/happy-friends.png'}
              title={event.name}
              description={event.description}
              date={event.date}
            />
          ))}
        </div>
      </div>
  )
}

export default EventsSection