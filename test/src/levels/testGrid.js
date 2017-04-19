var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Grid = require('../../../src/levels/grid');

describe("Grid", function () {
    var grid;

    describe("constructor()", function () {
        it("generates an object", function () {
            grid = new Grid();

            assert.isObject(grid);
        });
    });

    describe("getCell()", function () {
        it("is a function", function () {
            assert.isFunction(grid.getCell);
        });
    });
});
