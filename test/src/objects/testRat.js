var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.Rat = require('../../../src/objects/rat');

describe("Rat", function () {
    var rat;

    describe("constructor()", function() {
        it("generates an object", function () {
            rat = new Rat(game);

            assert.isObject(rat);
        });
    });
});
