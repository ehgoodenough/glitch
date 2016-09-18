var Input = {
    state: {},
    keycodes: {
        "W": 87,
        "S": 83,
        "A": 65,
        "D": 68,
        "UP": 38,
        "DOWN": 40,
        "LEFT": 37,
        "RIGHT": 39,
    },
    isDown: function(keycode) {
        keycode = this.keycodes[keycode] || keycode
        return !!this.state[keycode]
    }
}

document.addEventListener("keydown", function(event) {
    Input.state[event.keyCode] = window.performance.now()
})

document.addEventListener("keyup", function(event) {
    delete Input.state[event.keyCode]
})

var inp = {
    x: 0,
    y: 0,
    mouse: {
        isDown: false,
        position: {
            x: 0,
            y:0,
        }
    }
}

const MOUSE_SENSITIVITY = 2

document.addEventListener("mousedown", function(event) {
    inp.mouse.isDown = true
    inp.mouse.x = event.clientX
    inp.mouse.y = event.clientY
})

document.addEventListener("mousemove", function(event) {
    if(inp.mouse.isDown == true) {
        inp.x += (event.clientX - inp.mouse.x) / MOUSE_SENSITIVITY
        inp.y += (event.clientY - inp.mouse.y) / MOUSE_SENSITIVITY
        inp.mouse.x = event.clientX
        inp.mouse.y = event.clientY
    }
})

document.addEventListener("mouseup", function(event) {
    inp.mouse.isDown = false
})
