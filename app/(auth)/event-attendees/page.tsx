'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {toast} from 'react-hot-toast';

interface Attendee {
  user_id: string;
  users: {
    name: string;
    email: string;
  };
}

const EventAttendeesPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('eventId'); // Retrieve eventId from query params
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState<Attendee[]>([]); // List of attendees
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // Track which dropdown is open
  const [userId, setUserId] = useState<string | null>(null); // Track user ID for profile navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id) {
          console.error('Event ID is missing');
          return;
        }

        const { data: user } = await supabase.auth.getUser();
        if (!user) {
          console.error('User not logged in');
          router.push('/auth/login'); // Redirect to login if user is not logged in
          return;
        }
        if (user.user) {
          setUserId(user.user.id); // Set user ID for profile navigation
        }

        const response = await fetch('/api/fetchEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId: id }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error fetching event:', error.error);
          return;
        }

        const eventData = await response.json();
        if (eventData.organiser_id !== user.user?.id) {
          router.back();
          return;
        }

        // Fetch the attendees for the event
        const { data: attendeesData, error: attendeesError } = await supabase
          .from('event_registrations')
          .select('user_id, users(name, email)')
          .eq('event_id', id);

        if (attendeesError) {
          console.error('Error fetching attendees:', attendeesError.message);
          return;
        }

        setAttendees(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (attendeesData || []).map((attendee: any) => ({
            user_id: attendee.user_id,
            users: attendee.users, // Directly assign the users object
          }))
        );
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [router, id]);

  const handleRemoveUser = async (userId: string) => {
    if(confirm('Are you sure you want to remove this user from the event?')){
      try {
        const { error } = await supabase
          .from('event_registrations')
          .delete()
          .eq('user_id', userId)
          .eq('event_id', id);

        if (error) {
          console.error('Error removing user:', error.message);
          toast.error('Failed to remove user from event!');
          return;
        }
        toast.success('User removed successfully!');
        // Update the attendees list after removal
        setAttendees((prev) => prev.filter((attendee) => attendee.user_id !== userId));
        
        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: attendees.find((attendee) => attendee.user_id === userId)?.users.email,
            subject: 'Event Registration Cancellation',
            message: `You have been removed from the event with ID: ${id}`,
          }),
        }).then((res) => {
          if (!res.ok) {
            throw new Error('Failed to send email');
          }
          return res.json();
        })
      } catch (error) {
        console.error('Error in handleRemoveUser:', error);
      }
    }
    
  };

  const toggleDropdown = (userId: string) => {
    setDropdownOpen((prev) => (prev === userId ? null : userId)); // Toggle dropdown visibility
  };

  const userLinkHandler = (user_id: string) => {
    if(user_id === userId){
      router.push('/profile'); // Navigate to own profile
      return;
    }
    router.push(`/profile/${user_id}`); // Navigate to user profile
    setDropdownOpen(null); // Close the dropdown after navigation
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Event Attendees</h1>
      <p className="mb-4">Event ID: {id}</p>
      <p className="mb-4">Total Attendees: {attendees.length}</p>

      {attendees.length === 0 ? (
        <p>No attendees have registered for this event.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.user_id}>
                <td className="border border-gray-300 px-4 py-2">{attendee.users.name}</td>
                <td className="border border-gray-300 px-4 py-2">{attendee.users.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="relative"> {/* Ensure the parent container is relative */}
                    <button
                      onClick={() => toggleDropdown(attendee.user_id)}
                      className="font-extrabold text-lg hover:scale-110 z-10 relative"
                    >
                      ...
                    </button>
                    {dropdownOpen === attendee.user_id && (
                      <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-20"> {/* Higher z-index */}
                        <button
                          onClick={() => userLinkHandler(attendee.user_id)} // Navigate to user profile
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleRemoveUser(attendee.user_id)}
                          className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                          Remove from Event
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventAttendeesPage;