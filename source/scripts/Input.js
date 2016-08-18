var Input = {
    state: {},
    keycodes: {
        "W": 87,
        "S": 83,
        "A": 65,
        "D": 68,
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
