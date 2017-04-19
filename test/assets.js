var env = require('./env');

var assets_ready_promise = new Promise((resolve,reject) => {
    // manually load sprite asset
    var fs = require('fs');
    var img, json;
    fs.readFile('./assets/images/sprites.png', 'base64', function (err,data) {
      if (err) {
        reject(err);
      }

      img = data;

      fs.readFile('./assets/json/sprites.json', 'utf8', function (err,data) {
        if (err) {
          reject(err);
        }

        json = JSON.parse(data);

        game.cache.addTextureAtlas('spriteAtlas', './assets/images/sprites.png', 'data:image/png;base64,' + img, json, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        resolve();
      });
    });
});

module.exports = {
    assets_ready: assets_ready_promise
};
