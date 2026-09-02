import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NETWORK_NODES, ROUTES, buildArc, latLngToVector3 } from "./network-data";
import type { QualityProfile } from "@/lib/device-quality";

/** Shared scroll progress (0..1), written by GSAP ScrollTrigger on the page. */
export const scrollState = { progress: 0, pointerX: 0, pointerY: 0 };

const BRAND = new THREE.Color("#0d6cd7");
const ACCENT = new THREE.Color("#4da3ff");

/* ---------------------------------------------------------------- globe */

function Globe({ quality }: { quality: QualityProfile }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const seg = quality.earthSegments;

  const nodePositions = useMemo(
    () => NETWORK_NODES.map((n) => latLngToVector3(n.lat, n.lng, 1.005)),
    [],
  );

  const arcs = useMemo(() => {
    return ROUTES.map(([i, j], idx) => {
      const { curve, points } = buildArc(nodePositions[i], nodePositions[j], quality.tier === "low" ? 32 : 64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { curve, geometry, offset: (idx * 0.137) % 1 };
    });
  }, [nodePositions, quality.tier]);

  const pulses = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Node markers as one instanced mesh
  const markers = useRef<THREE.InstancedMesh>(null);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = scrollState.progress;
    if (group.current) {
      // Continuous slow spin + scroll-driven rotation and tilt
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

    // Travelling pulses along arcs
    if (pulses.current) {
      const t = state.clock.elapsedTime;
      arcs.forEach((arc, i) => {
        const u = (t * 0.12 + arc.offset) % 1;
        const pos = arc.curve.getPoint(u);
        dummy.position.copy(pos);
        const s = 0.008 + Math.sin(u * Math.PI) * 0.009;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        pulses.current!.setMatrixAt(i, dummy.matrix);
      });
      pulses.current.instanceMatrix.needsUpdate = true;
    }

    if (markers.current) {
      const t = state.clock.elapsedTime;
      nodePositions.forEach((pos, i) => {
        const hub = NETWORK_NODES[i].hub;
        const base = hub ? 0.013 : 0.008;
        const s = base + Math.sin(t * 1.6 + i) * (hub ? 0.004 : 0.0015);
        dummy.position.copy(pos);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        markers.current!.setMatrixAt(i, dummy.matrix);
      });
      markers.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Solid core so arcs on the far side are occluded */}
      <mesh>
        <sphereGeometry args={[0.985, seg, seg / 2]} />
        <meshStandardMaterial color="#050a14" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Latitude/longitude mesh */}
      <mesh>
        <sphereGeometry args={[1, quality.tier === "low" ? 24 : 36, quality.tier === "low" ? 14 : 20]} />
        <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.16} />
      </mesh>

      {/* Atmosphere */}
      {quality.atmosphere && (
        <mesh scale={1.09}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.06}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Routes */}
      {arcs.map((arc, i) => (
        <primitive
          key={i}
          object={
            new THREE.Line(
              arc.geometry,
              new THREE.LineBasicMaterial({
                color: ACCENT,
                transparent: true,
                opacity: 0.38,
              }),
            )
          }
        />
      ))}

      <instancedMesh ref={pulses} args={[undefined, undefined, arcs.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#bcdcff" />
      </instancedMesh>

      <instancedMesh ref={markers} args={[undefined, undefined, NETWORK_NODES.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={ACCENT} />
      </instancedMesh>
    </group>
  );
}

/* --------------------------------------------------------------- field */

function StarField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (points.current) points.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={0.035} color="#8fb6e6" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* --------------------------------------------------------------- camera */

const CAM_STAGES: [number, number, number][] = [
  [0, 0.3, 4.6],
  [1.1, 0.5, 4.0],
  [-0.9, -0.3, 3.4],
  [0.3, 1.3, 4.2],
  [0, 0.2, 5.4],
];

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const f = p * (CAM_STAGES.length - 1);
    const i = Math.min(Math.floor(f), CAM_STAGES.length - 2);
    const t = f - i;
    const a = CAM_STAGES[i];
    const b = CAM_STAGES[i + 1];
    target.set(
      THREE.MathUtils.lerp(a[0], b[0], t) + scrollState.pointerX * 0.18,
      THREE.MathUtils.lerp(a[1], b[1], t) + scrollState.pointerY * 0.12,
      THREE.MathUtils.lerp(a[2], b[2], t),
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
