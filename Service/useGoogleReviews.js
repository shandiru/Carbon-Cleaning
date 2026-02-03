import { useState, useEffect } from "react";

const PHOTO_BASE_URL = import.meta.env.VITE_GOOGLE_PHOTO_URL;

export function useGoogleReviews() {
  const [data, setData] = useState({
    reviews: [],
    businessName: "",
    businessPhotos: [],
    rating: 0,
    totalReviews: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchGoogleReviews = async () => {
   
      
      try {
        // Vercel serverless function call pannurathu
        const response = await fetch('/api/google-reviews', {
          signal: controller.signal,
        });

      
     

        if (!response.ok) {
          throw new Error(`API failed with status: ${response.status}`);
        }

        const apiData = await response.json();
     

        if (apiData.status !== "OK") {
          throw new Error(apiData.error_message || `API status: ${apiData.status}`);
        }

        const resultObj = apiData.result || {};
      
        // Reviews mapping
        const reviews = (resultObj.reviews || []).map(r => ({
          name: r.author_name,
          text: r.text,
          rating: r.rating,
          date: new Date(r.time * 1000).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        // Photos mapping
        const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
        const photos = (resultObj.photos || []).map(photo =>
          `${PHOTO_BASE_URL}?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
        );

        const finalData = {
          reviews,
          businessName: resultObj.name || "Business",
          businessPhotos: photos,
          rating: resultObj.rating || 0,
          totalReviews: resultObj.user_ratings_total || 0,
          loading: false,
          error: null,
        };

     

        setData(finalData);

      } catch (err) {
        if (err.name === "AbortError") {
        
          return;
        }

      
        setData(prev => ({
          ...prev,
          loading: false,
          error: "Unable to load reviews. Please try again later.",
        }));
      }
    };

    fetchGoogleReviews();

    return () => controller.abort();
  }, []);

  return data;
}