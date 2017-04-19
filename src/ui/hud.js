"use strict";

class Hud extends Phaser.Group {
    constructor (game, state, debug = false) {
        super(game);

        this.state = state;
        this.debug = debug;
        this.fixedToCamera = true;

        this.bar_height = 50;
        this.bar_color = 0x3f3f3f;

        this.bar_graphic = new Phaser.Graphics(this.game);
        this.bar_graphic.beginFill(this.bar_color);
        this.bar_graphic.drawRect(0, 0, this.game.width, this.bar_height);
        this.bar_graphic.endFill();
        this.bar_texture = this.bar_graphic.generateTexture();

        this.bar = this.create(0, this.game.height - this.bar_height, this.bar_texture);

        this.cheese_icon = this.create(10, this.game.height - this.bar_height + 15, "spriteAtlas", "cheese");
        this.cheese_icon.width = 32;
        this.cheese_icon.height = 21;

        this.cheese_counter = this.add(new CheeseCounter(this.game, 72, this.game.height - this.bar_height + 8, this.state, this.debug));

        this.watch_icon = this.create(this.game.width - 120, this.game.height - this.bar_height + 16, "spriteAtlas", "stopwatch");
        this.watch_icon.width = 24;
        this.watch_icon.height = 24;

        this.countdown = this.add(new CountDown(this.game, this.game.width - 70, this.game.height - this.bar_height + 8, "#ff6666", this.state, this.debug));
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = Hud;
}
