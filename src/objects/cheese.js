"use strict";

class Cheese extends Phaser.Sprite {
    constructor (game, x, y, type, debug = false) {
        let cheese_type = (type && type.match(/^(speed|bomb)$/)) ? type : undefined,
            key         = cheese_type ? `cheese_${cheese_type}` : 'cheese';

        super(game, x, y, 'spriteAtlas', key);

        this.cheese_type = cheese_type;

        // debugging
        this.debug = debug;

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
    }

    applyEffect (state) {
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
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = Cheese;
}
