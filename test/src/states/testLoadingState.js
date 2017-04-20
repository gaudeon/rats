var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.LoadingState = require('../../../src/states/loadingState');

describe("LoadingState", function () {
    var loading_state;

    describe("constructor()", function() {
        it("generates an object", function () {
            loading_state = new LoadingState(game);

            assert.isObject(loading_state);
        });
    });
});
