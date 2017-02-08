# Overclock #

A game for [js13k 2016](http://2016.js13kgames.com). A game about a glitch in time.

![Overclock](http://i.imgur.com/MK3MwRu.png)

### Getting Started ###

Have node v4 and npm v3.

    $ node --version
    $ npm --version

Build the game.

    $ npm install
    $ npm start

When reading the code, start at `source/index.js`.

### Credits ###

[Code by ehgoodenough](http://github.com/ehgoodenough/overclock). [Font by DuffsDevice](http://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=468)


### License ###

This project is licensed under MIT.

### To Do ###

#### Code Smells ####
- Remove the global variables defined in `Game.js`.
- Remove the duplicate declarations of `WIDTH` and `HEIGHT`.
- Move `SPRITES` and `COLORS` into a data directory.

#### Dev Life ####

- Import `statgrab`.
