"use client";

import GoogleMaps from "@/components/GoogleMaps";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id; // ✅ Ensure `id` is retrieved

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return; // Prevent fetch if `id` is missing

    const fetchEvent = async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id).single();

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <Image
        src={event.image_url || "/images/happy-friends.png"}
        alt={event.name}
        width={600}
        height={400}
      />
      <p className="mt-4">{event.description}</p>
      <p className="text-gray-600">Date: {new Date(event.date).toLocaleString()}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <GoogleMaps location={event.location} />
    </div>
  );
};

export default EventDetailPage;
