"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  One small client controller for page motion:
  - [data-reveal]: fades and rises into view once, when it enters the viewport.
  - [data-spot]: a soft light follows the cursor across cards.
  Content is fully visible without JavaScript; hiding only starts after
  this component confirms motion is allowed.
*/
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    root.classList.add("motion-ok");

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden if an observer misses it
    const failsafe = window.setTimeout(() => items.forEach((el) => el.classList.add("is-in")), 4000);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      if (fine) document.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
