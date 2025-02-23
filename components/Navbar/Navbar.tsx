"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react"; // If using NextAuth

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (replace with actual logic)
    const user = localStorage.getItem("user"); // Example: Using localStorage
    setIsAuthenticated(!!user); 
  }, []);

  return (
    <header className="h-16 flex items-center justify-between border-b-2">
      {/* Logo & Search */}
      <div className="flex items-center gap-10 ml-10">
        <Link href="/" className="text-[#EF233C] font-[inspiration] text-5xl">
          Meeteen
        </Link>
        <SearchBar />
      </div>

      {/* Conditional Rendering for Authenticated Users */}
      <div className="flex items-center gap-10 mr-10">
        {isAuthenticated ? (
          <>
            <Link href="/create-event" className="text-[#2B2D42] hover:text-[#8D99AE]">
              Create Event
            </Link>
            <Link href="/notifications" className="text-[#2B2D42] hover:text-[#8D99AE]">
              🔔
            </Link>
            <Link href="/profile" className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-full p-2">
              👤
            </Link>
          </>
        ) : (
          <>
            <Link href="/log-in" className="text-[#2B2D42] hover:text-[#8D99AE]">
              Log In
            </Link>
            <Link href="/sign-up" className="bg-[#2B2D42] hover:bg-[#8D99AE] text-white rounded-md px-4 py-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
