import Sprite from "scripts/utility/Sprite.js"
import COLORS from "scripts/utility/Colors.js"

var SPRITES = {
    "rocket": [
        "  BB  BB  ",
        " B,B  B,B ",
        " B,B  B,B ",
        "B,,B  B,BB",
        "B,,BBBB,,B",
        "B,,,,,,,,B",
        "B,,,,,,,,B",
        " B,,WW,,B ",
        " B,,WW,,B ",
        "B,,,WW,,,B",
        "B,,,,,,,,B",
        "B,,,,,,,,B",
        " B,,,,,,B ",
        " BB,,,,BB ",
        "   BBBB   ",
    ],
    "ufo": [
        "     XXXXX     ",
        "    X.....X    ",
        "   X.......X   ",
        "   X..WWW..X   ",
        "  X...WWW...X  ",
        " X...........X ",
        "X.............X",
        "X.............X",
        " XX.........XX ",
        "   XXXXXXXXX   ",
    ]
}

for(var key in SPRITES) {
    SPRITES[key] = new Sprite(SPRITES[key], {
        "B": COLORS.BLUE,
        ",": COLORS.BLACK,
        "X": COLORS.GRAY,
        ".": COLORS.BLACK,
        "R": COLORS.RED,
        "W": COLORS.WHITE,
    })
}

export default SPRITES
