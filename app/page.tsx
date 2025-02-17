import HomePageEvents from '@/components/Events/HomePageEvents'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col justify-evenly w-1/2 mx-auto mt-20'>
          <h1 className='text-4xl font-bold'>Make new friends and meet new people through local events and activities you love</h1>
          <p>Whether you&apos;re into sports, reading, board games, or anything else, Meeteen is the perfect place to find like-minded people who share your interests. Events are happening every day, everywhere - don&apos;t miss out on the fun!</p>
        </div>
        <div className='w-1/2 mx-auto mt-20'>
          <Image src='/images/happy-friends.png' alt='Happy group of friends' width={500} height={500} />
        </div>
      </div>
      <div>
        <h1 className='text-3xl font-bold mt-20'>Upcoming Events Near You</h1>
        <div className='flex flex-row justify-evenly'>
          {[{
            src: '/images/happy-friends.png',
            alt: 'Happy group of friends',
            title: 'Event Title',
            description: 'Event Description',
            date: 'Event Date'
          }, {
            src: '/images/happy-friends.png',
            alt: 'Happy group of friends',
            title: 'Event Title',
            description: 'Event Description',
            date: 'Event Date'
          }, {
            src: '/images/happy-friends.png',
            alt: 'Happy group of friends',
            title: 'Event Title',
            description: 'Event Description',
            date: 'Event Date'
          },
          ].map((event, index) => (
            <HomePageEvents
              key={index}
              src='/images/happy-friends.png'
              alt='Happy group of friends'
              title='Event Title'
              description='Event Description'
              date='Event Date' />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Home