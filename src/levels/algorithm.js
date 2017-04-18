"use strict";

class Algorithm {
    constructor (game, width, height, grid, seed = Date.now()) {
        this.game   = game;
        this.width  = width;
        this.height = height;
        this.grid   = grid;
        this.seed   = seed;
        this.rng    = new Phaser.RandomDataGenerator([seed]);
    }

    run (grid) {
        // overwrite me
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = Algorithm;
}
