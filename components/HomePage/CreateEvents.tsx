import Link from 'next/link'
import Image from 'next/image'

const CreateEvents = () => {
  return (
    <div className='flex flex-row align-center my-20 bg-[#EF233C] bg-opacity-25 px-10 rounded-lg'>
        <div className='flex flex-col gap-6 w-full md:items-start items-center text-center md:text-start md:w-1/2 mx-auto my-10'>
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
        <div className='hidden md:block w-1/2 mx-auto'>
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

export default CreateEvents