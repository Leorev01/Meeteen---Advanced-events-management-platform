import CategoriesSection from '@/components/HomePage/CategoriesSection'
import CitiesSection from '@/components/HomePage/CitiesSection'
import EventsSection from '@/components/HomePage/EventsSection'
import HeroSection from '@/components/HomePage/HeroSection'
import JoinMeeteenSection from '@/components/HomePage/JoinMeeteenSection'
import PopularEvents from '@/components/HomePage/PopularEvents'
import UpcomingEventsSection from '@/components/HomePage/UpcomingEventsSection'
import Image from 'next/image'
import Link from 'next/link'


const Home = () => {

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Hero Section */}
      <HeroSection />

      {/* Events Near You Section */}
      <EventsSection />

      {/* Upcoming Online Events Section */}
      <UpcomingEventsSection />

      {/* Join Meeteen Section */}
      <JoinMeeteenSection />

      {/* Explore Top Categories Section */}
      <CategoriesSection />

      {/* Popular Events */}
      <PopularEvents />

      {/* Popular Cities Section */}
      <CitiesSection />

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
