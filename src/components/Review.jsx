"use client";

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const reviews = [
  {
    name: "Lee Patrick",
    text:
      "Amazing difference after remap — more power and better fuel economy. Fantastic service and great communication.",
  },
  {
    name: "Tony Roberts",
    text:
      "Loss of power fixed in under an hour. Car now drives perfectly and is more economical. Highly recommended.",
  },
  {
    name: "Scott Williams",
    text:
      "Second remap done here. Only person I recommend to my club members. Top quality work.",
  },
  {
    name: "James Burns",
    text:
      "Very knowledgeable and reliable. Van has been running perfectly since the work.",
  },
  {
    name: "Emma Raistrick",
    text:
      "Really happy with the results. More power and smooth driving. Would definitely use again.",
  },
  {
    name: "Jennie Burns",
    text:
      "Much better service than the dealership. Engine running perfectly now.",
  },
];

export default function ReviewsCarousel() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const track = trackRef.current;
    let scrollPos = 0;

    const animate = () => {
      if (!paused && track) {
        scrollPos += 0.35; // 🔥 smooth speed
        if (scrollPos >= track.scrollWidth / 2) {
          scrollPos = 0;
        }
        track.scrollLeft = scrollPos;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="bg-black py-24 text-white font-['Oswald']"
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-14" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
          Customer <span className="text-red-600">Reviews</span>
        </h2>
        <div className="w-20 h-[3px] bg-red-600 mx-auto mt-4" />
        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          Trusted by real customers for real results 기억
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="
          flex gap-6 px-6
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
        "
      >
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="
              w-[340px] md:w-[380px]
              h-[240px]
              bg-[#0E0E0E]
              border border-white/10
              p-6
              flex flex-col justify-between
              rounded-md
              hover:border-red-600/50
              transition
              flex-shrink-0
            "
          >
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">
              “{review.text}”
            </p>

            <span className="text-white font-semibold uppercase tracking-wide text-sm pt-4">
              — {review.name}
            </span>
          </div>
        ))}
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
