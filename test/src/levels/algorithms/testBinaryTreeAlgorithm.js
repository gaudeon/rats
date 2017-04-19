var env    = require('../../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

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
