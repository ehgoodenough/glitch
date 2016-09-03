const MINIMUM_VELOCITY = 0.001

class Player {
    constructor() {
        this.color = "#FFF"
        this.width = 6
        this.height = 8

        this.position = {x: WIDTH / 2, y: HEIGHT / 2}
        this.anchor = {x: 0.5, y: 0.5}

        this.acceleration = 1
        this.deceleration = 1.3
        this.velocity = {x: 0, y: 0}
    }
    update(delta) {
        // Inputs
        if(Input.isDown("W") || Input.isDown("UP")) {
            this.velocity.y = -1 * this.acceleration
        }
        if(Input.isDown("S") || Input.isDown("DOWN")) {
            this.velocity.y = +1 * this.acceleration
        }
        if(Input.isDown("A") || Input.isDown("LEFT")) {
            this.velocity.x = -1 * this.acceleration
        }
        if(Input.isDown("D") || Input.isDown("RIGHT")) {
            this.velocity.x = +1 * this.acceleration
        }

        // Collision
        if(this.position.x + this.velocity.x < 0
        || this.position.x + this.velocity.x > WIDTH) {
            this.velocity.x = 0
        }
        if(this.position.y + this.velocity.y < 0
        || this.position.y + this.velocity.y > HEIGHT) {
            this.velocity.y = 0
        }

        // Translation
        this.position.x += this.velocity.x * delta.f
        this.position.y += this.velocity.y * delta.f

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
