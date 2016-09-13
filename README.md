# Overclock #

A game for [js13k 2016](http://2016.js13kgames.com). A game about a glitch in time.

![Overclock](http://i.imgur.com/MK3MwRu.png)

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
- ~~Listen for input from the keyboard. You'll need to establish a loop before you can poll for input. Get the keyboard to move the square around on the screen.~~
- ~~Add some other sprites for the enemies. Spawn and move the sprites from top to bottom.~~
- ~~Slowdown and speedup time. If it's easier, just jump between speeds, and worry about smoothing between speeds later.~~
- ~~Add the smearing glitch effect during slowdown and speedup.~~
- ~~Spawn a bunch of projectiles, which can collide with you or your enemies. Spawn more enemies, who can also spawn a bunch of projectiles. If you get hit by a projectile, you die and respawn.
- ~~Juice it up with stars and explosions.~~
- ~~Add a victory condition.~~
- Add sound.

### License ###

This project is licensed under MIT.
