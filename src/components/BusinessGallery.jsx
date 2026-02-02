import React, { useState } from "react";

export default function BusinessGallery({ photos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const maxIndex = isDesktop ? Math.max(0, photos.length - 3) : photos.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12 bg-black">
      {/* --- Added Gallery Heading --- */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white">
          Our <span className="text-[#B62025] dark:text-[#FF4B4B]">Gallery</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-[#B62025]/50"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">Visual Excellence</span>
          <div className="h-[1px] w-8 bg-[#B62025]/50"></div>
        </div>
      </div>
      {/* --- End of Heading --- */}

      <div className="relative group">
        {/* Main Carousel Container */}
        <div className="overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl bg-black">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / (isDesktop ? 3 : 1))}%)` 
            }}
          >
            {photos.map((url, i) => (
              <div 
                key={i} 
                className="min-w-full md:min-w-[33.333%] h-[300px] md:h-[400px] p-1.5"
              >
                <img 
                  src={url} 
                  className="w-full h-full object-cover rounded-xl border border-white/5" 
                  alt={`Gallery image ${i + 1}`} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#B62025] dark:hover:bg-[#FF4B4B] text-white p-3 rounded-full backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100 shadow-xl"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#B62025] dark:hover:bg-[#FF4B4B] text-white p-3 rounded-full backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100 shadow-xl"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Progress Dots */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {(isDesktop ? photos.slice(0, photos.length - 2) : photos).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 transition-all rounded-full ${
                currentIndex === i 
                  ? "w-8 bg-[#B62025] dark:bg-[#FF4B4B]" 
                  : "w-2 bg-gray-700 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}