const AMOUNT_OF_STARS = 50

class Game {
    constructor() {
        this.projectiles = {}
        this.thugs = {}

        this.player = new Player({
            game: this,
        })

        this.stars = new Array()
        for(var i = 0; i < AMOUNT_OF_STARS; i += 1) {
            this.stars.push(new Star())
        }

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
        fluxtime = Math.sin((Math.PI / 2) * fluxtime) // bulks up the waveform
        fluxtime = (fluxtime + 1) / 2 // normalizes {-1 to 1} to {0 to 1}
        delta.glitchtime.inFrames = fluxtime * delta.realtime.inFrames
        delta.glitchtime.inSeconds = fluxtime * delta.realtime.inSeconds
        delta.glitchtime.inMilliseconds = fluxtime * delta.realtime.inMilliseconds
        delta.glitchtime.inNormals = fluxtime

        if(this.player == undefined) {
            delta.glitchtime = delta.realtime
        }

        ////////////////////////
        // Updating Entities //
        //////////////////////

        for(var key in this.stars) {
            this.stars[key].update(delta)
        }

        if(this.player != undefined) {
            this.player.update(delta)
        }

        for(var key in this.projectiles) {
            this.projectiles[key].update(delta)
        }

        for(var key in this.thugs) {
            this.thugs[key].update(delta)
        }

        if(this.player != undefined) {
            if(Object.keys(this.thugs).length < 5) {
                var thug = new Thug({
                    game: this,
                    position: {
                        x: (Math.random() * WIDTH * 0.80) + (WIDTH * 0.10),
                        y: (Math.random() * 20 * -1)
                    }
                })
            }
        }

        /////////////////////////
        // Rendering Entities //
        ///////////////////////

        // render.clear()
        render.canvas.context.fillStyle = "rgba(42, 43, 42, " + delta.glitchtime.inNormals + ")"
        render.canvas.context.fillRect(0, 0, WIDTH, HEIGHT)

        if(delta.glitchtime.inNormals > 0.9) {
            render.clear()
        }

        for(var key in this.stars) {
            render.render(this.stars[key])
        }

        for(var key in this.thugs) {
            render.render(this.thugs[key])
        }

        for(var key in this.projectiles) {
            render.render(this.projectiles[key])
        }

        if(this.player != undefined) {
            render.render(this.player)
        }
    }
}
