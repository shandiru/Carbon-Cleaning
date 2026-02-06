import React from "react";

export default function BusinessGallery({ photos = [] }) {
  if (!photos || photos.length === 0) return null;

  // Duplicate the photos array to ensure a seamless loop
  const duplicatedPhotos = [...photos, ...photos, ...photos];

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12 bg-black" id="gallery">
      {/* Gallery Heading */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white">
          Our <span className="text-[#B62025]">Gallery</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-[#B62025]/50"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">Visual Excellence</span>
          <div className="h-[1px] w-8 bg-[#B62025]/50"></div>
        </div>
      </div>

      {/* The Wrapper */}
      <div className="relative overflow-hidden marquee-container">
        <div className="flex w-max animate-marquee">
          {duplicatedPhotos.map((url, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] p-1.5 flex-shrink-0"
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

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }

        /* This ensures the animation stops when the mouse is over the container */
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}