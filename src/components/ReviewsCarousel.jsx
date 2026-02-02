import React, { useRef, useState, useEffect } from "react";
import { useGoogleReviews } from "../../Service/useGoogleReviews";
import BusinessGallery from "./BusinessGallery";

export default function ReviewsCarousel() {
  const { reviews, businessPhotos, loading } = useGoogleReviews();
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!reviews.length || paused) return;

    const interval = setInterval(() => {
      trackRef.current.scrollLeft += 0.4;
      if (
        trackRef.current.scrollLeft >=
        trackRef.current.scrollWidth / 2
      ) {
        trackRef.current.scrollLeft = 0;
      }
    }, 30);

    return () => clearInterval(interval);
  }, [reviews, paused]);

  if (loading) {
    return (
      <section className="bg-black py-32 text-center">
        <div className="h-12 w-12 mx-auto mb-6 rounded-full border-t-2 border-[#B62025] animate-spin" />
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Loading reviews
        </p>
      </section>
    );
  }

  return (
    <section className="relative bg-black py-28 overflow-hidden">
      {/* soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(182,32,37,0.08)_0%,_transparent_65%)]" />

      {/* header */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Trusted <span className="text-[#B62025]">Excellence</span>
        </h2>
        <p className="mt-4 text-xs tracking-[0.35em] uppercase text-gray-500">
          Google Reviews
        </p>
      </div>

      {/* carousel */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative z-10 flex gap-8 px-6 overflow-x-auto scrollbar-hide py-10"
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={i}
            className="group w-[340px] md:w-[420px] flex-shrink-0 rounded-3xl bg-gradient-to-b from-[#121212] to-[#050505]
            border border-white/5 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)]
            hover:border-[#B62025]/40 transition-all duration-500"
          >
            {/* user */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#B62025] to-[#ff4b4b]
              flex items-center justify-center font-black text-lg text-white">
                {r.name?.[0]}
              </div>
              <div>
                <p className="text-white font-semibold">{r.name}</p>
                <p className="text-[10px] tracking-widest uppercase text-[#B62025]">
                  {r.date}
                </p>
              </div>
            </div>

            {/* stars */}
            <div className="mb-5 text-yellow-500 text-lg">
              {"★".repeat(r.rating)}
            </div>

            {/* review */}
            <p className="text-sm leading-relaxed text-gray-400 italic group-hover:text-gray-200 transition">
              “{r.text}”
            </p>

            {/* footer */}
            <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                className="h-3"
                alt="Google"
              />
              <span className="text-[9px] tracking-widest uppercase text-gray-500">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* gallery */}
      <div className="relative z-10 mt-24 px-6">
        <BusinessGallery photos={businessPhotos} />
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { scrollbar-width: none; }
        `}
      </style>
    </section>
  );
}
