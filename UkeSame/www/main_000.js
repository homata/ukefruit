// ----------------------------------------------------------
// Constant
// ----------------------------------------------------------
var IMAGE_DATA = 'fruits.png'
var IMAGE_SIZE = 16; // fruits.png
//var IMAGE_DATA = 'ukedon.png'
//var IMAGE_SIZE = 52; // ukedon.png

// ----------------------------------------------------------
//
// ----------------------------------------------------------
enchant();

// ----------------------------------------------------------
//
// ----------------------------------------------------------
var BLOCK_SIZE = 30;
var SCREEN_CELL_X = 10;
var SCREEN_CELL_Y = 10;
var SCREEN_SIZE_HEIGHT = BLOCK_SIZE * SCREEN_CELL_Y;
var SCREEN_SIZE_WIDTH = BLOCK_SIZE * SCREEN_CELL_X;

// ----------------------------------------------------------
//
// ----------------------------------------------------------
window.onload = function(){
  var game = new Core(320, 320);
  game.fps = 15;
  game.preload("ukedon.png");

  game.onload = function(){
    var bear = new Sprite(52, 52);
    bear.image = game.assets["ukedon.png"];
    bear.x = 0;
    bear.y = 0;
    bear.frame = 5;

    game.rootScene.addChild(bear);

    bear.addEventListener("enterframe", function(){
      this.x += 1;
      this.frame = this.age % 2 + 6;
    });

    bear.addEventListener("touchstart", function(){
      game.rootScene.removeChild(bear);
    });
  };

  game.start();
};

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function rand(max) {
    return Math.floor(Math.random() * max)
}
