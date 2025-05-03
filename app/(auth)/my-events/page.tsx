/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {toast} from 'react-hot-toast';

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
  const [futureEvents, setFutureEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
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

    const futureEvents = allEvents.filter((event: Event) => new Date(event.date) > new Date());
    const pastEvents = allEvents.filter((event: Event) => new Date(event.date) <= new Date());
    setFutureEvents(futureEvents);
    setPastEvents(pastEvents)
    setLoading(false);
  };
  useEffect(() => {

    fetchEvents();
  }, [user]);

  // Unregister from an event
  const handleUnregister = async (event: Event) => {
    const { error } = await supabase
      .from("event_registrations")
      .delete()
      .eq("event_id", event.id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Unregistration failed.");
      //console.error("Unregistration failed:", error);
    } else {
      if(event.organiser_id === user.id) {
        await fetchEvents(); // Refresh events if the user is the organiser
      }else{
        setFutureEvents(futureEvents.filter((event) => event.id !== event.id));
        setRegisteredEventIds(registeredEventIds.filter((id) => id !== event.id)); // Update registered event IDs
      }
      toast.success("Unregistered successfully!");
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          subject: "Event Unregistration",
          message: `You have successfully unregistered from the event with ID: ${event.id}`,
        }),
      });
      const data = await response.json();
      console.log(data);
      //Log user activity
      await fetch('/api/auth/log-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          action: 'event_unregistration',
          metadata: event.id,
        }),
      });
    }
  };

  // Delete an event (if user created it)
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm(`Are you sure you want to delete this event?\nThis action cannot be undone.`)) {
      return;
    }
  
    // Delete the event
    const { error: eventError } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);
  
    if (eventError) {
      toast.error("Failed to delete event.");
      //console.error("Error deleting event:", eventError);
    } else {
      toast.success("Event deleted successfully!");
      // Remove the event from the futureEvents and pastEvents arrays
      setFutureEvents(futureEvents.filter((event) => event.id !== eventId));
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

      //Log user activity
      await fetch('/api/auth/log-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          action: 'delete_event',
          metadata: eventId,
        }),
      });
    }
  };
  

  if (loading) return <p className="text-center mt-5">Loading your events...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Registered & Created Events</h1>

      {futureEvents.length === 0 ? (
        <p className="text-gray-500">You are not registered for or have not created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {futureEvents.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
          <Link href={`/events/${event.id}`} className="flex items-center gap-4 flex-1">
            <Image
              src={event.image_url || "/images/happy-friends.png"}
              alt={event.name}
              className="rounded-lg object-cover"
              width={100}
              height={100}
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">{event.location}</p>
            </div>
          </Link>
        
          {/* Buttons wrapper aligned to the end */}
          <div className="flex flex-wrap justify-end gap-2 w-full sm:w-auto">
        
            {/* Show Unregister button ONLY if the user is registered */}
            {registeredEventIds.includes(event.id) && (
              <button
                onClick={() => handleUnregister(event)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 w-full sm:w-auto"
              >
                Unregister
              </button>
            )}
        
            {/* Show Delete and Edit button ONLY if the user created the event */}
            {event.organiser_id === user.id && (
              <>
                <Link
                className="bg-blue-500 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                href={`/edit-event?eventId=${event.id}`}
                >
                  Edit Event
                </Link>

                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 w-full sm:w-auto"
                >
                  Delete Event
                </button>
              </>
            )}
          </div>
        </div>
          
          ))}
        </div>
      )}
      <h1 className="text-2xl font-bold my-5">My Previous Events</h1>
      {futureEvents.length === 0 ? (
        <p className="text-gray-500">You are not registered for or have not created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {pastEvents.map((event) => (
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
            <Link href={`/events/${event.id}`} className="text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto">
                View Event
              </button>
            </Link>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
