// namespace
var App = App || {};

App.CheeseCounter = (function () {
    "use strict";

    var fn = function (game, x, y, state, debug) {
        Phaser.Text.call(this, game, x, y, "", {
            "font": "32px Chewy",
            "fontSize": 32,
            "fill": "#ff6666"
        });

        this.state = state;
        this.debug = debug || false;
    };

    fn.prototype = Object.create(Phaser.Text.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        this.text = this.state.rat.cheese_collected + " / " + this.state.num_cheese;
    };

    return fn;
})();
