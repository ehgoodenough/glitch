class Game {
    constructor() {
        this.player = new Player()

        this.thug = new Thug()

        this.glitches = {}

        this.time = 0
    }
    update(delta) {
        delta = {
            realtime: {
                inMilliseconds: delta,
                inSeconds: delta / 1000,
                inFrames: delta / (1000 / 60)
            },
            glitchtime: {
                // ...
            }
        }
        this.time += delta.realtime.inSeconds

        var frequency = 2.5, shift = 0
        var fluxtime = Math.sin(frequency * this.time + shift) // generates the waveform
        fluxtime = Math.sin((Math.PI / 2) * fluxtime) // squares the waveform
        fluxtime = (fluxtime + 1) / 2 // normalizes {-1 to 1} to {0 to 1}
        fluxtime = fluxtime * delta.realtime.inFrames
        delta.glitchtime.inFrames = fluxtime

        this.player.update(delta)
        this.thug.update(delta)

        if(delta.glitchtime.inFrames < 0.5) {
            var glitch = {
                position: {
                    x: Math.floor(this.player.position.x),
                    y: Math.floor(this.player.position.y),
                },
                width: this.player.width,
                height: this.player.height,
                color: "rgba(255, 255, 255, 0.2)",
                anchor: {
                    x: this.player.anchor.x,
                    y: this.player.anchor.y,
                },
                time: 5
            }
            var key = glitch.position.x + "x" + glitch.position.y
            this.glitches[key] = glitch
        }

        render.clear()
        render.render(this.thug)
        
        for(var key in this.glitches) {
            var glitch = this.glitches[key]
            glitch.time -= delta.glitchtime.inFrames
            if(glitch.time <= 0) {
                delete this.glitches[key]
            } else {
                render.render(glitch)
            }
        }

        render.render(this.player)
    }
}
