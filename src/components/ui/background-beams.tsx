"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`left-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: "-10%",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
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
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`right-${i}`}
          className="absolute"
          style={{
            right: `${10 + i * 15}%`,
            top: "-10%",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5 + 0.5,
            ease: "easeInOut",
          }}
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

      {/* Mouse-following glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
