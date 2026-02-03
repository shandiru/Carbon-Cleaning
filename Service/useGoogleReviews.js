import { useState, useEffect } from "react";

// ENV Variables
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const PLACE_ID = import.meta.env.VITE_PLACE_ID;
const PLACES_BASE_URL = import.meta.env.VITE_GOOGLE_PLACES_URL;
const PHOTO_BASE_URL = import.meta.env.VITE_GOOGLE_PHOTO_URL;

// Multiple CORS proxies - one fail aanaal next try pannum
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
  "https://thingproxy.freeboard.io/fetch/",
];

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

    const fetchGoogleReviews = async (proxyIndex = 0) => {
      console.log("=== FETCH START ===");
      console.log("Proxy Index:", proxyIndex);
      console.log("Current Proxy:", CORS_PROXIES[proxyIndex]);
      
      try {
        // ENV check
        console.log("ENV Check:");
        console.log("- GOOGLE_API_KEY:", GOOGLE_API_KEY ? "✓ Exists" : "✗ Missing");
        console.log("- PLACE_ID:", PLACE_ID ? "✓ Exists" : "✗ Missing");
        console.log("- PLACES_BASE_URL:", PLACES_BASE_URL ? "✓ Exists" : "✗ Missing");
        console.log("- PHOTO_BASE_URL:", PHOTO_BASE_URL ? "✓ Exists" : "✗ Missing");
        
        if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
          throw new Error("Missing .env configuration");
        }

        // Current proxy select pannurathu
        const currentProxy = CORS_PROXIES[proxyIndex];
        
        const googleApiUrl = `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}&t=${Date.now()}`;
        const finalUrl = `${currentProxy}${encodeURIComponent(googleApiUrl)}`;

        console.log("Google API URL:", googleApiUrl);
        console.log("Final Proxy URL:", finalUrl);

        console.log("Fetching data...");
        const response = await fetch(finalUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        console.log("Response Status:", response.status);
        console.log("Response OK:", response.ok);
        console.log("Response Headers:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          throw new Error(`Proxy response failed with status: ${response.status}`);
        }

        let apiData;
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        
        // Different proxies different format-la response tharthu
        if (contentType?.includes("application/json")) {
          const result = await response.json();
          console.log("Raw JSON Response:", result);
          
          // AllOrigins format check
          if (result.contents) {
            console.log("AllOrigins format detected, parsing contents...");
            apiData = JSON.parse(result.contents);
          } else {
            console.log("Direct JSON format");
            apiData = result;
          }
        } else {
          console.log("Non-JSON response, parsing as text...");
          const text = await response.text();
          console.log("Text Response:", text.substring(0, 500) + "...");
          apiData = JSON.parse(text);
        }

        console.log("Parsed API Data:", apiData);
        console.log("API Status:", apiData.status);

        if (apiData.status !== "OK") {
          throw new Error(apiData.error_message || `Google API status error: ${apiData.status}`);
        }

        const resultObj = apiData.result || {};
        console.log("Result Object:", resultObj);
        console.log("Reviews Count:", resultObj.reviews?.length || 0);
        console.log("Photos Count:", resultObj.photos?.length || 0);

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

        console.log("Mapped Reviews:", reviews);

        // Photos mapping
        const photos = (resultObj.photos || []).map(photo =>
          `${PHOTO_BASE_URL}?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
        );

        console.log("Mapped Photos:", photos);

        const finalData = {
          reviews,
          businessName: resultObj.name || "Business",
          businessPhotos: photos,
          rating: resultObj.rating || 0,
          totalReviews: resultObj.user_ratings_total || 0,
          loading: false,
          error: null,
        };

        console.log("Final Data to Set:", finalData);
        console.log("=== FETCH SUCCESS ===");

        setData(finalData);

      } catch (err) {
        if (err.name === "AbortError") {
          console.log("=== FETCH ABORTED ===");
          return;
        }

        console.error("=== FETCH ERROR ===");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        console.error("Proxy Index:", proxyIndex);
        console.error("Proxy Used:", CORS_PROXIES[proxyIndex]);

        // Next proxy try pannum
        if (proxyIndex < CORS_PROXIES.length - 1) {
          console.warn(`⚠️ Retrying with next proxy (${proxyIndex + 2}/${CORS_PROXIES.length})...`);
          setTimeout(() => fetchGoogleReviews(proxyIndex + 1), 500);
        } else {
          console.error("❌ All proxies failed!");
          // Ella proxies um fail aanaal error state set pannum
          setData(prev => ({
            ...prev,
            loading: false,
            error: "Unable to load reviews. Please try again later.",
          }));
        }
      }
    };

    fetchGoogleReviews();

    return () => {
      console.log("Cleanup: Aborting fetch...");
      controller.abort();
    };
  }, []);

  console.log("Current Hook State:", data);

  return data;
}