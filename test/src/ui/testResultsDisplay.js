var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.LevelState = require('../../../src/states/levelState');
global.ResultsDisplay = require('../../../src/ui/resultsDisplay');

describe("ResultsDisplay", function () {
    var level_state, results_display;

    describe("constructor()", function() {
        it("generates an object", function () {
            level_state = new LevelState(game);
            level_state.init();
            
            results_display = new ResultsDisplay(game, level_state);

            assert.isObject(results_display);
        });
    });
});
