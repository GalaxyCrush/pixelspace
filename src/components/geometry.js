import {
  IcosahedronGeometry,
  RingGeometry,
  Mesh,
  Group,
  MeshStandardMaterial,
  MeshBasicMaterial,
  DoubleSide,
  BackSide,
  AdditiveBlending,
  CanvasTexture,
  Vector3,
  Color,
  Float32BufferAttribute,
} from "three";

function rgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function createRingTexture(color) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.3, "rgba(0,0,0,0)");
  grad.addColorStop(0.36, rgba(color, 0.85));
  grad.addColorStop(0.6, rgba(color, 0.85));
  grad.addColorStop(0.66, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 256;
    const w = 1 + Math.random() * 4;
    const y = Math.random() * 256;
    const h = 3 + Math.random() * 22;
    ctx.fillStyle = rgba(color, 0.03 + Math.random() * 0.06);
    ctx.fillRect(x, y, w, h);
  }

  return new CanvasTexture(canvas);
}

function pseudoNoise(x, y, z) {
  return (
    Math.sin(x * 2.3) * Math.cos(y * 1.7) * Math.sin(z * 2.1) +
    Math.sin(x * 4.7 + y * 3.1) * Math.cos(z * 3.7) * 0.5 +
    Math.sin((x + y + z) * 1.9) * 0.5
  );
}

function smoothstep(t, a, b) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

function lighten(color, amount) {
  return color.clone().lerp(new Color(0xffffff), amount);
}

function createMoon(color, orbitRadius) {
  const orbit = new Group();
  orbit.rotation.y = Math.random() * Math.PI * 2;

  const moon = new Mesh(
    new IcosahedronGeometry(0.16, 2),
    new MeshStandardMaterial({
      color: lighten(color, 0.25),
      roughness: 0.9,
      flatShading: true,
    })
  );
  moon.position.set(orbitRadius, 0, 0);
  orbit.add(moon);

  return orbit;
}

function createPlanet(config) {
  const group = new Group();
  const size = config.size ?? 1.0;

  const geometry = new IcosahedronGeometry(size, 5);
  const positions = geometry.attributes.position;
  const base = new Color(config.color);
  const land = lighten(base, 0.35);
  const colors = [];
  const v = new Vector3();

  for (let i = 0; i < positions.count; i++) {
    v.fromBufferAttribute(positions, i);
    const n = pseudoNoise(v.x, v.y, v.z);
    v.multiplyScalar(1 + n * 0.14);
    positions.setXYZ(i, v.x, v.y, v.z);
    const t = smoothstep(n, 0.05, 0.4);
    const c = base.clone().lerp(land, t);
    colors.push(c.r, c.g, c.b);
  }
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const planet = new Mesh(
    geometry,
    new MeshStandardMaterial({
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
      vertexColors: true,
      emissive: config.color,
      emissiveIntensity: 0.08,
    })
  );
  group.add(planet);

  const atmosphere = new Mesh(
    new IcosahedronGeometry(size * 1.12, 4),
    new MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.14,
      blending: AdditiveBlending,
      side: BackSide,
      depthWrite: false,
    })
  );
  group.add(atmosphere);

  const orbiters = [];

  if (config.ring) {
    const ring = new Mesh(
      new RingGeometry(size * 1.5, size * 2.15, 96),
      new MeshBasicMaterial({
        map: createRingTexture(config.color),
        transparent: true,
        side: DoubleSide,
        depthWrite: false,
      })
    );
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = 0.4;
    group.add(ring);

    const outerRing = new Mesh(
      new RingGeometry(size * 2.3, size * 2.42, 96),
      new MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.12,
        side: DoubleSide,
        depthWrite: false,
      })
    );
    outerRing.rotation.x = Math.PI / 2;
    outerRing.rotation.z = 0.35;
    group.add(outerRing);

    orbiters.push(createMoon(base, size * 2.75));
  } else {
    orbiters.push(createMoon(base, size * 1.75));
    orbiters.push(createMoon(base, size * 2.2));
  }

  for (let i = 0; i < 3; i++) {
    const rock = new Mesh(
      new IcosahedronGeometry(0.05 + Math.random() * 0.05, 1),
      new MeshStandardMaterial({
        color: lighten(base, 0.15),
        roughness: 1,
        flatShading: true,
      })
    );
    const angle = Math.random() * Math.PI * 2;
    const radius = size * (1.5 + Math.random() * 0.9);
    rock.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 0.5,
      Math.sin(angle) * radius
    );
    group.add(rock);
  }

  group.rotation.z = 0.35;
  group.userData.orbiters = orbiters;
  return group;
}

export { createPlanet };