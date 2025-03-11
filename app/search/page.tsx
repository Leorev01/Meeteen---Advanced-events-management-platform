"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Event {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
}

const SearchResultsPage = () => {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <SearchResults />
    </Suspense>
  );
};

const SearchResults = () => {
  const searchParams = useSearchParams(); // ✅ Works inside a client component
  const location = searchParams.get("location") || "";
  const query = searchParams.get("query") || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${location}%`);

      if (error) console.error("Error fetching events:", error);
      else setEvents(data || []);

      setLoading(false);
    };

    if (query || location) {
      fetchEvents();
    }
  }, [query, location]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Results</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : events.length > 0 ? (
        <ul className="space-y-6">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-800">{event.description}</p>
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
