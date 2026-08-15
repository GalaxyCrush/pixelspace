import { WebGLRenderer } from "three";

function createRenderer(): WebGLRenderer {
    return new WebGLRenderer({ antialias: true });
}

export { createRenderer };