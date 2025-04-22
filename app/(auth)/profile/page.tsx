'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => { 
  const [user, setUser] = useState<{ email: string; name: string; avatar: string; } | null>(null);
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
        .select('name, avatar')
        .eq('id', sessionUser.id) // Ensure correct user ID
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      setUser({
        email: sessionUser.email || 'Unknown',
        name: profileData?.name || 'Unknown',
        avatar: profileData?.avatar ? `${profileData.avatar}?timestamp=${new Date().getTime()}` : '/images/default-avatar.png',
      });

      setLoading(false);
    };

    getUserData();
  }, []); // Reload profile when component mounts

  const deleteUser = async () => {
    alert('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try{
        const response = await fetch('/api/auth/delete-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user?.email }),
        });

        if (response.ok) {
          console.log('User deleted successfully');
          setUser(null); // Clear user data after deletion
        }
        else {
          const errorData = await response.json();
          console.error('Error deleting user:', errorData.error);
        }
      }catch(err){
        console.error("Error deleting user:", err);
      }
    }
   
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : user ? (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={user.avatar} 
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-300"
              />
              <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className='flex flex-row justify-evenly'>
              <Link href="/edit-profile">
                <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Edit Profile
                </button>
              </Link>
              <Link href="/my-events">
              <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                My Events
              </button>
              </Link>
            </div>
            <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete Account
            </button>
            
          </>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
