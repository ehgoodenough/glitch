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
        var date = Moment().format("M/D/YYYY")
        var time = Moment().format("h:mma")
        var duration = (process.uptime() - uptime).toFixed(3) + "s"
        var size = filesize(Buffer.byteLength(String(file.contents)), {spacer: ""})
        console.log("[" + date + "][" + time + "] (" + size + ")(" + duration + ")")
        fs.appendFile("build.csv", date + " " + time + "," + size.slice(0, -2) + "," + duration.slice(0, -1) + "\n")
        callback(null, file)
    })
}

var isDev = true
var isReady = false

var HOST = null
var PORT = 1375

var server = null

Rimraf("./builds", function() {
    Chokidar.watch("./source/index.html").on("all", function(event, path) {
        Pump([
            Gulp.src("source/index.html"),
            Gulp.dest("./builds"),
            //Gulp.report(),
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
            //Gulp.report(),
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
        if(isReady == false && path != "source/index.js") {return}
        Pump([
            Gulp.src([
                "./source/scripts/**/*.js",
                "./source/index.js",
            ]),
            //Gulp.if(isDev, Gulp.srcmaps.init()),
            Gulp.concat("index.js"),
            Gulp.babel(),
            //Gulp.uglify(),
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
    }).on("ready", function() {
        isReady = true
    })
})

// get directory size, not file size
// srcmaps should be included but not embedded
// cache any files that haven't been touched
// lint all files before compilation
// minify the HTML and CSS as well
