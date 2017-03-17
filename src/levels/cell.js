// namespace
var App = App || {};

App.Cell = (function () {
    "use strict";

    var fn = function (game, x, y, id) {
        this.game = game;
        this.x    = x;
        this.y    = y;
        this.id   = id || Math.random();

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
    };

    fn.prototype.setCellRight = function (cell) { this.adjacent_cells.right = cell; };
    fn.prototype.setCellLeft  = function (cell) { this.adjacent_cells.left = cell; };
    fn.prototype.setCellDown  = function (cell) { this.adjacent_cells.down = cell; };
    fn.prototype.setCellUp    = function (cell) { this.adjacent_cells.up = cell; };

    fn.prototype.cellRight = function () { return this.adjacent_cells.right; };
    fn.prototype.cellLeft = function () { return this.adjacent_cells.left; };
    fn.prototype.cellDown = function () { return this.adjacent_cells.down; };
    fn.prototype.cellUp = function () { return this.adjacent_cells.up; };

    fn.prototype.setNorth = function (bool) {
        this.walls.north = bool;

        if (this.adjacent_cells.up) {
            this.adjacent_cells.up.walls.south = bool;
        }
    };

    fn.prototype.setSouth = function (bool) {
        this.walls.south = bool;

        if (this.adjacent_cells.down) {
            this.adjacent_cells.down.walls.north = bool;
        }
    };

    fn.prototype.setEast = function (bool) {
        this.walls.east = bool;

        if (this.adjacent_cells.right) {
            this.adjacent_cells.right.walls.west = bool;
        }
    };

    fn.prototype.setWest = function (bool) {
        this.walls.west = bool;

        if (this.adjacent_cells.left) {
            this.adjacent_cells.left.walls.east = bool;
        }
    };

    fn.prototype.getNorth = function () { return this.walls.north; };
    fn.prototype.getSouth = function () { return this.walls.south; };
    fn.prototype.getEast  = function () { return this.walls.east; };
    fn.prototype.getWest  = function () { return this.walls.west; };

    return fn;
})();
