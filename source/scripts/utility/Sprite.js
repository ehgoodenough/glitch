export default class Sprite {
    constructor(pixels, colors, scale = 1) {
        this.canvas = document.createElement("canvas")
        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.width = pixels[0].length * scale
        this.canvas.height = pixels.length * scale

        for(var y = 0; y < pixels.length; y++) {
            for(var x = 0; x < pixels[y].length; x++) {
                var pixel = pixels[y][x]
                if(pixel != " ") {
                    this.canvas.context.fillStyle = colors[pixel] || "hotpink"
                    this.canvas.context.fillRect(
                        x * scale, y * scale,
                        scale, scale
                    )
                }
            }
        }
    }
    get width() {
        return this.canvas.width
    }
    get height() {
        return this.canvas.height
    }
}
