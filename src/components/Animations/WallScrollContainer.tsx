'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from "lenis";

const easeOutQuad = (t) => t * (2 - t);

export default function WallScrollContainer({ children, debug = false }) {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const contentRef = useRef(null);

  const maxScrollRef = useRef(0);
  const containerTopRef = useRef(0);
  const containerHeightRef = useRef(0);
  const whRef = useRef(typeof window !== "undefined" ? window.innerHeight : 0);

  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);

  // ⭐ PURE LENIS (React compatible)
  const lenisRef = useRef(null);

  useEffect(() => {
    // ---------------------------
    // 1. Init Lenis (NO useLenis)
    // ---------------------------
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const cont = containerRef.current;
    const gal = galleryRef.current;
    const con = contentRef.current;

    if (!cont || !gal || !con) return;

    const computeLayout = () => {
      whRef.current = window.innerHeight;
      const contentWidth = con.scrollWidth;
      const galWidth = gal.clientWidth;
      const diff = contentWidth - galWidth;

      if (diff <= 0) {
        maxScrollRef.current = 0;
        con.style.justifyContent = "center";
      } else {
        maxScrollRef.current = diff + 32;
        con.style.justifyContent = "flex-start";
      }

      const rect = cont.getBoundingClientRect();
      containerTopRef.current = rect.top + window.scrollY;
      containerHeightRef.current = rect.height;

      const x = easeOutQuad(progressRef.current) * maxScrollRef.current;
      con.style.transform = `translateX(-${x}px)`;
    };

    computeLayout();
    requestAnimationFrame(() => computeLayout());

    // Resize handling
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => computeLayout(), 120);
    };
    window.addEventListener("resize", onResize);

    // Scroll update
    const updateScrollFromY = (scrollY) => {
      const start = containerTopRef.current - whRef.current / 2;
      const end = containerTopRef.current + containerHeightRef.current - whRef.current / 2;
      const range = end - start;

      const raw = range > 0
        ? Math.min(1, Math.max(0, (scrollY - start) / range))
        : 0;

      targetProgressRef.current = raw;
    };

    // Lenis scroll
    lenis.on("scroll", ({ scroll }) => {
      updateScrollFromY(scroll);
    });

    // Fallback: window scroll (just in case)
    const onWindowScroll = () => {
      updateScrollFromY(window.scrollY);
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    // Animation loop
    let rafId = 0;

    const animate = () => {
      const cur = progressRef.current;
      const tar = targetProgressRef.current;
      const next = cur + (tar - cur) * 0.12;

      if (Math.abs(next - cur) > 0.0001) {
        progressRef.current = next;
        const x = easeOutQuad(next) * maxScrollRef.current;
        con.style.transform = `translateX(-${x}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onWindowScroll);
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "100vh" }}>
      <div
        ref={galleryRef}
        className="sticky top-0 w-full overflow-hidden px-4 py-20 md:top-[20%]"
      >
        <div
          ref={contentRef}
          className="flex gap-8"
          style={{ willChange: "transform" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
