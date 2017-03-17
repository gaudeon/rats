// namespace
var App = App || {};

App.BinaryTreeAlgorithm = (function () {
    "use strict";

    var fn = function (game) {
        App.Algorithm.call(this, game);
    };

    fn.prototype = Object.create(App.Algorithm.prototype);
    fn.prototype.constructor = fn;

    return fn;
})();
