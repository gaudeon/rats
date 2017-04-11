"use strict";

class Wall extends Phaser.Sprite {
    constructor (game, x, y, texture, name = "wall", debug = false) {
        super(game, x, y, texture);

        // physics
        this.game.physics.p2.enable(this);

        this.debug       = debug;
        this.anchor.x    = 0.5;
        this.anchor.y    = 0.5;
        this.name        = name;
        this.body.static = true;
        this.body.debug  = this.debug;
    }
}
