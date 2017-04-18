// virutal dom - with dom globals :(
var jsdom = require("jsdom").jsdom;
global.window = jsdom().defaultView;
global.document = window.document;

// mock canvas
var canvasMockify = require('canvas-mock');
var Canvas = window.document.createElement('canvas');
canvasMockify(Canvas); // mock canvas functions required by Phaser.js are added

// moar globals :( - so the code we are test can properly extend from these external libraries
global.PIXI   = require('../node_modules/phaser-ce/build/pixi').PIXI;
global.p2     = require('p2');
global.Phaser = require('../node_modules/phaser-ce/build/phaser').Phaser;
