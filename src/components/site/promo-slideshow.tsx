"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const promos = [
  {
    tag: "Promotion",
    title: "Promo ya 10% ku mibya 20% ya mbere",
    text: "Kugura amabuye y’ubwubatsi cyangwa imfubyi mu cyumweru, ubone amanota meza ndetse n’itangwa ryihuse.",
    href: "/products",
  },
  {
    tag: "Free delivery",
    title: "Itangwa ryigenga muri Bugesera",
    text: "Kugira ubone itangwa ryihuse ku mirimo ya mbere ku masura, ibikoresho by’ingufu, no gutanga ibicuruzwa byubaka.",
    href: "/contact",
  },
  {
    tag: "Bulk order",
    title: "Kugura byinshi, kwagura igiciro",
    text: "Abatubaka, abakozi b’amazu, n’abatanga ibikoresho bashobora kubona igiciro gikunze ku rugero runini.",
    href: "/order",
  },
];

export function PromoSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % promos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const current = promos[index];

  return (
    <div className="border-y border-white/10 bg-basalt/90 text-quartz">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-3 md:grid-cols-[1fr_auto] md:items-center">
        <div className="overflow-hidden">
          <div className="flex items-center gap-3 text-sm text-quartz/80">
            <span className="rounded-full border border-hivis/60 bg-hivis/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-hivis">
              {current.tag}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-quartz">{current.title}</p>
              <p className="truncate text-xs text-quartz/65">{current.text}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href={current.href} className="text-sm font-medium text-hivis underline underline-offset-2">
            View details
          </Link>
          <div className="flex items-center gap-2">
            {promos.map((promo, promoIndex) => (
              <button
                key={promo.title}
                type="button"
                aria-label={`Show promotional offer ${promoIndex + 1}`}
                onClick={() => setIndex(promoIndex)}
                className={`h-2.5 w-2.5 rounded-full transition ${promoIndex === index ? "bg-hivis" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
