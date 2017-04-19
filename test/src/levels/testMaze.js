var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Algorithm = require('../../../src/levels/algorithm');
global.SolidAlgorithm = require('../../../src/levels/algorithms/solidAlgorithm');
global.Cell = require('../../../src/levels/cell');
global.Grid = require('../../../src/levels/grid');
global.Wall = require('../../../src/levels/wall');
global.Maze = require('../../../src/levels/maze');


describe("Maze", function () {
    var maze;

    describe("constructor()", function () {
        it("generates an maze object", function () {
            maze = new Maze(game);

            assert.isObject(maze);
        });

    });

    describe("draw()", function () {
        it("is a function", function () {
            assert.isFunction(maze.draw);
        });
    });
});
