import { World } from './World.js'
import { initNavigation } from '../ui/navigation.js'

function main() {
    const container = document.getElementById('scene-container');
    const world = new World(container);
    world.start();
    initNavigation(world);
}

main();