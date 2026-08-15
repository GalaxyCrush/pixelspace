import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  CanvasTexture,
  Group,
  LineSegments,
  LineBasicMaterial,
  AdditiveBlending,
} from "three";

function starField(
  count: number,
  radiusMin: number,
  radiusMax: number,
  color: number,
  size: number
): Points {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  const material = new PointsMaterial({
    color,
    size,
    transparent: true,
    opacity: 0.9,
    blending: AdditiveBlending,
    depthWrite: false,
  });

  return new Points(geometry, material);
}

function createGlowTexture(color: string): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  return new CanvasTexture(canvas);
}

function createStreaks(count = 5): LineSegments {
  const positions: number[] = [];

  for (let i = 0; i < count; i++) {
    const x = -14 + Math.random() * 28;
    const y = -8 + Math.random() * 16;
    const z = -16 + Math.random() * 6;
    const len = 1.5 + Math.random() * 2.5;
    const dx = 0.25 + Math.random() * 0.4;
    const dy = -0.15 - Math.random() * 0.35;
    positions.push(x, y, z, x + dx * len, y + dy * len, z);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  const material = new LineBasicMaterial({
    color: 0xbfd4ff,
    transparent: true,
    opacity: 0.3,
    blending: AdditiveBlending,
    depthWrite: false,
  });

  return new LineSegments(geometry, material);
}

function createParticles(): Group {
  const group = new Group();
  group.add(starField(1200, 10, 30, 0xcfd8ff, 0.05));
  group.add(starField(140, 10, 28, 0xffd9a0, 0.12));
  group.add(createStreaks());
  return group;
}

interface NebulaSpot {
  pos: [number, number, number];
  color: string;
  scale: number;
}

function createNebulas(): Group {
  const group = new Group();

  const spots: NebulaSpot[] = [
    { pos: [-14, 7, -10], color: "rgba(140,100,255,0.45)", scale: 18 },
    { pos: [13, -9, -12], color: "rgba(80,200,190,0.4)", scale: 16 },
    { pos: [-9, -13, -14], color: "rgba(255,130,60,0.3)", scale: 13 },
    { pos: [11, 11, -16], color: "rgba(255,90,160,0.25)", scale: 14 },
    { pos: [8, 5, -6], color: "rgba(255,205,135,0.6)", scale: 10 },
    { pos: [9, 6, -5], color: "rgba(255,240,210,0.9)", scale: 3 },
  ];

  spots.forEach((spot) => {
    const sprite = new Sprite(
      new SpriteMaterial({
        map: createGlowTexture(spot.color),
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    sprite.position.set(...spot.pos);
    sprite.scale.setScalar(spot.scale);
    group.add(sprite);
  });

  return group;
}

export { createParticles, createNebulas };