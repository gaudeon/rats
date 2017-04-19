var env = require('../../env');

var assert = require('chai').assert;

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
