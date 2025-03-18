/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const EventRegistrationModal = ({ eventId, onClose }: { eventId: string; onClose: () => void }) => {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Fetch user session
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user || error) {
        setUser(null);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
      if (!error) setEvent(data);
      setLoading(false);
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // Check if the user is already registered
  useEffect(() => {
    const checkRegistration = async () => {
      if(user){
        const { data } = await supabase
          .from("event_registrations")
          .select("*")
          .eq("event_id", eventId)
          .eq("user_id", user.id)
          .single();

        if (data) {
          setIsRegistered(true);
        }
      }
      
    };

    if (user && eventId) {
      checkRegistration();
    }
  }, [user, eventId]);

  // Handle registration
  const handleRegister = async () => {
    setRegistering(true);
    if (!user) {
      router.push("/log-in"); // Redirect if not logged in
      setRegistering(false);
      return;
    }
  
    try {
      // Fetch event capacity
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("capacity")
        .eq("id", eventId)
        .single();
  
      if (eventError || !eventData) {
        console.error("Error fetching event data:", eventError);
        return;
      }
  
      // Fetch current registrations
      const { data: registrationData, error: regError } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("event_id", eventId);
  
      if (regError || !registrationData) {
        console.error("Error fetching registration data:", regError);
        return;
      }
  
      // Check if event is full
      if (registrationData.length >= eventData.capacity) {
        alert("Sorry, this event is already full.");
        return;
      }
  
      // Register the user
      const { error: insertError } = await supabase.from("event_registrations").insert([
        { event_id: eventId, user_id: user.id },
      ]);
  
      if (!insertError) {
        setIsRegistered(true);
        alert("Successfully registered!");
      } else {
        console.error("Registration failed:", insertError);
      }
    } catch (error) {
      console.error("Unexpected error in handleRegister:", error);
    }
    setRegistering(false);
  };
  

  if (loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-2">{event?.name || "Event"}</h2>

        {user ? (
          isRegistered ? (
            <p className="text-green-600">✅ You are already registered for this event!</p>
          ) : (
            <button
              onClick={handleRegister}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
              disabled={registering}
            >
              Register Now
            </button>
          )
        ) : (
          <div>
            <p className="text-red-600">⚠️ You must be logged in to register.</p>
            <button
              onClick={() => router.push("/log-in")}
              className="bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full"
            >
              Go to Login
            </button>
          </div>
        )}

        <button onClick={onClose} className="mt-4 text-gray-500 w-full text-center">
          Close
        </button>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
