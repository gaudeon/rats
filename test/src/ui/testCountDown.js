var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.CountDown = require('../../../src/ui/countDown');

describe("CountDown", function () {
    var count_down;

    describe("constructor()", function() {
        it("generates an object", function () {
            count_down = new CountDown(game);

            assert.isObject(count_down);
        });
    });
});
