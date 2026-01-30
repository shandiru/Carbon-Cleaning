import React, { useEffect, useRef, useState } from "react";

export default function ReviewsCarousel() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [paused, setPaused] = useState(false);
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // 🔑 API Credentials
  const GOOGLE_API_KEY = "AIzaSyAQFA-ijye-NCiMHCBc4-IeixbmYyICGl4";
  const PLACE_ID = "ChIJdQkNRbDBeUgRsfO87j-rKis";

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching Google reviews...');
      
      // CORS Proxy to bypass browser restrictions
      const corsProxy = 'https://api.allorigins.win/get?url=';
      const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,formatted_address&key=${GOOGLE_API_KEY}`;
      
      const response = await fetch(corsProxy + encodeURIComponent(googleApiUrl));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const data = JSON.parse(result.contents);
      
      console.log('✅ Google API Status:', data.status);

      if (data.status === 'OK') {
        const sortedReviews = data.result.reviews?.sort(
          (a, b) => b.time - a.time
        ) || [];

        const transformedReviews = sortedReviews.map(review => ({
          name: review.author_name,
          text: review.text,
          rating: review.rating,
          date: new Date(review.time * 1000).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          // Fix: Add size parameter to Google profile photo URL
          image: review.profile_photo_url ? `${review.profile_photo_url}=s100-c` : null
        }));
        
        setReviews(transformedReviews);
        setBusinessName(data.result.name || '');
        setRating(data.result.rating || 0);
        setTotalReviews(data.result.user_ratings_total || 0);
        
        console.log('✅ Loaded', transformedReviews.length, 'reviews');
      } else if (data.status === 'REQUEST_DENIED') {
        throw new Error('Places API not enabled. Check Google Cloud Console.');
      } else if (data.status === 'INVALID_REQUEST') {
        throw new Error('Invalid Place ID. Please verify.');
      } else {
        throw new Error(data.error_message || `Google API Error: ${data.status}`);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Failed to load reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load reviews on mount + auto-refresh every hour
  useEffect(() => {
    fetchGoogleReviews();
    
    const interval = setInterval(fetchGoogleReviews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Carousel auto-scroll animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reviews.length === 0) return;

    const autoScroll = () => {
      if (!paused) {
        // Scroll by 1 pixel for smooth continuous movement
        track.scrollLeft += 1;
        
        // Reset scroll position when reaching halfway point (for infinite loop)
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
    };

    // Run auto-scroll every 20ms for smooth animation
    const intervalId = setInterval(autoScroll, 20);

    return () => clearInterval(intervalId);
  }, [paused, reviews]);

  // Loading State
  if (loading) {
    return (
      <section id="testimonials" className="bg-black py-24 text-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading Google Reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="testimonials" className="bg-black py-24 text-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-lg bg-red-900/20 border border-red-600/30 rounded-lg p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">Error Loading Reviews</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            
            <div className="bg-black/50 border border-white/10 rounded p-4 mb-6 text-left">
              <p className="text-sm text-gray-400 mb-2">
                <strong className="text-white">Common Issues:</strong>
              </p>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                <li>Places API not enabled in Google Cloud Console</li>
                <li>API key restrictions blocking requests</li>
                <li>Invalid Place ID</li>
                <li>Check browser console (F12) for details</li>
              </ul>
            </div>
            
            <button
              onClick={fetchGoogleReviews}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition-colors transform hover:scale-105"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No Reviews State
  if (reviews.length === 0) {
    return (
      <section id="testimonials" className="bg-black py-24 text-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-7xl mb-4">📝</div>
            <p className="text-gray-400 text-xl">No reviews available yet</p>
            <button
              onClick={fetchGoogleReviews}
              className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Scroll functions for arrow buttons
  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="bg-black py-24 text-white">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
          Customer <span className="text-red-600">Reviews</span>
        </h2>
        <div className="w-20 h-[3px] bg-red-600 mx-auto mt-4" />
        
        {businessName && (
          <p className="text-gray-300 mt-4 text-lg font-medium">{businessName}</p>
        )}
        
        {/* Overall Rating */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-red-600">{rating.toFixed(1)}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <span className="text-gray-400">({totalReviews} reviews)</span>
        </div>
        
        <p className="text-gray-400 mt-4">
          Real reviews from Google ⭐
        </p>
      </div>

      {/* CAROUSEL WITH ARROWS */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6 px-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="w-[340px] md:w-[380px] min-h-[280px] bg-[#0E0E0E] border border-white/10 p-6 flex flex-col justify-between rounded-md hover:border-red-600/50 transition flex-shrink-0"
          >
            {/* Profile Image - Fixed with fallback */}
            <div className="flex items-center gap-3 mb-4">
              {review.image ? (
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-red-600/30 object-cover bg-gray-800"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {/* Fallback Avatar with Initials */}
              <div 
                className="w-12 h-12 rounded-full border-2 border-red-600/30 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg"
                style={{ display: review.image ? 'none' : 'flex' }}
              >
                {review.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{review.name}</p>
                {review.date && (
                  <p className="text-gray-500 text-xs">{review.date}</p>
                )}
              </div>
            </div>

            {/* Star Rating */}
            {review.rating && (
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-4 h-4 ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Review Text */}
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-6 flex-grow">
              "{review.text}"
            </p>

            {/* Google Badge */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                alt="Google" 
                className="w-16 opacity-80"
              />
              <span className="text-gray-500 text-xs">Verified Review</span>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-12">
        <button
          onClick={fetchGoogleReviews}
          disabled={loading}
          className="bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-600 px-6 py-3 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Reviews
        </button>
      </div>

      {/* HIDE SCROLLBAR */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}