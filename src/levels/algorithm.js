// namespace
var App = App || {};

App.Algorithm = (function () {
    "use strict";

    var fn = function (game, width, height, grid) {
        this.game   = game;
        this.width  = width;
        this.height = height;
        this.grid   = grid;
        this.rng    = new Phaser.RandomDataGenerator([Date.now()]);
    };

    fn.prototype.run = function (grid) {
        // overwrite me
    };

    return fn;
})();
