"use client";

import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-4 text-[#D90429]">About Us</h1>
      <p className="text-lg text-gray-700">
        Discover events near you and connect with amazing experiences. Whether you&apos;re looking for music festivals, tech meetups, or sports events, we&apos;ve got something for everyone.
      </p>

      {/* Image */}
      <div className="flex justify-center my-6">
        <Image src="/images/group-selfie.jpg" alt="Events Community" width={600} height={350} className="rounded-lg shadow-md" />
      </div>

      {/* What We Offer */}
      <section className="text-left">
        <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>🌍 **Find Events Near You** - Browse events happening in your city.</li>
          <li>🎟 **Easy Ticket Booking** - Get your tickets in just a few clicks.</li>
          <li>📅 **Personalized Recommendations** - Tailored event suggestions based on your interests.</li>
          <li>🤝 **Connect with Others** - Network and meet like-minded individuals at events.</li>
        </ul>
      </section>

      {/* Our Mission */}
      <section className="text-left mt-6">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-700">
          We believe in the power of experiences. Our mission is to bring people together through events that inspire, entertain, and educate. Whether it&apos;s a live concert, a business networking event, or a cultural festival, we aim to make every moment memorable.
        </p>
      </section>

      {/* Call to Action */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Join Us Today!</h2>
        <p className="text-gray-700 mb-4">Start exploring and never miss out on exciting events again.</p>
        <Link href="/events" className="px-6 py-3 bg-[#D90429] text-white rounded-lg shadow-md hover:bg-[#a7031f] transition">
          Browse Events
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
