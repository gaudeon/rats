// namespace
var App = App || {};

App.ResultsState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function (statistics) {
        this.statistics = statistics || {
            level_seed: Date.now(),
            levels: {}
        };

        this.debug = false;

        this.time_remaining = 60;
    };

    fn.prototype.preload = function () {
    };

    fn.prototype.create = function () {
        this.results_display   = new App.ResultsDisplay(this.game, this, this.debug)
        this.results_display.y = this.game.height;
        this.results_display.visible = true;

        // timeout timer
        this.timer = this.game.time.create(false);

        this.timer.loop(1000, function () {
            // update times
            this.time_remaining--;

            // end the level if time is up
            if (this.time_remaining <= 0) {
                this.next();
            }
        }, this);

        this.timer.start();
    };

     fn.prototype.update = function () {
         if (this.results_display.y > 0) {
             this.results_display.y -= 30;
         }
     };

     fn.prototype.next = function () {
         this.timer.destroy();

         this.state.start('Menu', true, false);
     };

     return fn;
})();
