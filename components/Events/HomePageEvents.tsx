import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import EventRegistrationModal from '@/components/EventRegistrationModal'

type HomePageEventsProps = {
    id: string
    src: string
    title: string
    description: string
    date: string
    }

const HomePageEvents = ({id, src, title, description, date}: HomePageEventsProps) => {

  const newDate = new Date(date).toLocaleDateString()

  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {showModal && <EventRegistrationModal eventId={id} onClose={() => setShowModal(false)} />}
      <div  className='flex flex-col justify-evenly w-72 mx-auto mt-5 shadow-2xl p-4 rounded-lg'>
        <Link href={`/events/${id}`}>
            <Image src={src} alt={title} width={500} height={500} />
            <h4>{title}</h4>
            <p>{description}</p>
            <p>{newDate}</p>
        </Link>
        <button onClick={()=>setShowModal(true)} className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit self-center'>Register</button>
      </div>
    </>
  )
}

export default HomePageEvents