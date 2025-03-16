import EventsSection from '@/components/HomePage/EventsSection'
import UpcomingEventsSection from '@/components/HomePage/UpcomingEventsSection'
import { Link2OffIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
      <EventsSection />

      {/* Upcoming Online Events Section */}
      <UpcomingEventsSection />

      {/* Join Meeteen Section */}
      <div className='flex flex-row align-center mt-20 bg-[#EDF2F4] px-10 rounded-lg'>
        <div className='flex flex-col gap-6 w-1/2 mx-auto my-10'>
          <h3 className='text-3xl font-bold'>
            Join Meeteen
          </h3>
          <p>
            Ready to meet new people and make friends? Sign up for Meeteen today and start exploring events near you!
          </p>
          <Link href='/sign-up' className='bg-[#D90429] hover:bg-[#EF233C] text-white text-xl rounded-full p-4 w-fit'>
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
            title: 'Outdoor',
          },
          {
            icon: '🎮',
            title: 'Tech',
          },
          {
            icon: '🎨',
            title: 'Education',
          },
          {
            icon: '🎤',
            title: 'Music',
          },
          {
            icon: '🍔',
            title: 'Food',
          },].map((category, index) => (
            <Link href={`/search?query=${category.title.toLowerCase()}`} key={index} className='flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 rounded-lg shadow-2xl cursor-pointer hover:scale-105 transform transition duration-300'>
              <div>
                <p>{category.icon}</p>
              </div>
              <div>
                <h4>{category.title}</h4>
              </div>
            </Link>
          ))}
        </div>
        
      </div>

      {/* Popular Cities Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20 mb-5'>Popular Cities</h3>
        <div className='flex flex-row justify-evenly'>
          {[{
            city: 'London, UK',
          },
          {
            city: 'Manchester, UK',
          },
          {
            city: 'Birmingham, UK',
          },
          {
            city: 'Liverpool, UK',
          },
          {
            city: 'Leicester, UK',
          },].map((city, index) => (
            <div key={index} className='flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 shadow-2xl cursor-pointer hover:underline rounded-full'>
              <div>
                <Image src='/images/happy-friends.png' alt='Happy group of friends' width={300} height={300} />
                <Link href={`/search?location=${city.city.split(', ')[0].toLowerCase()}`}>{city.city}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Section */}
      <div className='flex flex-row align-center my-20 bg-[#EF233C] bg-opacity-25 px-10 rounded-lg'>
        <div className='flex flex-col gap-6 w-1/2 mx-auto my-10'>
          <h3 className='text-3xl font-bold'>
            Want to host an event?
          </h3>
          <p>
            Do you have an idea for a fun event? Create an event on Meeteen and invite others to join you!
          </p>
          <Link href='/create-event' className='bg-[#D90429] hover:bg-[#EF233C] text-white text-xl rounded-full p-4 w-fit'>
            Create Event
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
    </div>
  )
}

export default Home
