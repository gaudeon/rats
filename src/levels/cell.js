"use strict";

class Cell {
    constructor (game, x, y, id = Math.random()) {
        this.game  = game;
        this.x     = x;
        this.y     = y;
        this.id    = id;
        this._item = undefined;

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

    set cellRight (cell) { this.adjacent_cells.right = cell; }
    set cellLeft  (cell) { this.adjacent_cells.left = cell; }
    set cellDown  (cell) { this.adjacent_cells.down = cell; }
    set cellUp    (cell) { this.adjacent_cells.up = cell; }

    get cellRight () { return this.adjacent_cells.right; }
    get cellLeft  () { return this.adjacent_cells.left; }
    get cellDown  () { return this.adjacent_cells.down; }
    get cellUp    () { return this.adjacent_cells.up; }

    set wallNorth (bool) {
        this.walls.north = bool;

        if (this.adjacent_cells.up) {
            this.adjacent_cells.up.walls.south = bool;
        }
    }

    set wallSouth (bool) {
        this.walls.south = bool;

        if (this.adjacent_cells.down) {
            this.adjacent_cells.down.walls.north = bool;
        }
    }

    set wallEast (bool) {
        this.walls.east = bool;

        if (this.adjacent_cells.right) {
            this.adjacent_cells.right.walls.west = bool;
        }
    }

    set wallWest (bool) {
        this.walls.west = bool;

        if (this.adjacent_cells.left) {
            this.adjacent_cells.left.walls.east = bool;
        }
    }

    get wallNorth () { return this.walls.north; }
    get wallSouth () { return this.walls.south; }
    get wallEast  () { return this.walls.east; }
    get wallWest  () { return this.walls.west; }

    set item    (object) { this._item = object; }
    get item    () { return this._item; }
    get hasItem () { return "undefined" !== typeof this._item; }
}
