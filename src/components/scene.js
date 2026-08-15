import { Color, Scene } from "three";

function createScene() {
    const scene = new Scene();
    scene.background = new Color('#04050c');
    return scene;
}

export { createScene };