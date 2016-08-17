var Rimraf = require("rimraf")
var Chokidar = require("chokidar")
var BrowserSync = require("browser-sync")

var Gulp = require("gulp")
var Pump = require("pump")

Gulp.if = require("gulp-if")
Gulp.babel = require("gulp-babel")
Gulp.concat = require("gulp-concat")
Gulp.srcmaps = require("gulp-sourcemaps")
Gulp.uglify = require("gulp-uglify")

var HOST = null
var PORT = 1375
var isDev = true

// var server = BrowserSync({
//     server: "./build",
//     open: true, notify: false,
//     host: HOST, port: PORT,
//     logLevel: "silent",
// })

// Chokidar.watch("./source/**/*").on("all", function(event, path) {
//     console.log("sup", event, path)
//     server.reload()
// })

Pump([
    Gulp.src([
        "./source/scripts/*.js",
        "./source/index.js",
    ]),
    Gulp.if(isDev, Gulp.srcmaps.init()),
    Gulp.babel(),
    Gulp.concat("index.js"),
    Gulp.uglify(),
    Gulp.if(isDev, Gulp.srcmaps.write()),
    Gulp.dest("./builds"),
], function(error) {
    if(error) {
        console.log(error.toString())
    } else {
        console.log("done")
    }
})
