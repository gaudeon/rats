// namespace
var App = App || {};

App.Grid = (function () {
    "use strict";

    var fn = function (game, width, height) {
        this.game   = game;
        this.width  = width || 10;
        this.height = height || 10;
        this.size   = this.width * this.height;

        this.grid = [];

        for (var i = 0; i < this.size; i++) {
            var x = i % this.width;
            var y = Math.floor(i / this.width);
            this.grid[i] = new App.Cell(game, x, y, i);
        }

        for (var i = 0; i < this.size; i++) {
            var x    = i % this.width;
            var y    = Math.floor(i / this.width);
            var cell = this.getCell(x, y);

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
    };

    fn.prototype.getCell = function (x, y) {
        var index = y * this.width + x;

        return this.grid[index];
    };

    return fn;
})();
