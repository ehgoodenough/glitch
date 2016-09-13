class Projectile {
    constructor(protoprojectile) {
        this.width = 12
        this.height = 8
        this.color = "orange"
        this.anchor = {x: 0.5, y: 0.5}
        this.collision = {radius: 8}

        this.position = protoprojectile.position || {x: 0, y: 0}
        this.rotation = protoprojectile.angle || 0

        this.speed = protoprojectile.speed || 1
        this.angle = protoprojectile.angle || 0
        this.affiliation = protoprojectile.affiliation || "GOOD"

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
            this.kill()
        }

        if(this.affiliation == "GOOD") {
            for(var key in this.game.thugs) {
                var thug = this.game.thugs[key]
                if(this.position.x <= thug.position.x + (thug.width * thug.anchor.x) + this.collision.radius
                && this.position.x >= thug.position.x - (thug.width * thug.anchor.x) - this.collision.radius
                && this.position.y <= thug.position.y + (thug.height * thug.anchor.y) + this.collision.radius
                && this.position.y >= thug.position.y - (thug.height * thug.anchor.y) - this.collision.radius) {
                    thug.beDamaged()
                    this.kill()
                    break
                }
            }
        }
    }
    kill() {
        delete this.game.projectiles[this.key]
    }
}
