// namespace
var App = App || {};

App.LevelState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function (level_number) {
        if ("undefined" === typeof level_number) {
            level_number = 1;
        }

        this.maze = new App.Maze(this.game, 0, 0, 20, 20);
    }

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        this.maze.draw();
    };

    fn.prototype.update = function () {
    };

    return fn;
})();
