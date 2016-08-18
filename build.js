var fs = require("fs")
var filesize = require("filesize")
var mapstream = require("map-stream")

var Gulp = require("gulp")
var Chalk = require("chalk")
var Moment = require("moment")
var Pump = require("pump")
var Rimraf = require("rimraf")
var Chokidar = require("chokidar")
var BrowserSync = require("browser-sync")

Gulp.if = require("gulp-if")
Gulp.babel = require("gulp-babel")
Gulp.concat = require("gulp-concat")
Gulp.srcmaps = require("gulp-sourcemaps")
Gulp.uglify = require("gulp-uglify")
Gulp.report = function() {
    var uptime = process.uptime()
    return mapstream(function(file, callback) {
        var time = Moment().format("h:mma")
        var name = Chalk.underline(file.path)
        var duration = Number(process.uptime() - uptime).toFixed(3) + "s"
        var size = filesize(Buffer.byteLength(String(file.contents)), {spacer: ""})
        console.log("[" + time + "]", name, "(" + size + ")", "(" + duration + ")")
        callback(null, file)
    })
}

var isDev = true

var HOST = null
var PORT = 1375

var server = null

Rimraf("./builds", function() {
    Chokidar.watch("./source/index.html").on("all", function(event, path) {
        Pump([
            Gulp.src("source/index.html"),
            Gulp.dest("./builds"),
            Gulp.report(),
        ], function(error) {
            if(error != undefined) {
                console.log(error.toString())
                return -1
            }
            if(server == null) {
                server = BrowserSync({
                    server: "./builds",
                    open: true, notify: false,
                    host: HOST, port: PORT,
                    logLevel: "silent",
                })
            } else {
                server.reload()
            }
        })
    })
    Chokidar.watch("./source/index.css").on("all", function(event, path) {
        Pump([
            Gulp.src("source/index.css"),
            Gulp.dest("./builds"),
            Gulp.report(),
        ], function(error) {
            if(error != undefined) {
                console.log(error.toString())
                return -1
            }
            if(server != null) {
                server.reload()
            }
        })
    })
    Chokidar.watch("./source/**/*.js").on("all", function(event, path) {
        Pump([
            Gulp.src([
                "./source/index.js",
            ]),
            //Gulp.if(isDev, Gulp.srcmaps.init()),
            Gulp.babel(),
            Gulp.concat("index.js"),
            Gulp.uglify(),
            //Gulp.if(isDev, Gulp.srcmaps.write()),
            Gulp.dest("./builds"),
            Gulp.report(),
        ], function(error) {
            if(error != undefined) {
                console.log(error.toString())
                var message = "throw '" + error.message + "'"
                fs.writeFile("./builds/index.js", message)
            }
            if(server != null) {
                server.reload()
            }
        })
    })
})

// cache
// lint
