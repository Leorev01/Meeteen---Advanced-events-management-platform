"use client";

import { Briefcase } from "lucide-react";

const CareersPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-4 text-[#D90429] flex items-center justify-center gap-3">
        <Briefcase size={40} /> Careers
      </h1>
      <p className="text-lg text-gray-700">
        Exciting opportunities are on the way! Stay tuned for amazing career options with us.
      </p>

      {/* Coming Soon Section */}
      <div className="mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">We&apos;re Hiring Soon!</h2>
        <p className="text-gray-600">
          Our team is growing, and we can&apos;t wait to welcome talented individuals like you. 
          Check back soon for available positions.
        </p>
      </div>

      {/* Stay Updated Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Stay Updated</h2>
        <p className="text-gray-600 mb-4">Sign up for our newsletter to be the first to know when roles open up.</p>
        <input type="email" placeholder="Enter your email" className="p-3 border rounded-md w-80 text-center" />
        <button className="ml-2 px-6 py-3 bg-[#D90429] text-white rounded-lg shadow-md hover:bg-[#a7031f] transition">
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default CareersPage;
