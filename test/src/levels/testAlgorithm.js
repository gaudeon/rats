var env    = require('../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Algorithm = require('../../../src/levels/algorithm');

describe("Algorithm", function () {
    var algorithm;

    describe("constructor()", function () {
        it("generates an object", function () {
            algorithm = new Algorithm();

            assert.isObject(algorithm);
        });
    });

    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(algorithm.run);
        });
    });
});
