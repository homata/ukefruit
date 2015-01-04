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
var gchecked = 0;
var stage = 1;
var board, game, boardGroup;

// ----------------------------------------------------------
//
// ----------------------------------------------------------
var stages = {
     0: {width:  4, height:  4, bonus: 100, item: 3},
     1: {width:  8, height:  8, bonus: 100, item: 3},
     2: {width: 10, height:  8, bonus: 100, item: 3},
     3: {width: 13, height:  8, bonus: 100, item: 4},
     4: {width: 13, height: 10, bonus: 100, item: 4},
     5: {width: 13, height: 10, bonus: 100, item: 5},
     6: {width: 13, height: 10, bonus: 100, item: 5},
     7: {width: 13, height: 10, bonus: 100, item: 6},
     8: {width: 13, height: 10, bonus: 100, item: 6},
     9: {width: 13, height: 10, bonus: 100, item: 6},
    10: {width: 13, height: 10, bonus: 100, item: 6}
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

    width  = stages[stage].width;
    height = stages[stage].height;
    var item = stages[stage].item;

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
            board[i][j].frame = rand(item);

            boardGroup.addChild(board[i][j]);
            board[i][j].update = function() {
                this.x = this.i * GRID_SIZE;
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

    check(i, j);

    if (gchecked > 1) {
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

        // 縦方向を詰める
        var newBoard = [];
        for (var p = 0; p < width; p++) {
            if (board[p] && board[p].length > 0) {
                newBoard.push(board[p]);
            }
        }
        board = newBoard;

        //　更新座標設定
        for (var p in board) {
            for (var q = 0; q < height; q++) {
                if (board[p][q]) {
                    board[p][q].i = parseInt(p);
                    board[p][q].j = q;
                    board[p][q].update();
                }
            }
        }

    } else {
        //お手つき
    }

    if (endcheck()) {
        //var bonus = stages[stage].bonus;

        stage ++;

        if (!stages[stage]) {
            // ステージデータ終了
        } else {
            alert(stage - 1 + " Stage End");

            // 次のステージへ
            clearBoard();
            resetBoard();
        }
    }
}

// ----------------------------------------------------------
//　チェックフラグクリア
// ----------------------------------------------------------
function clearcheck() {
    for (var p in board) {
        for (var q in board[p]) {
            board[p][q].checked = false;
        }
    }
    gchecked = 0;
}

// ----------------------------------------------------------
//　総当りで消去可能データをチェック
// ----------------------------------------------------------
function endcheck() {
    for (var p in board) {
        for (var q in board[p]) {
            /*
            if (board[p][q].frame == 0)
                continue;
            */
            clearcheck();
            check(p, q);

            // 消去可能データあり
            if (gchecked > 1) {
                return false;
            }
        }
    }
    // 消去可能データなし
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

    gchecked ++;
    return true;
}

// ----------------------------------------------------------
//
// ----------------------------------------------------------
function rand(max) {
    return Math.floor(Math.random() * max)
}
