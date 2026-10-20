"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type LenisLike = {
  raf: (t: number) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  on: (ev: "scroll", cb: () => void) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

/*
  Inertial smooth scrolling with Lenis (MIT, darkroom.engineering).
  Off for reduced motion and for touch screens, which already scroll
  natively with momentum. In-page anchor links glide to their target
  and account for the floating header.
*/
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let lenis: LenisLike | undefined;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
      }) as unknown as LenisLike;
      window.__lenis = lenis;
      document.documentElement.classList.add("lenis-on");
      const loop = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });

    // Same-page anchor links ("#id" or "/#id" while on that page) glide to
    // their section. Lenis honours the html scroll-padding-top, which already
    // keeps the target clear of the floating header.
    const onClick = (e: MouseEvent) => {
      if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo(target);
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      window.__lenis = undefined;
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);

  // New page: start at the top, or at the #section the link pointed to.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
    const go = () => {
      const target = id ? document.getElementById(id) : null;
      lenis.scrollTo(target ?? 0, { immediate: true, force: true });
    };
    requestAnimationFrame(go);
    if (!id) return;
    // Images and fonts on the new page can still shift the layout; settle again.
    const t1 = window.setTimeout(go, 250);
    const t2 = window.setTimeout(go, 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
