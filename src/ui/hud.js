// namespace
var App = App || {};

App.Hud = (function () {
    "use strict";

    var fn = function (game, state, debug) {
        Phaser.Group.call(this, game);

        this.state = state;
        this.debug = debug || false;
        this.fixedToCamera = true;

        this.bar_height = 50;
        this.bar_color = 0x3f3f3f;

        this.bar_graphic = new Phaser.Graphics(this.game);
        this.bar_graphic.beginFill(this.bar_color);
        this.bar_graphic.drawRect(0, 0, this.game.width, this.game.height);
        this.bar_graphic.endFill();
        this.bar_texture = this.bar_graphic.generateTexture();

        this.bar = this.create(0, this.game.height - this.bar_height, this.bar_texture);

        this.cheese_icon = this.create(10, this.game.height - this.bar_height + 15, "spriteAtlas", "cheese");
        this.cheese_icon.width = 32;
        this.cheese_icon.height = 21;

        this.cheese_counter = this.add(new App.CheeseCounter(this.game, 72, this.game.height - this.bar_height + 8, this.state, this.debug));

        this.countdown = this.add(new App.CountDown(this.game, this.game.width - 220, this.game.height - this.bar_height + 8, this.state, this.debug));
    };

    fn.prototype = Object.create(Phaser.Group.prototype);
    fn.prototype.constructor = fn;

    return fn;
})();
