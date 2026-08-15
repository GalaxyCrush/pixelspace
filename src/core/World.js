import { Clock } from "three";

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

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

class World {
  constructor(container) {
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

    this.activeShape = null;
    this.transition = null;
    this.section = null;
    this.clock = new Clock();

    this.setSection(SECTIONS[0].id, { instant: true });
  }

  setSection(id, { instant = false } = {}) {
    const config = SECTIONS.find((s) => s.id === id);
    if (!config || this.section === id) return;
    this.section = id;

    if (this.transition) {
      this.disposeShape(this.transition.outgoing);
      this.transition = null;
    }

    const incoming = createPlanet(config);
    incoming.position.x = PLANET_X;
    incoming.scale.setScalar(instant ? 1 : 0.01);
    this.scene.add(incoming);

    if (instant) {
      if (this.activeShape) this.disposeShape(this.activeShape);
      this.activeShape = incoming;
    } else if (this.activeShape) {
      this.transition = { outgoing: this.activeShape, incoming, t: 0 };
    } else {
      this.activeShape = incoming;
    }
  }

  disposeShape(group) {
    this.scene.remove(group);
    group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((m) => m.dispose());
      }
    });
  }

  update(delta, elapsed) {
    this.particles.rotation.y += delta * 0.005;
    this.nebulas.rotation.y += delta * 0.003;
    this.comets.update(delta);

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

      const orbiters = this.activeShape.userData.orbiters;
      if (orbiters) {
        orbiters.forEach((orbit, i) => {
          orbit.rotation.y += delta * (0.35 + i * 0.2);
        });
      }
    }
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      const delta = Math.min(this.clock.getDelta(), 0.05);
      this.update(delta, this.clock.elapsedTime);
      this.renderer.render(this.scene, this.camera);
    });
  }
}

export { World };