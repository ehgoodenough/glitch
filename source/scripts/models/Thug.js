class Thug {
    constructor(thug) {
        this.width = 12
        this.height = 16
        this.color = "#C00"

        this.position = {
            x: thug.position.x,
            y: thug.position.y
        }

        this.speed = 1
        this.rotation = Math.PI / 10
    }
    update(delta) {
        this.position.x -= this.speed * delta.realtime.inFrames

        if(this.position.x < -1 * this.width) {
            this.position.x = WIDTH + this.width
        }

        this.rotation += (Math.PI / 32) * delta.realtime.inFrames
    }
}
