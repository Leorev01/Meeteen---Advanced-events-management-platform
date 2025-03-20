'use client';

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "@/store/sessionSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSelector((state: RootState) => state.session.session);
  const dispatch = useDispatch();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("/images/default-avatar.png");

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!session) return;
      const { data, error } = await supabase
        .from("users")
        .select("avatar")
        .eq("id", session.user.id)
        .single();

      if (data?.avatar) {
        setAvatarUrl(`${data.avatar}?timestamp=${new Date().getTime()}`); // Prevents caching issues
      } else if (error) {
        console.error("Error fetching avatar:", error.message);
      }
    };

    fetchAvatar();
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    dispatch(clearSession());
    router.push("/log-in");
  };

  return (
    <header className="border-b-2">
      {/* Desktop Navbar */}
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
          {session ? (
            <>
              <button className="text-[#2B2D42] hover:text-[#8D99AE]" onClick={handleSignOut}>
                Log out
              </button>
              <Link href="/create-event" className="text-[#2B2D42] hover:text-[#8D99AE]">
                Create Event
              </Link>
              <Link href="/chat" className="text-[#2B2D42] hover:text-[#8D99AE]">
                🔔
              </Link>
              <Link href="/profile" className="hover:scale-110 transition-transform">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image 
                    src={avatarUrl} 
                    alt="User Avatar" 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

            </>
          ) : (
            <>
              <Link href="/log-in" className="text-[#2B2D42] hover:text-[#8D99AE] pl-4">
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
        <Link href="/" className="text-[#EF233C] font-[inspiration] text-5xl">
          Meeteen
        </Link>

        {/* Search Bar for Mobile */}
        <div className="w-full mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu Button */}
        <button className="mt-4 text-[#2B2D42]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 flex flex-col items-center gap-4 w-full">
            {session ? (
              <>
                <button className="text-[#2B2D42] hover:text-[#8D99AE]" onClick={handleSignOut}>Log out</button>
                <Link href="/create-event" className="text-[#2B2D42] hover:text-[#8D99AE]">
                  Create Event
                </Link>
                <Link href="/chat" className="text-[#2B2D42] hover:text-[#8D99AE]">
                  🔔
                </Link>
                <Link href="/profile" className="hover:scale-110 transition-transform">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image 
                      src={avatarUrl} 
                      alt="User Avatar" 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-cover"
                    />
                  </div>
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
