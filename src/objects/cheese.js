// namespace
var App = App || {};

App.Cheese = (function () {
    "use strict";

    var fn = function (game, x, y, type, debug) {
        this.cheese_type = (type && type.match(/^(speed|bomb)$/)) ? type : undefined;
        var key = this.cheese_type ? 'cheese_' + this.cheese_type : 'cheese';

        Phaser.Sprite.call(this, game, x, y, 'spriteAtlas', key);

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

    fn.prototype.applyEffect = function (state) {
            switch (this.cheese_type) {
                case "speed":
                    state.rat.speed = state.rat.enhanced_speed;
                    state.cheese_speed_enabled = true;
                    state.cheese_speed_time_remaining += 7;
                    break;
                case "bomb":
                    state.startCheeseBomb();
                    break;
                default:
                    state.time_remaining += 10;
                    state.cleanupOneCheeseBomb();
                    break;
            };
    };

    return fn;
})();
