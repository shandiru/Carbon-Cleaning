"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, []);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setSize({ width });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

export default function Masonry({
  items,
  onImageClick,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
}) {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)"],
    [5, 4, 3],
    2
  );

  const [containerRef, { width }] = useMeasure();

  const grid = useMemo(() => {
    if (!width) return [];

    const gap = 16;
    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const h = item.height / 2;
      const y = colHeights[col];

      colHeights[col] += h + gap;

      return { ...item, x, y, w: columnWidth, h };
    });
  }, [items, width, columns]);

  const hasMounted = useRef(false);

  const getStart = (item) => {
    switch (animateFrom) {
      case "top":
        return { x: item.x, y: -200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    grid.forEach((item, i) => {
      const selector = `[data-key="${item.id}"]`;

      if (!hasMounted.current) {
        const start = getStart(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            filter: "blur(0px)",
            ease,
            duration: 0.8,
            delay: i * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration,
          ease,
        });
      }
    });

    hasMounted.current = true;
  }, [grid]);

  const containerHeight = useMemo(
    () => Math.max(...grid.map((i) => i.y + i.h), 0),
    [grid]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${containerHeight}px` }}
    >
      {grid.map((item, index) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute overflow-hidden rounded-xl shadow-lg cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <img
            src={item.img}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      ))}
    </div>
  );
}
