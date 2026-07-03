import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getQualityProfile } from "@/lib/device-quality";


interface NasaGlobeProps {
  className?: string;
}

// NASA-style photorealistic Earth using textures from three.js example CDN.
// Textures are loaded at runtime (no bundle impact).
const TEX_BASE = "https://threejs.org/examples/textures/planets";

export const NasaGlobe = ({ className }: NasaGlobeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const q = getQualityProfile();
    const prefersReduced = q.prefersReduced;


    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: q.tier !== "low",
      alpha: true,
      powerPreference: q.tier === "low" ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(q.dpr);

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = "grab";

    // Lights: sun on one side + soft rim on the other
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(5, 2, 3);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x3388ff, 0.35);
    rim.position.set(-5, -1, -2);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x0a1428, 0.35));

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const load = (path: string) =>
      new Promise<THREE.Texture>((resolve) => {
        loader.load(
          `${TEX_BASE}/${path}`,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 4;
            resolve(t);
          },
          undefined,
          () => resolve(new THREE.Texture())
        );
      });

    // Earth — geometry segments driven by device tier
    const earthGeom = new THREE.SphereGeometry(1, q.earthSegments, q.earthSegments);

    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: new THREE.Color(0x333344),
      shininess: 15,
    });
    const earth = new THREE.Mesh(earthGeom, earthMat);
    scene.add(earth);

    // Clouds
    const cloudMat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, q.cloudSegments, q.cloudSegments),
      cloudMat
    );
    scene.add(clouds);


    // Atmosphere glow (skipped on low-tier devices)
    let atmosphere: THREE.Mesh | null = null;
    let atmoMat: THREE.ShaderMaterial | null = null;
    if (q.atmosphere) {
      atmoMat = new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(0x2a7dd8) } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(glowColor, 1.0) * intensity;
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, Math.max(24, q.cloudSegments), Math.max(24, q.cloudSegments)),
        atmoMat
      );
      scene.add(atmosphere);
    }


    // Load textures async — resolution driven by device tier
    let disposed = false;
    const res = q.textureRes;
    (async () => {
      const surfaceTasks: Promise<THREE.Texture>[] = [
        load(`earth_atmos_${res}.jpg`),
        load(`earth_clouds_1024.png`),
      ];
      // Only load normal + specular on medium/high — big memory savings on low
      if (q.tier !== "low") {
        surfaceTasks.push(load(`earth_normal_${res}.jpg`));
        surfaceTasks.push(load(`earth_specular_${res}.jpg`));
      }
      const [dayMap, cloudMap, normalMap, specMap] = await Promise.all(surfaceTasks);
      if (disposed) return;
      earthMat.map = dayMap;
      if (normalMap) earthMat.normalMap = normalMap;
      if (specMap) earthMat.specularMap = specMap;
      earthMat.needsUpdate = true;
      cloudMat.map = cloudMap;
      cloudMat.alphaMap = cloudMap;
      cloudMat.needsUpdate = true;
      mount.style.opacity = "1";
    })();


    // Drag interaction
    let isPointerDown = false;
    let pointerX = 0;
    let rotationY = 0;
    let velocityY = 0.0018;
    const rotationX = 0.15;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      pointerX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      isPointerDown = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const delta = e.clientX - pointerX;
      pointerX = e.clientX;
      rotationY += delta * 0.005;
      velocityY = 0.0018;
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Animate — pause when hidden or offscreen, frame-skip on low-tier
    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? true;
        if (running) tick();
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const frameSkip = q.tier === "low" ? 2 : 1;
    let frame = 0;
    const tick = () => {
      if (!running) return;
      frame++;
      if (!isPointerDown && !prefersReduced) rotationY += velocityY * frameSkip;
      earth.rotation.y = rotationY;
      earth.rotation.x = rotationX;
      clouds.rotation.y = rotationY * 1.05;
      clouds.rotation.x = rotationX;
      if (atmosphere) atmosphere.rotation.copy(earth.rotation);
      if (frame % frameSkip === 0) renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();


    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      earthGeom.dispose();
      earthMat.dispose();
      cloudMat.dispose();
      atmoMat?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };

  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        opacity: 0,
        transition: "opacity 1s ease",
        contain: "layout paint size",
      }}
    />
  );
};

export default NasaGlobe;
