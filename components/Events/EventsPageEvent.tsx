import Image from "next/image";
import Link from "next/link";
import EventRegistrationModal from '@/components/Events/EventRegistrationModal';
import { useState } from "react";

interface EventsPageEventsProps {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventsPageEvent = ({ id, src, title, description, date, location }: EventsPageEventsProps) => {
  const queryParams = new URLSearchParams({
    title,
    description,
    date,
    src,
  }).toString();

  const newDate = new Date(date).toLocaleDateString();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <EventRegistrationModal eventId={id} onClose={() => setShowModal(false)} />}

      <div className="flex flex-row gap-5 hover:bg-gray-100 relative p-4 rounded-lg shadow-md">
        <Link href={`/events/${id}?${queryParams}`} className="flex flex-row gap-5 flex-1">
          {/* Image Wrapper to ensure uniform size */}
          <div className="w-[200px] h-[200px] relative overflow-hidden rounded-lg">
            <Image 
              src={src} 
              alt={title} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
          </div>
          <div>
            <h4 className="text-2xl font-bold">{title}</h4>
            <p className="text-gray-600">{location}</p>
            <p className="text-gray-800 font-medium">{newDate}</p>
            <p className="text-gray-500">{description}</p>
          </div>
        </Link>

        {/* Register button (prevents navigation when clicked) */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents event bubbling to <Link>
            setShowModal(true);
          }}
          className="bg-[#2B2D42] hover:bg-[#8D99AE] transition duration-200 ease-out text-white rounded-full p-2 w-fit self-center"
        >
          Register
        </button>
      </div>
    </>
  );
};

export default EventsPageEvent;
