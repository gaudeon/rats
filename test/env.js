const GAME_WIDTH  = 800;
const GAME_HEIGHT = 600;

var Canvas = require("canvas");
global.Image = Canvas.Image;

// virutal dom - with dom globals :(
var jsdom        = require("jsdom").jsdom;
global.window    = jsdom().defaultView;
global.document  = window.document;
global.navigator = window.navigator;
global.Element   = window.Element;

global.window.CanvasRenderingContext2D = new Canvas(GAME_WIDTH, GAME_HEIGHT).getContext('2d');

// moar globals :( - so the code we are test can properly extend from these external libraries
global.PIXI   = require('../node_modules/phaser-ce/build/pixi').PIXI;
global.p2     = require('p2');
global.Phaser = require('../node_modules/phaser-ce/build/phaser').Phaser;

global.game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.HEADLESS);

let game_ready_promise = new Promise((resolve, reject) => {
    game.device.whenReady(() => {
      game.physics.startSystem(Phaser.Physics.P2JS);

      resolve();
    });
});

module.exports = {
    "game": global.game,
    "game_ready": game_ready_promise
};
