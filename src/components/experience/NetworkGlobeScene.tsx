import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NETWORK_NODES, ROUTES, buildArc, latLngToVector3 } from "./network-data";
import {
  atmosphereFrag,
  atmosphereVert,
  pointFrag,
  pointVert,
  routeFrag,
  routeVert,
  shellFrag,
  shellVert,
} from "./shaders";
import type { QualityProfile } from "@/lib/device-quality";

/** Shared scroll/pointer state, written by GSAP ScrollTrigger on the page. */
export const scrollState = { progress: 0, pointerX: 0, pointerY: 0, energy: 0 };

const BRAND = new THREE.Color("#0d6cd7");
const ACCENT = new THREE.Color("#4da3ff");
const HOT = new THREE.Color("#cfe6ff");

/* ---------------------------------------------------------------- globe */

function Globe({ quality }: { quality: QualityProfile }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const seg = quality.earthSegments;
  const low = quality.tier === "low";

  const nodePositions = useMemo(
    () => NETWORK_NODES.map((n) => latLngToVector3(n.lat, n.lng, 1.005)),
    [],
  );

  /* ---- route lines merged into a single additive LineSegments draw call */
  const arcs = useMemo(
    () =>
      ROUTES.map(([i, j], idx) => {
        const { curve } = buildArc(nodePositions[i], nodePositions[j], low ? 28 : 56);
        return { curve, seed: (idx * 0.137) % 1 };
      }),
    [nodePositions, low],
  );

  const routeGeometry = useMemo(() => {
    const segments = low ? 28 : 56;
    const pos: number[] = [];
    const prog: number[] = [];
    const seed: number[] = [];
    arcs.forEach((arc) => {
      const pts = arc.curve.getPoints(segments);
      for (let s = 0; s < pts.length - 1; s++) {
        const a = pts[s];
        const b = pts[s + 1];
        pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
        prog.push(s / segments, (s + 1) / segments);
        seed.push(arc.seed, arc.seed);
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aProgress", new THREE.Float32BufferAttribute(prog, 1));
    g.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
    return g;
  }, [arcs, low]);

  const routeUniforms = useMemo(
    () => ({
      uColor: { value: BRAND.clone() },
      uHot: { value: HOT.clone() },
      uTime: { value: 0 },
      uSpeed: { value: 0.16 },
      uRepeat: { value: 1.0 },
      uBase: { value: 0.18 },
    }),
    [],
  );

  /* ---- hub markers (static positions, shader twinkle) */
  const hubGeometry = useMemo(() => {
    const pos: number[] = [];
    const size: number[] = [];
    const phase: number[] = [];
    const color: number[] = [];
    nodePositions.forEach((p, i) => {
      const hub = NETWORK_NODES[i].hub;
      pos.push(p.x, p.y, p.z);
      size.push(hub ? 26 : 14);
      phase.push(i * 1.31);
      const c = hub ? HOT : ACCENT;
      color.push(c.r, c.g, c.b);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));
    g.setAttribute("aColor", new THREE.Float32BufferAttribute(color, 3));
    return g;
  }, [nodePositions]);

  const hubUniforms = useMemo(() => ({ uTime: { value: 0 }, uScale: { value: 1.7 } }), []);

  /* ---- travelling packets (positions updated each frame) */
  const packetCount = arcs.length * (low ? 1 : 2);
  const packetGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(packetCount * 3), 3));
    const size = new Float32Array(packetCount).fill(22);
    const phase = new Float32Array(packetCount);
    const color = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      phase[i] = i * 0.7;
      color[i * 3] = HOT.r;
      color[i * 3 + 1] = HOT.g;
      color[i * 3 + 2] = HOT.b;
    }
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return g;
  }, [packetCount]);

  const packetUniforms = useMemo(() => ({ uTime: { value: 0 }, uScale: { value: 1.5 } }), []);

  const shellUniforms = useMemo(
    () => ({
      uGrid: { value: BRAND.clone() },
      uRim: { value: ACCENT.clone() },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uLat: { value: low ? 14 : 22 },
      uLon: { value: low ? 26 : 44 },
    }),
    [low],
  );

  const atmoUniforms = useMemo(
    () => ({
      uColorInner: { value: ACCENT.clone() },
      uColorOuter: { value: BRAND.clone() },
      uPower: { value: 2.6 },
      uIntensity: { value: 0.55 },
      uTime: { value: 0 },
    }),
    [],
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;

    if (group.current) {
      spin.current += delta * 0.06;
      group.current.rotation.y = spin.current + p * Math.PI * 1.4;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -0.18 + Math.sin(p * Math.PI) * 0.42 + scrollState.pointerY * 0.12,
        4,
        delta,
      );
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        scrollState.pointerX * 0.08,
        4,
        delta,
      );
    }

    shellUniforms.uTime.value = t;
    shellUniforms.uScroll.value = p;
    atmoUniforms.uTime.value = t;
    hubUniforms.uTime.value = t;
    packetUniforms.uTime.value = t;

    // routes speed up as the story escalates
    routeUniforms.uTime.value = t;
    routeUniforms.uSpeed.value = 0.14 + p * 0.42 + scrollState.energy * 0.3;
    routeUniforms.uBase.value = 0.14 + p * 0.16;

    const arr = packetGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < packetCount; i++) {
      const arc = arcs[i % arcs.length];
      const lane = Math.floor(i / arcs.length) * 0.5;
      const u = (t * (0.09 + p * 0.14) + arc.seed + lane) % 1;
      tmp.copy(arc.curve.getPoint(u));
      arr[i * 3] = tmp.x;
      arr[i * 3 + 1] = tmp.y;
      arr[i * 3 + 2] = tmp.z;
    }
    packetGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      {/* Solid core so far-side arcs are occluded */}
      <mesh>
        <sphereGeometry args={[0.985, seg, seg / 2]} />
        <meshStandardMaterial color="#050a14" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Holographic shell (GLSL grid + scan sweep + rim) */}
      <mesh>
        <sphereGeometry args={[1.0, low ? 40 : 64, low ? 24 : 40]} />
        <shaderMaterial
          vertexShader={shellVert}
          fragmentShader={shellFrag}
          uniforms={shellUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Fresnel atmosphere */}
      {quality.atmosphere && (
        <mesh scale={1.12}>
          <sphereGeometry args={[1, 48, 32]} />
          <shaderMaterial
            vertexShader={atmosphereVert}
            fragmentShader={atmosphereFrag}
            uniforms={atmoUniforms}
            transparent
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Routes */}
      <lineSegments geometry={routeGeometry}>
        <shaderMaterial
          vertexShader={routeVert}
          fragmentShader={routeFrag}
          uniforms={routeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Hubs */}
      <points geometry={hubGeometry}>
        <shaderMaterial
          vertexShader={pointVert}
          fragmentShader={pointFrag}
          uniforms={hubUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Packets in transit */}
      <points geometry={packetGeometry}>
        <shaderMaterial
          vertexShader={pointVert}
          fragmentShader={pointFrag}
          uniforms={packetUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* --------------------------------------------------------------- field */

function StarField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uScale: { value: 1.1 } }), []);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const cool = new THREE.Color("#8fb6e6");
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      size[i] = 6 + Math.random() * 14;
      phase[i] = Math.random() * Math.PI * 2;
      const c = Math.random() > 0.86 ? ACCENT : cool;
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return g;
  }, [count]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    uniforms.uTime.value = state.clock.elapsedTime;
    if (points.current) points.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        vertexShader={pointVert}
        fragmentShader={pointFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------------------------------------------- camera */

const CAM_STAGES: [number, number, number][] = [
  [0, 0.3, 4.6],
  [1.15, 0.45, 3.9],
  [-0.95, -0.35, 3.3],
  [0.35, 1.25, 4.1],
  [-1.2, 0.15, 3.0],
  [0, 0.2, 5.6],
];

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const f = p * (CAM_STAGES.length - 1);
    const i = Math.min(Math.floor(f), CAM_STAGES.length - 2);
    const k = f - i;
    const e = k * k * (3 - 2 * k); // smoothstep between stages
    const a = CAM_STAGES[i];
    const b = CAM_STAGES[i + 1];
    target.set(
      THREE.MathUtils.lerp(a[0], b[0], e) + scrollState.pointerX * 0.18 + Math.sin(t * 0.23) * 0.07,
      THREE.MathUtils.lerp(a[1], b[1], e) + scrollState.pointerY * 0.12 + Math.cos(t * 0.19) * 0.05,
      THREE.MathUtils.lerp(a[2], b[2], e),
    );
    camera.position.lerp(target, 1 - Math.exp(-3.2 * delta));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------------------------------------------------------------- root */

export const NetworkGlobeScene = ({ quality }: { quality: QualityProfile }) => {
  const stars = quality.stars[0] + quality.stars[1];

  return (
    <Canvas
      dpr={quality.dpr}
      camera={{ position: [0, 0.3, 4.6], fov: 42 }}
      gl={{ antialias: quality.tier !== "low", powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#03060d"]} />
      <fog attach="fog" args={["#03060d", 6, 26]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.1} color="#cfe4ff" />
      <directionalLight position={[-5, -2, -4]} intensity={0.35} color={ACCENT} />
      <StarField count={stars} />
      <Globe quality={quality} />
      <CameraRig />
    </Canvas>
  );
};

export default NetworkGlobeScene;
