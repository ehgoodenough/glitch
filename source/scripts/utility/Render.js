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
        this.canvas.context.save()
        this.canvas.context.translate(
            Math.floor(entity.position.x),
            Math.floor(entity.position.y)
        )
        this.canvas.context.rotate(entity.rotation || 0)
        this.canvas.context.fillStyle = entity.color || "hotpink"
        this.canvas.context.fillRect(
            entity.width * entity.anchor.x * -1,
            entity.height * entity.anchor.y * -1,
            entity.width,
            entity.height
        )
        this.canvas.context.restore()
    }
    renderCircle(entity) {
        this.canvas.context.fillStyle = entity.color || "#FFF"
        this.canvas.context.beginPath()
        this.canvas.context.arc(
            entity.position.x,
            entity.position.y,
            entity.size,
            0, Math.PI * 2,
            false
        )
        this.canvas.context.fill()
    }
    renderText(string, position) {
        this.canvas.context.fillStyle = "#FFF"
        this.canvas.context.font = "24px monospace"
        this.canvas.context.fillText(string, position.x, position.y)
    }
}
