var env    = require('../../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Algorithm = require('../../../../src/levels/algorithm');
global.SolidAlgorithm = require('../../../../src/levels/algorithms/solidAlgorithm');

describe("SolidAlgorithm", function () {
    var solid_algorithm;

    describe("constructor()", function () {
        it("generates an object", function () {
            solid_algorithm = new SolidAlgorithm();

            assert.isObject(solid_algorithm);
        });
    });

    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(solid_algorithm.run);
        });
    });
});
