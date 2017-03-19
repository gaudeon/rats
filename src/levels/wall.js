// namespace
var App = App || {};

App.Wall = (function () {
    "use strict";

    var fn = function (game, x, y, texture, name, debug) {
        Phaser.Sprite.call(this, game, x, y, texture);

        // physics
        this.game.physics.p2.enable(this);

        this.debug       = debug || false;
        this.anchor.x    = 0.5;
        this.anchor.y    = 0.5;
        this.name        = name || "wall";
        this.body.static = true;
        this.body.debug  = this.debug;
    };

    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    return fn;
})();
