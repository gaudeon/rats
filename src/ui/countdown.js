// namespace
var App = App || {};

App.CountDown = (function () {
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
        var minutes = Math.floor(this.state.time_remaining / 60);
        var seconds = this.state.time_remaining - minutes * 60;
        this.text = "Time Left: " + minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds);
    };

    return fn;
})();
