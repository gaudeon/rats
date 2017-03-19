// namespace
var App = App || {};

App.CountDown = (function () {
    "use strict";

    var fn = function (game, x, y, color, state, debug) {
        this.color = color || "#ff6666";

        Phaser.Text.call(this, game, x, y, "", {
            "font": "32px Chewy",
            "fontSize": 32,
            "fill": this.color
        });

        this.state = state;
        this.debug = debug || false;
    };

    fn.prototype = Object.create(Phaser.Text.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        var minutes = Math.floor(this.state.time_remaining / 60);
        var seconds = this.state.time_remaining - minutes * 60;
        this.text = minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds);
    };

    return fn;
})();
