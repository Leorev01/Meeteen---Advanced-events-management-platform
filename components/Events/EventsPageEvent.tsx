import Image from "next/image";
import Link from "next/link";
import EventRegistrationModal from '@/components/EventRegistrationModal'
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
      
      <div className="flex flex-row gap-5 hover:bg-gray-100 relative">
        <Link href={`/events/${id}?${queryParams}`} className="flex flex-row gap-5 flex-1">
          <Image src={src} alt={title} width={300} height={300} />
          <div>
            <h4 className="text-2xl font-bold">{title}</h4>
            <p>{description}</p>
            <p>{newDate}</p>
            <p>{location}</p>
          </div>
        </Link>
        
        {/* Register button is now separate, preventing navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents event bubbling to <Link>
            setShowModal(true);
          }}
          className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit self-center"
        >
          Register
        </button>
      </div>
    </>
  );
};

export default EventsPageEvent;
