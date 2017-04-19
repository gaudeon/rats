var env = require('../../../env');

var assert = require('chai').assert;

// reqs
global.Algorithm = require('../../../../src/levels/algorithm');
global.BinaryTreeAlgorithm = require('../../../../src/levels/algorithms/binaryTreeAlgorithm');

let binary_tree_algorithm = new BinaryTreeAlgorithm();

describe("BinaryTreeAlgorithm", function () {
    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(binary_tree_algorithm.run);
        });
    });
});
