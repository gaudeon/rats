// namespace
var App = App || {};

App.SolidAlgorithm = (function () {
    "use strict";

    var fn = function (game, width, height, grid) {
        App.Algorithm.call(this, game, width, height, grid);
    };

    fn.prototype = Object.create(App.Algorithm.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.run = function () {
        // do nothing :)
    };

    return fn;
})();
