'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Event Attendees</h1>
      <p className="mb-4">Event ID: {id}</p>

      {attendees.length === 0 ? (
        <p>No attendees have registered for this event.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.user_id}>
                <td className="border border-gray-300 px-4 py-2">{attendee.users.name}</td>
                <td className="border border-gray-300 px-4 py-2">{attendee.users.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventAttendeesPage;