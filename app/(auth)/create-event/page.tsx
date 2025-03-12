'use client'
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = ["Music", "Tech", "Sports", "Education", "Health", "Food", "Networking"];
const cities = ["Leicester", "London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Cambridge"];

const CreateEventPage = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState(''); // Default to empty selection
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState(''); // Default to empty selection
    const [capacity, setCapacity] = useState<number | ''>(''); // Ensure only numbers
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!name || !description || !city || !date || !time || !category || !capacity) {
            alert("Please fill all fields");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.from('events').insert([
            {
                name,
                description,
                location: city,
                date,
                time,
                category,
                capacity: Number(capacity),
            },
        ]);

        if (error) {
            console.error('Error creating event:', error);
            alert("Error creating event. Try again.");
        } else {
            console.log('Event created successfully:', data);
            alert("Event created successfully!");
        }

        setLoading(false);
    };

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

                {/* Event Description */}
                <textarea
                    placeholder="Event Description"
                    className="p-2 border rounded h-24 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                {/* Event Location (City Dropdown) */}
                <select
                    className="p-2 border rounded"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

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

                {/* Category Dropdown (with Default Selection) */}
                <select
                    className="p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Capacity (Only Numbers) */}
                <input
                    type="number"
                    placeholder="Event Capacity (e.g., 50)"
                    className="p-2 border rounded"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : '')}
                    required
                    min={1}
                />

                {/* Image Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="p-2 border rounded"
                />

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-[#2B2D42] text-white p-2 rounded hover:bg-[#8D99AE]"
                >
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
