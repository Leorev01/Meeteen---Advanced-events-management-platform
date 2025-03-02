"use client";

import Link from "next/link";
import { 
  Music, 
  Volleyball, 
  Lightbulb, 
  Palette, 
  PartyPopper, 
  Users, 
  Laugh, 
  Briefcase, 
  Utensils, 
  Shirt, 
  HeartPulse, 
  Film 
} from "lucide-react";

const categories = [
  { name: "Music", icon: Music },
  { name: "Sports", icon: Volleyball },
  { name: "Tech", icon: Lightbulb },
  { name: "Art", icon: Palette },
  { name: "Festivals", icon: PartyPopper },
  { name: "Networking", icon: Users },
  { name: "Comedy", icon: Laugh },
  { name: "Business", icon: Briefcase },
  { name: "Food & Drink", icon: Utensils },
  { name: "Fashion", icon: Shirt },
  { name: "Health & Wellness", icon: HeartPulse },
  { name: "Film & Media", icon: Film },
];

const CategoriesPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Categories</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(({ name, icon: Icon }) => (
          <Link 
            key={name} 
            href={`/events?category=${name.toLowerCase().replace(/ & /g, "-")}`} 
            className="flex flex-col items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition"
          >
            <Icon size={40} className="text-[#D90429]" />
            <p className="mt-2 text-lg font-medium">{name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
