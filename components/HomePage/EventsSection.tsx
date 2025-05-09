/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import HomePageEvents from '../Events/HomePageEvents';
import { supabase } from '@/lib/supabase';
import EventsPageEvent from '../Events/EventsPageEvent';
import useMediaQuery from '@/hooks/useMediaQuery';
import { getCoordinates } from '@/utils/geocode/getCoordinates';
import { getDistanceFromLatLonInMiles } from '@/utils/geocode/getDistanceFromLatLonInMiles';

const EventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const isLargeScreen = useMediaQuery('(min-width: 1150px)');
  const isMediumScreen = useMediaQuery('(min-width: 868px)');

  // Step 1: Get the user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
        setLoading(false); // Stop loading if location is unavailable
      }
    );
  }, []);

  // Step 2: Fetch events and sort by proximity
  useEffect(() => {
    const fetchAndSortEvents = async () => {
      if (!userLocation) return;

      setLoading(true);

      // Fetch events from the database
      const { data: events, error } = await supabase.from('events').select('*').gte('date', new Date(Date.now()).toISOString()).limit(4);

      if (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        return;
      }

      // Geocode events that are missing latitude and longitude
      const eventsWithCoordinates = await Promise.all(
        events.map(async (event) => {
          if(event.location !== 'Online'){
            try {
              const { lat, lng } = await getCoordinates(event.location);
              return { ...event, latitude: lat, longitude: lng };
            } catch (error) {
              console.error(`Error geocoding event ${event.id}:`, error);
              return null; // Skip events that cannot be geocoded
            }
          }
          return event;
        })
      );

      // Filter out null values (events that couldn't be geocoded)
      const validEvents = eventsWithCoordinates.filter((event) => event !== null);

      // Calculate distances and sort events by proximity
      const eventsWithDistance = validEvents.map((event) => {
        if (event.location === 'Online') {
          return { ...event, distance: null }; // Set distance to null for online events
        }
        const distance = getDistanceFromLatLonInMiles(
          userLocation.latitude,
          userLocation.longitude,
          event.latitude,
          event.longitude
        );
        return { ...event, distance };
      });

      // Sort events by distance (closest first), keeping online events at the end
      const sortedEvents = eventsWithDistance.sort((a, b) => {
        if (a.distance === null) return 1; // Online events go to the end
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });


      setEvents(sortedEvents);
      setLoading(false);
    };

    if (userLocation) {
      fetchAndSortEvents();
    }
  }, [userLocation]);

  if (loading) {
    return <div>Loading events near you...</div>;
  }

  return (
    <div>
      <h3 className="text-3xl font-bold mt-20 mb-5">Events Near You</h3>
      <div className="flex flex-col md:flex-row justify-evenly">
        {events.slice(0, isLargeScreen ? 4 : isMediumScreen ? 3 : 2).map((event) => (
          <div key={event.id}>
            <div className="md:hidden block">
              <EventsPageEvent
                id={event.id}
                src={event.image_url || '/images/happy-friends.png'}
                title={event.name}
                description={event.description}
                date={event.date}
                location={event.location}
              />
              {event.location === 'Online' ? (
                <p>Online</p>
              ) : (
                <p>{event.distance?.toFixed(2)} miles away</p>
              )}
            </div>
            <div className="hidden md:block">
              <HomePageEvents
                id={event.id}
                src={event.image_url || '/images/happy-friends.png'}
                title={event.name}
                location={event.location}
                capacity={event.capacity}
                date={event.date}
              />
              {event.location === 'Online' ? (
                <p>Online</p>
              ) : (
                <p>{event.distance?.toFixed(2)} miles away</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;