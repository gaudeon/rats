"use strict";

class CountDown extends Phaser.Text {
    constructor (game, x, y, color = "#ff6666", state, debug = false) {
        super(game, x, y, "", {
            "font": "32px Chewy",
            "fontSize": 32,
            "fill": color
        });

        this.color = color;
        this.state = state;
        this.debug = debug;
    }

    update () {
        let minutes = Math.floor(this.state.time_remaining / 60),
            seconds = this.state.time_remaining - minutes * 60;

        seconds = (seconds < 10) ? "0" + seconds : seconds;

        this.text = `${minutes}:${seconds}`;
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = CountDown;
}
