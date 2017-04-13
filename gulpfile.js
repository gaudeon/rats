var GULP           = require("gulp"),
    CLEAN          = require("gulp-clean"),
    CONCAT         = require("gulp-concat"),
    MINIFIER       = require('gulp-uglify/minifier'),
    NODEMON        = require("gulp-nodemon"),
    PRINT          = require("gulp-print"),
    PUMP           = require('pump'),
    RENAME         = require('gulp-rename'),
    RUN            = require('gulp-run-command').default,
    UGLIFY_HARMONY = require('uglify-js-harmony'),
    ZIP            = require('gulp-zip');

GULP.task("default", ['build'], function () {});

// build related
GULP.task("clean_build", [], function (cb) {
    PUMP(
        [
            GULP.src('build', {read: false}),
            CLEAN()
        ],
        cb
    );
});

GULP.task("uglify_src", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src('src/**/*.js'),
            CONCAT('bundle.js'),
            MINIFIER({}, UGLIFY_HARMONY),
            GULP.dest('build/')
        ],
        cb
    );
});

GULP.task("uglify_vendor", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src('vendor/**/*.js'),
            MINIFIER({}, UGLIFY_HARMONY),
            GULP.dest('build/')
        ],
        cb
    );
});

GULP.task("copy_css_assets", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['assets/css/**/*.css']),
            GULP.dest('build/assets/css')
        ],
        cb
    );
});

GULP.task("copy_font_assets", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['assets/fonts/**/*.ttf']),
            GULP.dest('build/assets/fonts')
        ],
        cb
    );
});

GULP.task("copy_image_assets", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['assets/images/*.png']),
            GULP.dest('build/assets/images')
        ],
        cb
    );
});

GULP.task("copy_json_assets", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['assets/json/**/*.json']),
            GULP.dest('build/assets/json')
        ],
        cb
    );
});

GULP.task("copy_sound_assets", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['assets/sounds/**/*.wav', 'assets/sounds/**/*.mp3']),
            GULP.dest('build/assets/sounds')
        ],
        cb
    );
});

GULP.task("copy_assets", [
    "copy_css_assets",
    "copy_font_assets",
    "copy_image_assets",
    "copy_json_assets",
    "copy_sound_assets"
], function () {});

GULP.task("copy_index", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['index.dist.html']),
            RENAME('index.html'),
            GULP.dest('build/')
        ],
        cb
    );
});

GULP.task("copy_main", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['main.js']),
            GULP.dest('build/')
        ],
        cb
    );
});

GULP.task("copy_package", ["clean_build"], function (cb) {
    PUMP(
        [
            GULP.src(['package.json']),
            GULP.dest('build/')
        ],
        cb
    );
});

GULP.task("build", [
    "uglify_src",
    "uglify_vendor",
    "copy_assets",
    "copy_index",
    "copy_main",
    "copy_package"
], function () {});

// platforms and architectures
var platforms = ["win32", "linux", "darwin"];
var archs     = ["ia32", "x64", "armv7l"];

// dist templates
var dist_dir   = function (platform, arch, desc) { return "rats-" + platform + "-" + arch; },
    zip_name   = function (platform, arch, desc) { return "rats-" + desc + "-" + arch + "-latest.zip"; },
    make_cmd   = function (platform, arch, desc) { return "electron-packager build/ rats --platform " + platform + " --arch " + arch + " --overwrite --quiet"; },
    dist_cmd   = function (platform, arch, desc) { return "zip -qry " + zip_name(platform, arch, desc) + " ."; },
    butler_cmd = function (platform, arch, desc) { return "butler push " + dist_dir(platform, arch, desc) + "/" + zip_name(platform, arch, desc) + " dashbangsplat/rats:" + desc + "-latest"; };

// dist target lists
var all_clean_tags = [];

GULP.task("dist_options", function () {
    console.log("Platforms:");

    platforms.forEach(function (platform) {
        var desc = platform === "win32" ? "windows" : platform === "darwin" ? "mac" : "linux";

        console.log("\t" + platform);
    });

    console.log("Arch:");

    archs.forEach(function (arch) {
        console.log("\t" + arch);
    });
});

platforms.forEach(function (platform) {
    var desc = platform === "win32" ? "windows" : platform === "darwin" ? "mac" : "linux";

    archs.forEach(function (arch) {
        var clean_tag  = "clean_dist_" + platform + "_" + arch,
            make_tag   = "make_" + platform + "_" + arch,
            dist_tag   = "dist_" + platform + "_" + arch,
            butler_tag = "butler_" + platform + "_" + arch;

        GULP.task(clean_tag, [], function (cb) {
            PUMP(
                [
                    GULP.src(dist_dir(platform, arch, desc), {read: false}),
                    CLEAN()
                ],
                cb
            );
        });

        GULP.task(make_tag, ["build", clean_tag], RUN( make_cmd(platform, arch, desc) ));

        GULP.task(dist_tag, [make_tag], RUN( dist_cmd(platform, arch, desc), { cwd: process.cwd() + "/" + dist_dir(platform, arch, desc) } ));

        GULP.task(butler_tag, [dist_tag], RUN( butler_cmd(platform, arch, desc) ));

        all_clean_tags.push(clean_tag);
    });
});

archs.forEach(function (arch) {
    var dists = [];
    var butls = [];

    platforms.forEach(function (platform) {
        dists.push("dist_" + platform + "_" + arch);
        butls.push("butler_" + platform + "_" + arch);
    });

    GULP.task("dist_all_" + arch, dists, function () {});

    GULP.task("butler_all_" + arch, butls, function () {});
});

// clean all distributions
GULP.task("clean_dist", all_clean_tags, function () {});

// clean all task
GULP.task("clean", [
    "clean_build",
    "clean_dist"
], function () {});
