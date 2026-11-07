"use client";

import { useEffect, useState } from "react";

const slides = [
  "/hero/stone-1.webp",
  "/hero/stone-2.jpg",
  "/hero/stone-3.jpg",
  "/hero/stone-4.webp",
  "/hero/stone-5.jpg",
];

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 15000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === index ? 1 : 0,
            backgroundImage: `linear-gradient(90deg, rgba(9, 11, 14, 0.9), rgba(9, 11, 14, 0.58)), url(${slide})`,
            transform: activeIndex === index ? "scale(1.08)" : "scale(1.18)",
            filter: "saturate(0.8) contrast(1.08)",
          }}
        />
      ))}
    </div>
  );
}
