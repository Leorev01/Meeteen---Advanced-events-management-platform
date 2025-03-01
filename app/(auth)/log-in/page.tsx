import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:flex flex-row h-screen">
        {/* Image Section */}
        <div className="w-1/2 h-screen relative">
          <Image
            src="/images/group-selfie.jpg"
            alt="happy friends"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Login Form Section */}
        <div className="self-center w-1/2 px-10">
          <h1 className="text-4xl font-bold">Log In</h1>
          <p className="text-gray-500">
            Log in to your account to start creating and joining events!
          </p>
          <form className="flex flex-col gap-4 mx-auto flex-1">
            <input className="bg-gray-200 p-2 rounded" type="email" placeholder="Email" />
            <input className="bg-gray-200 p-2 rounded" type="password" placeholder="Password" />
            <button className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              Log In
            </button>
          </form>
          <p className="mt-10">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#EF233C]">
              Sign Up
            </Link>
          </p>
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

        {/* Login Form with Semi-Transparent Background */}
        <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 rounded-lg w-11/12 max-w-md shadow-md">
          <h2 className="text-4xl font-bold text-center">Log In</h2>
          <form className="flex flex-col gap-4">
            <input className="bg-gray-200 p-2 rounded" type="email" placeholder="Email" />
            <input className="bg-gray-200 p-2 rounded" type="password" placeholder="Password" />
            <button className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              Log In
            </button>
          </form>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#EF233C]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
