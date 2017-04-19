var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Algorithm = require('../../../src/levels/algorithm');

let algorithm = new Algorithm();

describe("Algorithm", function () {
    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(algorithm.run);
        });
    });
});
