import * as THREE from "three";

export interface NetworkNode {
  name: string;
  lat: number;
  lng: number;
  hub?: boolean;
}

/** Global logistics hubs — used for node markers and arc endpoints. */
export const NETWORK_NODES: NetworkNode[] = [
  { name: "Jakarta", lat: -6.2, lng: 106.85, hub: true },
  { name: "Surabaya", lat: -7.25, lng: 112.75 },
  { name: "Medan", lat: 3.6, lng: 98.67 },
  { name: "Singapore", lat: 1.35, lng: 103.82, hub: true },
  { name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Tokyo", lat: 35.68, lng: 139.69, hub: true },
  { name: "Seoul", lat: 37.57, lng: 126.98 },
  { name: "Sydney", lat: -33.87, lng: 151.21, hub: true },
  { name: "Mumbai", lat: 19.08, lng: 72.88 },
  { name: "Dubai", lat: 25.2, lng: 55.27, hub: true },
  { name: "Istanbul", lat: 41.01, lng: 28.98 },
  { name: "Frankfurt", lat: 50.11, lng: 8.68, hub: true },
  { name: "London", lat: 51.51, lng: -0.13, hub: true },
  { name: "Rotterdam", lat: 51.92, lng: 4.48 },
  { name: "New York", lat: 40.71, lng: -74.01, hub: true },
  { name: "Los Angeles", lat: 34.05, lng: -118.24, hub: true },
  { name: "Panama", lat: 8.98, lng: -79.52 },
  { name: "Sao Paulo", lat: -23.55, lng: -46.63, hub: true },
  { name: "Lagos", lat: 6.52, lng: 3.38 },
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "Cape Town", lat: -33.92, lng: 18.42 },
];

/** Arc route pairs referenced by node index. */
export const ROUTES: [number, number][] = [
  [0, 3], [0, 5], [0, 7], [0, 9], [3, 4], [4, 5], [5, 15],
  [9, 11], [9, 8], [11, 12], [12, 14], [14, 16], [16, 17],
  [12, 18], [18, 20], [9, 19], [15, 7], [1, 3], [2, 3],
  [13, 12], [6, 5], [14, 12], [17, 15],
];

export function latLngToVector3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Great-circle-ish arc lifted off the surface, height scaled by distance. */
export function buildArc(a: THREE.Vector3, b: THREE.Vector3, segments = 64) {
  const dist = a.distanceTo(b);
  const lift = 1 + Math.min(dist * 0.45, 0.7);
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(lift);
  const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
  return { curve, points: curve.getPoints(segments) };
}
