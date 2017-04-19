var env = require('../../../env');

var assert = require('chai').assert;

// reqs
global.Algorithm = require('../../../../src/levels/algorithm');
global.SolidAlgorithm = require('../../../../src/levels/algorithms/solidAlgorithm');

let solid_algorithm = new SolidAlgorithm();

describe("SolidAlgorithm", function () {
    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(solid_algorithm.run);
        });
    });
});
