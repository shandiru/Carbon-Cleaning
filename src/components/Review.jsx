 

import React, { useEffect, useRef, useState } from "react";


const reviews = [
  {
    name: "Gareth Murchie",
    text: "Had my Merc SLK250CDI 360 cleaned today (Carbon Clean plus Fuel System Clean). Car runs smoother and quieter and the clean also got rid of a fault code caused by a clogged swirl flap. Very friendly, professional and good value for money too. Would definitely recommend.",
  },
  {
    name: "Jason Perry",
    text: "Just had Darren out to sort my corsa diesel van out, great guy arrived on time the van is now perfect highly recommend.",
  },
  {
    name: "Azeem",
    text: "I was recommended Nottingham Carbon Cleaning Solutions by a friend. I got my C250d done achieved extra 7mpg the engine is super quiet now. Was super happy with the service I received. Today i got my Mercedes Vito dpf cleaned it drives perfectly. Top bloke really kind and helpful much appreciated. No pressure sales or tactics involved. 100% honest guy so ill be recommending to all friends and family.",
  },
  {
    name: "Stacey Turner",
    text: "Came today with blocked dpf filter, was sorted within a couple of hours, very professional and competitively priced. Would recommend.",
  },
  {
    name: "Kaitlyn Mepstead",
    text: "Notts Carbon cleaning did a great job, he was friendly, reliable and came out the same day as my initial call. I 100% recommend.",
  },
];

export default function ReviewsCarousel() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
   

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
      className="bg-black py-24 text-white "
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
