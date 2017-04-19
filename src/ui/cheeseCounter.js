"use strict";

class CheeseCounter extends Phaser.Text {
    constructor (game, x, y, state, debug = false) {
        super(game, x, y, "", {
            "font": "32px Chewy",
            "fontSize": 32,
            "fill": "#ff6666"
        });

        this.state = state;
        this.debug = debug;
    }

    update () {
        let collected = this.state.rat.cheese_collected,
            total     = this.state.num_cheese;

        this.text = `${collected} / ${total}`;
    }
}

// running under node
if (typeof module !== 'undefined') {
    module.exports = CheeseCounter;
}
