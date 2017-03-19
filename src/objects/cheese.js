// namespace
var App = App || {};

App.Cheese = (function () {
    "use strict";

    var fn = function (game, x, y, debug) {
        Phaser.Sprite.call(this, game, x, y, 'spriteAtlas', 'cheese');

        // debugging
        this.debug = debug || false;

        // the rat image is large so we are just going to scale it here
        this.width = 48;
        this.height = 32;

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.name = "cheese";

        // physics
        this.game.physics.p2.enable(this);
        this.body.static = true;

        // debugging
        this.body.debug = this.debug;
    };

    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    return fn;
})();
