import React, { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 3000,
  rx = "12px",
  ry = "12px",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progressRef = useRef(0);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useAnimationFrame((time) => {
    const progress = (time % duration) / duration;
    progressRef.current = progress;
    
    if (gradientRef.current) {
      const angle = progress * 360;
      const x1 = 50 + 50 * Math.cos((angle * Math.PI) / 180);
      const y1 = 50 + 50 * Math.sin((angle * Math.PI) / 180);
      const x2 = 50 + 50 * Math.cos(((angle + 180) * Math.PI) / 180);
      const y2 = 50 + 50 * Math.sin(((angle + 180) * Math.PI) / 180);
      
      gradientRef.current.setAttribute("x1", `${x1}%`);
      gradientRef.current.setAttribute("y1", `${y1}%`);
      gradientRef.current.setAttribute("x2", `${x2}%`);
      gradientRef.current.setAttribute("y2", `${y2}%`);
    }
  });

  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden p-[2px] rounded-xl",
        containerClassName
      )}
      {...props}
    >
      {/* Animated border */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              ref={gradientRef}
              id="moving-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.5)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect
            ref={pathRef}
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx={rx}
            ry={ry}
            fill="none"
            stroke="url(#moving-gradient)"
            strokeWidth="2"
            className={cn("", borderClassName)}
          />
        </svg>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-50"
        animate={{
          boxShadow: [
            "0 0 20px 0px hsl(var(--primary) / 0.3)",
            "0 0 30px 2px hsl(var(--primary) / 0.4)",
            "0 0 20px 0px hsl(var(--primary) / 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content */}
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 bg-background rounded-[10px] px-6 py-3 text-sm font-medium transition-colors",
          className
        )}
      >
        {children}
      </span>
    </Component>
  );
}

// Simpler version with CSS animation
export function MovingBorderButton({
  children,
  className,
  containerClassName,
  as: Component = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px]",
        containerClassName
      )}
      {...props}
    >
      {/* Animated gradient border */}
      <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--primary)/0.4)_50%,hsl(var(--primary))_100%)]" />
      
      {/* Inner glow */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content container */}
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 rounded-[10px] bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 group-hover:bg-background/90",
          className
        )}
      >
        {children}
      </span>
    </Component>
  );
}
