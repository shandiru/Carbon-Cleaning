import { useState, useEffect } from "react";

// Environment Variables
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const PLACE_ID = import.meta.env.VITE_PLACE_ID;
const PLACES_BASE_URL = import.meta.env.VITE_GOOGLE_PLACES_URL;
const PHOTO_BASE_URL = import.meta.env.VITE_GOOGLE_PHOTO_URL;
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY;

export function useGoogleReviews() {
  const [data, setData] = useState({
    reviews: [],
    businessName: '',
    businessPhotos: [], 
    rating: 0,
    totalReviews: 0,
    loading: true,
    error: null,
  });

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Prevent multiple simultaneous fetches
    if (hasFetched) return;

    const fetchGoogleReviews = async () => {
      // Safety check for required config
      if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
        console.error("Missing environment variables");
        setData(prev => ({ 
          ...prev, 
          loading: false, 
          error: "Missing configuration in .env" 
        }));
        return;
      }

      try {
        console.log("🔄 Fetching Google Reviews...");
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        // Construct the URL using .env variables
        const googleApiUrl = `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}`;
        const finalUrl = `${CORS_PROXY}${encodeURIComponent(googleApiUrl)}`;
        
        console.log("📡 Calling API...");
        const response = await fetch(finalUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("📦 CORS Proxy Response:", result);
        
        // Parse the contents from CORS proxy
        let apiData;
        try {
          apiData = JSON.parse(result.contents);
          console.log("✅ Google API Data:", apiData);
        } catch (parseError) {
          console.error("❌ Parse Error:", parseError);
          throw new Error("Failed to parse API response");
        }

        if (apiData.status === 'OK' && apiData.result) {
          const transformedReviews = (apiData.result.reviews || []).map(review => ({
            name: review.author_name,
            text: review.text,
            rating: review.rating,
            date: new Date(review.time * 1000).toLocaleDateString('en-GB', { 
              day: '2-digit', month: 'short', year: 'numeric' 
            }),
            image: review.profile_photo_url ? `${review.profile_photo_url}=s100-c` : null
          }));

          const photoUrls = (apiData.result.photos || []).map(photo => 
            `${PHOTO_BASE_URL}?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
          );

          console.log(`✅ Loaded ${transformedReviews.length} reviews and ${photoUrls.length} photos`);

          setData({
            reviews: transformedReviews,
            businessName: apiData.result.name || '',
            businessPhotos: photoUrls,
            rating: apiData.result.rating || 0,
            totalReviews: apiData.result.user_ratings_total || 0,
            loading: false,
            error: null
          });

          setHasFetched(true);
        } else {
          throw new Error(apiData.error_message || `Google API Error: ${apiData.status}`);
        }
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setData(prev => ({ 
          ...prev, 
          loading: false, 
          error: err.message || "Failed to load reviews"
        }));
      }
    };

    // Add small delay to ensure component is mounted
    const timer = setTimeout(() => {
      fetchGoogleReviews();
    }, 100);

    return () => clearTimeout(timer);
  }, [hasFetched]); // Only depends on hasFetched

  const refresh = () => {
    setHasFetched(false);
    setData(prev => ({ ...prev, loading: true }));
  };

  return { ...data, refresh };
}
