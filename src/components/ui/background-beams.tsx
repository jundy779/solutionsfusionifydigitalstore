"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // rAF-throttled mousemove that writes directly to transform (no React re-render)
  useEffect(() => {
    if (isMobile || reduced) return;
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${lastX - 150}px, ${lastY - 150}px, 0)`;
        frame = 0;
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isMobile, reduced]);

  // Reduce beam count on mobile to lower DOM + paint cost
  const sideBeamCount = isMobile ? 2 : 3;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Central beam */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "opacity" }}
        animate={reduced ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[1px] h-[600px] rotate-[20deg]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Left beams */}
      {Array.from({ length: sideBeamCount }).map((_, i) => (
        <motion.div
          key={`left-${i}`}
          className="absolute"
          style={{ left: `${10 + i * 15}%`, top: "-10%", willChange: "transform, opacity" }}
          animate={reduced ? undefined : { opacity: [0.2, 0.5, 0.2], y: [0, 50, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        >
          <div
            className="w-[1px] h-[400px]"
            style={{
              background: `linear-gradient(180deg, transparent 0%, hsl(var(--primary) / ${0.3 + i * 0.1}) 50%, transparent 100%)`,
              transform: `rotate(${15 + i * 5}deg)`,
            }}
          />
        </motion.div>
      ))}

      {/* Right beams */}
      {Array.from({ length: sideBeamCount }).map((_, i) => (
        <motion.div
          key={`right-${i}`}
          className="absolute"
          style={{ right: `${10 + i * 15}%`, top: "-10%", willChange: "transform, opacity" }}
          animate={reduced ? undefined : { opacity: [0.2, 0.5, 0.2], y: [0, 50, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 + 0.5, ease: "easeInOut" }}
        >
          <div
            className="w-[1px] h-[400px]"
            style={{
              background: `linear-gradient(180deg, transparent 0%, hsl(var(--primary) / ${0.3 + i * 0.1}) 50%, transparent 100%)`,
              transform: `rotate(${-15 - i * 5}deg)`,
            }}
          />
        </motion.div>
      ))}

      {/* Mouse-following glow (desktop only) — transform updated via rAF, no React re-renders */}
      {!isMobile && !reduced && (
        <div
          ref={glowRef}
          className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
};
