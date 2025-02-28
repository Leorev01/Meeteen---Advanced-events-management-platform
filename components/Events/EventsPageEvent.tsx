import Image from 'next/image'

interface EventsPageEventsProps {
    src: string
    alt: string
    title: string
    description: string
    date: string
}

const EventsPageEvent = ({src, alt, title, description, date}:EventsPageEventsProps) => {
  return (
    <div className='flex flex-row gap-5'>
        <Image src={src} alt={alt} width={300} height={300} />
        <div>
            <h4 className='text-2xl font-bold'>{title}</h4>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default EventsPageEvent