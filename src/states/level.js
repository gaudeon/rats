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

        this.debug = false;

        this.padding = 100;

        this.maze = new App.Maze(this.game, this.padding, this.padding, 10, 10, "BinaryTree", this.debug);
    }

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // desired fps
        this.game.time.desiredFPS = 30;

        this.game.stage.backgroundColor = "#6f6f6f";

        // set x axis bounds
        var bounds_x = this.maze.pixelWidth() + this.padding;
        bounds_x = bounds_x < this.game.width ? this.game.width : bounds_x;

        // set y axis bounds
        var bounds_y = this.maze.pixelHeight() + this.padding;
        bounds_y = bounds_y < this.game.height ? this.game.height : bounds_y;

        this.game.world.setBounds(0, 0, bounds_x, bounds_y);

        this.maze.draw();

        this.rat = new App.Rat(this.game, this.maze.cellCenterX(0), this.maze.cellCenterY(0), this.debug);

        this.game.add.existing(this.rat);
    };

    return fn;
})();
