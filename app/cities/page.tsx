"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const currentCities = [
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow",
  "Liverpool", "Bristol", "Edinburgh", "Sheffield", "Leicester"
];

const comingSoonCities = [
  "New York", "Paris", "Berlin", "Tokyo", "Sydney",
  "Dubai", "Toronto", "Los Angeles", "Singapore", "Amsterdam"
];

const CitiesPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Events by City</h1>

      {/* Available Cities Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Now Available in the UK 🇬🇧</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCities.map((city) => (
            <Link 
              key={city} 
              href={`/events?city=${city.toLowerCase()}`} 
              className="flex items-center justify-between p-4 border rounded-lg shadow hover:bg-gray-100 transition"
            >
              <MapPin size={24} className="text-[#D90429]" />
              <p className="text-lg font-medium">{city}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Cities Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Coming Soon 🌍</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 opacity-70">
          {comingSoonCities.map((city) => (
            <div 
              key={city} 
              className="flex items-center justify-between p-4 border rounded-lg shadow bg-gray-200 cursor-not-allowed"
            >
              <Clock size={24} className="text-gray-500" />
              <p className="text-lg font-medium">{city}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CitiesPage;
