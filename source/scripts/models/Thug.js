function getDirection(x, y) {
    var angle = Math.atan2(y, x)
    // angle += angle < 0 ? Math.PI * 2 : 0
    // angle -= Math.PI / 2
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
        this.width = 12
        this.height = 16
        this.color = "#C00"

        this.position = {
            x: thug.position.x,
            y: thug.position.y
        }
        this.anchor = {x: 0.5, y: 0.5}

        this.speed = 1
        this.rotation = 0

        this.game = thug.game
    }
    update(delta) {
        var vector = getVector(this.position, this.game.player.position)
        if(vector.distance > 50) {
            this.position.x += Math.cos(vector.direction) * this.speed * delta.realtime.inFrames
            this.position.y += Math.sin(vector.direction) * this.speed * delta.realtime.inFrames
        } else {
            //
        }

        if(this.position.x < -1 * this.width) {
            this.position.x = WIDTH + this.width
        }

        // this.rotation += (Math.PI / 32) * delta.realtime.inFrames
    }
}
