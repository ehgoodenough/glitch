class Render {
    constructor(render) {
        this.canvas = document.createElement("canvas")
        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.width = render.width || 640
        this.canvas.height = render.height || 360

        document.getElementById("frame").appendChild(this.canvas)
    }
    clear() {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    render(entity) {
        this.canvas.context.save()
        this.canvas.context.translate(
            Math.floor(entity.position.x),
            Math.floor(entity.position.y)
        )
        this.canvas.context.rotate(entity.rotation || 0)
        this.canvas.context.fillStyle = entity.color || "hotpink"
        this.canvas.context.fillRect(
            entity.width * entity.anchor.x * -1,
            entity.height * entity.anchor.y * -1,
            entity.width,
            entity.height
        )
        this.canvas.context.restore()
    }
    renderCircle(entity) {
        this.canvas.context.fillStyle = entity.color || "#FFF"
        this.canvas.context.beginPath()
        this.canvas.context.arc(
            entity.position.x,
            entity.position.y,
            entity.size,
            0, Math.PI * 2,
            false
        )
        this.canvas.context.fill()
    }
    renderText(string, position) {
        // this.canvas.context.fillStyle = "#FFF"
        // this.canvas.context.font = "24px monospace"
        // this.canvas.context.fillText(string, position.x, position.y)

        if(position.x == undefined) {
            var width = 0

            for(var key in string) {
                var character = string[key].toUpperCase()
                if(FONT[character] != undefined) {
                    width += FONT[character].width
                    width += FONT_SCALE
                }
            }

            width -= FONT_SCALE

            position.x = (WIDTH - width) / 2
        }

        for(var key in string) {
            var character = string[key].toUpperCase()
            if(FONT[character] != undefined) {
                this.canvas.context.drawImage(FONT[character].canvas, position.x, position.y)

                position.x += FONT[character].width
                position.x += FONT_SCALE
            }
        }
    }
}

const FONT_SCALE = 3
const FONT_COLOR = "#FFF"

class FontCharacter {
    constructor(protocharacter) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = protocharacter[0].length * FONT_SCALE
        this.canvas.height = protocharacter.length * FONT_SCALE

        this.canvas.context = this.canvas.getContext("2d")
        this.canvas.context.fillStyle = FONT_COLOR

        for(var y = 0; y < protocharacter.length; y++) {
            for(var x = 0; x < protocharacter[y].length; x++) {
                if(protocharacter[y][x] == "X") {
                    this.canvas.context.fillRect(
                        x * FONT_SCALE,
                        y * FONT_SCALE,
                        FONT_SCALE,
                        FONT_SCALE
                    )
                }
            }
        }
    }
    get width() {
        return this.canvas.width
    }
    get height() {
        return this.canvas.height
    }
}

var FONT = {
    " ": [
        " ",
        " ",
        " ",
        " ",
        " ",
    ],
    1: [
        " X",
        "XX",
        " X",
        " X",
        " X",
    ],
    2: [
        " XX ",
        "X  X",
        "  X ",
        " X  ",
        "XXXX",
    ],
    3: [
        "XXX ",
        "   X",
        " XXX",
        "   X",
        "XXX"
    ],
    4: [
        "  X ",
        " XX ",
        "X X ",
        "XXXX",
        "  X ",
    ],
    5: [
        "XXXX",
        "X   ",
        "XXX ",
        "   X",
        "XXX ",
    ],
    6: [
        " XX ",
        "X   ",
        "XXX ",
        "X  X",
        " XX ",
    ],
    7: [
        "XXXX",
        "   X",
        "  X ",
        " X  ",
        " X  ",
    ],
    8: [
        " XX ",
        "X  X",
        " XX ",
        "X  X",
        " XX",
    ],
    9: [
        " XX ",
        "X  X",
        " XXX",
        "   X",
        " XX ",
    ],
    0: [
        " XX ",
        "X  X",
        "X  X",
        "X  X",
        " XX",
    ],
    A: [
        " XX ",
        "X  X",
        "XXXX",
        "X  X",
        "X  X",
    ],
    B: [
        "XXX ",
        "X  X",
        "XXX ",
        "X  X",
        "XXX ",
    ],
    C: [
        " XX",
        "X  ",
        "X  ",
        "X  ",
        " XX",
    ],
    D: [
        "XXX ",
        "X  X",
        "X  X",
        "X  X",
        "XXX ",
    ],
    E: [
        "XXX",
        "X  ",
        "XX ",
        "X  ",
        "XXX",
    ],
    F: [
        "XXX",
        "X  ",
        "XXX",
        "X  ",
        "X  ",
    ],
    G: [
        " XXX",
        "X   ",
        "X XX",
        "X  X",
        " XXX",
    ],
    K: [
        "X  X",
        "X X ",
        "XX  ",
        "X X ",
        "X  X",
    ],
    L: [
        "X   ",
        "X   ",
        "X   ",
        "X   ",
        "XXXX",
    ],
    O: [
        " XX ",
        "X  X",
        "X  X",
        "X  X",
        " XX ",
    ],
    R: [
        "XXX ",
        "X  X",
        "X  X",
        "XXX ",
        "X  X",
    ],
    T: [
        "XXX",
        " X ",
        " X ",
        " X ",
        " X ",
    ],
    U: [
        "X  X",
        "X  X",
        "X  X",
        "X  X",
        " XX ",
    ],
    V: [
        "X  X",
        "X  X",
        "X X ",
        "X X ",
        " X  ",
    ]
}

for(var key in FONT) {
    FONT[key] = new FontCharacter(FONT[key])
}
