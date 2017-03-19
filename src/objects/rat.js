// namespace
var App = App || {};

App.Rat = (function () {
    "use strict";

    var fn = function (game, x, y, debug) {
        Phaser.Sprite.call(this, game, x, y, 'spriteAtlas', 'rat');

        // debugging
        this.debug = debug || false;

        // the rat image is large so we are just going to scale it here
        this.width = 27;
        this.height = 64;

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.speed = 150;

        this.name = "rat";

        this.cheese_collected = 0;

        var rng    = new Phaser.RandomDataGenerator([Date.now()]);
        var color_r = rng.between(0x9f, 0xff);
        var color_g = rng.between(0x9f, 0xff);
        var color_b = rng.between(0x9f, 0xff);
        var color = (color_r << 16) | (color_g << 8) | color_b;
        this.tint = color;

        // physics
        this.game.physics.p2.enable(this);
        this.body.angularDamping = 1;
        this.body.collideWorldBounds = true;

        // helps reduce breaking through walls
        this.body.onBeginContact.add((function (body) {
            if (body) {
                if (body.sprite.name.match(/wall/)) {
                    this.body.setZeroVelocity();
                }
                else if (body.sprite.name == "cheese") {
                    body.sprite.kill();
                }
            }
        }).bind(this));

        // helps reduce breaking through walls
        this.body.onEndContact.add((function (body) {
            if (body && body.sprite && body.sprite.name && body.sprite.name.match(/wall/)) {
                this.body.setZeroVelocity();
            }
        }).bind(this));

        this.controls = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // debugging
        this.body.debug = this.debug;
    };

    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        var moving = false;

        if (this.controls.left.isDown) {
            this.body.moveLeft(this.speed);
            moving = true;
        }
        else if (this.controls.right.isDown) {
            this.body.moveRight(this.speed);
            moving = true;
        }

        if (this.controls.up.isDown) {
            this.body.moveUp(this.speed);
            moving = true;
        }
        else if (this.controls.down.isDown) {
            this.body.moveDown(this.speed);
            moving = true;
        }

        if (moving) {
            this.body.angle = Phaser.Math.radToDeg(Math.atan2(this.body.velocity.y, this.body.velocity.x)) + 90;
        }
        else {
            this.body.setZeroVelocity();
        }
    };

    return fn;
})();
