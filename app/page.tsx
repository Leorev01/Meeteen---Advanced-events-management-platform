import EventsSection from '@/components/HomePage/EventsSection'
import HeroSection from '@/components/HomePage/HeroSection'
import JoinMeeteenSection from '@/components/HomePage/JoinMeeteenSection'
import UpcomingEventsSection from '@/components/HomePage/UpcomingEventsSection'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

const Home = () => {

  

  return (
    <div className='max-w-7xl mx-auto'>
      <Toaster position='top-center' reverseOrder={false}/>
      {/* Hero Section */}
      <HeroSection />

      {/* Events Near You Section */}
      <EventsSection />

      {/* Upcoming Online Events Section */}
      <UpcomingEventsSection />

      {/* Join Meeteen Section */}
      <JoinMeeteenSection />

      {/* Explore Top Categories Section */}
      <div>
        <h3 className='text-3xl font-bold mt-20 mb-5'>Explore Top Categories</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-5 sm:mx-10 lg:mx-20'>
          {[{
            icon: '/images/categories/outdoors.png',
            title: 'Outdoor',
          },
          {
            icon: '/images/categories/tech.png',
            title: 'Tech',
          },
          {
            icon: '/images/categories/education.png',
            title: 'Education',
          },
          {
            icon: '/images/categories/music.png',
            title: 'Music',
          },
          {
            icon: '/images/categories/food.png',
            title: 'Food',
          },].map((category, index) => (
            <Link href={`/search?query=${category.title.toLowerCase()}`} key={index} className='flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 rounded-lg shadow-2xl cursor-pointer hover:scale-105 transform transition duration-300'>
              <Image  src={category.icon} alt={category.title} width={300} height={300} className='w-16 h-16 mx-auto mb-2'/>
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
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
          {[{
            icon: '/images/cities/london.jpg',
            city: 'London, UK',
          },
          {
            icon: '/images/cities/manchester.jpg',
            city: 'Manchester, UK',
          },
          {
            icon: '/images/cities/birmingham.jpg',
            city: 'Birmingham, UK',
          },
          {
            icon: '/images/cities/liverpool.jpg',
            city: 'Liverpool, UK',
          },
          {
            icon: '/images/cities/leicester.jpg',
            city: 'Leicester, UK',
          },].map((city, index) => (
            <Link
              href={`/search?location=${city.city.split(', ')[0].toLowerCase()}`}
              key={index}
              className='flex flex-col items-center text-center text-xl w-40 p-4 cursor-pointer hover:underline'
            >
              <div className='w-28 h-28 overflow-hidden rounded-full mb-2'>
                <Image
                  src={city.icon}
                  alt={city.city}
                  width={112} // same as 28 * 4
                  height={112}
                  className='object-cover w-full h-full'
                />
              </div>
              <p>{city.city}</p>
            </Link>
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
