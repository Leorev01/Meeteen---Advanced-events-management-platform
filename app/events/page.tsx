"use client";
import EventsPageEvent from "@/components/Events/EventsPageEvent";
import { useState, useEffect } from "react";
import {supabase} from "@/lib/supabase";
import FilterBar from "@/components/Events/FilterBar";

const EventsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) console.error("Error fetching events:", error);
      else setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">All Events</h2>
      
      {/* Filter Section */}
      <FilterBar setEvents={setEvents} events={events} setLoading={setLoading}/>

      {/* Events + Map Section */}
      <div className="flex flex-col sm:flex-row w-full justify-between gap-6">
        {/* Scrollable Events Section */}
        <div className="flex flex-col gap-4 mt-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full">
          {loading && <p className="text-center">Loading...</p>}
          {events.length > 0 && (
            events.map((event) => (
              <EventsPageEvent
                key={event.id}
                id={event.id}
                title={event.name}
                description={event.description}
                date={event.date}
                src={event.image_url || "/images/happy-friends.png"}
                location={event.location}
              />
            ))
          )}
          {!loading && events.length === 0 && (
            <p className="text-center">No events found.</p>
          )}
        </div>

        {/* Location Section - Hidden on Small Screens */}
        <div className="hidden md:block flex-col mt-4">
          <p className="text-md text-gray-700">All events in:</p>
          <p className="text-xl font-bold">United Kingdom</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9478108.126193939!2d-4.4737716!3d54.55127985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2suk!4v1742139814279!5m2!1sen!2suk"
          width="400"
          height="250"
          className="border:0;"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
