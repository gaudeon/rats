"use strict";

class ResultsState extends Phaser.State {
    constructor (game) {
        super(game);
    }

    init (statistics) {
        this.statistics = statistics || {
            level_seed: Date.now(),
            levels: {}
        };

        this.debug = false;

        this.time_remaining = 60;
    }

    create () {
        this.results_display   = new ResultsDisplay(this.game, this, this.debug)
        this.results_display.y = this.game.height;
        this.results_display.visible = true;

        // timeout timer
        this.timer = this.game.time.create(false);

        this.timer.loop(1000, () => {
            // update times
            this.time_remaining--;

            // end the level if time is up
            if (this.time_remaining <= 0) {
                this.next();
            }
        });

        this.timer.start();
    }

    update () {
        if (this.results_display.y > 0) {
            this.results_display.y -= 30;
        }
    }

    next () {
        this.timer.destroy();

        this.state.start('Menu', true, false);
    }
}
