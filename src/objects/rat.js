"use strict";

class Rat extends Phaser.Sprite {
    constructor (game, x, y, debug = false) {
        super(game, x, y, 'spriteAtlas', 'rat');

        // debugging
        this.debug = debug;

        // the rat image is large so we are just going to scale it here
        this.width = 27;
        this.height = 64;

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.name             = "rat";
        this.cheese_collected = 0;

        // speed related data
        this.normal_speed   = 150;
        this.enhanced_speed = 300;
        this.speed          = this.normal_speed;

        let rng     = new Phaser.RandomDataGenerator([Date.now()]),
            color_r = rng.between(0x9f, 0xff),
            color_g = rng.between(0x9f, 0xff),
            color_b = rng.between(0x9f, 0xff);
        this.normal_color = (color_r << 16) | (color_g << 8) | color_b;
        this.tint = this.normal_color;

        // bomb related data
        this.bombs                   = [];
        this.bomb_color              = 0x6f0000;
        this.color_switch_delta_time = 0;

        // physics
        this.game.physics.p2.enable(this);

        this.body.angularDamping     = 1;
        this.body.collideWorldBounds = true;

        // helps reduce breaking through walls
        this.body.onBeginContact.add((body) => {
            if (body) {
                if (body.sprite.name.match(/wall/)) {
                    this.body.setZeroVelocity();
                }
                else if (body.sprite.name == "cheese") {
                    body.sprite.kill();
                }
            }
        });

        // helps reduce breaking through walls
        this.body.onEndContact.add((body) => {
            if (body && body.sprite && body.sprite.name && body.sprite.name.match(/wall/)) {
                this.body.setZeroVelocity();
            }
        });

        this.controls = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // debugging
        this.body.debug = this.debug;
    };

    update () {
        let moving = false;

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

        if (this.bombs.length > 0) {
            if (this.color_switch_delta_time >= 250) {
                if (this.tint == this.normal_color) {
                    this.tint = this.bomb_color;
                }
                else {
                    this.tint = this.normal_color;
                }
                this.color_switch_delta_time = 0;
            }
            else {
                this.color_switch_delta_time += this.game.time.elapsed;
            }
        }
        else {
            this.tint = this.normal_color;
        }
    }
}
