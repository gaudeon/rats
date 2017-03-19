// namespace
var App = App || {};

App.ResultsDisplay = (function () {
    "use strict";

    var fn = function (game, state, debug) {
        Phaser.Group.call(this, game);

        this.state = state;
        this.debug = debug || false;

        // background panel
        this.bg_color = 0x3f3f3f;
        this.bg_graphic = new Phaser.Graphics(this.game);
        this.bg_graphic.beginFill(this.bg_color);
        this.bg_graphic.drawRect(0, 0, this.game.width, this.game.height);
        this.bg_graphic.endFill();
        this.bg_texture = this.bg_graphic.generateTexture();
        this.bg = this.create(0, 0, this.bg_texture);

        this.stats_top = 120;
        this.stats = this.statistics();
        this.stats.x = (this.game.width - this.stats.width) / 2;
        this.stats.y = this.stats_top;

        // top panel
        this.bg_color = 0x6f6f6f;
        this.bg_graphic = new Phaser.Graphics(this.game);
        this.bg_graphic.beginFill(this.bg_color);
        this.bg_graphic.drawRect(0, 0, this.game.width, 100);
        this.bg_graphic.endFill();
        this.bg_texture = this.bg_graphic.generateTexture();
        this.bg = this.create(0, 0, this.bg_texture);

        // game over title
        var title_top = 10;
        this.title = new Phaser.Text(this.game, 0, title_top, "Ahh Rats! Game Over", {
            "font": "48px Chewy",
            "fontSize": 48,
            "fill": "#ffffff",
            "boundsAlignH": "center"
        });
        this.title.setTextBounds(0,title_top,this.game.width,this.title.height);
        this.add(this.title);

        // bottom panel
        this.bg_color = 0x6f6f6f;
        this.bg_graphic = new Phaser.Graphics(this.game);
        this.bg_graphic.beginFill(this.bg_color);
        this.bg_graphic.drawRect(0, 0, this.game.width, 100);
        this.bg_graphic.endFill();
        this.bg_texture = this.bg_graphic.generateTexture();
        this.bg = this.create(0, this.game.height - 100, this.bg_texture);

        // countdown
        this.countdown = new App.CountDown(this.game, this.game.width - 70, this.game.height - 66, "#efefef", this.state, this.debug);
        this.add(this.countdown);

        // prompt text
        this.prompt_text = new Phaser.Text(this.game, 10, this.game.height - 62, "Use arrow keys to scroll. Press [enter] to continue...", {
            "font": "28px Chewy",
            "fontSize": 28,
            "fill": "#efefef"
        });
        this.add(this.prompt_text);

        this.controls = this.game.input.keyboard.createCursorKeys();
        this.controls.enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

        this.visible = false; // start as hidden and let states that use us make us visible when they want
    };

    fn.prototype = Object.create(Phaser.Group.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        if (this.controls.up.isDown && this.stats.y < this.stats_top) {
            this.stats.y += 10;
        }
        else if (this.controls.down.isDown && this.stats.y > this.stats_top - this.stats.height + this.game.height - 220) {
            this.stats.y -= 10;
        }

        if (this.controls.enter.isDown) {
            this.state.next();
        }

        // since we overwrote update we need to call our own childrens' update functions now
        this.countdown.update();
    };

    fn.prototype.arrow = function () {
        var arrow = new Phaser.Sprite(this.game, 0, 0, "spriteAtlas", "arrow");
        arrow.width = 35;
        arrow.height = 30;
        arrow.tint = 0xff6666;
        arrow.anchor.x = 0.5;
        arrow.anchor.y = 0.5;

        return arrow;
    };

    fn.prototype.statistics = function () {
        var stats = new Phaser.Group(this.game, this);

        for (var level_number in this.state.statistics.levels) {
            var level = this.state.statistics.levels[level_number];
            var top   = (level_number - 1) * 58;

            var level_number_text = new Phaser.Text(this.game, 0, top, level_number + ". ", {
                "font": "48px Chewy",
                "fontSize": 48,
                "fill": "#ff6666"
            });
            stats.add(level_number_text);

            var cheese_icon = stats.create(100, top + 18, "spriteAtlas", "cheese");
            cheese_icon.width = 32;
            cheese_icon.height = 21;

            var cheese_text = new Phaser.Text(this.game, 150, top + 12, (level.cheese_collected || 0) + ' / ' + (level.num_cheese || 0), {
                "font": "32px Chewy",
                "fontSize": 32,
                "fill": "#ff6666"
            });
            stats.add(cheese_text);

            var watch_icon = stats.create(300, top + 16, "spriteAtlas", "stopwatch");
            watch_icon.width = 24;
            watch_icon.height = 24;

            var elapsed = level.time_elapsed || 0;
            var elapsed_minutes = Math.floor(elapsed / 60);
            var elapsed_seconds = elapsed - elapsed_minutes * 60;

            var elapsed_text = new Phaser.Text(this.game, 345, top + 12, elapsed_minutes + ":" + (elapsed_seconds < 10 ? "0" + elapsed_seconds : elapsed_seconds), {
                "font": "32px Chewy",
                "fontSize": 32,
                "fill": "#ff6666"
            });
            stats.add(elapsed_text);
        }

        return stats;
    };

    return fn;
})();
