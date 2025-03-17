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
    <div  className='flex flex-col justify-evenly w-72 mx-auto mt-5 shadow-2xl p-4 rounded-lg'>
      <Link href={`/events/${id}`}>
          <Image src={src} alt={title} width={500} height={500} />
          <h4>{title}</h4>
          <p>{description}</p>
          <p>{newDate}</p>
      </Link>
      <Link href={`/register/${id}`} className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit self-center'>Register</Link>
    </div>
  )
}

export default HomePageEvents