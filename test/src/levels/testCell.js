var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Cell = require('../../../src/levels/cell');

describe("Cell", function () {
    var cell;

    describe("constructor()", function () {
        it("generates an object", function () {
            cell = new Cell();

            assert.isObject(cell);
        });
    });

    describe("cellRight", function () {
        it("starts null", function () {
            assert.isNull(cell.cellRight);
        });
    });
});
