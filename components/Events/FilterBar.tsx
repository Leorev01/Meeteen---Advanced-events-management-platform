/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface FilterBarProps {
  location?: string;
  events: any[];
  setEvents: (events: any[]) => void;
  setLoading: (loading: boolean) => void;
}

const filterOptions = {
  "Any Type": ["Any Type","Online", "In-Person"],
  "Any Distance": ["5 miles", "10 miles", "25 miles", "50 miles"],
  "Any Category": ["Any Category","Music", "Sports", "Tech", "Art", "Food"],
  "Sort By": ["Relevance", "Date", "Popularity"],
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

  
  useEffect(() => {
    console.log("Active filters:", activeFilters);
  }, [activeFilters]);

  const fetchEvents = async (filters: any) => {
    setLoading(true);

    let query = supabase.from("events").select("*");

    if (filters.category !== "Any Category") query = query.eq("category", filters.category);
    if(filters.type === "Online") {
        query = query.eq("location", filters.type)
    } else if (filters.type === "In-Person") {
        query = query.not("location", "eq", "Online")
    }
    if (place) query = query.eq("location", place);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data || []);
    }

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
          return (b.attendees || 0) - (a.attendees || 0);
        } else {
          return 0; // Relevance or default
        }
      });

      setEvents(sortedEvents);
      return;
    }

    setActiveFilters(updatedFilters);
    await fetchEvents(updatedFilters);
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
