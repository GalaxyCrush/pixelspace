import { PerspectiveCamera, WebGLRenderer } from "three";

class Resizer {
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private container: HTMLElement;

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer, container: HTMLElement) {
        this.camera = camera;
        this.renderer = renderer;
        this.container = container;

        this.setSize();
        window.addEventListener("resize", () => this.setSize());
    }

    setSize(): void {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}

export { Resizer };