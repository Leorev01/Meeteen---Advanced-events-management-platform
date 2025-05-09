'use client';
import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import Image from 'next/image';

const cities = [{
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
          },]

const CitiesSection = () => {
    const isMediumScreen = useMediaQuery('(min-width: 640px)');
  return (
    <div>
        <h3 className='text-3xl font-bold mt-20 mb-5'>Popular Cities</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
          {cities.slice(0, isMediumScreen ? 5 : 4).map((city, index) => (
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
  )
}

export default CitiesSection