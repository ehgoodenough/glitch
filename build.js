var BrowserSync = require("browser-sync")
var Gulp = require("gulp")

var HOST = null
var PORT = 1375

var server = BrowserSync({
    server: "./source",
    open: true, notify: false,
    host: HOST, port: PORT,
    logLevel: "silent",
})

Gulp.watch("./source/**/*").on("change", function() {
    server.reload()
})
