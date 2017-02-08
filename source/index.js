window.KEY = 0

import Game from "scripts/models/Game.js"
import Loop from "scripts/utility/Loop.js"

var game = new Game()

var loop = new Loop(function(delta) {
    game.update(delta)
})
