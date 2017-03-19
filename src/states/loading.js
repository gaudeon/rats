// namespace
var App = App || {};

App.LoadingState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function () {
    }

    fn.prototype.preload = function () {
        this.load.json('menuConfig', './assets/json/menu.json');
        this.game.load.atlas('spriteAtlas', './assets/images/sprites.png', './assets/json/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    };

    fn.prototype.create = function () {

    };

    fn.prototype.update = function () {
        if (window.webfonts_are_loaded) {
            this.state.start('Menu');
        }
    };

    return fn;
})();
