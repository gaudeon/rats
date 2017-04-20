var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.LevelState = require('../../../src/states/levelState');

describe("LevelState", function () {
    var level_state;

    describe("constructor()", function() {
        it("generates an object", function () {
            level_state = new LevelState(game);

            assert.isObject(level_state);
        });
    });
});
