/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCoordinates } from "@/utils/geocode/getCoordinates";
import {getDistanceFromLatLonInMiles} from "@/utils/geocode/getDistanceFromLatLonInMiles";

interface FilterBarProps {
  location?: string;
  events: any[];
  setEvents: (events: any[]) => void;
  setLoading: (loading: boolean) => void;
}

const filterOptions = {
  "Any Type": ["Any Type","Online", "In-Person"],
  "Any Distance": ["5 miles", "10 miles", "25 miles", "50 miles", "100 miles", "Any Distance"],
  "Any Category": ["Any Category","Music", "Sports", "Tech", "Art", "Food"],
  "Sort By": ["Date", "Popularity"],
};

const FilterBar = ({ location: place, events, setEvents, setLoading }: FilterBarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    type: null,
    distance: null,
  });

  const getSelectedLabel = (filterKey: string) => {
    const key = filterKey.toLowerCase().replace("any ", "").replace(" ", "");
    const value = activeFilters[key as keyof typeof activeFilters];
    return value || filterKey;
  };

  const fetchEvents = async (filters: any, userLocation?: string) => {
    setLoading(true);
  
    // Step 1: Get user's coordinates based on their location input
    const userCoords = userLocation ? await getCoordinates(userLocation) : null;
  
    // Step 2: Fetch all rows from event_registrations
    const { data: eventRegistrations, error: registrationError } = await supabase
      .from("event_registrations")
      .select("event_id");
  
    if (registrationError) {
      console.error("Error fetching event registrations:", registrationError);
      setLoading(false);
      return;
    }
  
  
    // Step 3: Count registrations for each event_id
    const registrationCounts = eventRegistrations.reduce((acc: any, reg: any) => {
      acc[reg.event_id] = (acc[reg.event_id] || 0) + 1;
      return acc;
    }, {});
  
    // Step 4: Fetch all events
    let query = supabase
      .from("events")
      .select("*")
      .gte("date", new Date(Date.now()).toISOString()); // Only fetch future events
  
    if (filters.category && filters.category !== "Any Category") {
      query = query.eq("category", filters.category);
    }
  
    if (filters.type === "Online") {
      query = query.eq("location", "Online");
    } else if (filters.type === "In-Person") {
      query = query.not("location", "eq", "Online");
    }
  
    const { data: allEvents, error: eventsError } = await query;
  
    if (eventsError) {
      console.error("Error fetching events:", eventsError);
      setLoading(false);
      return;
    }
  
    // Step 5: Combine events with registration counts
    const eventsWithPopularity = allEvents.map((event) => ({
      ...event,
      registrationCount: registrationCounts[event.id] || 0, // Add registration count to each event
    }));
  
    // Step 6: Apply distance filtering if userLocation and distance filter are provided
    let filteredEvents = eventsWithPopularity;
  
    if (userCoords && filters.distance && filters.distance !== "Any Distance") {
      const distanceInMiles = parseInt(filters.distance.split(" ")[0]); // Extract number from "5 miles", "10 miles", etc.
  
      const nearbyEvents = [];
  
      for (const event of filteredEvents) {
        try {
          const eventCoords = await getCoordinates(event.location);
  
          const dist = getDistanceFromLatLonInMiles(
            userCoords.lat,
            userCoords.lng,
            eventCoords.lat,
            eventCoords.lng
          );
  
          if (dist <= distanceInMiles) {
            nearbyEvents.push(event);
          }
        } catch (err) {
          console.warn(`Skipping event ${event.id}, location invalid:`, err);
        }
      }
  
      filteredEvents = nearbyEvents;
    }
  
    // Step 7: Sort by popularity if required
    if (filters.sortBy === "Popularity") {
      filteredEvents.sort((a: any, b: any) => b.registrationCount - a.registrationCount); // Sort in descending order of popularity
    }
  
    // Step 8: Set the filtered events to the state
    setEvents(filteredEvents);
    setLoading(false);
  };
  
  

  const handleFilter = async (filterType: string, value: string) => {
    const key = filterType.toLowerCase().replace("any ", "").replace(" ", "");
    const updatedFilters = { ...activeFilters, [key]: value };
    if (filterType === "Sort By") {
      const sortedEvents = [...events].sort((a: any, b: any) => {
        if (value === "Date") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (value === "Popularity") {
          return b.registrationCount - a.registrationCount; // Sort by registration count
        } else {
          return 0; // Relevance or default
        }
      });

      setEvents(sortedEvents);
      return;
    }
    setActiveFilters(updatedFilters);


    await fetchEvents(updatedFilters, place?.toString());
  };

  const clearFilters = () => {
    setActiveFilters({
      category: null,
      type: null,
      distance: null,
    });
    location.reload();
  };

  return (
    <div className="flex flex-row justify-evenly flex-wrap gap-4">
      {Object.entries(filterOptions).map(([filter, options]) => (
        <div
          key={filter}
          className="relative group"
          onMouseEnter={() => setOpenDropdown(filter)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {/* Filter Button */}
          <p
            className={`flex items-center rounded-md p-2 cursor-pointer ${
              filter === "Sort By" ? "bg-gray-600 text-white" : "bg-gray-400"
            }`}
          >
            {getSelectedLabel(filter)}
            <span
              className={`ml-1 transition-transform duration-300 ${
                openDropdown === filter ? "rotate-180" : ""
              }`}
            >
              ▲
            </span>
          </p>

          {/* Dropdown */}
          {openDropdown === filter && (
            <div className="absolute flex flex-col top-10 left-0 w-36 bg-white border border-gray-300 shadow-md rounded-md z-50">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilter(filter, option)}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={clearFilters}
        className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;
