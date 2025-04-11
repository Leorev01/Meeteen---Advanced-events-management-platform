'use client';
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import HomePageEvents from '../Events/HomePageEvents'
import EventsPageEvent from '../Events/EventsPageEvent';
import useMediaQuery from '@/hooks/useMediaQuery';

const UpcomingEventsSection = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [events, setEvents] = useState<any[]>([]);
    const isLargeScreen = useMediaQuery('(min-width: 1150px)');
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
          Upcoming Online Events
        </h3>
        <div className='flex flex-col md:flex-row justify-evenly'>
          {events.slice(0, isLargeScreen ? 4 : 3).map((event) => (
            <div key={event.id}>
            <div className='md:hidden block'>
              <EventsPageEvent
                id={event.id}
                src={event.image_url || '/images/happy-friends.png'}
                title={event.name}
                description={event.description}
                date={event.date}
                location={event.location}
              />
            </div>
            <div className='hidden md:block'>
              <HomePageEvents
                id={event.id}
                src={event.image_url || '/images/happy-friends.png'}
                title={event.name}
                description={event.description}
                date={event.date}
              />
            </div>
          </div>
          ))}
        </div>
      </div>
  )
}

export default UpcomingEventsSection