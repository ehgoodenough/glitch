class Star {
    constructor() {
        this.position = {
            x: Math.random() * WIDTH,
            y: Math.random() * HEIGHT,
        }

        this.parallax = Math.random() * 2
        this.speed = 0.5 / (20/15)

        this.width = Math.round(this.parallax)
        this.height = Math.round(this.parallax)
        this.anchor = {x: 0.5, y: 0.5}
        this.color = Math.random() < 0.5 ? BLUE : WHITE
    }
    update(delta) {
        this.position.y += this.parallax * this.speed * delta.glitchtime.inFrames

        if(this.position.y > HEIGHT + this.height) {
            this.position.y -= HEIGHT + this.height
            this.position.y *= -1

            this.position.x = Math.random() * WIDTH
        }
    }
}
