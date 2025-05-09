import { useState } from "react";
import { useRouter } from "next/navigation";

/*interface SearchBarProps {
  onSearch: (searchData: { location: string; query: string }) => void;
}*/

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!location.trim() && !query.trim()) return; // Prevent empty searches
    router.push(`/search?location=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-row w-full max-w-xl bg-white">
        {/* Location Input */}
        <input
          type="text"
          placeholder="Enter city or location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-300 hover:border-gray-400 rounded-l-md"
        />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for events or topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-300 hover:border-gray-400 hidden sm:block"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#D90429] text-white rounded-r-md hover:bg-[#EF233C] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.15-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

