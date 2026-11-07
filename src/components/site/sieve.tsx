// Decorative hero graphic: a sieve stack showing stone graded 20-40, 10-20 and 5-10 mm, plus stone dust.
// Positions are generated from a fixed seed so server and client render identically.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const trays = [
  { label: "20–40 mm", y: 40, r: [13, 19], n: 11, tone: "#3a4047" },
  { label: "10–20 mm", y: 150, r: [7, 11], n: 22, tone: "#59616a" },
  { label: "5–10 mm", y: 250, r: [3.5, 6], n: 44, tone: "#8a929b" },
  { label: "Stone dust", y: 340, r: [1, 2.2], n: 120, tone: "#c3c7c3" },
];

export function Sieve() {
  return (
    <svg viewBox="0 0 440 420" role="img" aria-label="Stone graded into 20 to 40 millimetre, 10 to 20, 5 to 10 and stone dust" className="h-auto w-full">
      {trays.map((t, ti) => {
        const rand = rng(7 + ti * 13);
        const bandH = ti === 3 ? 26 : t.r[1] * 2 + 10;
        const stones = Array.from({ length: t.n }, (_, i) => {
          const r = t.r[0] + rand() * (t.r[1] - t.r[0]);
          const x = 30 + rand() * 300;
          const y = t.y + 52 - r - rand() * (bandH - r);
          const pts = Array.from({ length: 7 }, (_, k) => {
            const a = (k / 7) * Math.PI * 2 + rand() * 0.5;
            const rr = r * (0.75 + rand() * 0.3);
            return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`;
          }).join(" ");
          return <polygon key={i} points={pts} fill={t.tone} className="settle" style={{ ["--i" as string]: ti * 3 + (i % 6) } as React.CSSProperties} />;
        });
        return (
          <g key={t.label}>
            {stones}
            <line x1="20" x2="340" y1={t.y + 54} y2={t.y + 54} stroke="#f5b800" strokeWidth="3" />
            <text x="352" y={t.y + 50} fill="#f5f6f3" fontSize="15" fontWeight="600" fontFamily="var(--font-display)">
              {t.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
