import COLORS from "scripts/assets/Colors.js"

import Screen from "scripts/data/Screen.js"

export default class EXE {
    constructor(protoexe) {
        this.position = {
            x: Screen.width * 0.5,
            y: Screen.height * -0.25,
        }
        this.anchor = {x: 0.5, y: 0.5}
        this.width = 20
        this.height = 20

        this.game = protoexe.game
    }
    get color() {
        return COLORS[Math.random() < 0.5 ? "ORANGE" : "WHITE"]
    }
    update(delta) {
        this.position.y += 0.5 * delta.glitchtime.inFrames
        if(this.position.y > Screen.height * 0.5) {
            this.position.y = Screen.height * 0.5
        }

        if(this.game.player.position.x <= this.position.x + (this.width * this.anchor.x)
        && this.game.player.position.x >= this.position.x - (this.width * this.anchor.x)
        && this.game.player.position.y <= this.position.y + (this.height * this.anchor.y)
        && this.game.player.position.y >= this.position.y - (this.height * this.anchor.y)) {
            delete this.game.exe
            window.hasOverclocked = true
            window.localStorage.hasOverclocked = true
            this.game.string = "OVERCLOCKED"
            window.setTimeout(() => {
                delete this.game.string
            }, 1000)
        }
    }
}
