class Game {
    constructor() {
        this.projectiles = {}
        this.thugs = {}

        this.player = new Player({
            game: this,
        })

        this.time = 0
        this.key = 0
    }
    update(delta) {
        //////////////////////////////
        // Calculating Glitch Time //
        ////////////////////////////

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

        ////////////////////////
        // Updating Entities //
        //////////////////////

        this.player.update(delta)

        for(var key in this.projectiles) {
            this.projectiles[key].update(delta)
        }

        for(var key in this.thugs) {
            this.thugs[key].update(delta)
        }

        if(Object.keys(this.thugs).length < 1) {
            var thug = new Thug({
                game: this,
                position: {
                    x: (Math.random() * WIDTH * 0.80) + (WIDTH * 0.10),
                    y: (Math.random() * HEIGHT * -0.5)
                }
            })
        }

        /////////////////////////
        // Rendering Entities //
        ///////////////////////

        // if(delta.glitchtime.inFrames > 0.9)
        render.clear()

        for(var key in this.thugs) {
            render.render(this.thugs[key])
        }

        for(var key in this.projectiles) {
            render.render(this.projectiles[key])
        }

        render.render(this.player)
    }
}
