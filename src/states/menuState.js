"use strict";

class MenuState extends Phaser.State {
    constructor (game) {
        super(game);
    }

    init () {
        this.config = this.game.cache.getJSON('menuConfig');
    }

    create () {
        // set world bounds because playing missions will change it
        this.game.world.setBounds(0,0,800,600);
        this.game.stage.backgroundColor = "#3f3f3f";

        let y = 0;
        this.config.items.forEach((item) => {
            let text = this.add.text(0, y, item.label, this.config.style);

            text.setTextBounds(0,0,this.world.width,this.world.height);

            if (item.state) {
                text.addColor(this.config.link.color, 0);
                let state = item.state;
                text.inputEnabled = true;

                text.events.onInputUp.add((ev) => {
                    this.state.start(state, true, false);
                });
            }
            else {
                text.addColor(this.config.label.color, 0);
            }

            y += this.config.style.fontSize + 10;
        });

        this.controls = this.game.input.keyboard.createCursorKeys();
        this.controls.enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    }

    update () {
        if (this.controls.enter.isDown) {
            this.state.start("Level", true, false);
        }
    }
}
