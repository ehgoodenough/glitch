var KEY = 0

const WIDTH = 360 / 2
const HEIGHT = 640 / 2

var game = new Game()

var render = new Render({width: WIDTH, height: HEIGHT})

var loop = new Loop(function(delta) {
    game.update(delta)
})
