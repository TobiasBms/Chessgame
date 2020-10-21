var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
Painting and initializing the board.
*/
var Board = /** @class */ (function () {
    /*
        Context gets used through the
        methods to be able to draw to the Canvas.
    */
    function Board(context) {
        this.context = null;
        this.context = context;
    }
    /*
        Paints and initialze and image for each square
        on the board.
    */
    Board.prototype.createSquare = function (field, fieldSize) {
        this.drawBackground(field, fieldSize);
        this.drawImage(field, fieldSize);
    };
    Board.prototype.boardClicked = function (fields, x, y, fieldSize) {
        var tileW = 100;
        var ratioX = x / tileW;
        var ratioY = y / tileW;
        var xFloored = Math.floor(ratioX);
        var yFloored = Math.floor(ratioY);
        var currentClick = fields[xFloored][yFloored];
        if (!this.lastClick && currentClick.hasChessPiece()) {
            this.lastClick = currentClick;
            console.log("start turn");
        }
        else {
            console.log("Attempt to finish turn");
            var isMoveValid = this.lastClick.chessPiece.validateMove(this.lastClick.x, this.lastClick.y, currentClick.x, currentClick.y, new Player());
            if (isMoveValid) {
                console.log("finish turn");
                currentClick.setChessPiece(this.lastClick.getChessPiece());
                this.lastClick.removeChessPiece();
                this.lastClick = null;
            }
            else {
                this.lastClick = null;
            }
        }
    };
    /*
        Paints a specific image to the field.
    */
    Board.prototype.drawImage = function (field, fieldSize) {
        var _this = this;
        if (field.chessPiece !== null) {
            var base_image_1 = new Image();
            base_image_1.src = field.chessPiece.getImage();
            base_image_1.onload = function () {
                _this.context.drawImage(base_image_1, field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
            };
        }
    };
    /*
        Paints the background color of the context square.
    */
    Board.prototype.drawBackground = function (field, fieldSize) {
        this.context.beginPath();
        if (field.isBlack) {
            this.context.fillStyle = "#EAC89E";
        }
        else {
            this.context.fillStyle = "#263549";
        }
        this.context.fillRect(field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
    };
    /*
        Initialzing the board
    */
    Board.prototype.createBoard = function (fields, fieldSize) {
        fields.forEach(function (row, idy) {
            row.forEach(function (field, idx) {
                field.setupPieces();
            });
        });
    };
    Board.prototype.drawBoard = function (fields, fieldSize) {
        var _this = this;
        fields.forEach(function (row, idy) {
            var straightNumber = idy % 2 === 0;
            row.forEach(function (field, idx) {
                field.isBlack = (straightNumber ? idx + 1 : idx) % 2 === 0;
                _this.createSquare(field, fieldSize);
            });
        });
    };
    return Board;
}());
var ChessPiece = /** @class */ (function () {
    function ChessPiece(isWhite, isKilled) {
        this.isWhite = isWhite;
        this.isKilled = isKilled;
    }
    return ChessPiece;
}());
var Field = /** @class */ (function () {
    function Field(x, y) {
        this.chessPiece = null;
        this.x = x;
        this.y = y;
    }
    Field.prototype.hasChessPiece = function () {
        if (this.chessPiece === null) {
            return;
        }
        return this.chessPiece;
    };
    Field.prototype.setChessPiece = function (chessPiece) {
        if (!this.chessPiece) {
            this.chessPiece = chessPiece;
        }
        else {
            throw new Error('Something bad happened with Chesspiece class');
        }
    };
    Field.prototype.getChessPiece = function () {
        return this.chessPiece;
    };
    Field.prototype.setupPieces = function () {
        if (this.x === 0 && this.y === 0) {
            this.setChessPiece(new Knight(this.isBlack, false));
        }
        if (this.y === 1) {
            this.setChessPiece(new Pond(this.isBlack, false));
        }
        if (this.y === 6) {
            this.setChessPiece(new Pond(this.isBlack, false));
        }
    };
    Field.prototype.removeChessPiece = function () {
        this.chessPiece = null;
        console.log([this.x, this.y]);
    };
    return Field;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.width = 0;
        this.height = 0;
        this.context = null;
        this.canvas = document.querySelector("#root");
        this.boardPixelSize = 800;
        this.boardRectsOnXAndY = 8;
        this.context = this.canvas.getContext("2d");
        this.board = new Board(this.context);
    }
    Game.prototype.setupGame = function () {
        var _this = this;
        var fieldSize = this.boardPixelSize / this.boardRectsOnXAndY;
        this.width = this.canvas.width = this.boardPixelSize;
        this.height = this.canvas.height = this.boardPixelSize;
        //Create background for ui
        this.context.strokeStyle = "white";
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
        this.context.fill();
        var fields = [];
        for (var i = 0; i < this.boardRectsOnXAndY; i++) {
            var row = [];
            for (var j = 0; j < this.boardRectsOnXAndY; j++) {
                row.push(new Field(j, i));
            }
            fields.push(row);
        }
        this.canvas.addEventListener('mousedown', function (e) {
            var canvasX = e.offsetX; // Canvas clikced X cord
            var canvasY = e.offsetY; // Canvas Clicked Y cord
            _this.board.boardClicked(fields, canvasY, canvasX, fieldSize);
            _this.board.drawBoard(fields, fieldSize);
        });
        this.board.createBoard(fields, fieldSize);
        this.board.drawBoard(fields, fieldSize);
    };
    Game.prototype.render = function () {
    };
    Game.prototype.update = function () {
        //If there has been made any changes apply thoese changes
        console.log("Updated");
    };
    Game.prototype.userInput = function () {
    };
    Game.prototype.startGame = function () {
    };
    return Game;
}());
function start() {
    var game = new Game();
    game.startGame();
    game.setupGame();
    game.render();
}
window.onload = function () {
    start();
};
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Knight.prototype.validateMove = function () { };
    Knight.prototype.getImage = function () {
        return "./assets/knight.png";
    };
    Knight.prototype.setWhite = function () { };
    return Knight;
}(ChessPiece));
var Player = /** @class */ (function () {
    function Player() {
        this._isWhite = true;
    }
    Player.prototype.isWhite = function () {
        return this._isWhite;
    };
    return Player;
}());
var Pond = /** @class */ (function (_super) {
    __extends(Pond, _super);
    function Pond(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Pond.prototype.canMoveDiagonal = function (fromX, toX, fromY, toY, player) {
        return ((fromY + 1 === toY && fromX + 1 === toX) || (fromY + 1 === toY && fromX - 1 === toX));
    };
    Pond.prototype.canMoveForward = function (fromX, toX, fromY, toY, player) {
        if (player.isWhite()) {
            if (fromX !== toX) {
                console.log("1");
                return false;
            }
            if (fromY + 1 !== toY && fromY + 2 !== toY) {
                console.log("2");
                return false;
            }
            return true;
        }
        else {
            if (fromX !== toX) {
                return false;
            }
            if (fromY - 1 !== toY) {
                return false;
            }
            if (fromY - 1 !== toY && fromY - 2 !== toY) {
                return false;
            }
            return true;
        }
    };
    Pond.prototype.validateMove = function (fromX, fromY, toX, toY, player) {
        /*
            
            The pond can only move 2 or 1 field forward.
            If it's not the first move it can move 1 forward.
            If there is a chessPiece diagonal then it may move diagonal 1 field.

        */
        return this.canMoveDiagonal(fromX, toX, fromY, toY, player) || this.canMoveForward(fromX, toX, fromY, toY, player);
    };
    Pond.prototype.move = function (x, y) {
    };
    Pond.prototype.getImage = function () {
        return "./assets/pond.jpg";
    };
    Pond.prototype.setWhite = function () {
    };
    return Pond;
}(ChessPiece));
