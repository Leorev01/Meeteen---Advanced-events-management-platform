"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
}

const MyEvents = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [router]);

  // Fetch user's registered events
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching registrations:", error);
        return;
      }

      if (data.length > 0) {
        const eventIds = data.map((reg) => reg.event_id);

        const { data: events, error: eventError } = await supabase
          .from("events")
          .select("*")
          .in("id", eventIds);

        if (eventError) {
          console.error("Error fetching events:", eventError);
        } else {
          setRegisteredEvents(events);
        }
      }

      setLoading(false);
    };

    fetchRegisteredEvents();
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
    }
  };

  if (loading) return <p className="text-center mt-5">Loading your events...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Registered Events</h1>

      {registeredEvents.length === 0 ? (
        <p className="text-gray-500">You have not registered for any events yet.</p>
      ) : (
        <div className="space-y-4">
          {registeredEvents.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg shadow-md flex items-center gap-4">
              <img src={event.image_url || "/images/happy-friends.png"} alt={event.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-500">{event.location}</p>
              </div>
              <Link href={`/events/${event.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Event
                </button>
              </Link>
              <button
                onClick={() => handleUnregister(event.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Unregister
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
