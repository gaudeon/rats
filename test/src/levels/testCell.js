var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

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
