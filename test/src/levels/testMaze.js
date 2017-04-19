var env = require('../../env');

before(function() {
    //console.log(Phaser.Device);
    //console.log(game);
    this.timeout(60000);
    return env.game_ready;
});

var assert = require('chai').assert;

// reqs
global.Algorithm = require('../../../src/levels/algorithm');
global.SolidAlgorithm = require('../../../src/levels/algorithms/solidAlgorithm');
global.Cell = require('../../../src/levels/cell');
global.Grid = require('../../../src/levels/grid');
global.Wall = require('../../../src/levels/wall');
global.Maze = require('../../../src/levels/maze');


describe("Maze", function () {
    describe("draw()", function () {
        it("is a function", function () {
            var maze = new Maze(game);

            assert.isFunction(maze.draw);
        });
    });
});
