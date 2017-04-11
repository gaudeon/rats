"use strict";

class Grid {
    constructor (game, width = 10, height = 10) {
        this.game   = game;
        this.width  = width;
        this.height = height;
        this.size   = this.width * this.height;

        this.grid = [];

        for (let i = 0; i < this.size; i++) {
            let x = i % this.width,
                y = Math.floor(i / this.width);

            this.grid[i] = new Cell(game, x, y, i);
        }

        for (let i = 0; i < this.size; i++) {
            let x    = i % this.width,
                y    = Math.floor(i / this.width),
                cell = this.getCell(x, y);

            if (x < this.width - 1) {
                cell.setCellRight( this.getCell(x + 1, y) );
            }

            if (x > 0) {
                cell.setCellLeft( this.getCell(x - 1, y) );
            }

            if (y < this.height - 1) {
                cell.setCellDown( this.getCell(x, y + 1) );
            }

            if (y > 0) {
                cell.setCellUp( this.getCell(x, y - 1) );
            }
        }
    }

    getCell (x, y) {
        let index = y * this.width + x;

        return this.grid[index];
    }
}
