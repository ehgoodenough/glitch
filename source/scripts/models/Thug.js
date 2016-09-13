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
    constructor(thug) {
        this.width = 16
        this.height = 12
        this.color = "#C00"

        this.position = thug.position || {x: 0, y: 0}
        this.anchor = {x: 0.5, y: 0.5}

        this.speed = 1
        this.rotation = 0

        this.game = thug.game

        this.key = KEY++
    }
    update(delta) {
        this.position.x -= this.speed * delta.realtime.inFrames

        if(this.position.x < -1 * this.width) {
            delete this.game.thugs[this.key]
        }
    }
}
