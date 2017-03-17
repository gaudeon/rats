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
    }

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        var text = game.add.text(game.world.centerX, game.world.centerY, "Rats");
        text.anchor.setTo(0.5);

        text.font = 'Chewy';
        text.fontSize = 48;
        text.fill = 'red';
    };

     fn.prototype.update = function () {
     };

     return fn;
})();
