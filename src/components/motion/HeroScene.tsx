"use client";

import { useEffect, useRef } from "react";

/*
  The hero's 3D layer: a network of systems (nodes) with data packets
  travelling along their connections. It is the literal picture of what
  Fusionify Solutions builds: separate tools that talk to each other.

  Performance rules:
  - three.js is imported only after hydration, in its own chunk.
  - Skipped on Save-Data and very low-memory devices; lighter on phones.
  - Pauses when scrolled away or when the tab is hidden.
  - With prefers-reduced-motion it renders one still frame.
*/

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const nav = navigator as Nav;
    if (nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const lowEnd = (nav.deviceMemory !== undefined && nav.deviceMemory < 4) || navigator.hardwareConcurrency < 4;

    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: !lowEnd, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.75));
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xf6f8fb, 11, 24);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
      camera.position.set(0, 0, 15);

      const world = new THREE.Group();
      scene.add(world);

      // Nodes, laid out deterministically so every visit looks the same.
      const rand = rng(20221222);
      const count = small || lowEnd ? 26 : 44;
      const center = small ? new THREE.Vector3(0, -3.4, 0) : new THREE.Vector3(3.6, 0.4, 0);
      const spread = small ? new THREE.Vector3(5.2, 3, 3) : new THREE.Vector3(7.2, 4.6, 3.6);
      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      while (pts.length < count) {
        const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
        if (v.lengthSq() > 1) continue;
        v.multiply(spread).add(center);
        pts.push(v);
      }
      const hub = pts.map((_, i) => i % 7 === 0);

      const sphere = new THREE.SphereGeometry(1, 18, 14);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: true });
      const nodes = new THREE.InstancedMesh(sphere, nodeMat, count);
      const blue = new THREE.Color(0x0b63ce);
      const sky = new THREE.Color(0x7fb3ec);
      const baseScale = pts.map((_, i) => (hub[i] ? 0.17 : 0.06 + rand() * 0.05));
      pts.forEach((_, i) => nodes.setColorAt(i, hub[i] ? blue : sky.clone().lerp(blue, rand() * 0.35)));
      world.add(nodes);

      // Soft halo around hub nodes
      const haloTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const g = c.getContext("2d")!;
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, "rgba(11,99,206,0.55)");
        grd.addColorStop(0.4, "rgba(11,99,206,0.16)");
        grd.addColorStop(1, "rgba(11,99,206,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      })();
      const halos: InstanceType<typeof THREE.Sprite>[] = [];
      pts.forEach((p, i) => {
        if (!hub[i]) return;
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, depthWrite: false, transparent: true, fog: true }));
        s.position.copy(p);
        s.scale.setScalar(1.6);
        halos.push(s);
        world.add(s);
      });

      // Edges: each node links to its nearest neighbours
      const edges: [number, number][] = [];
      const seen = new Set<string>();
      pts.forEach((p, i) => {
        const near = pts
          .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
          .filter((x) => x.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, hub[i] ? 4 : 2);
        near.forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            edges.push([i, j]);
          }
        });
      });
      const linePos = new Float32Array(edges.length * 6);
      edges.forEach(([a, b], k) => {
        pts[a].toArray(linePos, k * 6);
        pts[b].toArray(linePos, k * 6 + 3);
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0x8fb6ea, transparent: true, opacity: 0, fog: true });
      world.add(new THREE.LineSegments(lineGeo, lineMat));

      // Adjacency for packets to keep travelling through the graph
      const adj: number[][] = pts.map(() => []);
      edges.forEach(([a, b]) => {
        adj[a].push(b);
        adj[b].push(a);
      });

      // Data packets
      const dotTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 32;
        const g = c.getContext("2d")!;
        const grd = g.createRadialGradient(16, 16, 0, 16, 16, 16);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.35, "rgba(90,160,232,1)");
        grd.addColorStop(1, "rgba(11,99,206,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
      })();
      const packetCount = small || lowEnd ? 10 : 22;
      const packets = Array.from({ length: packetCount }, () => {
        const from = Math.floor(rand() * count);
        const to = adj[from][Math.floor(rand() * adj[from].length)] ?? from;
        return { from, to, t: rand(), speed: 0.25 + rand() * 0.45 };
      });
      const packetPos = new Float32Array(packetCount * 3);
      const packetGeo = new THREE.BufferGeometry();
      packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
      const packetMat = new THREE.PointsMaterial({
        size: small ? 0.32 : 0.38,
        map: dotTex,
        transparent: true,
        depthWrite: false,
        sizeAttenuation: true,
        opacity: 0,
        fog: true,
      });
      world.add(new THREE.Points(packetGeo, packetMat));

      const m = new THREE.Matrix4();
      const tmp = new THREE.Vector3();
      const setNodes = (grow: number) => {
        pts.forEach((p, i) => {
          // staggered entrance: nodes nearer the centre appear first
          const delay = Math.min(1, p.distanceTo(center) / 8) * 0.6;
          const k = Math.max(0, Math.min(1, (grow - delay) / 0.4));
          const e = 1 - Math.pow(1 - k, 3);
          m.makeScale(baseScale[i] * e, baseScale[i] * e, baseScale[i] * e).setPosition(p);
          nodes.setMatrixAt(i, m);
        });
        nodes.instanceMatrix.needsUpdate = true;
      };

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      // Pointer and scroll state
      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0, scroll: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      let raf = 0;
      let last = performance.now();
      const born = last;

      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const age = (now - born) / 1000;
        const grow = reduced ? 2 : age;

        setNodes(grow);
        const fadeIn = Math.min(1, Math.max(0, (grow - 0.5) / 0.8));
        lineMat.opacity = 0.5 * fadeIn;
        packetMat.opacity = fadeIn;
        halos.forEach((h, i) => {
          const pulse = reduced ? 1 : 1 + Math.sin(age * 1.6 + i) * 0.12;
          h.scale.setScalar(1.6 * pulse * fadeIn);
        });

        // Packets travel edge to edge through the network
        packets.forEach((pk, i) => {
          if (!reduced) pk.t += pk.speed * dt;
          if (pk.t >= 1) {
            pk.t = 0;
            const next = adj[pk.to];
            const choice = next.filter((n) => n !== pk.from);
            pk.from = pk.to;
            pk.to = (choice.length ? choice : next)[Math.floor(Math.random() * (choice.length || next.length))] ?? pk.from;
          }
          tmp.copy(pts[pk.from]).lerp(pts[pk.to], pk.t);
          tmp.toArray(packetPos, i * 3);
        });
        packetGeo.attributes.position.needsUpdate = true;

        // Cursor parallax and scroll response
        const heroH = host.clientHeight || 1;
        const scrollTarget = Math.min(1, window.scrollY / heroH);
        cur.x += (target.x - cur.x) * 0.04;
        cur.y += (target.y - cur.y) * 0.04;
        cur.scroll += (scrollTarget - cur.scroll) * 0.08;
        const drift = reduced ? 0 : age * 0.035;
        world.rotation.y = drift + cur.x * 0.22 + cur.scroll * 0.6;
        world.rotation.x = cur.y * 0.12 + cur.scroll * 0.25;
        world.position.y = cur.scroll * 1.6;

        renderer.render(scene, camera);
        if (!reduced && visible) raf = requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible && !was && !reduced) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(host);
      const onVis = () => {
        const was = visible;
        visible = document.visibilityState === "visible";
        if (visible && !was && !reduced) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };
      document.addEventListener("visibilitychange", onVis);

      const ro = new ResizeObserver(() => {
        resize();
        if (reduced) frame(performance.now());
      });
      ro.observe(host);

      host.dataset.ready = "true";
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVis);
        sphere.dispose();
        nodeMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        packetGeo.dispose();
        packetMat.dispose();
        dotTex.dispose();
        haloTex.dispose();
        halos.forEach((h) => h.material.dispose());
        renderer.dispose();
        canvas.remove();
      };
    };

    // Start once the browser is idle so the first paint stays fast
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const useIdle = typeof w.requestIdleCallback === "function";
    const idle = useIdle ? w.requestIdleCallback!(() => void start(), { timeout: 1200 }) : window.setTimeout(() => void start(), 300);

    return () => {
      disposed = true;
      if (useIdle) w.cancelIdleCallback?.(idle);
      else clearTimeout(idle);
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="hero-scene" />;
}
