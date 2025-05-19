/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useCallback } from 'react';
import HomePageEvents from '../Events/HomePageEvents';
import EventsPageEvent from '../Events/EventsPageEvent';
import useMediaQuery from '@/hooks/useMediaQuery';
import { supabase } from '@/lib/supabase';
import { getCoordinates } from '@/utils/geocode/getCoordinates';
import { getDistanceFromLatLonInMiles } from '@/utils/geocode/getDistanceFromLatLonInMiles';

type LatLng = { latitude: number; longitude: number };

const EventsSection = () => {
  /* ─────────────── component state ─────────────── */
  const [events, setEvents] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  const isLargeScreen  = useMediaQuery('(min-width: 1150px)');
  const isMediumScreen = useMediaQuery('(min-width: 868px)');

  /* ─────────────── geolocation helper ─────────────── */
  const requestLocation = useCallback(() => {
    setLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      (err) => {
        console.error('Error getting user location:', err);
        setLocationError(
          'We couldn’t access your location. Please allow location access in your browser and try again.'
        );
        setLoading(false);
      }
    );
  }, []);

  /* ask for location on first mount */
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  /* ─────────────── fetch + sort events ─────────────── */
  useEffect(() => {
    const fetchAndSortEvents = async () => {
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

      const eventsWithCoordinates = await Promise.all(
        data.map(async (evt) => {
          if (evt.location !== 'Online') {
            try {
              const { lat, lng } = await getCoordinates(evt.location);
              return { ...evt, latitude: lat, longitude: lng };
            } catch (e) {
              console.error(`Error geocoding event ${evt.id}:`, e);
              return null;
            }
          }
          return evt;
        })
      );

      const validEvents = eventsWithCoordinates.filter(Boolean) as any[];

      const eventsWithDistance = validEvents.map((evt) => {
        if (evt.location === 'Online') return { ...evt, distance: null };
        const distance = getDistanceFromLatLonInMiles(
          userLocation.latitude,
          userLocation.longitude,
          evt.latitude,
          evt.longitude
        );
        return { ...evt, distance };
      });

      const sorted = eventsWithDistance.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      setEvents(sorted);
      setLoading(false);
    };

    if (userLocation) fetchAndSortEvents();
  }, [userLocation]);

  /* ─────────────── UI ─────────────── */
  if (locationError) {
    return (
      <div className="mt-20 mb-10 p-6 border rounded-lg bg-yellow-100 text-yellow-900">
        <p>{locationError}</p>
        <button
          onClick={requestLocation}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading events near you...</div>;

  return (
    <div>
      <h3 className="text-3xl font-bold mt-20 mb-5">Events Near You</h3>
      <div className="flex flex-col md:flex-row justify-evenly">
        {events
          .slice(0, isLargeScreen ? 4 : isMediumScreen ? 3 : 2)
          .map((evt) => (
            <div key={evt.id}>
              {/* ───────── mobile card ───────── */}
              <div className="md:hidden block">
                <EventsPageEvent
                  id={evt.id}
                  src={evt.image_url || '/images/happy-friends.png'}
                  title={evt.name}
                  description={evt.description}
                  date={evt.date}
                  location={evt.location}
                />
                <p>{evt.location === 'Online' ? 'Online' : `${evt.distance?.toFixed(2)} miles away`}</p>
              </div>

              {/* ───────── desktop card ───────── */}
              <div className="hidden md:block">
                <HomePageEvents
                  id={evt.id}
                  src={evt.image_url || '/images/happy-friends.png'}
                  title={evt.name}
                  location={evt.location}
                  capacity={evt.capacity}
                  date={evt.date}
                />
                <p>{evt.location === 'Online' ? 'Online' : `${evt.distance?.toFixed(2)} miles away`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventsSection;
