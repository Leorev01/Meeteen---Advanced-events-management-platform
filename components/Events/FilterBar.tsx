/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface FilterBarProps {
    location?: string; // Replace LocationType with the correct type for location
    events: any[];
    setEvents: (events: any[]) => void;
  }
  const filterOptions = {
    "Any Type": ["Concert", "Workshop", "Meetup", "Festival"],
    "Any Distance": ["5 miles", "10 miles", "25 miles", "50 miles"],
    "Any Category": ["Music", "Sports", "Tech", "Art"],
    "Sort By": ["Relevance", "Date", "Popularity"], // Added Sort options
  };
  const FilterBar = ({ location: place, events, setEvents }: FilterBarProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState({
      distance: null,
    });
    
  
  
    // Function to handle the filter by distance
    const handleFilter = async (filterType: string, value: string) => {
      const updatedFilters = {
        ...activeFilters,
        [filterType.toLowerCase().replace("any ", "").replace(" ", "")]: value,
      };
      setActiveFilters(updatedFilters);

      if( filterType === "Sort By") {
        // Sort events based on the selected option
        const sortedEvents = [...events].sort((a: any, b: any) => {
            if (value === "Date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (value === "Popularity") {
                return b.attendees - a.attendees; // Assuming events have an 'attendees' property
            } else {
                return 0; // Default to no sorting for other options
            }
        });
        setEvents(sortedEvents);
        return;
      }

      if(filterType === "Any Type") {
        // Filter events by type
        const filtered = await Promise.all(
            events.map(async (event) => {
                // Assuming events have a 'type' property
                return event.type === value ? event : null;
            })
        );
        setEvents(filtered.filter((event) => event !== null));
        return;
      }
    
      if(filterType === "Any Category") {
        // Filter events by category
        const filtered = await Promise.all(
            events.map(async (event) => {
                // Assuming events have a 'category' property
                return event.category === value ? event : null;
            })
        );
        setEvents(filtered.filter((event) => event !== null));
        return;
      }

    };
  
  
    return (
      <div className="flex flex-row justify-evenly">
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
              {filter}
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
                    onClick={() => handleFilter(filter, option)}
                    key={option}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <button onClick={() => location.reload()} className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-300">
            Clear Filters
        </button>
      </div>
    );
  };
  
  export default FilterBar;