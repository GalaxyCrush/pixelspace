import { Clock, Group, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { createCamera } from "../components/camera.js";
import { createScene } from "../components/scene.js";
import { createPlanet } from "../components/geometry.js";
import { addLights } from "../components/lights.js";
import { createParticles, createNebulas } from "../components/particles.js";
import { Comets } from "../components/comets.js";

import { Resizer } from "./systems/Resizer.js";
import { createRenderer } from "./systems/renderer.js";

import { SECTIONS } from "../data/siteData.js";

const TRANSITION_DURATION = 0.7;
const PLANET_X = 2.0;

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface TransitionState {
  outgoing: Group;
  incoming: Group;
  t: number;
}

class World {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  resizer: Resizer;
  particles: Group;
  nebulas: Group;
  comets: Comets;
  activeShape: Group | null = null;
  transition: TransitionState | null = null;
  section: string | null = null;
  clock = new Clock();
  pointer = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.scene = createScene();
    this.camera = createCamera();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    this.resizer = new Resizer(this.camera, this.renderer, container);

    addLights(this.scene);

    this.particles = createParticles();
    this.scene.add(this.particles);

    this.nebulas = createNebulas();
    this.scene.add(this.nebulas);

    this.comets = new Comets(5, this.camera, this.renderer);
    this.scene.add(this.comets.group);

    window.addEventListener("mousemove", (e: MouseEvent) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    this.setSection(SECTIONS[0].id, { instant: true });
  }

  setSection(id: string, { instant = false }: { instant?: boolean } = {}): void {
    const config = SECTIONS.find((s) => s.id === id);
    if (!config || this.section === id) return;
    this.section = id;

    let instantMode = instant;
    if (this.transition) {
      this.disposeShape(this.transition.outgoing);
      this.disposeShape(this.transition.incoming);
      this.transition = null;
      instantMode = true;
    }

    const incoming = createPlanet(config);
    incoming.position.x = PLANET_X;
    incoming.scale.setScalar(instantMode ? 1 : 0.01);
    this.scene.add(incoming);

    if (instantMode) {
      if (this.activeShape) this.disposeShape(this.activeShape);
      this.activeShape = incoming;
    } else if (this.activeShape) {
      this.transition = { outgoing: this.activeShape, incoming, t: 0 };
    } else {
      this.activeShape = incoming;
    }
  }

  disposeShape(group: Group): void {
    this.scene.remove(group);
    group.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((m) => m.dispose());
      }
    });
  }

  update(delta: number, elapsed: number): void {
    this.particles.rotation.y += delta * 0.005;
    this.nebulas.rotation.y += delta * 0.003;
    this.comets.update(delta);

    this.camera.position.x += (this.pointer.x * 0.55 - this.camera.position.x) * 0.045;
    this.camera.position.y += (-this.pointer.y * 0.35 - this.camera.position.y) * 0.045;
    this.camera.lookAt(0, 0, 0);

    if (this.transition) {
      this.transition.t += delta / TRANSITION_DURATION;
      const t = Math.min(this.transition.t, 1);
      const e = easeInOutCubic(t);

      this.transition.outgoing.scale.setScalar(1 - e);
      this.transition.incoming.scale.setScalar(Math.max(e, 0.01));

      if (t >= 1) {
        this.disposeShape(this.transition.outgoing);
        this.activeShape = this.transition.incoming;
        this.transition = null;
      }
    }

    if (this.activeShape) {
      this.activeShape.rotation.y += delta * 0.25;
      this.activeShape.rotation.x += delta * 0.04;
      this.activeShape.position.y = Math.sin(elapsed * 0.5) * 0.08;

      const orbiters = this.activeShape.userData.orbiters as Group[] | undefined;
      if (orbiters) {
        orbiters.forEach((orbit, i) => {
          orbit.rotation.y += delta * (0.35 + i * 0.2);
        });
      }
    }
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      const delta = Math.min(this.clock.getDelta(), 0.05);
      this.update(delta, this.clock.elapsedTime);
      this.renderer.render(this.scene, this.camera);
    });
  }
}

export { World };