'use client'
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const CreateEventPage = () => {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        const { data, error } = await supabase.from('events').insert([
            {
                name: name,
                description: description,
                location: city,
                date: date,
                time: time,
            },
        ]);

        if (error) {
            console.error('Error creating event', error);
        } else {
            console.log('Event created successfully', data);
        }
        setLoading(false);
    }


  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Event Name */}
        <input
          type="text"
          placeholder="Event Name"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Event Description (Text Area) */}
        <textarea
          placeholder="Event Description"
          className="p-2 border rounded h-24 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Event Location */}
        <input
          type="text"
          placeholder="Event Location (City)"
          className="p-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        {/* Event Date */}
        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Event Time */}
        <input
          type="time"
          className="p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          value={image?.name || ''}
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="p-2 border rounded"
          required
        />

        {/* Submit Button */}
        <button
          disabled={loading}
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
