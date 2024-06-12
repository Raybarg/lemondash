import { game } from './src/game.js';

var lemondash = new game();

new p5(function(p5) {
    
    p5.preload = function() {
        lemondash.preload(p5);
    }

    p5.setup = function() {
        p5.createCanvas(800, 600);
        p5.pixelDensity(1);

    }

    p5.draw = function() {
        lemondash.movement(p5);
        lemondash.handleMovingObjects();
        lemondash.draw(p5);
        lemondash.drawMovingObjects(p5);
        lemondash.handleFallingObjects();
    }
});


