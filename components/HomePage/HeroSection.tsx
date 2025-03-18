'use client'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js';

const HeroSection = () => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
        } else {
            setUser(data.user);
        }
      };
      fetchUser();
    }, []);



  return (
    <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col justify-evenly w-1/2 mx-auto mt-20'>
          <h1 className='text-4xl font-bold'>
            Bored? Let&apos;s Change That! Meet New People & Make Friends Through Events Near You.
          </h1>
          <p>
            Whether you&apos;re looking for something chill to do, or you just want to meet some cool people, Meeteen is the place to be! There&apos;s always something happening nearby – games, sports, parties, and everything in between. No more sitting around – find your next adventure!
          </p>
          {!user 
          ?
          <Link href='/sign-up' className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit'>
            Join Meeteen
          </Link>
          :
          <Link href='/events' className='bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2 w-fit'>
            Explore Events
          </Link>
          }
        </div>
        <div className='hidden md:block w-1/2 mx-auto mt-20'>
          <Image
            src='/images/happy-friends.png'
            alt='Happy group of friends'
            width={500}
            height={500}
          />
        </div>
      </div>
  )
}

export default HeroSection