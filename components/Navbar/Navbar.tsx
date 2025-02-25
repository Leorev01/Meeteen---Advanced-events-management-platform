"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (replace with actual logic)
    const user = localStorage.getItem("user"); // Example: Using localStorage
    setIsAuthenticated(!!user);
  }, []);

  return (
    <header className="border-b-2">
      {/* Desktop Navbar (Original) */}
      <div className="hidden md:flex h-16 items-center justify-between mx-10">
        {/* Logo & Search */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[#EF233C] font-[inspiration] text-5xl">
            Meeteen
          </Link>
          <SearchBar />
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-10">
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
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex flex-col items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-[#EF233C] font-[inspiration] text-5xl">
          Meeteen
        </Link>

        {/* SearchBar Below Logo */}
        <div className="w-full mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mt-4 text-[#2B2D42]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            // Close (X) Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Menu Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 flex flex-col items-center gap-4">
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
        )}
      </div>
    </header>
  );
};

export default Navbar;
