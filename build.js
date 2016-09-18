var HOST = null
var PORT = 1375

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
Gulp.uglify = require("gulp-uglify")
Gulp.report = function() {
    var uptime = process.uptime()
    return mapstream(function(file, callback) {
        var date = Moment().format("M/D/YYYY")
        var time = Moment().format("h:mma")
        var duration = new Number(process.uptime() - uptime).toFixed(3) + "s"
        var size = filesize(Buffer.byteLength(String(file.contents)), {spacer: "", exponent: 1})
        console.log("[" + date + "][" + time + "] (" + size + ")(" + duration + ")")
        fs.appendFile("build.csv", date + " " + time + "," + size.slice(0, -2) + "," + duration.slice(0, -1) + "\n")
        callback(null, file)
    })
}

var isReady = false
var server = null

Rimraf("./builds", function() {
    Chokidar.watch("./source/index.html").on("all", (event) => {
        Pump([
            Gulp.src("source/index.html"),
            Gulp.dest("./builds"),
        ], function(error) {
            if(error != undefined) {
                console.log(error.toString())
            } else {
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
            }
        })
    })
    Chokidar.watch("./source/index.css").on("all", (event) => {
        Pump([
            Gulp.src("source/index.css"),
            Gulp.dest("./builds"),
        ], function(error) {
            if(error != undefined) {
                console.log(error.toString())
            } else {
                if(server != null) {
                    server.reload()
                }
            }
        })
    })
    Chokidar.watch("./source/**/*.js").on("all", (event, path) => {
        if(isReady == false && path != "source/index.js") {return}
        Pump([
            Gulp.src([
                "./source/scripts/utility/**/*.js",
                "./source/scripts/**/*.js",
                "./source/index.js",
            ]),
            Gulp.concat("index.js"),
            Gulp.babel(),
            Gulp.uglify(),
            Gulp.dest("./builds"),
            Gulp.report(),
        ], (error) => {
            if(error != undefined) {
                var message = "throw '" + error.message + "'"
                fs.writeFile("./builds/index.js", message)
                console.log(error.toString())
            }
            if(server != null) {
                server.reload()
            }
        })
    }).on("ready", () => {
        isReady = true
    })
})

// cache any files that haven't been touched
// lint all files before compilation
// minify the HTML and CSS as well
