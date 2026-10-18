// Pure-CSS clouds drifting across the sky surfaces. Decorative only.
const clouds = [
  { top: "14%", left: "-6%", scale: 1.1, dur: 86, delay: -20 },
  { top: "62%", left: "8%", scale: 0.7, dur: 72, delay: -48 },
  { top: "30%", left: "58%", scale: 0.85, dur: 90, delay: -10 },
  { top: "8%", left: "78%", scale: 0.6, dur: 64, delay: -34 },
];

export function Clouds({ count = 4 }: { count?: number }) {
  return (
    <div className="clouds" aria-hidden="true">
      {clouds.slice(0, count).map((c, i) => (
        <span
          key={i}
          className="cloud"
          style={{
            top: c.top,
            left: c.left,
            ["--s" as string]: c.scale,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
