import {useState} from 'react'
import Link from 'next/link'

const filterOptions = {
    "Any Type": ["Concert", "Workshop", "Meetup", "Festival"],
    "Any Distance": ["5 miles", "10 miles", "25 miles", "50 miles"],
    "Any Category": ["Music", "Sports", "Tech", "Art"],
    "Sort By": ["Relevance", "Date", "Popularity"], // Added Sort options
  };

const FilterBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
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
            <p className={`flex items-center rounded-md p-2 cursor-pointer ${
              filter === "Sort By" ? "bg-gray-600 text-white" : "bg-gray-400"
            }`}>
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
                  <Link href={`/search?query=${encodeURIComponent(option.toLowerCase())}`} key={option} className="p-2 hover:bg-gray-200 cursor-pointer">
                    {option}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
  )
}

export default FilterBar