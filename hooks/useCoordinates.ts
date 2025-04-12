
const useCoordinates = async (location: string) => {
  const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API Key

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`,
    );
    const jsonResponse = await response.json();
    const coordinates = jsonResponse.results[0]?.geometry?.location;
    return coordinates;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

export default useCoordinates;
