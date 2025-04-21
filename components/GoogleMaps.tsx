import { useEffect, useState } from "react";

const GoogleMaps = ({ location }: { location: string }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if(location.toLowerCase() === 'online') {
      return;
    }

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${apiKey}`
        );

        const data = await response.json();

        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          console.error("Geocoding failed:", data.status);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (location) {
      fetchCoordinates();
    }
  }, [location]);

  if(location.toLowerCase() === 'online') {
    return (
      <p>Online / No Location</p>
    )
  }

  if (!coordinates) return <p>Loading map...</p>;

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates.lat},${coordinates.lng}`}
      className="justify-end max-w-[400px] max-h-[250px]"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMaps;
