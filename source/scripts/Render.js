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
