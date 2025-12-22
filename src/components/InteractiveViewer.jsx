"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function InteractiveViewer({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}) {
  const box = useRef();

  useEffect(() => {
    if (activeIndex !== null) {
      gsap.fromTo(
        box.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  if (activeIndex === null) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        ref={box}
        className="relative max-w-5xl max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={items[activeIndex].img}
          className="max-h-[85vh] mx-auto object-contain rounded-xl"
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-white/10 px-3 py-1 rounded-lg"
        >
          ✕
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl bg-white/10 px-4 py-2 rounded-full"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl bg-white/10 px-4 py-2 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
}
