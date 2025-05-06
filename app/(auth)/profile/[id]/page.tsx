'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

const UserIdPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Allow null for initial state

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching user:', error.message);
          setUser(null);
        } else {
          setUser(data); // Directly assign the data to the user state
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {user ? (
          <>
            {/* User Information */}
            <div className="flex items-center space-x-6">
              <Image
                src={user.avatar}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full border-2 border-gray-300"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default UserIdPage;