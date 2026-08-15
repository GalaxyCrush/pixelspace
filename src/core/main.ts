import { World } from './World.js'
import { initNavigation } from '../ui/navigation.js'

function main(): void {
    const container = document.getElementById('scene-container');
    if (!container) throw new Error('scene-container not found');

    const world = new World(container);
    world.start();
    initNavigation(world);
}

main();