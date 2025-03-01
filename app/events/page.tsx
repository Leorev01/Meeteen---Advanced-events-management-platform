"use client";
import EventsPageEvent from "@/components/Events/EventsPageEvent";
import { useState } from "react";

const filterOptions = {
  "Any Type": ["Concert", "Workshop", "Meetup", "Festival"],
  "Any Distance": ["5 miles", "10 miles", "25 miles", "50 miles"],
  "Any Category": ["Music", "Sports", "Tech", "Art"],
  "Sort By": ["Relevance", "Date", "Popularity"], // Added Sort options
};

const EventsPage = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Events near Leicester</h2>
      
      {/* Filter Section */}
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
              <div className="absolute top-10 left-0 w-36 bg-white border border-gray-300 shadow-md rounded-md">
                {options.map((option) => (
                  <p key={option} className="p-2 hover:bg-gray-200 cursor-pointer">
                    {option}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Events + Map Section */}
      <div className="flex flex-col sm:flex-row w-full justify-between gap-6">
        {/* Scrollable Events Section */}
        <div className="flex flex-col gap-4 mt-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full">
          <EventsPageEvent src="/images/happy-friends.png" alt="event" title="Event 1" description="Description 1" date="Date 1"/>
          <EventsPageEvent src="/images/happy-friends.png" alt="event" title="Event 2" description="Description 2" date="Date 2"/>
          <EventsPageEvent src="/images/happy-friends.png" alt="event" title="Event 3" description="Description 3" date="Date 3"/>
          <EventsPageEvent src="/images/happy-friends.png" alt="event" title="Event 4" description="Description 4" date="Date 4"/>
          <EventsPageEvent src="/images/happy-friends.png" alt="event" title="Event 5" description="Description 5" date="Date 5"/>
        </div>

        {/* Location Section - Hidden on Small Screens */}
        <div className="hidden md:block flex-col mt-4">
          <p className="text-md text-gray-700">Events near</p>
          <p className="text-xl font-bold">Leicester, UK</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154965.07745481515!2d-1.295905858221974!3d52.635962773224044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487742ab49b76c73%3A0x9a151d2a6fb49cb8!2sLeicester!5e0!3m2!1sen!2suk!4v1740689181514!5m2!1sen!2suk"
            width="400"
            height="250"
            className="justify-end"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
