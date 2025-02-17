import Image from 'next/image'
import React from 'react'

type HomePageEventsProps = {
    src: string
    alt: string
    title: string
    description: string
    date: string
    }

const HomePageEvents = ({src, alt, title, description, date}: HomePageEventsProps) => {
  return (
    <div className='flex flex-col justify-evenly w-72 mx-auto mt-20 shadow-2xl p-4 rounded-lg'>
        <Image src={src} alt={alt} width={500} height={500} />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{date}</p>
    </div>
  )
}

export default HomePageEvents