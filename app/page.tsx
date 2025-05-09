import CategoriesSection from '@/components/HomePage/CategoriesSection'
import CitiesSection from '@/components/HomePage/CitiesSection'
import CreateEvents from '@/components/HomePage/CreateEvents'
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
      <CreateEvents />
    </div>
  )
}

export default Home
