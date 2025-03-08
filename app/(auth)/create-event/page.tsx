import React from "react";

const CreateEventPage = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form className="flex flex-col gap-4">
        {/* Event Name */}
        <input
          type="text"
          placeholder="Event Name"
          className="p-2 border rounded"
          required
        />

        {/* Event Description (Text Area) */}
        <textarea
          placeholder="Event Description"
          className="p-2 border rounded h-24 resize-none"
          required
        ></textarea>

        {/* Event Location */}
        <input
          type="text"
          placeholder="Event Location"
          className="p-2 border rounded"
          required
        />

        {/* Event Date */}
        <input
          type="date"
          className="p-2 border rounded"
          required
        />

        {/* Event Time */}
        <input
          type="time"
          className="p-2 border rounded"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#2B2D42] text-white p-2 rounded hover:bg-[#8D99AE]"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
