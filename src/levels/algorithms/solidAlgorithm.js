"use strict";

class SolidAlgorithm extends Algorithm {
    constructor (game, width, height, grid, seed) {
        super(game, width, height, grid, seed);
    }

    run () {
        // do nothing :)
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = SolidAlgorithm;
}
