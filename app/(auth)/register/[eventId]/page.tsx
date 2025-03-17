"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from '@supabase/supabase-js';

const EventRegistrationPage = () => {
  const { eventId } = useParams(); // Get eventId from URL
  const router = useRouter();
  const [event, setEvent] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState<User | null>(null);

  // Fetch user session
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/log-in"); // Redirect to login if not authenticated
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [router]);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
      if (error) console.error("Error fetching event:", error);
      else setEvent(data);
      setLoading(false);
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // Auto-register user when page loads
  useEffect(() => {
    const registerUser = async () => {
      if (user && eventId) {
        const { data } = await supabase
          .from("event_registrations")
          .select("*")
          .eq("event_id", eventId)
          .eq("user_id", user.id)
          .single();

        if (!data) {
          const { error: insertError } = await supabase.from("event_registrations").insert([
            { event_id: eventId, user_id: user.id, email: user.email },
          ]);

          if (insertError) {
            console.error("Registration failed:", insertError);
          } else {
            alert("Successfully registered!");
            router.push(`/event/${eventId}`); // Redirect to event page
          }
        } else {
          router.push(`/event/${eventId}`); // Redirect if already registered
        }
      }
    };

    if (user && eventId) {
      registerUser();
    }
  }, [user, eventId, router]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Registering for {event.name}...</h1>
      <p className="text-center text-gray-500">Redirecting...</p>
    </div>
  );
};

export default EventRegistrationPage;
