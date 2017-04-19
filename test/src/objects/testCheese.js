var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.Cheese = require('../../../src/objects/cheese');

describe("Cheese", function () {
    var cheese;

    describe("constructor()", function() {
        it("generates an object", function () {
            cheese = new Cheese(game);

            assert.isObject(cheese);
        });
    });
});
