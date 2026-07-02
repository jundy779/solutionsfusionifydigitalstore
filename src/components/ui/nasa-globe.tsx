import { useEffect, useRef } from "react";
import * as THREE from "three";

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

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Earth
    const earthGeom = new THREE.SphereGeometry(1, 64, 64);
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
      new THREE.SphereGeometry(1.012, 48, 48),
      cloudMat
    );
    scene.add(clouds);

    // Atmosphere glow (backside sphere with Fresnel-like shader)
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x2a7dd8) },
      },
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
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 48, 48),
      atmoMat
    );
    scene.add(atmosphere);

    // Load textures async
    let disposed = false;
    (async () => {
      const [dayMap, normalMap, specMap, cloudMap] = await Promise.all([
        load("earth_atmos_2048.jpg"),
        load("earth_normal_2048.jpg"),
        load("earth_specular_2048.jpg"),
        load("earth_clouds_1024.png"),
      ]);
      if (disposed) return;
      earthMat.map = dayMap;
      earthMat.normalMap = normalMap;
      earthMat.specularMap = specMap;
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

    // Animate
    let raf = 0;
    const tick = () => {
      if (!isPointerDown && !prefersReduced) rotationY += velocityY;
      earth.rotation.y = rotationY;
      earth.rotation.x = rotationX;
      clouds.rotation.y = rotationY * 1.05;
      clouds.rotation.x = rotationX;
      atmosphere.rotation.copy(earth.rotation);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      earthGeom.dispose();
      earthMat.dispose();
      cloudMat.dispose();
      atmoMat.dispose();
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
