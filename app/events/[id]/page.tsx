"use client";

import GoogleMaps from "@/components/GoogleMaps";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventRegistrationModal from "@/components/Events/EventRegistrationModal";

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id; // ✅ Ensure `id` is retrieved

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(null);
  const [organiser, setOrganiser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const fetchOrganiser = async () => {
      if (!event?.organiser_id) {
        console.warn("Organiser ID is missing or invalid.");
        return;
      }
  
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", event.organiser_id)
        .single();
  
      if (error) {
        console.error("Error fetching organiser:", error.message);
      } else if (!data) {
        console.warn("No organiser found for ID:", event.organiser_id);
      } else {
        setOrganiser(data);
        console.log("Organiser fetched:", data);
      }
    };
  
    fetchOrganiser();
  }, [event?.organiser_id]); // ✅ watch specific value, not whole event
  

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <>
      {showModal && <EventRegistrationModal eventId={id as string} onClose={() => setShowModal(false)} />}
      
      {/* Display event details */}
      <div className="width-screen flex flex-row justify-around items-center border-b-2 border-[#2B2D42] mb-4 p-4">
        <div className="flex flex-col items-start justify-center gap-5">
          <h1 className="text-4xl font-bold text-[#2B2D42]">{event.name}</h1>
          <p>
            {organiser ? (
                <Image
                  src={organiser.avatar || "/images/default-avatar.png"}
                  alt={`${organiser.name}'s profile pic`}
                  width={40}
                  height={30}
                  className="inline-block rounded-full mr-5"
                />
            ) : (
              "Loading organiser..."
            )}
            Hosted by:{organiser ? organiser.name : "Loading..."}
          </p>
          <p className="text-gray-600">Date: {new Date(event.date).toDateString()} : {event.time}</p>
        </div>
        <button className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 w-fit h-fit" 
        onClick={() => setShowModal(true)}>
          Register
        </button>
      </div>
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
        <p className="text-gray-600">City: {event.location}</p>
        {event.postcode && <p>Post Code: {event.postcode}</p>}
        <p>Capacity: {event.capacity}</p>
        <button onClick={() => setShowModal(true)}
          className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit self-center">Register</button>
        <GoogleMaps location={event.location} />
      </div>
    </>
  );
};

export default EventDetailPage;
