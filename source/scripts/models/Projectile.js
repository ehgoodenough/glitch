class Projectile {
    constructor(protoprojectile) {
        this.width = 12
        this.height = 8
        this.color = "orange"
        this.anchor = {x: 0.5, y: 0.5}

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
            delete this.game.projectiles[this.key]
        }
    }
}
