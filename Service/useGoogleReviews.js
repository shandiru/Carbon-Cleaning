import { useState, useEffect } from "react";

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
        const businessName = import.meta.env.VITE_BUSINESS_NAME;
        const apiUrl = import.meta.env.VITE_LARAVEL_API_URL;

        // Laravel API call
        const response = await fetch(`${apiUrl}/google-reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ business_name: businessName }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch reviews');
        }

        setData({
          reviews: result.data.reviews,
          businessName: result.data.businessName,
          businessPhotos: result.data.photos,
          rating: result.data.rating,
          totalReviews: result.data.totalReviews,
          loading: false,
          error: null,
        });

      } catch (err) {
        if (err.name === "AbortError") return;

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