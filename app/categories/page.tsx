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
  BookOpenText,
  TentTree
} from "lucide-react";

const categories = [
  { name: "Outdoor", icon: TentTree }, // From Top Categories
  { name: "Tech", icon: Lightbulb }, // From Top Categories
  { name: "Education", icon: BookOpenText }, // From Top Categories
  { name: "Music", icon: Music }, // From Top Categories
  { name: "Food", icon: Utensils }, // From Top Categories
  { name: "Sports", icon: Volleyball },
  { name: "Art", icon: Palette },
  { name: "Festivals", icon: PartyPopper },
  { name: "Networking", icon: Users },
  { name: "Comedy", icon: Laugh },
  { name: "Business", icon: Briefcase },
  { name: "Fashion", icon: Shirt },
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
            href={`/search?query=${name.toLowerCase().replace(/ & /g, "-")}`} 
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