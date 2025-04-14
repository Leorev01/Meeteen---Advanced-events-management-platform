export const getCoordinates = async (location: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`
    );
  
    const data = await res.json();
    if (!data.results.length) throw new Error("Location not found");
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  };
  