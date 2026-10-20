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

    // Count-up numbers: [data-count="2022"] rolls up when it scrolls into view.
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          countIo.unobserve(el);
          const end = Number(el.dataset.count);
          const from = Number(el.dataset.countFrom ?? Math.max(0, end - 12));
          const t0 = performance.now();
          const dur = 1100;
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(from + (end - from) * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => countIo.observe(el));

    // Parallax: [data-parallax="0.12"] drifts against the scroll on wider screens.
    const wide = window.matchMedia("(min-width: 900px)").matches;
    const layers = wide ? Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")) : [];
    let ticking = false;
    const paint = () => {
      ticking = false;
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.1;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };
    if (layers.length) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

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
      countIo.disconnect();
      if (layers.length) window.removeEventListener("scroll", onScroll);
      layers.forEach((el) => (el.style.translate = ""));
      clearTimeout(failsafe);
      if (fine) document.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
