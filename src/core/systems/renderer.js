import { WebGLRenderer } from "three";

function createRenderer(container) {
    return new WebGLRenderer();
}

export { createRenderer };