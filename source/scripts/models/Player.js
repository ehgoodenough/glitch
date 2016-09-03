const MINIMUM_VELOCITY = 0.001

class Player {
    constructor() {
        this.color = "#FFF"
        this.width = 6
        this.height = 8

        this.position = {x: WIDTH / 2, y: HEIGHT / 2}
        this.anchor = {x: 0.5, y: 0.5}

        this.speed = 1
        this.deceleration = 1.3
        this.velocity = {x: 0, y: 0}
    }
    update(delta) {
        // Inputs
        if(Input.isDown("W") || Input.isDown("UP")) {
            this.velocity.y = -1 * this.speed
        } if(Input.isDown("S") || Input.isDown("DOWN")) {
            this.velocity.y = +1 * this.speed
        } if(Input.isDown("A") || Input.isDown("LEFT")) {
            this.velocity.x = -1 * this.speed
        } if(Input.isDown("D") || Input.isDown("RIGHT")) {
            this.velocity.x = +1 * this.speed
        }

        // Translation
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Deceleration
        this.velocity.x *= 1 / this.deceleration
        this.velocity.y *= 1 / this.deceleration
        if(Math.abs(this.velocity.x) < MINIMUM_VELOCITY) {
            this.velocity.x = 0
        } if(Math.abs(this.velocity.y) < MINIMUM_VELOCITY) {
            this.velocity.y = 0
        }
    }
}
