import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getQualityProfile } from "@/lib/device-quality";


/**
 * Cinematic galaxy background: layered starfield + slow drifting nebula +
 * distant colored planet sprites. Fixed behind all content, respects
 * prefers-reduced-motion, and pauses when tab is hidden.
 */
export const SpaceBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const q = getQualityProfile();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: q.tier === "low" ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(q.dpr);

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Starfield — two layers for parallax
    const makeStars = (count: number, radius: number, size: number, color: number) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // Distribute on a sphere shell
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = radius * (0.7 + Math.random() * 0.3);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(geo, mat);
    };

    const farStars = makeStars(q.stars[0], 800, 1.3, 0xbfd6ff);
    const midStars = makeStars(q.stars[1], 400, 1.8, 0xffffff);
    const nearStars = makeStars(q.stars[2], 200, 2.6, 0xdbeaff);

    scene.add(farStars, midStars, nearStars);

    // Nebula: large soft additive plane behind everything
    const nebulaCanvas = document.createElement("canvas");
    nebulaCanvas.width = 512;
    nebulaCanvas.height = 512;
    const nctx = nebulaCanvas.getContext("2d")!;
    const grd = nctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    grd.addColorStop(0, "rgba(80, 40, 180, 0.35)");
    grd.addColorStop(0.4, "rgba(20, 60, 180, 0.18)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0)");
    nctx.fillStyle = grd;
    nctx.fillRect(0, 0, 512, 512);
    const nebulaTex = new THREE.CanvasTexture(nebulaCanvas);

    const nebulas: THREE.Sprite[] = [];
    if (q.nebulas) {
      const nebulaConfigs = [
        { x: -300, y: 120, z: -600, s: 900, o: 0.6 },
        { x: 320, y: -180, z: -500, s: 700, o: 0.45 },
        { x: 60, y: 260, z: -700, s: 800, o: 0.5 },
      ];
      for (const cfg of nebulaConfigs) {
        const mat = new THREE.SpriteMaterial({
          map: nebulaTex,
          transparent: true,
          opacity: cfg.o,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const spr = new THREE.Sprite(mat);
        spr.position.set(cfg.x, cfg.y, cfg.z);
        spr.scale.set(cfg.s, cfg.s, 1);
        scene.add(spr);
        nebulas.push(spr);
      }
    }


    // Distant planets as sprites (procedural circles with color)
    const makePlanet = (color: string, glow: string) => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      g.addColorStop(0, color);
      g.addColorStop(0.55, color);
      g.addColorStop(0.75, glow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    };

    const planetConfigs = [
      { tex: makePlanet("#d97757", "rgba(217,119,87,0.25)"), x: -420, y: 180, z: -400, s: 55 },
      { tex: makePlanet("#7aa8ff", "rgba(122,168,255,0.25)"), x: 480, y: -220, z: -350, s: 40 },
      { tex: makePlanet("#c9a2ff", "rgba(201,162,255,0.25)"), x: 300, y: 320, z: -550, s: 70 },
    ];
    const planets: THREE.Sprite[] = [];
    for (const p of planetConfigs) {
      const mat = new THREE.SpriteMaterial({
        map: p.tex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(p.x, p.y, p.z);
      spr.scale.set(p.s, p.s, 1);
      scene.add(spr);
      planets.push(spr);
    }

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Animate
    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVis);

    const speed = prefersReduced ? 0 : 1;
    const tick = () => {
      if (!running) return;
      farStars.rotation.y += 0.00008 * speed;
      midStars.rotation.y += 0.00015 * speed;
      nearStars.rotation.y += 0.00025 * speed;
      farStars.rotation.x += 0.00004 * speed;
      midStars.rotation.x += 0.00007 * speed;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((obj) => {
        // @ts-expect-error - geometry/material may or may not exist
        obj.geometry?.dispose?.();
        // @ts-expect-error - material may be array or single
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose?.());
        else m?.dispose?.();
      });
      nebulaTex.dispose();
      planetConfigs.forEach((p) => p.tex.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ contain: "strict" }}
    />
  );
};

export default SpaceBackground;
