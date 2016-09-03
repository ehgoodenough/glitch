function Loop(func) {
    (function loop(delta) {
        var ms = Math.min(window.performance.now() - delta, 1000)
        func({
            ms: ms, // in milliseconds
            s: ms / 1000, // in seconds
            f: ms / (1000 / 60) // in frames
        })
        window.requestAnimationFrame(loop.bind(this, window.performance.now()))
    })(window.performance.now())
}
