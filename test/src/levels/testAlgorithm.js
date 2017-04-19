var env = require('../../env');

var assert = require('chai').assert;

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
