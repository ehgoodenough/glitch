const WIDTH = 640 / 4
const HEIGHT = 360 / 4

var game = new Game()

var render = new Render({width: WIDTH, height: HEIGHT})

var loop = new Loop(function(delta) {
    game.update(delta)
})
