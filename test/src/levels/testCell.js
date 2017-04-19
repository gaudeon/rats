var env = require('../../env');

var assert = require('chai').assert;

// reqs
global.Cell = require('../../../src/levels/cell');

let cell = new Cell();

describe("Cell", function () {
    describe("cellRight", function () {
        it("starts null", function () {
            assert.isNull(cell.cellRight);
        });
    });
});
