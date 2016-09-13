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
    }
    update(delta) {
        this.position.y += this.speed * delta.glitchtime.inFrames

        if(this.position.y > HEIGHT + this.height) {
            this.kill()
        }
    }
    beDamaged(damage) {
        this.hull -= damage || 1
        if(this.hull <= 0) {
            this.kill()
        }
    }
    kill() {
        delete this.game.thugs[this.key]
    }
}
