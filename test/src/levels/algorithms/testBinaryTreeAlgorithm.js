var env    = require('../../../env'),
    assert = require('chai').assert;

before(function() {
    return env.game_ready;
});

// reqs
global.Algorithm = require('../../../../src/levels/algorithm');
global.BinaryTreeAlgorithm = require('../../../../src/levels/algorithms/binaryTreeAlgorithm');

describe("BinaryTreeAlgorithm", function () {
    var binary_tree_algorithm;

    describe("constructor()", function () {
        it("generates an object", function () {
            binary_tree_algorithm = new BinaryTreeAlgorithm();

            assert.isObject(binary_tree_algorithm);
        });
    });

    describe("run()", function () {
        it("is a function", function () {
            assert.isFunction(binary_tree_algorithm.run);
        });
    });
});
