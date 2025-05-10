'use client';
import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
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
  },
];

const CategoriesSection = () => {
  const isMediumScreen = useMediaQuery('(min-width: 640px)');

  return (
    <div>
      <h3 className="text-3xl font-bold mt-20 mb-5">Explore Top Categories</h3>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 ${
          isMediumScreen ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } mx-5 sm:mx-10 lg:mx-20`}
      >
        {categories.slice(0, isMediumScreen ? 5 : 4).map((category, index) => (
          <Link
            href={`/search?query=${category.title.toLowerCase()}`}
            key={index}
            className="flex flex-col justify-evenly text-center text-xl w-40 bg-[#EDF2F4] p-4 rounded-lg shadow-2xl cursor-pointer hover:scale-105 transform transition duration-300"
          >
            <Image
              src={category.icon}
              alt={category.title}
              width={300}
              height={300}
              className="w-16 h-16 mx-auto mb-2"
            />
            <div>
              <h4>{category.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;