var Board = /** @class */ (function () {
    function Board(context) {
        this.fields = [];
        this.context = null;
        this.context = context;
    }
    Board.prototype.createSquare = function (x, y, isBlack, fieldSize) {
        this.context.beginPath();
        if (isBlack) {
            this.context.fillStyle = "red";
        }
        else {
            this.context.fillStyle = "blue";
        }
        this.context.strokeRect(x * fieldSize, y * fieldSize, fieldSize, fieldSize);
        this.context.fillRect(x * fieldSize, y * fieldSize, fieldSize, fieldSize);
    };
    Board.prototype.createBoard = function (fields, fieldSize) {
        var _this = this;
        fields.forEach(function (row, idy) {
            var straightNumber = idy % 2 === 0;
            row.forEach(function (field, idx) {
                var isBlack = (straightNumber ? idx + 1 : idx) % 2 === 0;
                fields[idy][idx].init(idy, idx, isBlack);
                _this.createSquare(idy, idx, isBlack, fieldSize);
            });
        });
    };
    return Board;
}());
var ChessPiece = /** @class */ (function () {
    function ChessPiece() {
    }
    return ChessPiece;
}());
var Field = /** @class */ (function () {
    function Field(x, y) {
        this.chessPiece = null;
        this.x = x;
        this.y = y;
    }
    Field.prototype.setChessPiece = function (chessPiece) {
        if (!this.chessPiece) {
            this.chessPiece = chessPiece;
        }
        else {
            console.log("Chesspiece fejler");
        }
    };
    Field.prototype.getChessPiece = function () {
        return this.chessPiece;
    };
    Field.prototype.init = function (x, y, isBlack) {
    };
    return Field;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.width = 0;
        this.height = 0;
        this.context = null;
        this.canvas = document.querySelector("#root");
        this.context = this.canvas.getContext("2d");
        this.board = new Board(this.context);
    }
    Game.prototype.setupGame = function () {
    };
    Game.prototype.render = function () {
        var _a, _b;
        var boardPixelSize = 800;
        var boardSize = 8;
        this.width = this.canvas.width = boardPixelSize;
        this.height = this.canvas.height = boardPixelSize;
        //Create background for ui
        this.context.strokeStyle = "white";
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.rect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
        (_b = this.context) === null || _b === void 0 ? void 0 : _b.fill();
        var fields = [];
        for (var i = 0; i < boardSize; i++) {
            var row = [];
            for (var j = 0; j < boardSize; j++) {
                row.push(new Field(j, i));
            }
            fields.push(row);
        }
        this.board.createBoard(fields, boardPixelSize / boardSize);
    };
    Game.prototype.userInput = function () {
    };
    Game.prototype.startGame = function () {
        console.log(this.board);
    };
    return Game;
}());
(function IFFE() {
    var game = new Game();
    game.startGame();
    game.render();
})();
