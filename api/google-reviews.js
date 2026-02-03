export default async function handler(req, res) {
  // CORS headers set pannurathu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    const GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY;
    const PLACE_ID = process.env.VITE_PLACE_ID;
    
    if (!GOOGLE_API_KEY || !PLACE_ID) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}