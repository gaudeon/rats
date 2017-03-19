// namespace
var App = App || {};

App.MenuState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function () {
        this.config = this.game.cache.getJSON('menuConfig');
    };

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        // set world bounds because playing missions will change it
        this.game.world.setBounds(0,0,800,600);
        this.game.stage.backgroundColor = "#3f3f3f";

        var y = 0;
        this.config.items.forEach((function (item) {
            var text = this.add.text(0, y, item.label, this.config.style);

            text.setTextBounds(0,0,this.world.width,this.world.height);

            if (item.state) {
                text.addColor(this.config.link.color, 0);
                var state = item.state;
                text.inputEnabled = true;

                text.events.onInputUp.add(function (ev) {
                    this.state.start(state, true, false);
                }, this);
            }
            else {
                text.addColor(this.config.label.color, 0);
            }

            y += this.config.style.fontSize + 10;
        }).bind(this));

        this.controls = this.game.input.keyboard.createCursorKeys();
        this.controls.enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    };


     fn.prototype.update = function () {
         if (this.controls.enter.isDown) {
             this.state.start("Level", true, false);
         }
     };

     return fn;
})();
