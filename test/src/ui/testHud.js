var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.Hud = require('../../../src/ui/hud');

describe("Hud", function () {
    var hud;

    describe("constructor()", function() {
        it("generates an object", function () {
            hud = new Hud(game);

            assert.isObject(hud);
        });
    });
});
