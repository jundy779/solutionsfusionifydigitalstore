"use client";

import { useEffect } from "react";

/*
  Opening loader: the FUSIONIFY seal draws its wavy outline, the mark pops
  in, then a curtain lifts to reveal the page. Runs once per browser session.
  Whether it runs, and when it ends, is decided by loaderInitScript in <head>
  before paint, so there is no flash and no wait for hydration; without
  JavaScript or with reduced motion it never shows.
*/

// Wavy seal outline, generated once (12 lobes, like the brand seal).
function sealPath(cx = 60, cy = 60, r = 46, amp = 3.2, lobes = 12, steps = 240) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.cos(lobes * a);
    pts.push(`${(cx + rr * Math.cos(a - Math.PI / 2)).toFixed(2)},${(cy + rr * Math.sin(a - Math.PI / 2)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
const SEAL = sealPath();
const RING = sealPath(60, 60, 38.5, 2.6);


export function Loader() {
  // The curtain is lifted by loaderInitScript in <head> (no wait for hydration).
  // This is only a backup in case that timer never ran.
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-loader") !== "run") return;
    const t = window.setTimeout(() => {
      if (root.getAttribute("data-loader") !== "run") return;
      root.setAttribute("data-loader", "done");
      try {
        sessionStorage.setItem("fx-loaded", "1");
      } catch {
        /* storage blocked: loader simply runs again next time */
      }
    }, Math.max(0, 1700 - performance.now()));
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="fx-loader" aria-hidden="true">
      <div className="fx-loader__curtain" />
      <svg className="fx-loader__seal" viewBox="0 0 120 120">
        <path className="fx-loader__outer" d={SEAL} pathLength={1} />
        <path className="fx-loader__inner" d={RING} pathLength={1} />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="fx-loader__mark" src="/images/fusionify-mark.png" alt="" width={56} height={56} />
    </div>
  );
}
