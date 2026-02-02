import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface CobeGlobeProps {
  className?: string;
}

export const CobeGlobe = ({ className }: CobeGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.1, 0.2], // Dark blue base
      markerColor: [0.05, 0.42, 0.84], // Brand blue #0d6cd7
      glowColor: [0.05, 0.42, 0.84], // Brand blue glow
      markers: [
        // Indonesia & Southeast Asia
        { location: [-6.2088, 106.8456], size: 0.1 }, // Jakarta
        { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
        { location: [3.139, 101.6869], size: 0.06 }, // Kuala Lumpur
        { location: [13.7563, 100.5018], size: 0.06 }, // Bangkok
        { location: [14.5995, 120.9842], size: 0.06 }, // Manila
        { location: [21.0285, 105.8542], size: 0.05 }, // Hanoi
        // Asia Pacific
        { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
        { location: [37.5665, 126.978], size: 0.07 }, // Seoul
        { location: [22.3193, 114.1694], size: 0.08 }, // Hong Kong
        { location: [31.2304, 121.4737], size: 0.08 }, // Shanghai
        { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
        { location: [28.6139, 77.209], size: 0.07 }, // New Delhi
        // Middle East
        { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
        // Europe
        { location: [51.5072, -0.1276], size: 0.07 }, // London
        { location: [52.52, 13.405], size: 0.06 }, // Berlin
        { location: [48.8566, 2.3522], size: 0.06 }, // Paris
        { location: [52.3676, 4.9041], size: 0.05 }, // Amsterdam
        // Americas
        { location: [40.7128, -74.006], size: 0.08 }, // New York
        { location: [34.0522, -118.2437], size: 0.07 }, // Los Angeles
        { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
        { location: [-22.9068, -43.1729], size: 0.06 }, // Rio
      ],
      onRender: (state) => {
        // Called on every animation frame
        // `state` will be an empty object, return updated params
        if (!pointerInteracting.current) {
          // Auto rotate
          phi += 0.003;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        contain: "layout paint size",
        opacity: 0,
        transition: "opacity 1s ease",
      }}
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grabbing";
        }
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grab";
        }
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grab";
        }
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
        }
      }}
    />
  );
};
