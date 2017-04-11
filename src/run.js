"use strict";

const GAME_WIDTH  = 800;
const GAME_HEIGHT = 600;

let game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT);

game.device.whenReady(function () {
    // plugins
    this.__plugins = this.__plugins || {};

    // add plugins here
    // ...

    // setup global namespace under game for our global data
    this.global = {};

    // states
    this.state.add('Loading', LoadingState);
    this.state.add('Menu', MenuState);
    this.state.add('Level', LevelState);
    this.state.add('Results', ResultsState);

    this.state.start('Loading');
}, game);
