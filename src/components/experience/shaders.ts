/**
 * GLSL sources for the Fusionify WebGL experience.
 * Everything is hand-written so the look stays consistent with the brand
 * (deep navy base, #0d6cd7 primary, cool cyan-blue accents).
 */

/* ------------------------------------------------------------ atmosphere */
/** Fresnel rim glow rendered on the inside of a slightly larger sphere. */
export const atmosphereVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const atmosphereFrag = /* glsl */ `
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uPower;
  uniform float uIntensity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vViewDir)));
    float rim = pow(1.0 - facing, uPower);
    float breathe = 0.88 + 0.12 * sin(uTime * 0.6);
    vec3 col = mix(uColorOuter, uColorInner, rim);
    gl_FragColor = vec4(col, rim * uIntensity * breathe);
  }
`;

/* ----------------------------------------------------------- globe shell */
/** Holographic latitude/longitude shell with a scanline sweep + rim light. */
export const shellVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const shellFrag = /* glsl */ `
  uniform vec3 uGrid;
  uniform vec3 uRim;
  uniform float uTime;
  uniform float uScroll;
  uniform float uLat;
  uniform float uLon;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float line(float coord, float count, float width) {
    float f = fract(coord * count);
    float d = min(f, 1.0 - f);
    return 1.0 - smoothstep(0.0, width, d);
  }

  void main() {
    float grid = max(line(vUv.y, uLat, 0.02), line(vUv.x, uLon, 0.012));

    // slow vertical scan sweep, tightened as the story progresses
    float sweep = smoothstep(0.0, 0.06, abs(fract(vUv.y - uTime * 0.05) - 0.5) * -1.0 + 0.5);
    sweep = pow(sweep, 6.0);

    float facing = abs(dot(normalize(vNormal), normalize(vViewDir)));
    float rim = pow(1.0 - facing, 2.4);

    float alpha = grid * (0.16 + 0.20 * uScroll) + sweep * 0.10 + rim * 0.34;
    vec3 col = mix(uGrid, uRim, rim * 0.8 + sweep * 0.3);
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

/* ----------------------------------------------------------- route lines */
/** Additive flowing dashes travelling along each great-circle route. */
export const routeVert = /* glsl */ `
  attribute float aProgress;
  attribute float aSeed;
  varying float vProgress;
  varying float vSeed;

  void main() {
    vProgress = aProgress;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const routeFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uRepeat;
  uniform float uBase;

  varying float vProgress;
  varying float vSeed;

  void main() {
    float flow = fract(vProgress * uRepeat - uTime * uSpeed + vSeed);
    float head = pow(flow, 5.0);
    float ends = sin(vProgress * 3.14159);
    float alpha = (uBase + head * 0.9) * ends;
    vec3 col = mix(uColor, uHot, head);
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ---------------------------------------------------------------- points */
/** Soft round sprites used for hubs, travelling packets and stars. */
export const pointVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uScale;
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.7 + aPhase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale * vTwinkle / max(-mv.z, 0.001);
    gl_Position = projectionMatrix * mv;
  }
`;

export const pointFrag = /* glsl */ `
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float glow = pow(core, 3.0);
    gl_FragColor = vec4(vColor, glow * vTwinkle);
  }
`;
