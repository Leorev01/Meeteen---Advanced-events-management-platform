'use client'
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EventsPageEvent from "../Events/EventsPageEvent";
import HomePageEvents from "../Events/HomePageEvents";
import useMediaQuery from "@/hooks/useMediaQuery";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  image_url?: string; // Added optional image_url property
}

const PopularEvents = () => {
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const isLargeScreen = useMediaQuery('(min-width: 1150px)');

  useEffect(() => {
    const fetchPopularEvents = async () => {
      setLoading(true);

      // Step 1: Fetch all rows from event_registrations
      const { data: eventRegistrations, error: registrationError } = await supabase
        .from("event_registrations")
        .select("event_id");

      if (registrationError) {
        console.error("Error fetching event registrations:", registrationError);
        setLoading(false);
        return;
      }

      // Step 2: Count registrations for each event_id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const registrationCounts = eventRegistrations.reduce((acc: any, reg: any) => {
        acc[reg.event_id] = (acc[reg.event_id] || 0) + 1;
        return acc;
      }, {});

      // Step 3: Fetch all events
      const { data: allEvents, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date(Date.now()).toISOString()); // Only fetch future events

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        setLoading(false);
        return;
      }

      // Step 4: Combine events with registration counts
      const eventsWithPopularity = allEvents.map((event) => ({
        ...event,
        registrationCount: registrationCounts[event.id] || 0, // Add registration count to each event
      }));

      // Step 5: Sort by popularity and limit to 4
      const sortedEvents = eventsWithPopularity
        .sort((a, b) => b.registrationCount - a.registrationCount) // Sort in descending order of popularity
        .slice(0, 4); // Limit to 4 events

      setPopularEvents(sortedEvents);
      setLoading(false);
    };

    fetchPopularEvents();
  }, []);

  if (loading) {
    return <p>Loading popular events...</p>;
  }

  return (
    <div>
      <h3 className="text-3xl font-bold mb-5 mt-20">Most Popular Events</h3>
      <div className="flex flex-col md:flex-row justify-evenly">
        {popularEvents.slice(0, isLargeScreen ? 4 : 3).map((event) => (
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
              <p className="text-sm font-bold text-gray-800">
                {event.capacity} Registrations
              </p>
            </div>
            <div className="hidden md:block">
              <HomePageEvents
                id={event.id}
                src={event.image_url || '/images/happy-friends.png'}
                capacity={event.capacity}
                title={event.name}
                location={event.location}
                date={event.date}
              />
              <p className="text-sm font-bold text-gray-800">
                {event.capacity} Registrations
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;