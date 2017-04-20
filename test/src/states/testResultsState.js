var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.ResultsState = require('../../../src/states/resultsState');

describe("ResultsState", function () {
    var results_state;

    describe("constructor()", function() {
        it("generates an object", function () {
            results_state = new ResultsState(game);

            assert.isObject(results_state);
        });
    });
});
