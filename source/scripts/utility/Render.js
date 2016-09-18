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

        if(entity.sprite) {
            this.canvas.context.drawImage(
                entity.sprite.canvas,
                entity.width * entity.anchor.x * -1,
                entity.height * entity.anchor.y * -1
            )
        } else {
            this.canvas.context.fillStyle = entity.color || "hotpink"
            this.canvas.context.fillRect(
                entity.width * entity.anchor.x * -1,
                entity.height * entity.anchor.y * -1,
                entity.width,
                entity.height
            )
        }
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
        if(position.x == undefined) {
            var width = 0 - PIXEL_SCALE
            for(var key in string) {
                var character = string[key].toUpperCase()
                if(FONT[character] != undefined) {
                    width += FONT[character].width
                    width += PIXEL_SCALE
                }
            }

            position.x = (WIDTH - width) / 2
        }

        for(var key in string) {
            var character = string[key].toUpperCase()
            if(FONT[character] != undefined) {
                this.canvas.context.drawImage(FONT[character].canvas, position.x, position.y)

                position.x += FONT[character].width
                position.x += PIXEL_SCALE
            }
        }
    }
}

const PIXEL_SCALE = 3

class Sprite {
    constructor(pixels, colors, scale) {
        scale = scale || PIXEL_SCALE
        this.canvas = document.createElement("canvas")
        this.canvas.width = pixels[0].length * scale
        this.canvas.height = pixels.length * scale

        this.canvas.context = this.canvas.getContext("2d")

        for(var y = 0; y < pixels.length; y++) {
            for(var x = 0; x < pixels[y].length; x++) {
                var pixel = pixels[y][x]
                if(colors[pixel] != undefined) {
                    this.canvas.context.fillStyle = colors[pixel]
                    this.canvas.context.fillRect(
                        x * scale,
                        y * scale,
                        scale, scale
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

const ORANGE = "#EF8A17"
const GREEN = "#008148"
const YELLOW = "#C6C013"
const RED = "#EF2917"
const BLUE = "#4A508A"
const WHITE = "#FFF"
const BLACK = "#000"

var FONT = {
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
    I: [
        "XXX",
        " X ",
        " X ",
        " X ",
        "XXX",
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
    N: [
        "X  X",
        "XX X",
        "X XX",
        "X  X",
        "X  X",
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
    ],
    W: [
        "X   X",
        "X   X",
        "X X X",
        "X X X",
        " X X ",
    ],
    Y: [
        "X  X",
        "X  X",
        " XXX",
        "   X",
        "XXX ",
    ],
    " ": [
        " ",
        " ",
        " ",
        " ",
        " ",
    ],
    "!": [
        "X",
        "X",
        "X",
        " ",
        "X",
    ]
}

for(var key in FONT) {
    FONT[key] = new Sprite(FONT[key], {
        "X": WHITE
    })
}

var SPRITES = {
    "rocket": [
        "  WW  WW  ",
        " WOW  WOW ",
        " WOW  WOW ",
        "WOOW  WOWW",
        "WOOWWWWOOW",
        "WOOOOOOOOW",
        "WOOOOOOOOW",
        " WOOOOOOW ",
        " WOOOOOOW ",
        "WOOOOOOOOW",
        "WOOOOOOOOW",
        "WOOOOOOOOW",
        " WOOOOOOW ",
        " WWOOOOWW ",
        "   WWWW   ",
    ],
    "ufo": [
        "W"
    ]
}

for(var key in SPRITES) {
    SPRITES[key] = new Sprite(SPRITES[key], {
        "W": BLUE,
        "O": BLACK,
    }, 2)
}
