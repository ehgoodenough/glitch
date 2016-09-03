class Game {
    constructor() {
        this.player = new Player()

        this.thug = new Thug()
    }
    update(delta) {
        this.player.update(delta)
        this.thug.update(delta)

        render.clear()
        render.render(game.thug)
        render.render(game.player)
    }
}
