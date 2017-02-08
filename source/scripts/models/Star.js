import COLORS from "scripts/assets/Colors.js"
import Screen from "scripts/data/Screen.js"

export default class Star {
    constructor() {
        this.position = {
            x: Math.random() * Screen.width,
            y: Math.random() * Screen.height,
        }

        this.parallax = Math.random() * 2
        this.speed = 0.5 / (20/15)

        this.width = Math.round(this.parallax)
        this.height = Math.round(this.parallax)
        this.anchor = {x: 0.5, y: 0.5}
        this.color = Math.random() < 0.5 ? COLORS.BLUE : COLORS.WHITE
    }
    update(delta) {
        this.position.y += this.parallax * this.speed * delta.glitchtime.inFrames

        if(this.position.y > Screen.height + this.height) {
            this.position.y -= Screen.height + this.height
            this.position.y *= -1

            this.position.x = Math.random() * Screen.width
        }
    }
}
