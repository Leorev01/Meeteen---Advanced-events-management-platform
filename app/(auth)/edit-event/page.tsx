'use client'
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import Image from "next/image"
import {toast} from "react-hot-toast"

const categories = ["Music", "Tech", "Sports", "Education", "Health", "Food", "Networking", "Outdoor"];
const cities = ["Leicester", "London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Cambridge", "Online"];

type Event = {
    id: string;
    name: string;
    description: string;
    city: string;
    postcode: string;
    date: string;
    time: string;
    category: string;
    capacity: number;
    image_url: string;
    organiser_id: string;
}

const EditEventPage = () => {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<Event>();
    const eventId = useSearchParams().get("eventId");
    const router = useRouter();
  
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [image, setImage] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null); // Store the current image URL
  
    useEffect(() => {
      setLoading(true);
      const fetchEvent = async () => {
        const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
        if (error) {
          console.error("Error fetching event:", error);
        } else {
          const user = await supabase.auth.getUser();
          if (user.data.user?.id !== data.organiser_id) {
            router.back();
            return;
          }
          setEvent(data);
  
          // Set default values for the form fields
          setName(data.name);
          setDescription(data.description);
          setCity(data.city);
          setPostcode(data.postcode);
          // Format the date to YYYY-MM-DD
          const formattedDate = new Date(data.date).toISOString().split("T")[0];
          setDate(formattedDate);
          setTime(data.time);
          setCategory(data.category);
          setCapacity(data.capacity);
          setCurrentImage(data.image_url); // Set the current image URL
        }
        setLoading(false);
      };
      fetchEvent();
    }, [eventId, router]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      let imageUrl = currentImage;
  
      // If a new image is uploaded, upload it to Supabase Storage
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `events/${fileName}`;
  
        const { error: uploadError } = await supabase.storage.from("events").upload(filePath, image);
  
        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          alert("Image upload failed");
          setLoading(false);
          return;
        }
  
        imageUrl = supabase.storage.from("events").getPublicUrl(filePath).data.publicUrl;
      }
  
      // Update the event in the database
      const { error } = await supabase
        .from("events")
        .update({
          name,
          description,
          city,
          postcode,
          date,
          time,
          category,
          capacity: Number(capacity),
          image_url: imageUrl, // Update the image URL
        })
        .eq("id", eventId);
  
      if (error) {
        console.error("Error updating event:", error);
        toast.error("Failed to update event");
        //alert("Failed to update event");
      } else {
        toast.success("Event updated successfully!");
        //alert("Event updated successfully!");
        await fetch('/api/auth/log-activity', {
            method: 'POST',
            body: JSON.stringify({
                userId: event?.organiser_id,
                action: 'edit_event',
                metadata: { eventId: eventId, eventName: name },
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        router.push("/my-events");
      }
  
      setLoading(false);
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!event) {
      return <div>Event not found.</div>;
    }
  
    return (
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Edit Event: {event.name}</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="p-2 border rounded h-24 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
  
          {/* City Dropdown */}
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
  
          <input
            type="text"
            className="p-2 border rounded"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="p-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
  
          {/* Category Dropdown */}
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
  
          <input
            type="number"
            className="p-2 border rounded"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : '')}
            required
            min={1}
          />
  
          {/* Current Image Preview */}
          {currentImage && (
            <div>
              <p className="text-gray-600">Current Image:</p>
              <Image src={currentImage} alt="Current Event" width={32} height={32} className="w-32 h-32 object-cover rounded-lg" />
            </div>
          )}
  
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="p-2 border rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="flex justify-between mt-4">
            <button onClick={(e) => {
                e.preventDefault()
                router.back()
                }}
                className="w-1/2 bg-red-800 text-white p-2 rounded hover:bg-red-400 mr-2">Cancel</button>
            <button
                disabled={loading}
                type="submit"
                className="w-1/2 bg-[#2B2D42] text-white p-2 rounded hover:bg-[#8D99AE]"
            >
                {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
export default EditEventPage;
