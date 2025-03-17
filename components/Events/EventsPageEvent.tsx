import Image from "next/image";
import Link from "next/link";

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

  const newDate = new Date(date).toLocaleDateString()

  return (
    <Link 
      href={`/events/${id}?${queryParams}`} 
      className="flex flex-row gap-5 hover:bg-gray-100"
    >
      <Image src={src} alt={title} width={300} height={300} />
      <div>
        <h4 className="text-2xl font-bold">{title}</h4>
        <p>{description}</p>
        <p>{newDate}</p>
        <p>{location}</p>
        <Link href={`/register/${id}`} className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit self-center'>Register</Link>
      </div>
    </Link>
  );
};

export default EventsPageEvent;
