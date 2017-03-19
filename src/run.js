//var game = new Phaser.Game(window.outerWidth, window.outerHeight);
var game = new Phaser.Game(800,600);
Phaser.Device.whenReady(function () {
    // plugins
    this.game.__plugins = this.game.__plugins || {};

    // add plugins here
    // ...

    // setup global namespace under game for our global data
    game.global = {};

    // states
    game.state.add('Loading', App.LoadingState);
    game.state.add('Menu', App.MenuState);
    game.state.add('Level', App.LevelState);
    game.state.add('Results', App.ResultsState);

    game.state.start('Loading');
});
