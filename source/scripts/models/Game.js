class Game {
    constructor() {
        this.player = new Player()

        this.thug = new Thug()

        this.time = 0
    }
    update(delta) {
        delta = {
            realtime: {
                inMilliseconds: delta,
                inSeconds: delta / 1000,
                inFrames: delta / (1000 / 60)
            }
        }
        this.time += delta.realtime.inMilliseconds
        delta.glitchtime = {inFrames: delta.realtime.inFrames}
        if(Math.floor(this.time / 1000) % 3 != 0) {
            delta.glitchtime.inFrames *= 0
        }

        this.player.update(delta)
        this.thug.update(delta)

        if(delta.glitchtime.inFrames != 0) {
            render.clear()
        }
        render.render(game.thug)
        render.render(game.player)
    }
}
