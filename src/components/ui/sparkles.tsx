"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparkleProps {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
}

const DEFAULT_COLOR = "hsl(var(--primary))";

const generateSparkle = (color: string): SparkleProps => {
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color,
    size: Math.random() * 10 + 5,
    style: {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
    },
  };
};

const SparkleInstance = ({ color, size, style }: Omit<SparkleProps, "id" | "createdAt">) => {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={style}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 180],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

export const SparklesText = ({
  children,
  className,
  sparklesCount = 10,
  color = DEFAULT_COLOR,
}: {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
  color?: string;
}) => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      
      setSparkles((sparkles) => {
        const next = sparkles.filter((s) => now - s.createdAt < 750);
        if (next.length < sparklesCount) {
          next.push(sparkle);
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [color, sparklesCount]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleInstance
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export const Sparkles = ({
  className,
  count = 15,
  color = DEFAULT_COLOR,
}: {
  className?: string;
  count?: number;
  color?: string;
}) => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      
      setSparkles((sparkles) => {
        const next = sparkles.filter((s) => now - s.createdAt < 1000);
        if (next.length < count) {
          next.push(sparkle);
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [color, count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleInstance
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
