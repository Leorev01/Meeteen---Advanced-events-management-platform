import { RootState } from '@/store';
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {

  const session = useSelector((state: RootState) => state.session.session);
    
  return (
    <footer className='flex flex-col bg-[#2B2D42] md:px-40 px-20 text-white'>
        <div className='flex sm:flex-row flex-col items-center text-xl bg-[#2B2D42] p-5 border-b-2 border-[#EDF2F4] gap-5'>
            <p className='text-white'>Create your own event.</p>
            <Link href='/create-event' className=' hover:bg-white hover:text-[#2B2D42] font-bold rounded-md p-2 w-fit border-2 border-white'>
                Create Event
            </Link>
        </div>
        <div className='flex sm:flex-row flex-col justify-between py-10'>
            <div>
                <h3 className='mb-5 text-lg font-bold'>Your Account</h3>
                <ul>
                    {session ?
                    <>
                    <li><Link href='/profile'>Profile</Link></li>
                    <li><Link href='/my-events'>My Events</Link></li>
                    </>
                    :
                    <>
                        <li><Link href='/sign-up'>Sign up</Link></li>
                        <li><Link href='/log-in'>Log in</Link></li>
                    </>
                    }   
                    <li><Link href='/help'>Help</Link></li>
                </ul>
            </div>
            <div>
                <h3 className='mb-5 text-lg font-bold'>Discover</h3>
                <ul>
                    <li><Link href='/events'>Events</Link></li>
                    <li><Link href='/categories'>Categories</Link></li>
                    <li><Link href='/cities'>Cities</Link></li>
                </ul>
            </div>
            <div>
                <h3 className='mb-5 text-lg font-bold'>Meeteen</h3>
                <ul>
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                    <li><Link href='/careers'>Careers</Link></li>
                </ul>
            </div>
        </div>
        <div className='flex sm:flex-row flex-col justify-between text-white py-10'>
            <p>© 2025 Meeteen. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
        </div>
    </footer>
  )
}

export default Footer