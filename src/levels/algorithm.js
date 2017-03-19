// namespace
var App = App || {};

App.Algorithm = (function () {
    "use strict";

    var fn = function (game, width, height, grid, seed) {
        this.game   = game;
        this.width  = width;
        this.height = height;
        this.grid   = grid;
        this.seed   = seed || Date.now();
        this.rng    = new Phaser.RandomDataGenerator([seed]);
    };

    fn.prototype.run = function (grid) {
        // overwrite me
    };

    return fn;
})();
