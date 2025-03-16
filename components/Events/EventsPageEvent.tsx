import Image from "next/image";
import Link from "next/link";

interface EventsPageEventsProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  date: string;
}

const EventsPageEvent = ({ id, src, alt, title, description, date }: EventsPageEventsProps) => {
  const queryParams = new URLSearchParams({
    title,
    description,
    date,
    src,
  }).toString();

  const newDate = new Date(date).toLocaleDateString()

  return (
    <Link 
      href={`/events/${id}?${queryParams}`} 
      className="flex flex-row gap-5 hover:bg-gray-100"
    >
      <Image src={src} alt={alt} width={300} height={300} />
      <div>
        <h4 className="text-2xl font-bold">{title}</h4>
        <p>{description}</p>
        <p>{newDate}</p>
      </div>
    </Link>
  );
};

export default EventsPageEvent;
