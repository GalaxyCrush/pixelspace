import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

function createCube(): Mesh {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();
    const cube = new Mesh(geometry, material);
    return cube;
}

export { createCube };