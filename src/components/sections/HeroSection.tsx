import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, lazy, useMemo } from "react";

// Lazy load the World component for better performance
const World = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World }))
);

export const HeroSection = () => {
  const globeConfig = useMemo(
    () => ({
      pointSize: 4,
      globeColor: "#05101f",
      showAtmosphere: true,
      atmosphereColor: "#0d6cd7",
      atmosphereAltitude: 0.15,
      emissive: "#062056",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: "rgba(13, 108, 215, 0.4)",
      ambientLight: "#38bdf8",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 1500,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      initialPosition: { lat: -6.2088, lng: 106.8456 },
      autoRotate: true,
      autoRotateSpeed: 0.5,
    }),
    []
  );

  const colors = ["#0d6cd7", "#3b82f6", "#06b6d4"];

  const sampleArcs = useMemo(
    () => [
      // Jakarta connections
      {
        order: 1,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 1.3521,
        endLng: 103.8198,
        arcAlt: 0.1,
        color: colors[0],
      },
      {
        order: 1,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.3,
        color: colors[1],
      },
      {
        order: 2,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.4,
        color: colors[2],
      },
      {
        order: 2,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.2,
        color: colors[0],
      },
      // Singapore connections
      {
        order: 3,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.5,
        color: colors[1],
      },
      {
        order: 3,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: -33.8688,
        endLng: 151.2093,
        arcAlt: 0.2,
        color: colors[2],
      },
      // Tokyo connections
      {
        order: 4,
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 37.5665,
        endLng: 126.978,
        arcAlt: 0.1,
        color: colors[0],
      },
      {
        order: 4,
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.4,
        color: colors[1],
      },
      // London connections
      {
        order: 5,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 48.8566,
        endLng: 2.3522,
        arcAlt: 0.1,
        color: colors[2],
      },
      {
        order: 5,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 52.52,
        endLng: 13.405,
        arcAlt: 0.1,
        color: colors[0],
      },
      // NYC connections
      {
        order: 6,
        startLat: 40.7128,
        startLng: -74.006,
        endLat: 37.7749,
        endLng: -122.4194,
        arcAlt: 0.2,
        color: colors[1],
      },
      {
        order: 6,
        startLat: 40.7128,
        startLng: -74.006,
        endLat: -22.9068,
        endLng: -43.1729,
        arcAlt: 0.4,
        color: colors[2],
      },
      // Dubai connections
      {
        order: 7,
        startLat: 25.2048,
        startLng: 55.2708,
        endLat: 28.6139,
        endLng: 77.209,
        arcAlt: 0.2,
        color: colors[0],
      },
      {
        order: 7,
        startLat: 25.2048,
        startLng: 55.2708,
        endLat: -6.2088,
        endLng: 106.8456,
        arcAlt: 0.3,
        color: colors[1],
      },
      // Additional global connections
      {
        order: 8,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: 31.2304,
        endLng: 121.4737,
        arcAlt: 0.1,
        color: colors[2],
      },
      {
        order: 8,
        startLat: -33.8688,
        startLng: 151.2093,
        endLat: -6.2088,
        endLng: 106.8456,
        arcAlt: 0.2,
        color: colors[0],
      },
    ],
    []
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="home"
      className="group relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Pure dark background */}
      <div className="absolute inset-0 bg-background" />

      {/* Spotlight Effect - follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              hsl(212 89% 45% / 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Globe Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[100vw] h-[100vw] max-w-[500px] max-h-[500px] sm:max-w-[600px] sm:max-h-[600px] md:max-w-[800px] md:max-h-[800px] lg:max-w-[1000px] lg:max-h-[1000px] xl:max-w-[1100px] xl:max-h-[1100px]"
            style={{
              transform: "translateY(20%)",
            }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "radial-gradient(circle, hsl(212 89% 45% / 0.3) 0%, transparent 70%)",
                      filter: "blur(40px)",
                    }}
                  />
                </div>
              }
            >
              <World globeConfig={globeConfig} data={sampleArcs} />
            </Suspense>
          </motion.div>
        </div>

        {/* Gradient overlay to blend globe with content */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/60 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge - Covena style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Digital Solutions Provider
            </span>
          </motion.div>

          {/* Main Heading - Covena typography style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 tracking-tight text-foreground"
          >
            Transform your business with
            <br />
            <span className="text-foreground">smart </span>
            <span className="text-gradient">automation</span>
            <span className="text-foreground"> and</span>
            <br />
            <span className="text-foreground">modern digital solutions.</span>
          </motion.h1>

          {/* Subheadline - Covena style muted */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Dipercaya oleh UMKM, startup, dan perusahaan yang mengandalkan
            solusi digital modern untuk pertumbuhan bisnis.
          </motion.p>

          {/* Single CTA - Covena style with arrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 group rounded-full"
            >
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              <span>Book a consultation</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
