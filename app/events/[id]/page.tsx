"use client";

import GoogleMaps from "@/components/GoogleMaps";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventRegistrationModal from "@/components/Events/EventRegistrationModal";
import Link from "next/link";
import ProgressBar from "@/components/Events/ProgressBar";

type User = {
  id: string;
  name: string;
  avatar?: string;
  // add other fields if needed
};


const EventDetailPage = () => {
  const params = useParams();
  const id = params.id; // ✅ Ensure `id` is retrieved

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(null);
  const [organiser, setOrganiser] = useState<User | null>(null);
  const [attendees, setAttendees] = useState<User[]>([]); // ✅ Use a more specific type if possible
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    if (!id) return; // Prevent fetch if `id` is missing

    const fetchEvent = async () => {
      const response = await fetch("/api/fetchEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id }), // Pass the event ID in the request body
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching event:", error.error);
        return;
      }

      const eventData = await response.json();
      setEvent(eventData);
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
      }
    };
  
    fetchOrganiser();
  }, [event?.organiser_id]); // ✅ watch specific value, not whole event

  useEffect(() => {
    
    const fetchAttendees = async () => {
      try{
        const response = await fetch('/api/fetchAttendees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId: id }), // Pass the event ID in the request body
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error fetching attendees:', error.error);
          return;
        }

        const attendeesData = await response.json();
        setAttendees(attendeesData);
      }catch(error){
        if (error instanceof Error) {
          console.error('Error fetching attendees:', error.message);
        } else {
          console.error('Error fetching attendees:', error);
        }

      }
  }

  fetchAttendees();
}, [id]); // ✅ watch specific value, not whole event
  

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <>
      {showModal && <EventRegistrationModal eventId={id as string} onClose={() => setShowModal(false)} />}
      
      {/* Display event details */}
      <div className="width-screen flex flex-row justify-around items-center border-b-2 border-[#2B2D42] mb-4 p-4">
        <div className="flex flex-col items-start justify-center gap-5">
          <h3 className="text-4xl font-bold text-[#2B2D42]">{event.name}</h3>
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
          <p className="text-gray-600">Date: {new Date(event.date).toDateString()} : {event.time.slice(0,5)}</p>
        </div>
        <button className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 w-fit h-fit" 
        onClick={() => setShowModal(true)}>
          Register
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-10 mb-10">
        <div className="p-6 max-w-lg mx-auto rounded-md">
          <div className="h-96 w-full relative rounded-md overflow-hidden shadow-lg">
            <Image
              src={event.image_url || "/images/happy-friends.png"}
              alt={event.name}
              objectFit="cover"
              fill
            />
          </div>
          
          <h4 className="text-2xl font-semibold mt-4">Details and Description</h4>
          <p className="mt-4">{event.description}</p>
          <div className="flex flex-col justify-between shadow-lg items-start mt-4">
            <h4 className="text-2xl font-semibold mt-4">Attendees</h4>
            <div className="grid grid-cols-4 gap-4 mt-4 w-[400px] items-center"> {/* Fixed width */}
              {attendees.length > 0 ? (
                attendees.slice(0, 4).map((person, index) => (
                  <Link href={`/profile/${person.id}`}
                  key={index} className="flex flex-col items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <Image 
                      src={person.avatar || "/images/default-avatar.png"}
                      alt={person.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p className="text-sm text-gray-600 mt-2">{person.name}</p>
                  </Link>
                ))
              ) : (
                <p className="text-lg text-gray-600 text-center w-full">No attendees yet</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-between gap-5 p-6 max-w-lg mx-auto self-start">
          <div className="shadow-lg p-10 mb-10">
            <h6 className="font-bold text-xl">Groups Coming Soon...</h6>
          </div>
          <p className="text-gray-600">Date: {new Date(event.date).toDateString()}</p>
          <p className="text-gray-600">Time: {event.time.slice(0, 5)}</p>

          <p className="text-gray-600">City: {event.location}</p>
          {event.postcode && <p>Post Code: {event.postcode}</p>}
          <p>Capacity: {event.capacity}</p>
          <ProgressBar eventId={id as string} capacity={event.capacity}/>
          <GoogleMaps location={event.location} />
        </div>
      </div>
      
    </>
  );
};

export default EventDetailPage;
