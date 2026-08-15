import { AmbientLight, PointLight } from "three";

function addLights(scene) {
  const ambient = new AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  const key = new PointLight(0xffffff, 30, 0, 1.6);
  key.position.set(4, 4, 6);
  scene.add(key);

  const rim = new PointLight(0x8899ff, 18, 0, 1.8);
  rim.position.set(-5, -2, 3);
  scene.add(rim);
}

export { addLights };