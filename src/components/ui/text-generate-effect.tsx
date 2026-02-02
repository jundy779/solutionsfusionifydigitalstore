"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.1,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!hasAnimated) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(staggerDelay),
        }
      );
      setHasAnimated(true);
    }
  }, [scope, animate, hasAnimated, filter, duration, staggerDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};

export const TextGenerateEffectLines = ({
  lines,
  className,
  lineClassName,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.15,
}: {
  lines: Array<{ text: string; className?: string }>;
  className?: string;
  lineClassName?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      animate(
        "span.word",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          transform: "translateY(0px)",
        },
        {
          duration: duration,
          delay: stagger(staggerDelay),
        }
      );
      setHasAnimated(true);
    }
  }, [scope, animate, hasAnimated, filter, duration, staggerDelay]);

  return (
    <div ref={scope} className={cn("font-bold", className)}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className={cn(lineClassName, line.className)}>
          {line.text.split(" ").map((word, wordIdx) => (
            <span
              key={`${lineIdx}-${wordIdx}`}
              className="word inline-block opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
                transform: "translateY(10px)",
              }}
            >
              {word}
              {wordIdx < line.text.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
