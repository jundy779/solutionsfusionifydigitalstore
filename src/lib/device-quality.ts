/**
 * Auto-detect device capability tier for Three.js scenes.
 * low   → weak mobile / save-data / reduced-motion
 * medium → typical mobile / mid laptop
 * high  → desktop with decent GPU
 */
export type QualityTier = "low" | "medium" | "high";

export interface QualityProfile {
  tier: QualityTier;
  isMobile: boolean;
  prefersReduced: boolean;
  dpr: number;
  // Star counts (far/mid/near)
  stars: [number, number, number];
  // Include nebula sprites + planet decorations
  nebulas: boolean;
  planets: boolean;
  // Sphere segments for Earth / clouds
  earthSegments: number;
  cloudSegments: number;
  // Enable atmosphere fresnel glow
  atmosphere: boolean;
  // Texture resolution suffix (1024 / 2048)
  textureRes: 1024 | 2048;
}

export function getQualityProfile(): QualityProfile {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      isMobile: false,
      prefersReduced: false,
      dpr: 1.5,
      stars: [2500, 1000, 300],
      nebulas: true,
      planets: true,
      earthSegments: 64,
      cloudSegments: 48,
      atmosphere: true,
      textureRes: 2048,
    };
  }

  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const isMobile = window.matchMedia?.("(max-width: 767px)").matches ?? false;

  // Rough capability signal
  // deviceMemory: 0.25..8 (GB), hardwareConcurrency: cores
  const mem =
    (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const conn = (
    navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = conn?.saveData === true;
  const slowNet =
    conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";

  let tier: QualityTier;
  if (prefersReduced || saveData || slowNet || mem <= 2 || cores <= 4) {
    tier = "low";
  } else if (isMobile || mem <= 4 || cores <= 6) {
    tier = "medium";
  } else {
    tier = "high";
  }

  switch (tier) {
    case "low":
      return {
        tier,
        isMobile,
        prefersReduced,
        dpr: 1,
        stars: [500, 200, 60],
        nebulas: false,
        planets: false,
        earthSegments: 32,
        cloudSegments: 24,
        atmosphere: false,
        textureRes: 1024,
      };
    case "medium":
      return {
        tier,
        isMobile,
        prefersReduced,
        dpr: Math.min(window.devicePixelRatio ?? 1, 1.25),
        stars: [1200, 500, 150],
        nebulas: true,
        planets: true,
        earthSegments: 48,
        cloudSegments: 32,
        atmosphere: true,
        textureRes: 1024,
      };
    case "high":
    default:
      return {
        tier,
        isMobile,
        prefersReduced,
        dpr: Math.min(window.devicePixelRatio ?? 1, 2),
        stars: [2500, 1000, 300],
        nebulas: true,
        planets: true,
        earthSegments: 64,
        cloudSegments: 48,
        atmosphere: true,
        textureRes: 2048,
      };
  }
}
