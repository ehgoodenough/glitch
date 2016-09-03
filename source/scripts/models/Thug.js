class Thug {
    constructor(parameters) {

        this.width = 6
        this.height = 8
        this.color = "#C00"

        this.position = {
            x: WIDTH + this.width,
            y: HEIGHT / 2
        }
        this.anchor = {
            x: 0.5,
            y: 0.5
        }

        this.speed = 1
    }
    update(delta) {
        this.position.x -= this.speed * delta.f

        if(this.position.x < -1 * this.width) {
            this.position.x = WIDTH + this.width
        }
    }
}
