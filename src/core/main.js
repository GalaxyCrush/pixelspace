import { World } from './World.js'

function main() {
    const container = document.getElementById('scene-container');
    console.log(container);
    const world = new World(container);
    world.render();
}

main();