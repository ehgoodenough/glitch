const GAMEPAD_THRESHOLD = 0.05

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
    },
    getDirection: function() {
        var x = 0
        var y = 0

        if(this.isDown("A") || this.isDown("LEFT")) {
            x = -1
        }
        if(this.isDown("D") || this.isDown("RIGHT")) {
            x = +1
        }
        if(this.isDown("W") || this.isDown("UP")) {
            y = -1
        }
        if(this.isDown("S") || this.isDown("DOWN")) {
            y = +1
        }

        var gamepads = navigator.getGamepads()
        if(gamepads[0] != undefined
        && gamepads[0].connected == true
        && gamepads[0].mapping == "standard") {
            var gx = gamepads[0].axes[0]
            var gy = gamepads[0].axes[1]
            if(getMagnitude(gx, gy) > GAMEPAD_THRESHOLD) {
                x = gx
                y = gy
            }
        }

        return {"x": x, "y": y}
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

function getMagnitude(x, y) {
    return Math.sqrt(x*x + y*y) || 0
}
