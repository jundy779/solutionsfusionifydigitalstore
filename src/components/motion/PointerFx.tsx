"use client";

import { useEffect, useRef } from "react";

/*
  Pointer effects for mouse and trackpad users only:
  - Magnetic buttons: .btn leans toward the cursor and springs back.
  - Cursor ring: a soft ring trails the pointer and grows over links.
  The native cursor stays visible; the ring is decoration.
*/
export function PointerFx() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const el = ring.current;
    if (!el) return;
    document.documentElement.classList.add("has-ring");

    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      raf = 0,
      magnet: HTMLElement | null = null;

    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const release = () => {
      if (magnet) {
        magnet.style.translate = "";
        magnet.classList.remove("is-magnet");
        magnet = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-visible");
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, summary, [role=tab], input, select, textarea, label");
      el.classList.toggle("is-hover", !!interactive);

      const btn = t.closest<HTMLElement>(".btn, .theme-toggle, .wa-float, .to-top");
      if (btn !== magnet) release();
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.translate = `${(dx * 6).toFixed(2)}px ${(dy * 5).toFixed(2)}px`;
        btn.classList.add("is-magnet");
        magnet = btn;
      }
    };
    const onLeave = () => {
      el.classList.remove("is-visible");
      release();
    };
    const onDown = () => el.classList.add("is-press");
    const onUp = () => el.classList.remove("is-press");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      release();
      document.documentElement.classList.remove("has-ring");
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
}
