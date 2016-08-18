class Player {
    constructor() {
        this.x = 14
        this.y = 14
        this.width = 7
        this.height = 7
        this.color = "orange"
        this.speed = 4
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

var player = new Player()

var render = new Render({
    width: 640 / 6,
    height: 360 / 6,
})

var loop = new Loop(function(delta) {
    player.update(delta)
    render.render(player)
})
