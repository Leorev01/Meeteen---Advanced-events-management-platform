import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="flex sm:flex-row-reverse flex-col h-screen">
      {/* Image Section */}
      <div className="w-1/2 h-screen relative">
        <Image
          src="/images/group-selfie.jpg"
          alt="happy friends"
          layout="fill"
          objectFit="cover" // Ensures the image fully covers its container
        />
      </div>

      {/* Signup Form Section */}
      <div className="self-center w-1/2 px-10">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <p className="text-gray-500">
          Sign up to your account to start creating and joining events!
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
          <Link href="/log-in" className="font-bold text-[#EF233C]">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
