import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  CanvasTexture,
  Group,
  AdditiveBlending,
  Vector3,
  Vector2,
  Color,
  type PerspectiveCamera,
  type WebGLRenderer,
} from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

const COMET_COLORS = ["#bfe3ff", "#ffd9a0", "#cfe0ff", "#ffe9c9"];
const TRAIL_SEGMENTS = 64;

function makeGlowTexture(color: string): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  return new CanvasTexture(canvas);
}

class Comet {
  segments: number;
  head = new Vector3();
  velocity = new Vector3();
  group = new Group();
  positions: Float32Array;
  colors: Float32Array;
  lineGeometry: LineGeometry;
  lineMaterial: LineMaterial;
  dustGeometry: BufferGeometry;
  headSprite: Sprite;
  coreSprite: Sprite;

  constructor(color: string, segments: number, renderer: WebGLRenderer) {
    this.segments = segments;

    this.positions = new Float32Array(segments * 3);
    this.colors = new Float32Array(segments * 3);

    const base = new Color(color);
    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      const c = base.clone().lerp(new Color(0x000000), Math.pow(t, 0.85));
      this.colors[i * 3] = c.r;
      this.colors[i * 3 + 1] = c.g;
      this.colors[i * 3 + 2] = c.b;
    }

    this.lineGeometry = new LineGeometry();
    this.lineGeometry.setPositions(this.positions);
    this.lineGeometry.setColors(this.colors);

    this.lineMaterial = new LineMaterial({
      vertexColors: true,
      linewidth: 2,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      resolution: new Vector2(
        renderer.domElement.clientWidth,
        renderer.domElement.clientHeight
      ),
    });

    this.group.add(new Line2(this.lineGeometry, this.lineMaterial));

    this.dustGeometry = new BufferGeometry();
    this.dustGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(this.positions, 3)
    );
    this.dustGeometry.setAttribute("color", new Float32BufferAttribute(this.colors, 3));

    this.group.add(
      new Points(
        this.dustGeometry,
        new PointsMaterial({
          size: 0.09,
          vertexColors: true,
          blending: AdditiveBlending,
          transparent: true,
          depthWrite: false,
        })
      )
    );

    this.headSprite = new Sprite(
      new SpriteMaterial({
        map: makeGlowTexture(color),
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    this.headSprite.scale.setScalar(0.7);
    this.group.add(this.headSprite);

    this.coreSprite = new Sprite(
      new SpriteMaterial({
        map: makeGlowTexture("#ffffff"),
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    this.coreSprite.scale.setScalar(0.3);
    this.group.add(this.coreSprite);

    window.addEventListener("resize", () => {
      this.lineMaterial.resolution.set(
        renderer.domElement.clientWidth,
        renderer.domElement.clientHeight
      );
    });
  }

  placeTrailAt(head: Vector3): void {
    for (let i = 0; i < this.segments; i++) {
      this.positions[i * 3] = head.x;
      this.positions[i * 3 + 1] = head.y;
      this.positions[i * 3 + 2] = head.z;
    }
    this.lineGeometry.setPositions(this.positions);
    this.headSprite.position.copy(head);
    this.coreSprite.position.copy(head);
  }

  update(delta: number): void {
    this.head.addScaledVector(this.velocity, delta);

    const pos = this.positions;
    for (let i = this.segments - 1; i > 0; i--) {
      pos[i * 3] = pos[(i - 1) * 3];
      pos[i * 3 + 1] = pos[(i - 1) * 3 + 1];
      pos[i * 3 + 2] = pos[(i - 1) * 3 + 2];
    }
    pos[0] = this.head.x;
    pos[1] = this.head.y;
    pos[2] = this.head.z;

    this.lineGeometry.setPositions(this.positions);
    this.dustGeometry.attributes.position.needsUpdate = true;
    this.headSprite.position.copy(this.head);
    this.coreSprite.position.copy(this.head);
  }
}

class Comets {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  group = new Group();
  comets: Comet[] = [];

  constructor(count = 4, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.camera = camera;
    this.renderer = renderer;

    for (let i = 0; i < count; i++) {
      const comet = new Comet(
        COMET_COLORS[i % COMET_COLORS.length],
        TRAIL_SEGMENTS,
        renderer
      );
      this.group.add(comet.group);
      this.comets.push(comet);
      this.reset(comet);
    }
  }

  boundsFor(comet: Comet): { halfW: number; halfH: number } {
    const fov = (this.camera.fov * Math.PI) / 180;
    const dist = this.camera.position.z - comet.head.z;
    const halfHeight = dist * Math.tan(fov / 2);
    const aspect =
      this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
    return { halfW: halfHeight * aspect, halfH: halfHeight };
  }

  reset(comet: Comet): void {
    comet.head.z = -6 + Math.random() * 4;
    const { halfW, halfH } = this.boundsFor(comet);
    const margin = 1.5;
    const side = Math.floor(Math.random() * 4);
    const vx = (0.8 + Math.random() * 1.4) * (Math.random() < 0.5 ? -1 : 1);
    const vy = -1.2 + Math.random() * 2.4;

    switch (side) {
      case 0:
        comet.head.set(-halfW - margin, -halfH + Math.random() * halfH * 2, comet.head.z);
        break;
      case 1:
        comet.head.set(halfW + margin, -halfH + Math.random() * halfH * 2, comet.head.z);
        break;
      case 2:
        comet.head.set(-halfW + Math.random() * halfW * 2, halfH + margin, comet.head.z);
        break;
      default:
        comet.head.set(-halfW + Math.random() * halfW * 2, -halfH - margin, comet.head.z);
        break;
    }

    comet.velocity.set(vx, vy, 0);
    comet.placeTrailAt(comet.head);
  }

  update(delta: number): void {
    this.comets.forEach((comet) => {
      comet.update(delta);
      const { halfW, halfH } = this.boundsFor(comet);
      const p = comet.head;
      if (p.x > halfW + 3 || p.x < -halfW - 3 || p.y > halfH + 3 || p.y < -halfH - 3) {
        this.reset(comet);
      }
    });
  }
}

export { Comets };