import Image from 'next/image'
import React from 'react'

const SignupPage = () => {
  return (
    <div className='flex sm:flex-row-reverse flex-col justify-evenly'>
        <Image src="/images/happy-friends.png" alt="happy friends" width={500} height={500} />
        <div className='self-center'>
            <h1 className='text-4xl font-bold'>Sign Up</h1>
            <p className='text-gray-500'>Sign up to your account to start creating and joining events!</p>
            <form className='flex flex-col gap-4 mx-auto flex-1'>
                <input className='bg-gray-200' type="email" placeholder='Email' />
                <input className='bg-gray-200' type="password" placeholder='Password' />
                <button type='submit'>Log In</button>
            </form>
        </div>
    </div>
  )
}

export default SignupPage