"use strict";

class Maze extends Phaser.SpriteBatch {
    constructor (game, grid_x = 0, grid_y = 0, grid_width = 10, grid_height = 10, algorithm = "Solid", seed = Date.now(), debug = false) {
        super(game);

        this.grid_width      = grid_width;
        this.grid_height     = grid_height;
        this.grid_x          = grid_x;
        this.grid_y          = grid_y;
        this.line_size       = 4;
        this.cell_size       = 100;
        this.grid            = new Grid(game, this.grid_width, this.grid_height);
        this.debug           = debug;
        this.seed            = seed;
        this.algorithm       = algorithm;
        this.algorithm_class = eval(`${algorithm}Algorithm`);
        if ("undefined" === typeof this.algorithm_class) {
            this.algorithm       = "Solid";
            this.algorithm_class = SolidAlgorithm;
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
        this.algorithm_obj = new this.algorithm_class(game, grid_width, grid_height, this.grid, this.seed);
        this.algorithm_obj.run();

        // enable physics for walls
        this.enableBody      = true;
        this.physicsBodyType = Phaser.Physics.P2JS;

        this.draw();
    }

    pixelWidth () {
        return this.grid_width * this.cell_size + this.grid_width * this.line_size + this.line_size;
    }

    pixelHeight () {
        return this.grid_height * this.cell_size + this.grid_height * this.line_size + this.line_size;
    }

    // find a pixel value in the center of a cell by it's column or roll
    cellCenterValue (i) {
        return i * this.cell_size + this.cell_size / 2 - i * this.line_size;
    }

    cellTopLeftX (cell_col) { return this.grid_x + this.cell_size * cell_col - this.line_size * cell_col; }
    cellTopLeftY (cell_row) { return this.grid_y + this.cell_size * cell_row - this.line_size * cell_row; }

    cellCenterX (cell_col) { return this.cellTopLeftX(cell_col) + this.cell_size / 2; }
    cellCenterY (cell_row) { return this.cellTopLeftY(cell_row) + this.cell_size / 2; }

    cellSetItem (col, row, object) { this.grid.getCell(col, row).item = object; }
    cellGetItem (col, row) { this.grid.getCell(col, row).item; }
    cellHasItem (col, row) { this.grid.getCell(col, row).hasItem; }
    adjacentCellHasItem (col, row) {
        let cell = this.grid.getCell(col, row);

        return (cell.cellUp && cell.cellUp.hasItem)
            || (cell.cellRight && cell.cellRight.hasItem)
            || (cell.cellDown && cell.cellDown.hasItem)
            || (cell.cellLeft && cell.cellLeft.hasItem);
    }

    draw () {
        for (let x = 0; x < this.grid_width; x++) {
            for (let y = 0; y < this.grid_height; y++) {
                let cell = this.grid.getCell(x, y);

                //  x pos equals starting x plus number of columns over minus number of columns of walls since cell walls overlap
                let left = this.cellTopLeftX(x);

                //  y pos equals starting y plus number of rows down minus number of rows of walls since cell walls overlap
                let top  = this.cellTopLeftY(y);

                let wall_x, wall_y;
                let fnName = function (prefix) { return `${prefix}_wall_${x}_${y}`; };

                let walls = [];
                // since we build from top-left to bottom-right, no need to create extra north walls as we created a south wall in the cell above us
                if (cell.wallNorth && !cell.cellUp) {
                    walls.push({
                        x: left + this.cell_size / 2,
                        y: top + this.line_size / 2,
                        texture: this.h_wall_texture,
                        name: fnName("north")
                    });
                }


                if (cell.wallEast) {
                    walls.push({
                        x: left + this.cell_size - this.line_size / 2,
                        y: top + this.cell_size / 2,
                        texture: this.v_wall_texture,
                        name: fnName("east")
                    });
                }

                if (cell.wallSouth) {
                    walls.push({
                        x: left + this.cell_size / 2,
                        y: top + this.cell_size - this.line_size / 2,
                        texture: this.h_wall_texture,
                        name: fnName("south")
                    });
                }

                // since we build from top-left to bottom-right, no need to create extra west walls as we created a east wall in the cell to the left of us
                if (cell.wallWest && !cell.cellLeft) {
                    walls.push({
                        x: left + this.line_size / 2,
                        y: top + this.cell_size / 2,
                        texture: this.v_wall_texture,
                        name: fnName("east")
                    });
                }

                walls.forEach((wall) => {
                    this.add(new Wall(this.game, wall.x, wall.y, wall.texture, wall.name, this.debug));
                });
            }
        }
    }
}
