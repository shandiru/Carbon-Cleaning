import React, { useState } from "react";
import { useGoogleReviews } from "../../Service/useGoogleReviews";
import BusinessGallery from "./BusinessGallery";

export default function ReviewsCarousel() {
  const { reviews, businessPhotos, loading, error } = useGoogleReviews();
  const [paused, setPaused] = useState(false);

  if (loading) {
    return (
      <section className="bg-black py-32 text-center">
        <div className="h-12 w-12 mx-auto mb-6 rounded-full border-t-2 border-[#B62025] animate-spin" />
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Loading reviews...</p>
      </section>
    );
  }

  // Error vanthaal display panna
  if (error && (!reviews || reviews.length === 0)) {
    return (
      <section className="bg-black py-20 text-center text-gray-500">
        <p>Unable to load reviews at the moment.</p>
      </section>
    );
  }

  return (
    <section className="relative bg-black py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(182,32,37,0.08)_0%,_transparent_65%)]" />

      <div className="relative z-10 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Trusted <span className="text-[#B62025]">Excellence</span>
        </h2>
        <p className="mt-4 text-xs tracking-[0.35em] uppercase text-gray-500">Google Reviews</p>
      </div>

      <div 
        className="relative z-10 overflow-hidden py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div 
          className={`flex gap-8 px-6 ${paused ? '' : 'animate-scroll'}`}
          style={{ width: 'max-content' }}
        >
          {/* Infinite scroll - 3 times duplicate for seamless loop */}
          {[...reviews, ...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="group w-[340px] md:w-[420px] flex-shrink-0 rounded-3xl bg-gradient-to-b from-[#121212] to-[#050505]
              border border-white/5 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)]
              hover:border-[#B62025]/40 transition-all duration-500 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#B62025] to-[#ff4b4b]
                flex items-center justify-center font-black text-lg text-white">
                  {r.name?.[0] || "G"}
                </div>
                <div>
                  <p className="text-white font-semibold">{r.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-[#B62025]">{r.date}</p>
                </div>
              </div>

              <div className="mb-5 text-yellow-500 text-lg">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>

              <p className="text-sm leading-relaxed text-gray-400 italic group-hover:text-gray-200 transition flex-grow">
                "{r.text}"
              </p>

              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  className="h-3"
                  alt="Google"
                />
                <span className="text-[9px] tracking-widest uppercase text-gray-500">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-24 px-6">
        <BusinessGallery photos={businessPhotos} />
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}