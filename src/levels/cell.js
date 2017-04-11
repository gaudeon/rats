"use strict";

class Cell {
    constructor (game, x, y, id = Math.random()) {
        this.game   = game;
        this.x      = x;
        this.y      = y;
        this.id     = id;
        this.object = undefined;

        this.walls = {
            north: true,
            south: true,
            east: true,
            west: true
        };

        this.adjacent_cells = {
            right: null,
            left: null,
            down: null,
            up: null
        };
    }

    setCellRight (cell) { this.adjacent_cells.right = cell; }
    setCellLeft  (cell) { this.adjacent_cells.left = cell; }
    setCellDown  (cell) { this.adjacent_cells.down = cell; }
    setCellUp    (cell) { this.adjacent_cells.up = cell; }

    cellRight () { return this.adjacent_cells.right; }
    cellLeft  () { return this.adjacent_cells.left; }
    cellDown  () { return this.adjacent_cells.down; }
    cellUp    () { return this.adjacent_cells.up; }

    setNorth (bool) {
        this.walls.north = bool;

        if (this.adjacent_cells.up) {
            this.adjacent_cells.up.walls.south = bool;
        }
    }

    setSouth (bool) {
        this.walls.south = bool;

        if (this.adjacent_cells.down) {
            this.adjacent_cells.down.walls.north = bool;
        }
    }

    setEast (bool) {
        this.walls.east = bool;

        if (this.adjacent_cells.right) {
            this.adjacent_cells.right.walls.west = bool;
        }
    }

    setWest (bool) {
        this.walls.west = bool;

        if (this.adjacent_cells.left) {
            this.adjacent_cells.left.walls.east = bool;
        }
    }

    getNorth () { return this.walls.north; }
    getSouth () { return this.walls.south; }
    getEast  () { return this.walls.east; }
    getWest  () { return this.walls.west; }

    setObject (object) { this.object = object; }
    getObject () { return this.object; }
    hasObject () { return "undefined" !== typeof this.object; }
}
