// ----------------------------------------------------------
// Constant
// ----------------------------------------------------------
//var IMAGE_DATA = 'fruits.png'
//var IMAGE_SIZE = 16; // fruits.png
var IMAGE_DATA = 'ukedon.png'
var IMAGE_SIZE = 52; // ukedon.png

var GRID_SIZE = 52;

//var BOARD_SIZE_X = 480;
//var BOARD_SIZE_Y = 400;
var BOARD_SIZE_X = GRID_SIZE * 13;
var BOARD_SIZE_Y = GRID_SIZE * 10;

// ----------------------------------------------------------
//
// ----------------------------------------------------------
enchant();

// ----------------------------------------------------------
//
// ----------------------------------------------------------
var checked = 0;
var stage   = 1;
var board, game, boardGroup;

// ----------------------------------------------------------
//
// ----------------------------------------------------------
var stages = {
    1: {width: 8, height: 8, bonus: 100},
    2: {width: 10, height: 8, bonus: 100},
    3: {width: 13, height: 8, bonus: 100},
    4: {width: 13, height: 10, bonus: 100},
    5: {width: 13, height: 10, bonus: 100},
    6: {width: 13, height: 10, bonus: 100},
    7: {width: 13, height: 10, bonus: 100},
    8: {width: 13, height: 10, bonus: 100},
    9: {width: 13, height: 10, bonus: 100},
    10: {width: 13, height: 10, bonus: 100}
};

// ----------------------------------------------------------
//
// ----------------------------------------------------------
window.onload = function() {

    BOARD_SIZE_X = window.innerWidth;
    BOARD_SIZE_Y = window.innerHeight;

    if (BOARD_SIZE_X >= BOARD_SIZE_Y) {
        GRID_SIZE = BOARD_SIZE_X / 13;
    } else {
        GRID_SIZE = BOARD_SIZE_Y / 10;
    }

    game = new Core(BOARD_SIZE_X, BOARD_SIZE_Y);
    game.fps = 20;
    //game.preload('fruits.png', 'bar.png', 'clear.png', 'se2.wav', 'se6.wav', 'se7.wav', 'lock2.wav', 'jingle03.wav', 'bomb2.wav', 'bomb3.wav');
    //game.preload('fruits.png', 'bar.png', 'clear.png');
    game.preload(IMAGE_DATA);

    boardGroup = new Group();
    game.rootScene.addChild(boardGroup);

    windowInfo(BOARD_SIZE_X, BOARD_SIZE_Y);

    // Core onload
    game.onload = function() {
        resetBoard();


        game.texts = [];
        game.pinch = false;
    };

    // enterframe
    game.rootScene.addEventListener('enterframe',
        function() {
            for (var p in board) {
                for (var q in board[p]) {
                    var fruit = board[p][q];
                }
            }
        }
    );
    game.start();
};

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function windowInfo(windowWidth, windowHeight) {
    //var windowWidth  = window.innerWidth;
    //var windowHeight = window.innerHeight;

console.log("windowWidth  = " + windowWidth);
console.log("windowHeight = " + windowHeight);
console.log("GRID_SIZE    = " + GRID_SIZE);

/*
    var width = new Label();
    width.text = "windowWidth = " + windowWidth;
    width.width = 128;
    width.height = 64;
    width.x      = 10;
    width.y      = 10;
    width.font = "12px 'Arial'";
    game.rootScene.addChild(width);

    var height = new Label();
    height.text = "windowHeight = " + windowHeight;
    height.width  = 128;
    height.height = 64;
    height.x      = 10;
    height.y      = 30;
    height.font = "12px 'Arial'";
    game.rootScene.addChild(height);
*/
}
// ----------------------------------------------------------
//
// ----------------------------------------------------------
function clearBoard() {
    for (var p in board) {
        for (var q in board[p]) {
            boardGroup.removeChild(board[p][q]);
        }
    }
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function resetBoard() {
    width = stages[stage].width;
    height = stages[stage].height;

    board = new Array(width);
    for (var i = 0; i < width; i++) {
        board[i] = new Array(height);
        for (var j = 0; j < height; j++) {
            board[i][j] = new Sprite(IMAGE_SIZE, IMAGE_SIZE);
            board[i][j].scaleX = GRID_SIZE / IMAGE_SIZE;
            board[i][j].scaleY = GRID_SIZE / IMAGE_SIZE;

            board[i][j].x = 0;
            board[i][j].y = 0;

            board[i][j].i = i;
            board[i][j].j = j;
            board[i][j].checked = false;
            board[i][j].image = game.assets[IMAGE_DATA];
            board[i][j].frame = rand(4) + 1;

            boardGroup.addChild(board[i][j]);
            board[i][j].update = function() {
                this.x = this.i * GRID_SIZE + 10;
                this.y = BOARD_SIZE_Y - (this.j + 1) * GRID_SIZE;
            }
            board[i][j].update();
        }
    }
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            board[i][j].addEventListener(
                'touchstart',
                function() {
                    click(this.i, this.j)
                }
            );
        }
    }
}


