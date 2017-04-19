var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Grid = require('../../../src/levels/grid');

let grid = new Grid();

describe("Grid", function () {
    describe("getCell()", function () {
        it("is a function", function () {
            assert.isFunction(grid.getCell);
        });
    });
});
