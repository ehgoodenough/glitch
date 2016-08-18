class Player {
    constructor() {
        this.x = 14
        this.y = 14
        this.width = 7
        this.height = 7
        this.color = "orange"
        this.speed = 4
    }
    update(delta) {
        this.x += this.speed * (delta / 1000)
    }
}

class Render {
    constructor(render) {
        this.canvas = document.createElement("canvas")
        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.width = render.width || 640
        this.canvas.height = render.height || 360

        document.getElementById("frame").appendChild(this.canvas)
    }
    render(entity) {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.context.fillStyle = entity.color
        this.canvas.context.fillRect(
            Math.floor(entity.x), Math.floor(entity.y),
            Math.floor(entity.width), Math.floor(entity.height)
        )
    }
}

function Loop(func) {
    (function loop(delta) {
        func(Math.min(window.performance.now() - delta, 1000))
        window.requestAnimationFrame(loop.bind(this, window.performance.now()))
    })(window.performance.now())
}

var player = new Player()
var render = new Render({
    width: 640 / 6,
    height: 360 / 6,
})

var loop = new Loop(function(delta) {
    player.update(delta)
    render.render(player)
})
