/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const NotificationsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [eventChats, setEventChats] = useState<{ event_id: string; event_name: string; event_description: string; event_image: string }[]>([]);

  useEffect(() => {
    // Fetch logged-in user
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user:", error);
        return;
      }
      console.log("User ID:", data.user.id); // Debugging
      setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Fetch registered events & join with events table
    const fetchUserEvents = async () => {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id, events!inner(id, name, description, image_url)") // INNER JOIN with events table
        .eq("user_id", user.id); // Removed ordering
    
      if (error) {
        console.error("Error fetching events:", error);
        return;
      }
    
      console.log("Fetched events:", data); // Debugging
    
      setEventChats(
        data.map((event: any) => ({
          event_id: event.event_id,
          event_name: event.events?.name || "Unnamed Event",
          event_description: event.events?.desciption,
          event_image: event.events?.image_url,
        }))
      );
    };
    

    fetchUserEvents();
  }, [user]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">📢 Notifications</h1>

      {eventChats.length === 0 ? (
        <p className="text-gray-500">You are not registered for any event chats.</p>
      ) : (
        <div className="space-y-4">
          {eventChats.map((chat) => (
            <Link
              key={chat.event_id}
              href={`/chat/${chat.event_id}`}
              className="flex flex-row p-4 border rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="relative h-40 w-40 mb-2">
                <Image
                  src={chat.event_image || "/images/happy-friends.png"} // Added default image
                  alt={chat.event_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{chat.event_name}</h2>
                <p className="text-xl font-semibold">{chat.event_description}</p>
                <p className="text-gray-500">Tap to enter chat</p>
              </div>
              
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
