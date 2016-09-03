class Game {
    constructor() {
        this.player = new Player()
    }
    update(delta) {
        this.player.update(delta)


        render.render(game.player)
    }
}
