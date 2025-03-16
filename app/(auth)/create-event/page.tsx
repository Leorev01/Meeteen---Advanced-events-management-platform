'use client'
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const categories = ["Music", "Tech", "Sports", "Education", "Health", "Food", "Networking"];
const cities = ["Leicester", "London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Cambridge", "Online"];

const CreateEventPage = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [organiserId, setOrganiserId] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);

    // ✅ Fetch the logged-in user's ID
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setOrganiserId(user.id);
            }
        };
        fetchUser();
    }, []);

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `events/${fileName}`;

        const { error } = await supabase.storage.from("events").upload(filePath, file);

        if (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed");
            return null;
        }

        return `${supabase.storage.from("events").getPublicUrl(filePath).data.publicUrl}`;
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!name || !description || !city || !date || !time || !category || !capacity || !organiserId) {
            alert("Please fill all fields");
            setLoading(false);
            return;
        }

        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImage(image);
            if (!imageUrl) {
                setLoading(false);
                return;
            }
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
                organiser_id: organiserId,
                image_url: imageUrl,  // ✅ Store uploaded image URL
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
                <input type="text" placeholder="Event Name" className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Event Description" className="p-2 border rounded h-24 resize-none" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                {/* City Dropdown */}
                <select className="p-2 border rounded" value={city} onChange={(e) => setCity(e.target.value)} required>
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>

                <input type="date" className="p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" className="p-2 border rounded" value={time} onChange={(e) => setTime(e.target.value)} required />

                {/* Category Dropdown */}
                <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input type="number" placeholder="Event Capacity (e.g., 50)" className="p-2 border rounded" value={capacity} onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : '')} required min={1} />

                {/* Image Upload */}
                <input type="file" accept="image/*" className="p-2 border rounded" onChange={(e) => setImage(e.target.files?.[0] || null)} />

                <button disabled={loading} type="submit" className="bg-[#2B2D42] text-white p-2 rounded hover:bg-[#8D99AE]">
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
