const WIDTH = 640 / 4
const HEIGHT = 360 / 4

class Game {
    constructor() {
        this.player = new Player()
    }
    update(delta) {
        this.player.update(delta)

        
        render.render(game.player)
    }
}

class Player {
    constructor() {
        this.color = "#FFF"
        this.x = WIDTH / 2
        this.y = HEIGHT / 2
        this.ax = 0.5
        this.ay = 0.5
        this.width = 12
        this.height = 12
    }
    update(delta) {
        if(Input.isDown("W")) {
            this.y -= 1
        }
        if(Input.isDown("S")) {
            this.y += 1
        }
        if(Input.isDown("A")) {
            this.x -= 1
        }
        if(Input.isDown("D")) {
            this.x += 1
        }
    }
}

var game = new Game()

var render = new Render({
    width: WIDTH, height: HEIGHT
})

var loop = new Loop(function(delta) {
    game.update(delta)
})
