'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const GoodbyePage = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/'); // Redirect to the homepage or another relevant page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Goodbye!</h1>
      <p className="text-lg text-gray-600 mb-2">
        Your account has been successfully deleted. We&apos;re sorry to see you go.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        If you ever change your mind, you&apos;re always welcome to join us again.
      </p>
      <button
        onClick={handleReturn}
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300"
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default GoodbyePage;