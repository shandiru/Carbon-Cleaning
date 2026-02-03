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
      try {
        if (!GOOGLE_API_KEY || !PLACE_ID || !PLACES_BASE_URL) {
          throw new Error("Missing .env configuration");
        }

        // Current proxy select pannurathu
        const currentProxy = CORS_PROXIES[proxyIndex];
        
        const googleApiUrl = `${PLACES_BASE_URL}?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,photos&key=${GOOGLE_API_KEY}&t=${Date.now()}`;
        const finalUrl = `${currentProxy}${encodeURIComponent(googleApiUrl)}`;

        const response = await fetch(finalUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Proxy response failed");
        }

        let apiData;
        const contentType = response.headers.get("content-type");
        
        // Different proxies different format-la response tharthu
        if (contentType?.includes("application/json")) {
          const result = await response.json();
          
          // AllOrigins format check
          if (result.contents) {
            apiData = JSON.parse(result.contents);
          } else {
            apiData = result;
          }
        } else {
          const text = await response.text();
          apiData = JSON.parse(text);
        }

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

        console.warn(`Proxy ${proxyIndex + 1} failed:`, err.message);

        // Next proxy try pannum
        if (proxyIndex < CORS_PROXIES.length - 1) {
          setTimeout(() => fetchGoogleReviews(proxyIndex + 1), 500);
        } else {
          // Ella proxies um fail aanaal real customer reviews use pannum
          setData({
            reviews: getRealCustomerReviews(),
            businessName: "Nottingham Carbon Cleaning Solutions",
            businessPhotos: [],
            rating: 4.9,
            totalReviews: 50,
            loading: false,
            error: null,
          });
        }
      }
    };

    fetchGoogleReviews();

    return () => controller.abort();
  }, []);

  return data;
}

// Real customer reviews - API fail aanaal idha use pannum
function getRealCustomerReviews() {
  return [
    {
      name: "Gareth Murchie",
      text: "Had my Merc SLK250CDI 360 cleaned today (Carbon Clean plus Fuel System Clean). Car runs smoother and quieter and the clean also got rid of a fault code caused by a clogged swirl flap. Very friendly, professional and good value for money too. Would definitely recommend.",
      rating: 5,
      date: "15 Jan, 2025"
    },
    {
      name: "Jason Perry",
      text: "Just had Darren out to sort my corsa diesel van out, great guy arrived on time the van is now perfect highly recommend.",
      rating: 5,
      date: "12 Jan, 2025"
    },
    {
      name: "Azeem",
      text: "I was recommended Nottingham Carbon Cleaning Solutions by a friend. I got my C250d done achieved extra 7mpg the engine is super quiet now. Was super happy with the service I received. Today i got my Mercedes Vito dpf cleaned it drives perfectly. Top bloke really kind and helpful much appreciated. No pressure sales or tactics involved. 100% honest guy so ill be recommending to all friends and family.",
      rating: 5,
      date: "08 Jan, 2025"
    },
    {
      name: "Stacey Turner",
      text: "Came today with blocked dpf filter, was sorted within a couple of hours, very professional and competitively priced. Would recommend.",
      rating: 5,
      date: "05 Jan, 2025"
    },
    {
      name: "Kaitlyn Mepstead",
      text: "Notts Carbon cleaning did a great job, he was friendly, reliable and came out the same day as my initial call. I 100% recommend.",
      rating: 5,
      date: "28 Dec, 2024"
    }
  ];
}