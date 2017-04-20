var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.CheeseCounter = require('../../../src/ui/cheeseCounter');

describe("CheeseCounter", function () {
    var cheese_counter;

    describe("constructor()", function() {
        it("generates an object", function () {
            cheese_counter = new CheeseCounter(game);

            assert.isObject(cheese_counter);
        });
    });
});
