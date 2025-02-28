import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex sm:flex-row flex-col justify-evenly'>
        <Image src="/images/happy-friends.png" alt="happy friends" width={500} height={500} />
        <div className='self-center'>
            <h1 className='text-4xl font-bold'>Log In</h1>
            <p className='text-gray-500'>Log in to your account to start creating and joining events!</p>
            <form className='flex flex-col gap-4 mx-auto flex-1'>
                <input className='bg-gray-200' type="email" placeholder='Email' />
                <input className='bg-gray-200' type="password" placeholder='Password' />
                <button type='submit'>Log In</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage