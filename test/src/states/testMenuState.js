var env    = require('../../env'),
    assets = require('../../assets'),
    assert = require('chai').assert;

before(function() {
    return Promise.all([env.game_ready, assets.assets_ready]);
});

// reqs
global.MenuState = require('../../../src/states/menuState');

describe("MenuState", function () {
    var menu_state;

    describe("constructor()", function() {
        it("generates an object", function () {
            menu_state = new MenuState(game);

            assert.isObject(menu_state);
        });
    });
});
