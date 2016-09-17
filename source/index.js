var KEY = 0

const WIDTH = 180
const HEIGHT = 320

var game = new Game()

var render = new Render({
    width: WIDTH, height: HEIGHT
})

var loop = new Loop(function(delta) {
    game.update(delta)
})
