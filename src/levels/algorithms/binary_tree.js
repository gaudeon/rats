"use strict";

class BinaryTreeAlgorithm extends Algorithm {
    constructor (game, width, height, grid, seed) {
        super(game, width, height, grid, seed);
    }

    run () {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var cell = this.grid.getCell(x,y);

                if (x < this.width - 1 && y < this.height - 1) {
                    if (cell.getEast() && cell.getSouth()) {
                        if (this.rng.integer() % 2 == 0) {
                            cell.setEast(false);
                        }
                        else {
                            cell.setSouth(false);
                        }
                    }
                }
                else if (x == this.width - 1 && y < this.height - 1) {
                    cell.setSouth(false);
                }
                else if (x < this.width - 1 && y == this.height - 1) {
                    cell.setEast(false);
                }
            }
        }
    }
}
