"use strict";

class LoadingState extends Phaser.State {
    constructor (game) {
        super(game);
    }

    preload () {
        this.load.json('menuConfig', './assets/json/menu.json');
        this.game.load.atlas('spriteAtlas', './assets/images/sprites.png', './assets/json/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.game.load.audio('cheeseSound', './assets/sounds/cheese.wav');
        this.game.load.audio('bombSound', './assets/sounds/bomb.wav');
    }

    update () {
        if (window.webfonts_are_loaded) {
            this.state.start('Menu');
        }
    }
}
