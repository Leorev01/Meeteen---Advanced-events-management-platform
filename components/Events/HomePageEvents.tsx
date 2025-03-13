import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type HomePageEventsProps = {
    id: number
    src: string
    title: string
    description: string
    date: string
    }

const HomePageEvents = ({id, src, title, description, date}: HomePageEventsProps) => {

  const newDate = new Date(date).toLocaleDateString()

  return (
    <Link href={`/events/${id}`} className='flex flex-col justify-evenly w-72 mx-auto mt-5 shadow-2xl p-4 rounded-lg'>
        <Image src={src} alt={title} width={500} height={500} />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{newDate}</p>
    </Link>
  )
}

export default HomePageEvents