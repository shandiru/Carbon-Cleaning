 

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Swiper styles (CDN-style)
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function GalleryCoverflow() {
  

  const images = [
    "im.jpg",
    "im1.jpg",
    "im2.jpg",
    "im3.jpg",
    "im4.jpg",
  ];

  return (
    <section
      id="gallery"
      className="bg-black text-white py-24 "
    >
      {/* HEADER */}
      <div className="text-center max-w-5xl mx-auto px-6 mb-14">
        <h2
          className="text-4xl md:text-5xl font-bold uppercase tracking-widest"
          data-aos="fade-up"
        >
          Workshop <span className="text-[#D70C09]">Gallery</span>
        </h2>

        <div className="w-24 h-[3px] bg-[#D70C09] mx-auto mt-4" />

        <p className="text-[#C0C0C0] mt-6 max-w-xl mx-auto">
          Real work. Real results. A look inside our workshop.
        </p>
      </div>

      {/* GALLERY */}
      <div className="max-w-6xl mx-auto px-4" data-aos="zoom-in">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          className="gallerySwiper"
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className="max-w-[320px] md:max-w-[420px]"
            >
              <div className="relative group rounded-md overflow-hidden border border-white/10">
                <img
                  src={src}
                  alt="Workshop"
                  loading="lazy"
                  className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-[#D70C09]/10 opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CUSTOM SWIPER STYLE */}
      <style jsx global>{`
        .gallerySwiper .swiper-slide {
          transition: transform 0.4s ease;
        }
      `}</style>
    </section>
  );
}
