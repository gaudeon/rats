// namespace
var App = App || {};

App.LevelState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function (level_number, base_maze_size, base_num_cheese, level_seed) {
        this.level_number    = level_number || 1;
        this.level_seed      = level_seed || Date.now();
        this.rng             = new Phaser.RandomDataGenerator([this.level_seed]);
        this.base_maze_size  = base_maze_size || 10;
        this.maze_size       = this.base_maze_size + (this.level_number > 1 ? 2 : 0);
        this.base_num_cheese = base_num_cheese || 5;
        this.num_cheese      = this.base_num_cheese + (this.level_number > 1 ? 1 : 0);
        this.time_limit      = this.num_cheese * 10 * 1000;
        this.time_remaining  = this.time_limit / 1000; // in seconds
        this.padding         = 100;
        this.debug           = false;
    }

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // desired fps
        this.game.time.desiredFPS = 30;

        this.game.stage.backgroundColor = "#6f6f6f";

        // create the maze
        this.maze = new App.Maze(this.game, this.padding, this.padding, this.maze_size, this.maze_size, "BinaryTree", this.level_seed, this.debug);

        // calculate x axis bounds
        var bounds_x = this.maze.pixelWidth() + this.padding;
        bounds_x = bounds_x < this.game.width ? this.game.width : bounds_x;

        // calculate y axis bounds
        var bounds_y = this.maze.pixelHeight() + this.padding;
        bounds_y = bounds_y < this.game.height ? this.game.height : bounds_y;

        // reset world bounds
        this.game.world.setBounds(0, 0, bounds_x, bounds_y);

        // add the rat
        var rat_cell_col = this.rng.between(0, this.maze_size - 1);
        var rat_cell_row = this.rng.between(0, this.maze_size - 1);
        this.rat = new App.Rat(this.game, this.maze.cellCenterX(rat_cell_col), this.maze.cellCenterY(rat_cell_row), this.debug);
        this.game.add.existing(this.rat);
        this.maze.cellSetObject(rat_cell_col, rat_cell_row, this.rat);

        // create the cheese
        this.cheese = [];
        for (var c = 0; c < this.num_cheese; c++) {
            var cheese_cell_col = this.rng.between(0, this.maze_size - 1);
            var cheese_cell_row = this.rng.between(0, this.maze_size - 1);

            var timeout = 0;
            while ((this.maze.cellHasObject(cheese_cell_col, cheese_cell_row)
                || this.maze.adjacentCellHasObject(cheese_cell_col, cheese_cell_row))
                && ++timeout <= this.maze_size) {

                cheese_cell_col = this.rng.between(0, this.maze_size - 1);
                cheese_cell_row = this.rng.between(0, this.maze_size - 1);
            }

            var cheese = new App.Cheese(this.game, this.maze.cellCenterX(cheese_cell_col), this.maze.cellCenterY(cheese_cell_row), this.debug);
            cheese.events.onKilled.add(function () { this.rat.cheese_collected++; }, this);
            this.game.add.existing(cheese);
            this.maze.cellSetObject(cheese_cell_col, cheese_cell_row, cheese);
            this.cheese.push(cheese);
        }

        // setup the hud
        this.hud = new App.Hud(this.game, this, this.debug);

        // create and start the timer
        this.timer = this.game.time.create(false);
        this.timer.add(this.time_limit, function () {
            // time's up
            this.timer.destroy();

            this.state.start('Menu');
        }, this);

        this.timer.loop(1000, function () {
            // decrement time remaining
            this.time_remaining--;
        }, this);

        this.timer.start();
    };

    fn.prototype.update = function () {
        if (this.rat.cheese_collected >= this.num_cheese) {
            this.state.start('Level', true, false, this.level_number + 1, this.maze_size, this.num_cheese);
        }
    };

    return fn;
})();