// ----------------------------------------------------------
//
// ----------------------------------------------------------
function click(i, j) {
    clearcheck();

    checked = 0;
    check(i, j);

    if (checked > 1) {
        if (checked >= 5) {
            bonus = Math.pow(checked - 2, 2) * 10 / (stage + 2);
        } else {
            //var se = game.assets['se2.wav'].clone();
            //se.play();
        }

        for (var p = width - 1; p >= 0; p--) {
            if (board[p]) {
                if (board[p].length == 0) {
                    board.splice(p, 1);
                } else {
                    for (var q = height - 1; q >= 0; q--) {
                        if (board[p][q] && board[p][q].checked) {
                            boardGroup.removeChild(board[p][q]);
                            board[p].splice(q, 1);
                        }
                    }
                }
            }
        }

        var newBoard = [];
        for (var p = 0; p < width; p++) {
            if (board[p] && board[p].length > 0) {
                for (var q in board[p]) {
                    board[p][q].i = newBoard.length;
                    board[p][q].update();
                }
                newBoard.push(board[p]);
            }
        }
        board = newBoard;
        newBoard = []

        for (var p in board) {
            newBoard[p] = [];
            for (var q = 0; q < height; q++) {
                if (board[p][q]) {
                    newBoard[p].push(board[p][q]);
                    board[p][q].j = q;
                    board[p][q].update();
                }
            }
        }
    } else {
        //お手つき
    }
    if (endcheck()) {
        var bonus = stages[stage].bonus;

        stage++;

        if (!stages[stage]) {
        } else {
            clearBoard();
            resetBoard();
        }
    }
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function clearcheck() {
    for (var p in board) {
        for (var q in board[p]) {
            board[p][q].checked = false;
        }
    }
    checked = 0;
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function endcheck() {
    for (var p in board) {
        for (var q in board[p]) {
            if (board[p][q].frame == 0)
                continue;
            clearcheck();
            check(p, q);
            if (checked > 1) {
                return false;
            }
        }
    }
    return true;
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function check(i, j) {
    if (board[i][j].checked) {
        return false;
    }

    board[i][j].checked = true;
    if (board[i - 1] && board[i - 1][j] && board[i][j].frame == board[i - 1][j].frame)
        check(i - 1, j);

    if (board[i + 1] && board[i + 1][j] && board[i][j].frame == board[i + 1][j].frame)
        check(i + 1, j);


    if (board[i] && board[i][j + 1] && board[i][j].frame == board[i][j + 1].frame)
        check(i, j + 1);

    if (board[i] && board[i][j - 1] && board[i][j].frame == board[i][j - 1].frame)
        check(i, j - 1);


    checked++;
    return true;
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function rand(max) {
    return Math.floor(Math.random() * max)
}
