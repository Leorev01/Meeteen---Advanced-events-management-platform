'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import DeleteAccountButton from './components/DeleteAccountButton';

type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
};

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);

      // Fetch session data
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
        .eq('id', sessionUser.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      setUser({
        id: sessionUser.id,
        email: sessionUser.email || 'Unknown',
        name: profileData?.name || 'Unknown',
        avatar: profileData?.avatar
          ? `${profileData.avatar}?timestamp=${new Date().getTime()}`
          : '/images/default-avatar.png',
      });

      setLoading(false);
    };

    getUserData();
  }, []);

  // Fetch upcoming events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!user) return; // Ensure user is loaded

      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching upcoming events:', error);
        return;
      }

      if (data && data.length > 0) {
        const { data: events, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .in('id', data.map((event) => event.event_id))
          .gte('date', new Date(Date.now()).toISOString())
          .limit(5)
          .order('date', { ascending: true });

        if (eventsError) {
          console.error('Error fetching events:', eventsError);
        } else {
          setUpcomingEvents(events || []);
        }
      } else {
        setUpcomingEvents([]); // No upcoming events
      }
    };

    fetchUpcomingEvents();
  }, [user]); // Add `user` as a dependency

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/edit-profile">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600">
                  Edit Profile
                </button>
              </Link>
              <Link href="/my-events">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600">
                  My Events
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg shadow hover:bg-purple-600">
                  Dashboard
                </button>
              </Link>
            </div>

            {/* Upcoming Events */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <li
                      key={event.id}
                      className="bg-gray-100 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                      <Link href={`/events/${event.id}`} className="flex-1 hover:underline">
                        <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
                        <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
                        <p className="text-gray-600">{event.location}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No upcoming events found.</p>
              )}
            </div>

            {/* Account Management */}
            <div className="mt-10">
              <DeleteAccountButton />
            </div>
          </>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;