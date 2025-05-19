/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useState } from 'react';
import HomePageEvents from '../Events/HomePageEvents';
import EventsPageEvent from '../Events/EventsPageEvent';
import useMediaQuery from '@/hooks/useMediaQuery';
import { supabase } from '@/lib/supabase';
import { getCoordinates } from '@/utils/geocode/getCoordinates';
import { getDistanceFromLatLonInMiles } from '@/utils/geocode/getDistanceFromLatLonInMiles';

type LatLng = { latitude: number; longitude: number };

const EventsSection = () => {
  /* ───────── state ───────── */
  const [events, setEvents]         = useState<any[]>([]);
  const [userLocation, setUserLoc]  = useState<LatLng | null>(null);
  const [loading, setLoading]       = useState(true);
  const [locationError, setLocErr]  = useState<string | null>(null);

  const isLarge   = useMediaQuery('(min-width: 1150px)');
  const isMedium  = useMediaQuery('(min-width: 868px)');

  /* ───────── get browser location ───────── */
  const requestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLoc({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err)  => {
        console.error('Geolocation error:', err);
        setLocErr(
          'We couldn’t access your location. Enable location services in your browser settings to see nearby events.'
        );
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    requestLocation();         // fire once on mount
  }, [requestLocation]);

  /* ───────── fetch + sort events ───────── */
  useEffect(() => {
    const fetchEvents = async () => {
      if (!userLocation) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .limit(4);

      if (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        return;
      }

      const eventsWithCoords = await Promise.all(
        data.map(async (evt) => {
          if (evt.location !== 'Online') {
            try {
              const { lat, lng } = await getCoordinates(evt.location);
              return { ...evt, latitude: lat, longitude: lng };
            } catch (e) {
              console.error(`Geocode failed for ${evt.id}:`, e);
              return null;
            }
          }
          return evt;
        })
      );

      const valid = eventsWithCoords.filter(Boolean) as any[];

      const withDistance = valid.map((evt) => {
        if (evt.location === 'Online') return { ...evt, distance: null };
        const d = getDistanceFromLatLonInMiles(
          userLocation.latitude, userLocation.longitude, evt.latitude, evt.longitude
        );
        return { ...evt, distance: d };
      });

      const sorted = withDistance.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      setEvents(sorted);
      setLoading(false);
    };

    if (userLocation) fetchEvents();
  }, [userLocation]);

  /* ───────── rendering helpers ───────── */
  const renderNotice = (text: string) => (
    <p className="mx-auto max-w-xl text-center italic text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      {text}
    </p>
  );

  /* ───────── UI ───────── */
  return (
    <div>
      <h3 className="text-3xl font-bold mt-20 mb-5 text-center md:text-left">Events Near You</h3>

      {locationError && renderNotice(locationError)}

      {(!locationError && loading) && <div>Loading events near you...</div>}

      {(!locationError && !loading && events.length === 0) &&
        renderNotice('No upcoming events found near you—check back soon!')
      }

      {(!locationError && !loading && events.length > 0) && (
        <div className="flex flex-col md:flex-row justify-evenly">
          {events
            .slice(0, isLarge ? 4 : isMedium ? 3 : 2)
            .map((evt) => (
              <div key={evt.id}>
                {/* mobile card */}
                <div className="md:hidden block">
                  <EventsPageEvent
                    id={evt.id}
                    src={evt.image_url || '/images/happy-friends.png'}
                    title={evt.name}
                    description={evt.description}
                    date={evt.date}
                    location={evt.location}
                  />
                  <p className="text-sm mt-1">
                    {evt.location === 'Online' ? 'Online' : `${evt.distance?.toFixed(2)} miles away`}
                  </p>
                </div>

                {/* desktop card */}
                <div className="hidden md:block">
                  <HomePageEvents
                    id={evt.id}
                    src={evt.image_url || '/images/happy-friends.png'}
                    title={evt.name}
                    location={evt.location}
                    capacity={evt.capacity}
                    date={evt.date}
                  />
                  <p className="text-sm mt-1">
                    {evt.location === 'Online' ? 'Online' : `${evt.distance?.toFixed(2)} miles away`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EventsSection;
