'use client'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js';

const JoinMeeteenSection = () => {

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
    <div className='flex flex-row align-center mt-20 bg-[#EDF2F4] px-10 rounded-lg'>
        <div className='flex flex-col gap-6 w-full md:w-1/2 md:items-start items-center mx-auto my-10'>
          {!user 
          ?
          <>
            <h3 className='text-3xl font-bold'>
              Join Meeteen
            </h3> 
            <p>
            Ready to meet new people and make friends? Sign up for Meeteen today and start exploring events near you!
          </p>
          <Link href='/sign-up' className='bg-[#D90429] hover:bg-[#EF233C] text-white text-xl rounded-full p-4 w-fit'>
            Join Meeteen
          </Link>
          </>
          :
          <>
            <h3 className='text-3xl font-bold'>
              Start Exploring
            </h3> 
            <p>
                Start exploring events near you and meet new people!
            </p>
            <Link href='/events' className='bg-[#D90429] hover:bg-[#EF233C] text-white text-xl rounded-full p-4 w-fit'>
                Explore Events
            </Link>
          </>}
          
        </div>
        <div className='w-1/2 mx-auto hidden md:block'>
          <Image
            src='/images/happy-friends.png'
            alt='Happy group of friends'
            className='justify-self-center'
            width={300}
            height={300}
          />
        </div>

      </div>
  )
}

export default JoinMeeteenSection