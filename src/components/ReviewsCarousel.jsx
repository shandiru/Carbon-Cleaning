import React, { useRef, useState, useEffect } from "react";
import { useGoogleReviews } from "../../Service/useGoogleReviews";
import BusinessGallery from "./BusinessGallery";

export default function ReviewsCarousel() {
  const { reviews, businessPhotos, loading } = useGoogleReviews();
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Wait for data to be fully loaded before starting animations
  useEffect(() => {
    if (!loading && reviews.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [loading, reviews.length]);

  // Optimized autoscroll - only runs when ready
  useEffect(() => {
    if (!isReady || paused || !trackRef.current || reviews.length === 0) return;
    
    const autoScroll = () => {
      if (trackRef.current) {
        const scrollAmount = 0.5; // Reduced for smoother performance
        trackRef.current.scrollLeft += scrollAmount;
        
        // Reset scroll when halfway through
        if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth / 2) {
          trackRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(autoScroll, 30); // Slightly slower interval
    return () => clearInterval(intervalId);
  }, [isReady, paused, reviews.length]);

  // Loading state
  if (loading) {
    return (
      <div className="py-32 text-center text-white bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#B62025] mx-auto mb-4"></div>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Verifying Excellence...</p>
      </div>
    );
  }

  // Only show "no reviews" if loading is done AND reviews are actually empty
  // This prevents premature empty state during initial render


  return (
    <section className="bg-black py-24 text-white overflow-hidden relative">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(182,32,37,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* 1. Header Section */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Trusted <span className="text-[#B62025] dark:text-[#FF4B4B]">Quality</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-[#B62025]/50"></div>
          <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">Google Reviews</span>
          <div className="h-[1px] w-12 bg-[#B62025]/50"></div>
        </div>
      </div>

      {/* 2. Reviews Carousel Section */}
      <div className="relative w-full mx-auto mb-20">
        <div 
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex gap-6 md:gap-8 px-4 overflow-x-auto scrollbar-hide scroll-smooth py-10"
          style={{ 
            willChange: isReady ? 'scroll-position' : 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={`${review.name}-${review.date}-${i}`}
              className="w-[320px] md:w-[420px] flex-shrink-0 bg-gradient-to-b from-[#111] to-[#050505] p-6 md:p-8 rounded-3xl border border-white/5 hover:border-[#B62025]/50 transition-all duration-500 flex flex-col justify-between min-h-[300px] md:min-h-[320px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-6 right-6 md:right-8 text-[#B62025]/10 group-hover:text-[#B62025]/20 transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="md:w-10 md:h-10">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.5693 13 5.017 13H2.017V21H5.017Z"/>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-[#B62025] to-[#FF4B4B] flex items-center justify-center font-black text-white uppercase text-lg md:text-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    {review.name ? review.name[0] : "?"}
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base tracking-tight text-white">{review.name}</p>
                    <p className="text-[#B62025] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex text-yellow-500 gap-1 mb-4 md:mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-base md:text-lg">{idx < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>

                <p className="text-gray-400 text-xs md:text-sm italic leading-[1.7] md:leading-[1.8] font-medium line-clamp-4 group-hover:text-gray-200 transition-colors">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1 bg-white rounded-md">
                    <img 
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                      alt="Google" 
                      className="h-2.5 md:h-3 w-auto" 
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[8px] md:text-[9px] uppercase font-black text-gray-500 tracking-[0.2em]">Verified Review</span>
                </div>
                <div className="flex items-center justify-center bg-[#B62025] w-6 h-6 md:w-7 md:h-7 rounded-full shadow-[0_0_15px_rgba(182,32,37,0.4)]">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Business Gallery */}
      <div className="relative z-10 px-4">
        <BusinessGallery photos={businessPhotos} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}