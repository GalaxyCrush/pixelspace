import { createCamera } from "../components/camera.js";
import { createScene } from "../components/scene.js";
import { createCube } from "../components/cube.js";

import { Resizer } from "./systems/Resizer.js";
import { createRenderer } from "./systems/renderer.js";

let camera, scene, renderer;

class World {
    constructor(container) {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        container.append(renderer.domElement);

        const cube = createCube();
        scene.add(cube);

        const resizer = new Resizer(camera, renderer, container);
    }

    render() {
        console.log("rendering");
        renderer.render(scene, camera);
    }
}

export { World }