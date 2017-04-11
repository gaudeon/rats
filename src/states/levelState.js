"use strict";

class LevelState extends Phaser.State {
    constructor (game) {
        super(game);
    }

    init (level_number = 1, base_maze_size = 10, base_num_cheese = 5, statistics = {}) {
        // game stats
        this.statistics            = statistics;
        this.statistics.level_seed = this.statistics.level_seed || Date.now();
        this.statistics.levels     = this.statistics.levels || {};

        // current level
        this.level_number    = level_number;
        this.rng             = new Phaser.RandomDataGenerator([this.statistics.level_seed]);
        this.base_maze_size  = base_maze_size;
        this.maze_size       = this.base_maze_size + (this.level_number > 1 ? 2 : 0);
        this.base_num_cheese = base_num_cheese;
        this.num_cheese      = this.base_num_cheese + (this.level_number > 1 ? 1 : 0);
        this.time_remaining  = 15; // in seconds
        this.time_elapsed    = 0;
        this.padding         = 100;
        this.debug           = false;

        //speed cheese
        this.cheese_speed_time_remaining = 0;
        this.cheese_speed_enabled = false;
    }

    create () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // desired fps
        this.game.time.desiredFPS = 30;

        this.game.stage.backgroundColor = "#6f6f6f";

        // create the maze
        this.maze = new Maze(this.game, this.padding, this.padding, this.maze_size, this.maze_size, "BinaryTree", this.level_seed, this.debug);

        // calculate x axis bounds
        let bounds_x = this.maze.pixelWidth() + this.padding;
        bounds_x = bounds_x < this.game.width ? this.game.width : bounds_x;

        // calculate y axis bounds
        let bounds_y = this.maze.pixelHeight() + this.padding;
        bounds_y = bounds_y < this.game.height ? this.game.height : bounds_y;

        // reset world bounds
        this.game.world.setBounds(0, 0, bounds_x, bounds_y);

        // add the rat
        let rat_cell_col = this.rng.between(0, this.maze_size - 1);
        let rat_cell_row = this.rng.between(0, this.maze_size - 1);
        this.rat = new Rat(this.game, this.maze.cellCenterX(rat_cell_col), this.maze.cellCenterY(rat_cell_row), this.debug);
        this.game.add.existing(this.rat);
        this.maze.cellSetItem(rat_cell_col, rat_cell_row, this.rat);

        // create the cheese
        this.cheese = [];
        let specials = {
            speed: {
                allowed: Math.ceil((this.num_cheese - 5) / 2),
                used: 0
            },
            bomb: {
                allowed: Math.ceil((this.num_cheese - 6) / 3),
                used: 0
            }
        };
        for (let c = 0; c < this.num_cheese; c++) {
            let cheese_cell_col = this.rng.between(0, this.maze_size - 1);
            let cheese_cell_row = this.rng.between(0, this.maze_size - 1);

            let timeout = 0;
            while ((this.maze.cellHasItem(cheese_cell_col, cheese_cell_row)
                || this.maze.adjacentCellHasItem(cheese_cell_col, cheese_cell_row))
                && ++timeout <= this.maze_size) {

                cheese_cell_col = this.rng.between(0, this.maze_size - 1);
                cheese_cell_row = this.rng.between(0, this.maze_size - 1);
            }

            let cheese_type = undefined;
            if (specials.speed.used < specials.speed.allowed) {
                cheese_type = 'speed';
                specials.speed.used++;
            }

            if (specials.bomb.used < specials.bomb.allowed) {
                cheese_type = 'bomb';
                specials.bomb.used++;
            }

            // cheese sound
            this.cheese_sound = this.game.add.audio("cheeseSound", 1, false);
            this.bomb_sound = this.game.add.audio("bombSound", 1, false);

            let cheese = new Cheese(this.game, this.maze.cellCenterX(cheese_cell_col), this.maze.cellCenterY(cheese_cell_row), cheese_type, this.debug);
            cheese.events.onKilled.add((cheese) => {
                // play sound
                this.cheese_sound.play();

                // rat got a cheese
                this.rat.cheese_collected++;

                // apply cheese's effect
                cheese.applyEffect(this);
            });
            this.game.add.existing(cheese);
            this.maze.cellSetItem(cheese_cell_col, cheese_cell_row, cheese);
            this.cheese.push(cheese);
        }

        // setup the hud
        this.hud = new Hud(this.game, this, this.debug);

        // start the timers
        this.startTimers();
    }

    update () {
        if (this.rat.cheese_collected >= this.num_cheese) {
            this.levelSuccess();
        }
    }

    recordStatistics (completed) {
        this.statistics.levels[this.level_number] = {
            completed: false,
            num_cheese: this.num_cheese,
            cheese_collected: this.rat.cheese_collected,
            time_elapsed: this.time_elapsed
        };
    }

    startTimers () {
        // create and start the timer
        this.game_over_timer = this.game.time.create(false);

        this.game_over_timer.loop(1000, () => {
            // update times
            this.time_remaining--;
            this.time_elapsed++;

            // end the level if time is up
            if (this.time_remaining <= 0) {
                // time's up
                this.levelFailed();
            }
        });

        this.game_over_timer.start();

        // create and start the speed timer
        this.cheese_speed_timer = this.game.time.create(false);

        this.cheese_speed_timer.loop(1000, () => {
            if (this.cheese_speed_enabled) {
                if (--this.cheese_speed_time_remaining <= 0) {
                    this.rat.speed = this.rat.normal_speed;
                    this.cheese_speed_enabled = false;
                    this.cheese_speed_time_remaining = 0;
                }
            }
        });

        this.cheese_speed_timer.start();
    }

    cleanupTimers () {
        this.rat.bombs.forEach((bomb_timer) => {
            bomb_timer.destroy();
        });

        this.game_over_timer.destroy();

        this.cheese_speed_timer.destroy();
    }

    startCheeseBomb () {
        let bomb_timer = this.game.time.create(true);
        bomb_timer.add(10 * 1000, () => {
            // play sound
            this.bomb_sound.play();

            this.levelFailed();
        });
        bomb_timer.start();

        this.rat.bombs.push(bomb_timer);
    }

    cleanupOneCheeseBomb () {
        if (this.rat.bombs.length > 0) {
            let bombs_removed = this.rat.bombs.splice(0, 1);

            bombs_removed.forEach((bomb_timer) => {
                bomb_timer.destroy();
            });
        }
    }

    levelFailed () {
        this.cleanupTimers();

        this.recordStatistics(false);

        this.state.start('Results', true, false, this.statistics);
    }

    levelSuccess () {
        this.cleanupTimers();

        this.recordStatistics(true);

        this.state.start('Level', true, false, this.level_number + 1, this.maze_size, this.num_cheese, this.statistics);
    }
}
