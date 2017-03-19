// namespace
var App = App || {};

App.Maze = (function () {
    "use strict";

    var fn = function (game, grid_x, grid_y, grid_width, grid_height, algorithm, debug) {
        Phaser.SpriteBatch.call(this, game);

        this.grid_width      = grid_width || 10;
        this.grid_height     = grid_height || 10;
        this.grid_x          = grid_x || 0;
        this.grid_y          = grid_y || 0;
        this.line_size       = 4;
        this.cell_size       = 100;
        this.grid            = new App.Grid(game, this.grid_width, this.grid_height);
        this.debug           = debug || false;
        this.algorithm       = algorithm || "Solid";
        this.algorithm_class = eval("App." + this.algorithm + "Algorithm");
        if ("undefined" === typeof this.algorithm_class) {
            this.algorithm       = "Solid";
            this.algorithm_class = App.SolidAlgorithm;
        }

        // this.h_wall_color = (x + y * this.width) % 2 == 0 ? 0xffffff : 0xff0000; // debug, alternate cell colors
        this.wall_color = 0xcfcfcf;

        this.h_wall_graphic = new Phaser.Graphics(this.game);
        this.h_wall_graphic.beginFill(this.wall_color);
        this.h_wall_graphic.drawRect(0, 0, this.cell_size, this.line_size);
        this.h_wall_graphic.endFill();
        this.h_wall_texture = this.h_wall_graphic.generateTexture();

        this.v_wall_graphic = new Phaser.Graphics(this.game);
        this.v_wall_graphic.beginFill(this.wall_color);
        this.v_wall_graphic.drawRect(0, 0, this.line_size, this.cell_size);
        this.v_wall_graphic.endFill();
        this.v_wall_texture = this.v_wall_graphic.generateTexture();

        // setup and run the algorithm to generate our maze
        this.algorithm = new this.algorithm_class(game, grid_width, grid_height, this.grid);
        this.algorithm.run();

        // enable physics for walls
        this.enableBody      = true;
        this.physicsBodyType = Phaser.Physics.P2JS;
    };

    fn.prototype = Object.create(Phaser.SpriteBatch.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.pixelWidth = function () {
        return this.grid_width * this.cell_size + this.grid_width * this.line_size + this.line_size;
    };

    fn.prototype.pixelHeight = function () {
        return this.grid_height * this.cell_size + this.grid_height * this.line_size + this.line_size;
    };

    // find a pixel value in the center of a cell by it's column or roll
    fn.prototype.cellCenterValue = function (i) {
        return i * this.cell_size + this.cell_size / 2 - i * this.line_size;
    };

    fn.prototype.cellTopLeftX = function (cell_col) { return this.grid_x + this.cell_size * cell_col - this.line_size * cell_col; };
    fn.prototype.cellTopLeftY = function (cell_row) { return this.grid_y + this.cell_size * cell_row - this.line_size * cell_row; };

    fn.prototype.cellCenterX = function (cell_col) { return this.cellTopLeftX(cell_col) + this.cell_size / 2; };
    fn.prototype.cellCenterY = function (cell_row) { return this.cellTopLeftY(cell_row) + this.cell_size / 2; };

    fn.prototype.draw = function () {
        for (var x = 0; x < this.grid_width; x++) {
            for (var y = 0; y < this.grid_height; y++) {
                var cell = this.grid.getCell(x, y);

                //  x pos equals starting x plus number of columns over minus number of columns of walls since cell walls overlap
                var left = this.cellTopLeftX(x);

                //  y pos equals starting y plus number of rows down minus number of rows of walls since cell walls overlap
                var top  = this.cellTopLeftY(y);

                var wall_x, wall_y;
                var fnName = function (prefix) { return prefix + "_wall_" + x + "_" + y; };

                var walls = [];
                // since we build from top-left to bottom-right, no need to create extra north walls as we created a south wall in the cell above us
                if (cell.getNorth() && !cell.cellUp()) {
                    walls.push( {
                        x: left + this.cell_size / 2,
                        y: top + this.line_size / 2,
                        texture: this.h_wall_texture,
                        name: fnName("north")
                    });
                }


                if (cell.getEast()) {
                    walls.push( {
                        x: left + this.cell_size - this.line_size / 2,
                        y: top + this.cell_size / 2,
                        texture: this.v_wall_texture,
                        name: fnName("east")
                    });
                }

                if (cell.getSouth()) {
                    walls.push( {
                        x: left + this.cell_size / 2,
                        y: top + this.cell_size - this.line_size / 2,
                        texture: this.h_wall_texture,
                        name: fnName("south")
                    });
                }

                // since we build from top-left to bottom-right, no need to create extra west walls as we created a east wall in the cell to the left of us
                if (cell.getWest() && !cell.cellLeft()) {
                    walls.push({
                        x: left + this.line_size / 2,
                        y: top + this.cell_size / 2,
                        texture: this.v_wall_texture,
                        name: fnName("east")
                    });
                }

                walls.forEach((function (wall) {
                    this.add(new App.Wall(this.game, wall.x, wall.y, wall.texture, wall.name, this.debug));
                }).bind(this));
            }
        }
    };

    return fn;
})();
