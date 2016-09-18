var KEY = 0

const WIDTH = 9 * 14
const HEIGHT = 16 * 14

var game = new Game()

var render = new Render({
    width: WIDTH, height: HEIGHT
})

var loop = new Loop(function(delta) {
    game.update(delta)
})
