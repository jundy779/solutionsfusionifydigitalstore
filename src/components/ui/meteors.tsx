"use client";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // Fewer DOM nodes on mobile, none if user prefers reduced motion
  const count = reduced ? 0 : isMobile ? Math.min(8, number) : number;

  // Memoize random positions so re-renders don't reshuffle / reflow
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 1 + 0.2,
        duration: Math.random() * 8 + 2,
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((m, idx) => (
        <span
          key={idx}
          className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-primary shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: m.top + "%",
            left: m.left + "%",
            animationDelay: m.delay + "s",
            animationDuration: m.duration + "s",
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-primary/80 to-transparent" />
        </span>
      ))}
    </div>
  );
};
