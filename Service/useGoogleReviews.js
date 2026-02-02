import { useState, useEffect } from "react";

// ENV
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const PLACE_ID = import.meta.env.VITE_PLACE_ID;
const PLACES_BASE_URL = import.meta.env.VITE_GOOGLE_PLACES_URL;
const PHOTO_BASE_URL = import.meta.env.VITE_GOOGLE_PHOTO_URL;
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY;

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
        if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
          throw new Error("Missing .env configuration");
        }

        setData(prev => ({ ...prev, loading: true, error: null }));

        const googleApiUrl =
          `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}`;

        const finalUrl = `${CORS_PROXY}${encodeURIComponent(googleApiUrl)}`;

        const response = await fetch(finalUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Google reviews");
        }

        const result = await response.json();
        const apiData = JSON.parse(result.contents);

        if (apiData.status !== "OK") {
          throw new Error(apiData.error_message || "Google API error");
        }

        const reviews = (apiData.result.reviews || []).map(r => ({
          name: r.author_name,
          text: r.text,
          rating: r.rating,
          date: new Date(r.time * 1000).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        const photos = (apiData.result.photos || []).map(photo =>
          `${PHOTO_BASE_URL}?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
        );

        setData({
          reviews,
          businessName: apiData.result.name,
          businessPhotos: photos,
          rating: apiData.result.rating,
          totalReviews: apiData.result.user_ratings_total,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setData(prev => ({
            ...prev,
            loading: false,
            error: err.message,
          }));
        }
      }
    };

    fetchGoogleReviews();

    return () => controller.abort();
  }, []);

  return data;
}
