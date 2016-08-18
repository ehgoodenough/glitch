# Glitchtime | Glitchlag | Glitchflux #

A game for [js13k 2016](http://2016.js13kgames.com). A game about a glitch in time.

### Getting Started ###

Have node v4 and npm v3.

    $ node --version
    $ npm --version

Build the game.

    $ npm install
    $ node build

When reading the code, start at `source/index.js`.

### Requirements ###

Must be less than 13 kilobytes when zipped.

Support at least Chrome and Firefox.

### Roadmap ###

The deadline for submission is September 13th, 2016.

- ~~Compile the project. The code should be babelifed, concatenated, minified, zipped, hosted and watched. The code includes both scripts and styles.~~
- ~~Render a square to the screen. Maybe define a rendering layer that interfaces with your models on what to draw to the screen. Investigate the option to be GPU-accelerated.~~
- Listen for input from the keyboard. You'll need to establish a loop before you can poll for input. Get the keyboard to move the square around on the screen.
- Tinker around with the glitch effect. I'm thinking about just drawing a lot of random colored squares following the player. Have them shrink out or fade out or both?
- Add some other sprites. Spawn and move the sprites from right to left.
- Slowdown and speedup time. If it's easier, just jump between speeds, and worry about smoothing between speeds later.

### License ###

This project is licensed under MIT.
