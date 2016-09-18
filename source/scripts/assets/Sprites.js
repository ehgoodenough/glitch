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
        "B": BLUE,
        ",": BLACK,
        "X": GRAY,
        ".": BLACK,
        "R": RED,
        "W": WHITE,
    })
}
