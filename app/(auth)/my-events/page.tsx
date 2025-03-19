/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  organiser_id: string; // Updated to match database column
}

const MyEvents = () => {
  const [user, setUser] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]); // Store registered event IDs separately
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/log-in"); // Redirect if not logged in
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [router]);

  // Fetch user's registered & created events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;

      // Fetch registered event IDs
      const { data: regData, error: regError } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id);

      if (regError) {
        console.error("Error fetching registrations:", regError);
        return;
      }

      const eventIds = regData.map((reg) => reg.event_id);
      setRegisteredEventIds(eventIds); // Store registered event IDs

      // Fetch registered events
      let events: Event[] = [];
      if (eventIds.length > 0) {
        const { data: registeredEvents, error: regEventsError } = await supabase
          .from("events")
          .select("*")
          .in("id", eventIds);

        if (!regEventsError) {
          events = registeredEvents;
        }
      }

      // Fetch created events
      const { data: createdEvents, error: createdError } = await supabase
        .from("events")
        .select("*")
        .eq("organiser_id", user.id);

      if (createdError) {
        console.error("Error fetching created events:", createdError);
      }

      // Merge lists, avoiding duplicates
      const allEvents = [...events, ...(createdEvents || [])].reduce((acc, event) => {
        if (!acc.find((e: { id: any; }) => e.id === event.id)) acc.push(event);
        return acc;
      }, [] as Event[]);

      setRegisteredEvents(allEvents);
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  // Unregister from an event
  const handleUnregister = async (eventId: string) => {
    const { error } = await supabase
      .from("event_registrations")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Unregistration failed:", error);
    } else {
      setRegisteredEvents(registeredEvents.filter((event) => event.id !== eventId));
      setRegisteredEventIds(registeredEventIds.filter((id) => id !== eventId)); // Update registered event IDs
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          subject: "Event Unregistration",
          message: `You have successfully unregistered from the event with ID: ${eventId}`,
        }),
      });
      const data = await response.json();
      console.log(data);
    }
  };

  // Delete an event (if user created it)
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
  
    // Delete all registrations linked to this event first
    const { error: regError } = await supabase
      .from("event_registrations")
      .delete()
      .eq("event_id", eventId);
  
    if (regError) {
      console.error("Error deleting event registrations:", regError);
      return;
    }
  
    // Delete the event itself
    const { error: eventError } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);
  
    if (eventError) {
      console.error("Error deleting event:", eventError);
    } else {
      setRegisteredEvents(registeredEvents.filter((event) => event.id !== eventId));
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          subject: "Event Deletion",
          message: `The event with ID: ${eventId} has been successfully deleted.`,
        }),
      });
      const data = await response.json();
      console.log(data);
    }
  };
  

  if (loading) return <p className="text-center mt-5">Loading your events...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Registered & Created Events</h1>

      {registeredEvents.length === 0 ? (
        <p className="text-gray-500">You are not registered for or have not created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {registeredEvents.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
            <Image
              src={event.image_url || "/images/happy-friends.png"}
              alt={event.name}
              className="rounded-lg object-cover"
              width={100}
              height={100}
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">{event.location}</p>
            </div>
          
            {/* Buttons wrapper for better responsive handling */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
              <Link className="bg-blue-500 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto" href={`/events/${event.id}`}>
                View Event
              </Link>
          
              {/* Show Unregister button ONLY if the user is registered */}
              {registeredEventIds.includes(event.id) && (
                <button
                  onClick={() => handleUnregister(event.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 w-full sm:w-auto"
                >
                  Unregister
                </button>
              )}
          
              {/* Show Delete button ONLY if the user created the event */}
              {event.organiser_id === user.id && (
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 w-full sm:w-auto"
                >
                  Delete Event
                </button>
              )}
            </div>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
