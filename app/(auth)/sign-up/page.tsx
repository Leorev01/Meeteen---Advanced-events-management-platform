import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:flex flex-row h-screen">
        {/* Signup Form Section */}
        <div className="self-center w-1/2 px-10">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="text-gray-500">
            Sign up to start creating and joining events!
          </p>
          <form className="flex flex-col gap-4 mx-auto flex-1">
            <input className="bg-gray-200 p-2 rounded" type="email" placeholder="Email" />
            <input className="bg-gray-200 p-2 rounded" type="password" placeholder="Password" />
            <button className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              Sign Up
            </button>
          </form>
          <p className="mt-10">
            Already have an account?{" "}
            <Link href="/log-in" className="text-[#EF233C]">
              Log In
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-1/2 h-screen relative">
          <Image
            src="/images/group-selfie.jpg"
            alt="happy friends"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden relative h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <Image
          src="/images/group-selfie.jpg"
          alt="happy friends"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />

        {/* Signup Form with Semi-Transparent Background */}
        <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 rounded-lg w-11/12 max-w-md shadow-md">
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>
          <form className="flex flex-col gap-4">
            <input className="bg-gray-200 p-2 rounded" type="email" placeholder="Email" />
            <input className="bg-gray-200 p-2 rounded" type="password" placeholder="Password" />
            <button className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/log-in" className="text-[#EF233C]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
