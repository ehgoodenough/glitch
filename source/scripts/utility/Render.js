class Render {
    constructor(render) {
        this.canvas = document.createElement("canvas")
        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.width = render.width || 640
        this.canvas.height = render.height || 360

        document.getElementById("frame").appendChild(this.canvas)
    }
    clear() {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    render(entity) {
        this.canvas.context.fillStyle = entity.color
        this.canvas.context.fillRect(
            Math.floor(entity.position.x - (entity.width * (entity.anchor.x || 0.5))),
            Math.floor(entity.position.y - (entity.height * (entity.anchor.y || 0.5))),
            Math.floor(entity.width), Math.floor(entity.height)
        )
    }
}
