class Explosion {
    constructor(protoexplosion) {
        this.position = protoexplosion.position || {x: 0, y: 0}
        this.size = protoexplosion.size || 10
        this.maxsize = this.size
        this.color = "#FFF"
        this.speed = 0.2

        this.key = KEY++

        if(!!protoexplosion.game) {
            this.game = protoexplosion.game
            this.game.explosions[this.key] = this
        }

        if(protoexplosion.doNotPropagate != true) {
            for(var i = 0; i < (protoexplosion.billows || 3); i += 1) {
                new Explosion({
                    game: this.game,
                    size: this.size,
                    doNotPropagate: true,
                    position: {
                        x: this.position.x + (Math.random() * this.size) - (this.size * 0.5),
                        y: this.position.y + (Math.random() * this.size) - (this.size * 0.5)
                    },
                })
            }
        }
    }
    update(delta) {
        this.size -= this.speed * delta.glitchtime.inFrames
        this.color = "rgba(255, 255, 255, " + (this.size / this.maxsize) + ")"

        if(this.size <= 0) {
            this.remove()
        }
    }
    remove() {
        delete this.game.explosions[this.key]
    }
}
