const AMOUNT_OF_STARS = 50
const AMOUNT_OF_THUGS = 5

var hasOverclocked = window.localStorage.hasOverclocked == "true" || false
var timesDied = 0
const TIMES_TO_DIE = 2

class Game {
    constructor() {
        this.thugs = {}
        this.projectiles = {}
        this.explosions = {}

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

        if(hasOverclocked == true
        && this.player != undefined) {
            var frequency = 2.5, shift = 0
            var fluxtime = Math.sin(frequency * this.time + shift) // generates the waveform
            fluxtime = Math.sin((Math.PI / 2) * fluxtime) // bulks up the waveform
            fluxtime = (fluxtime + 1) / 2 // normalizes {-1 to 1} to {0 to 1}
            delta.glitchtime.inFrames = fluxtime * delta.realtime.inFrames
            delta.glitchtime.inSeconds = fluxtime * delta.realtime.inSeconds
            delta.glitchtime.inMilliseconds = fluxtime * delta.realtime.inMilliseconds
            delta.glitchtime.inNormals = fluxtime
        } else {
            delta.glitchtime = delta.realtime
            delta.glitchtime.inNormals = 1
        }

        ////////////////////////
        // Updating Entities //
        //////////////////////

        if(this.player == undefined) {
            if(Object.keys(this.explosions).length == 0
            && Object.keys(this.projectiles).length == 0
            && Object.keys(this.thugs).length == 0) {
                this.time = 0
                this.player = new Player({
                    game: this
                })
            }
        }

        for(var key in this.stars) {
            this.stars[key].update(delta)
        }

        for(var key in this.explosions) {
            this.explosions[key].update(delta)
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

        if(this.exe != undefined) {
            this.exe.update(delta)
        }

        if(this.player != undefined) {
            if(hasOverclocked == false && timesDied >= TIMES_TO_DIE) {
                if(this.exe == undefined) {
                    this.exe = new EXE({
                        game: this,
                    })
                }
            } else {
                if(Object.keys(this.thugs).length < AMOUNT_OF_THUGS * (hasOverclocked ? 1.5 : 2)) {
                    var thug = new Thug({
                        game: this,
                        position: {
                            x: (Math.random() * WIDTH * 0.80) + (WIDTH * 0.10),
                            y: (Math.random() * HEIGHT * -0.5)
                        }
                    })
                }
            }
        }

        /////////////////////////
        // Rendering Entities //
        ///////////////////////

        //if(hasOverclocked != false) {
        render.canvas.context.fillStyle = "rgba(42, 43, 42, " + delta.glitchtime.inNormals + ")"
        render.canvas.context.fillRect(0, 0, WIDTH, HEIGHT)
        //}

        if(this.player == undefined
        || delta.glitchtime.inNormals > 0.9) {
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

        if(this.exe != undefined) {
            render.render(this.exe)
        }

        if(this.player != undefined) {
            render.render(this.player)

            if(this.player.killcount > 0) {
                render.renderText(this.player.killcount + " out of 20", {
                    x: undefined, y: HEIGHT - (10 * 2)
                })
            } else {
                render.renderText("YOU WIN!!", {
                    x: undefined, y: HEIGHT - (10 * 2)
                })
            }
        }

        for(var key in this.explosions) {
            render.renderCircle(this.explosions[key])
        }

        if(this.string != undefined) {
            render.renderText(this.string, {y: HEIGHT / 2})
        }
    }
}
