function getDirection(x, y) {
    var angle = Math.atan2(y, x)
    return angle
}

function getDistance(x, y) {
    return Math.sqrt(x*x + y*y) || 0
}

function getVector(p1, p2) {
    var x = p2.x - p1.x
    var y = p2.y - p1.y
    return {
        direction: getDirection(x, y),
        distance: getDistance(x, y)
    }
}

class Thug {
    constructor(protothug) {
        this.width = 16
        this.height = 12
        this.color = "#C00"

        this.position = protothug.position || {x: 0, y: 0}
        this.anchor = {x: 0.5, y: 0.5}

        this.speed = 1
        this.rotation = 0

        this.key = KEY++

        if(!!protothug.game) {
            this.game = protothug.game
            this.game.thugs[this.key] = this
        }

        this.hull = protothug.hull || 5

        this.weapon = {
            rate: 3,
            speed: 1,
            angle: Math.PI / +2,
            // in circle, or aimed?
            // if circle, how many loops?
        }
        this.counter = Math.random() * this.weapon.rate
    }
    update(delta) {
        this.position.y += this.speed * delta.glitchtime.inFrames

        if(this.position.y > HEIGHT + this.height) {
            this.remove()
        }

        if(this.isActive) {
            this.counter += delta.glitchtime.inSeconds
            if(this.counter >= this.weapon.rate) {
                this.counter -= this.weapon.rate
                for(var angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
                    var projectile = new Projectile({
                        affiliation: "BAD",
                        angle: angle,
                        speed: this.weapon.speed,
                        game: this.game,
                        position: {
                            x: this.position.x,
                            y: this.position.y
                        }
                    })
                }
            }

            if(this.game.player != undefined) {
                if(this.game.player.position.x <= this.position.x + (this.width * this.anchor.x)
                && this.game.player.position.x >= this.position.x - (this.width * this.anchor.x)
                && this.game.player.position.y <= this.position.y + (this.height * this.anchor.y)
                && this.game.player.position.y >= this.position.y - (this.height * this.anchor.y)) {
                    this.game.player.beDamaged()
                }
            }
        }
    }
    get isActive() {
        return this.position.y > 0
    }
    beDamaged(damage) {
        this.hull -= damage || 1
        if(this.hull <= 0) {
            this.remove()
        }
    }
    remove() {
        delete this.game.thugs[this.key]
    }
}
