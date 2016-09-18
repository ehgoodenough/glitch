class Thug {
    constructor(protothug) {
        this.color = RED
        this.sprite = SPRITES.ufo
        this.width = this.sprite.width
        this.height = this.sprite.height

        this.position = protothug.position || {x: 0, y: 0}
        this.anchor = {x: 0.5, y: 0.5}

        this.speed = 0.8 / (20/15)
        this.rotation = 0

        this.key = KEY++

        if(!!protothug.game) {
            this.game = protothug.game
            this.game.thugs[this.key] = this
        }

        this.hull = protothug.hull || 5

        this.weapon = {
            rate: 4 * (20/15),
            speed: 0.6,
        }
        this.counter = Math.random() * (this.weapon.rate / 2)
    }
    update(delta) {
        if(this.game.player == undefined) {
            this.speed = 2
        }

        this.position.y += this.speed * delta.glitchtime.inFrames

        if(this.position.y > HEIGHT + this.height) {
            this.remove()
        }

        if(this.game.player != undefined
        && this.game.player.killcount > 0) {
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

            if(this.isOnScreen) {
                if(this.game.player.position.x <= this.position.x + (this.width * this.anchor.x)
                && this.game.player.position.x >= this.position.x - (this.width * this.anchor.x)
                && this.game.player.position.y <= this.position.y + (this.height * this.anchor.y)
                && this.game.player.position.y >= this.position.y - (this.height * this.anchor.y)) {
                    this.game.player.beDamaged()
                }
            }
        }
    }
    get isOnScreen() {
        return this.position.y > 0
    }
    beDamaged(damage) {
        this.hull -= damage || 1
        if(this.hull <= 0) {
            this.remove()
            var explosion = new Explosion({
                game: this.game,
                position: {
                    x: this.position.x,
                    y: this.position.y,
                },
                size: 10 + (Math.random() * 10)
            })
            if(this.game.player) {
                this.game.player.countkill()
            }
        }
    }
    remove() {
        delete this.game.thugs[this.key]
    }
}
