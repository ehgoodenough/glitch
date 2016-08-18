class Player {
    constructor() {
        this.x = 14
        this.y = 14
        this.width = 7
        this.height = 7
        this.color = "orange"
    }
}

var player = new Player()


class Render {
    constructor(render) {
        this.canvas = document.createElement("canvas")
        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.width = render.width || 640
        this.canvas.height = render.height || 360

        document.getElementById("frame").appendChild(this.canvas)
    }
    update(entity) {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.context.fillStyle = entity.color
        this.canvas.context.fillRect(entity.x, entity.y, entity.width, entity.height)
    }
}

var render = new Render({
    width: 640 / 6,
    height: 360 / 6,
})
render.update(player)
