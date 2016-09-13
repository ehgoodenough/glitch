const ORANGE = "#EF8A17"
const GREEN = "#008148"
const YELLOW = "#C6C013"
const RED = "#EF2917"
const WHITE = "#FFF"

const COLORS = [
    ORANGE, GREEN, YELLOW, RED, WHITE
]

class Projectile {
    constructor(protoprojectile) {
        this.affiliation = protoprojectile.affiliation || "GOOD"

        this.width = 9
        this.height = 6
        this.color = this.affiliation == "GOOD" ? ORANGE : RED
        this.anchor = {x: 0.5, y: 0.5}
        this.collision = {
            radius: this.affiliation == "GOOD" ? 6 : 3
        }

        this.position = protoprojectile.position || {x: 0, y: 0}
        this.rotation = protoprojectile.angle || 0

        this.speed = protoprojectile.speed || 1
        this.angle = protoprojectile.angle || 0

        this.key = KEY++

        if(!!protoprojectile.game) {
            this.game = protoprojectile.game
            this.game.projectiles[this.key] = this
        }
    }
    update(delta) {
        this.position.x += Math.cos(this.angle) * this.speed * delta.glitchtime.inFrames
        this.position.y += Math.sin(this.angle) * this.speed * delta.glitchtime.inFrames
        this.rotation += (Math.PI / 32) * this.speed * delta.glitchtime.inFrames

        if(this.position.x < -1 * this.width
        || this.position.y < -1 * this.height
        || this.position.x > WIDTH + this.width
        || this.position.y > HEIGHT + this.height) {
            this.remove()
        }

        if(this.affiliation == "GOOD") {
            for(var key in this.game.thugs) {
                var thug = this.game.thugs[key]
                if(this.position.x <= thug.position.x + (thug.width * thug.anchor.x) + this.collision.radius
                && this.position.x >= thug.position.x - (thug.width * thug.anchor.x) - this.collision.radius
                && this.position.y <= thug.position.y + (thug.height * thug.anchor.y) + this.collision.radius
                && this.position.y >= thug.position.y - (thug.height * thug.anchor.y) - this.collision.radius) {
                    thug.beDamaged()
                    this.remove()
                    break
                }
            }
        } else if(this.affiliation == "BAD") {
            if(this.game.player != undefined) {
                if(this.position.x <= this.game.player.position.x + (this.game.player.width * this.game.player.anchor.x) + this.collision.radius
                && this.position.x >= this.game.player.position.x - (this.game.player.width * this.game.player.anchor.x) - this.collision.radius
                && this.position.y <= this.game.player.position.y + (this.game.player.height * this.game.player.anchor.y) + this.collision.radius
                && this.position.y >= this.game.player.position.y - (this.game.player.height * this.game.player.anchor.y) - this.collision.radius) {
                    this.game.player.beDamaged()
                    this.remove()
                }
            }
        }
    }
    remove() {
        delete this.game.projectiles[this.key]
    }
}
