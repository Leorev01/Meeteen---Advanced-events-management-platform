import HomePageEvents from '@/components/Events/HomePageEvents'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      {/* Hero Section */}
      <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col justify-evenly w-1/2 mx-auto mt-20'>
          <h1 className='text-4xl font-bold'>
            Bored? Let&apos;s Change That! Meet New People & Make Friends Through Events Near You.
          </h1>
          <p>
            Whether you&apos;re looking for something chill to do, or you just want to meet some cool people, Meeteen is the place to be! There&apos;s always something happening nearby – games, sports, parties, and everything in between. No more sitting around – find your next adventure!
          </p>
          <Link href='/sign-up' className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit'>
            Join Meeteen
          </Link>
        </div>
        <div className='w-1/2 mx-auto mt-20'>
          <Image
            src='/images/happy-friends.png'
            alt='Happy group of friends'
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Events Near You Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20'>
          Events Near You
        </h3>
        <div className='flex flex-row justify-evenly'>
          {[
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Epic Game Night',
              description: 'Hang out, have fun, and play your favorite board games!',
              date: 'March 5th, 7 PM',
            },
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Sports Meet-up: Basketball Jam',
              description: 'Show off your skills or just have some fun shooting hoops!',
              date: 'March 8th, 3 PM',
            },
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Movie Marathon Night',
              description: 'Grab your popcorn – it’s movie time with friends!',
              date: 'March 10th, 5 PM',
            },
          ].map((event, index) => (
            <HomePageEvents
              key={index}
              src={event.src}
              alt={event.alt}
              title={event.title}
              description={event.description}
              date={event.date}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Online Events Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20'>
          Upcoming Online Events
        </h3>
        <div className='flex flex-row justify-evenly'>
          {[
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Epic Game Night',
              description: 'Hang out, have fun, and play your favorite board games!',
              date: 'March 5th, 7 PM',
            },
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Sports Meet-up: Basketball Jam',
              description: 'Show off your skills or just have some fun shooting hoops!',
              date: 'March 8th, 3 PM',
            },
            {
              src: '/images/happy-friends.png',
              alt: 'Happy group of friends',
              title: 'Movie Marathon Night',
              description: 'Grab your popcorn – it’s movie time with friends!',
              date: 'March 10th, 5 PM',
            },
          ].map((event, index) => (
            <HomePageEvents
              key={index}
              src={event.src}
              alt={event.alt}
              title={event.title}
              description={event.description}
              date={event.date}
            />
          ))}
        </div>
      </div>

      {/* Join Meeteen Section */}
      <div className='flex flex-row align-center mt-20 bg-[#EDF2F4] px-10'>
        <div className='flex flex-col gap-6 w-1/2 mx-auto my-10'>
          <h3 className='text-3xl font-bold'>
            Join Meeteen
          </h3>
          <p>
            Ready to meet new people and make friends? Sign up for Meeteen today and start exploring events near you!
          </p>
          <Link href='/sign-up' className='bg-[#D90429] hover:bg-[#EF233C] text-white rounded-full p-2 w-fit'>
            Join Meeteen
          </Link>
        </div>
        <div className='w-1/2 mx-auto'>
          <Image
            src='/images/happy-friends.png'
            alt='Happy group of friends'
            className='justify-self-center'
            width={300}
            height={300}
          />
        </div>

      </div>

      {/* Explore Top Categories Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20 mb-5'>Explore Top Categories</h3>
        <div className='flex flex-row justify-evenly'>
          {[{
            icon: '🌲',
            title: 'Outdoor Adventures',
          },
          {
            icon: '🎮',
            title: 'Gaming',
          },
          {
            icon: '🎨',
            title: 'Arts & Crafts',
          },
          {
            icon: '🎤',
            title: 'Music & Dance',
          },
          {
            icon: '🍔',
            title: 'Food & Drink',
          },].map((category, index) => (
            <div key={index} className='flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 rounded-lg shadow-2xl cursor-pointer hover:scale-105 transform transition duration-300'>
              <div>
                <p>{category.icon}</p>
              </div>
              <div>
                <h4>{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* Popular Cities Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20 mb-5'>Popular Cities</h3>
        <div className='flex flex-row justify-evenly'>
          {[{
            city: 'New York, NY',
          },
          {
            city: 'Los Angeles, CA',
          },
          {
            city: 'San Francisco, CA',
          },
          {
            city: 'Chicago, IL',
          },
          {
            city: 'Houston, TX',
          },].map((city, index) => (
            <div key={index} className='flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 shadow-2xl cursor-pointer hover:underline rounded-full'>
              <div>
                <Image src='/images/happy-friends.png' alt='Happy group of friends' width={300} height={300} />
                <h4>{city.city}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
