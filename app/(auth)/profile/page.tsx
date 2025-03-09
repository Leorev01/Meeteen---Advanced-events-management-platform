'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => { 
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setLoading(false);
        return;
      }

      const sessionUser = sessionData?.session?.user;
      if (!sessionUser) {
        console.log('No active session');
        setLoading(false);
        return;
      }

      // Fetch user profile from 'users' table
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('name')
        .eq('email', sessionUser.email)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      setUser({
        email: sessionUser.email || 'Unknown',
        name: profileData?.name || 'Unknown',
      });

      setLoading(false);
    };

    getUserData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : user ? (
          <>
            <div className="flex flex-col items-center">
              <Image
                src="/images/default-avatar.png" // Replace with user profile pic if available
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-300"
              />
              <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <Link href='/edit-profile'>
              <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Edit Profile
              </button>
            </Link>
          </>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
