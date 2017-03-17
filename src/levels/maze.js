// namespace
var App = App || {};

App.Maze = (function () {
    "use strict";

    var fn = function (game, x, y, width, height, algorithm) {
        this.game            = game;
        this.width           = width || 10;
        this.height          = height || 10;
        this.x               = x;
        this.y               = y;
        this.line_size       = 4;
        this.cell_size       = 100;
        this.grid            = new App.Grid(game, this.width, this.height);
        this.algorithm_class = algorithm || App.BinaryTreeAlgorithm;

        if ("undefined" === typeof this.algorithm_class) {
            this.algorithm_class = App.Algorithm; // do nothing since we failed to get a valid Algorithm Class
        }

        // setup and run the algorithm to generate our maze
        this.algorithm = new this.algorithm_class(game, width, height, this.grid);
        this.algorithm.run();
    };

    fn.prototype.draw = function () {

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var cell = this.grid.getCell(x, y);

                //  x pos equals starting x plus number of columns over minus number of columns of walls since cell walls overlap
                var left = this.x + this.cell_size * x - this.line_size * x;

                //  y pos equals starting y plus number of rows down minus number of rows of walls since cell walls overlap
                var top  = this.y + this.cell_size * y - this.line_size * y;

                // var color = (x + y * this.width) % 2 == 0 ? 0xffffff : 0xff0000; // debug, alternate cell colors
                var color = 0xffffff;

                if (cell.getNorth()) {
                    var g = this.game.add.graphics(left,top);
                    g.beginFill(color);
                    g.drawRect(0, 0, this.cell_size, this.line_size);
                    g.endFill();
                }

                if (cell.getSouth()) {
                    var g = this.game.add.graphics(left, top + this.cell_size - this.line_size);
                    g.beginFill(color);
                    g.drawRect(0, 0, this.cell_size, this.line_size);
                    g.endFill();
                }

                if (cell.getEast()) {
                    var g = this.game.add.graphics(left + this.cell_size - this.line_size, top);
                    g.beginFill(color);
                    g.drawRect(0, 0, this.line_size, this.cell_size);
                    g.endFill();
                }

                if (cell.getWest()) {
                    var g = this.game.add.graphics(left, top);
                    g.beginFill(color);
                    g.drawRect(0, 0, this.line_size, this.cell_size);
                    g.endFill();
                }
            }
        }
    };

    return fn;
})();
