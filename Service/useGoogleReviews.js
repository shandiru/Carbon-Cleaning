import { useState, useEffect } from "react";

// ENV Variables
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const PLACE_ID = import.meta.env.VITE_PLACE_ID;
const PLACES_BASE_URL = import.meta.env.VITE_GOOGLE_PLACES_URL;
const PHOTO_BASE_URL = import.meta.env.VITE_GOOGLE_PHOTO_URL;
const CORS_PROXY = "https://api.allorigins.win/get?url=";

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

    // retryCount: First time fail aanaal thirumba oru murai auto-ah try pannum
    const fetchGoogleReviews = async (retryCount = 0) => {
      try {
        if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
          throw new Error("Missing .env configuration");
        }

        // Cache Buster: URL-oda end-la timestamp serthaal CORS caching error varathu
        const googleApiUrl = `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}&t=${Date.now()}`;
        const finalUrl = `${CORS_PROXY}${encodeURIComponent(googleApiUrl)}`;

        const response = await fetch(finalUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Proxy response failed");
        }

        const result = await response.json();
        
        // AllOrigins contents parse panrathu
        if (!result.contents) throw new Error("No data received from proxy");
        const apiData = JSON.parse(result.contents);

        if (apiData.status !== "OK") {
          throw new Error(apiData.error_message || "Google API status error");
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
        const photos = (resultObj.photos || []).map(photo =>
          `${PHOTO_BASE_URL}?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
        );

        setData({
          reviews,
          businessName: resultObj.name || "Business",
          businessPhotos: photos,
          rating: resultObj.rating || 0,
          totalReviews: resultObj.user_ratings_total || 0,
          loading: false,
          error: null,
        });

      } catch (err) {
        if (err.name === "AbortError") return;

        // Auto-retry logic: First fail aana udane thirumba oru thadavai try pannum
        if (retryCount < 1) {
          console.warn("Attempt 1 failed, retrying in 1s...", err.message);
          setTimeout(() => fetchGoogleReviews(retryCount + 1), 1000);
        } else {
          setData(prev => ({
            ...prev,
            loading: false,
            error: "Please refresh the page or check your connection.",
          }));
        }
      }
    };

    fetchGoogleReviews();

    return () => controller.abort();
  }, []);

  return data;
}