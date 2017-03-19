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

        this.reset(x,y);

        this.speed = 150;

        // physics
        this.game.physics.p2.enable(this);
        this.body.angularDamping = 1;
        this.body.collideWorldBounds = true;

        // helps reduce breaking through walls
        this.body.onBeginContact.add((function (body) {
            if (body && body.sprite.name.match(/wall/)) {
                this.body.setZeroVelocity();
            }
        }).bind(this));

        // helps reduce breaking through walls
        this.body.onEndContact.add((function (body) {
            if (body && body.sprite.name.match(/wall/)) {
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