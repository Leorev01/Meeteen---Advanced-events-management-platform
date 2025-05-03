'use client'
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {toast} from "react-hot-toast";

const categories = ["Music", "Tech", "Sports", "Education", "Health", "Food", "Networking", "Outdoor"];
const cities = ["Leicester", "London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Cambridge", "Online"];

const CreateEventPage = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [organiserId, setOrganiserId] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const session = useSelector((state: RootState) => state.session.session);

    const router = useRouter();

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

    if(!session){
        return <div className="flex justify-center items-center h-screen">Please log in to create an event.</div>;
    }

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
      
        // Specify the type for the 'events' table
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                name,
                description,
                location: city,
                date,
                postcode,
                time,
                category,
                capacity: Number(capacity),
                organiser_id: organiserId,
                image_url: imageUrl,
                },
            ])
            .select('*'); // Select all columns from the inserted rows

      
        if (error) {
          console.error('Error creating event:', error);
          toast.error("Error creating event. Try again.");
          //alert("Error creating event. Try again.");
          setLoading(false);
          return;
        }
      
        if (!data) {
          console.error('No data returned from event creation.');
          toast.error("Event creation failed. Please try again.");
          //alert("Event creation failed. Please try again.");
          setLoading(false);
          return;
        }
      
        console.log('Event created successfully:', data);
        toast.success("Event created successfully!");
        //alert("Event created successfully!");
      
        // Log the activity
        await fetch('/api/auth/log-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: organiserId,
            action: 'create_event',
            metadata: data[0].id, // Access the first inserted row
          }),
        });
      
        router.push('/');
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

                <input type="text" placeholder="Post Code" className="p-2 border rounded" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
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
