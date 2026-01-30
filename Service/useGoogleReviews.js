import { useState, useEffect, useCallback } from "react";

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

  const fetchGoogleReviews = useCallback(async () => {
    // Safety check for required config
    if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
      setData(prev => ({ ...prev, loading: false, error: "Missing configuration in .env" }));
      return;
    }

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      // Construct the URL using .env variables
      const googleApiUrl = `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}`;
      const finalUrl = `${CORS_PROXY}${encodeURIComponent(googleApiUrl)}`;
      
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const result = await response.json();
      const apiData = JSON.parse(result.contents);

      if (apiData.status === 'OK') {
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

        setData({
          reviews: transformedReviews,
          businessName: apiData.result.name || '',
          businessPhotos: photoUrls,
          rating: apiData.result.rating || 0,
          totalReviews: apiData.result.user_ratings_total || 0,
          loading: false,
          error: null
        });
      } else {
        throw new Error(apiData.error_message || `Google API Error: ${apiData.status}`);
      }
    } catch (err) {
      setData(prev => ({ ...prev, loading: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchGoogleReviews();
  }, [fetchGoogleReviews]);

  return { ...data, refresh: fetchGoogleReviews };
}