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
        this.lastClick = null;
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
    Board.prototype.boardClicked = function (fields, x, y) {
        var _a, _b, _c, _d;
        var tileW = 100;
        var ratioX = x / tileW;
        var ratioY = y / tileW;
        var xFloored = Math.floor(ratioX);
        var yFloored = Math.floor(ratioY);
        var currentClick = fields[xFloored][yFloored];
        console.log("currentClick", currentClick);
        if (!this.lastClick && currentClick.hasChessPiece()) {
            this.lastClick = currentClick;
            console.log("start turn");
        }
        else {
            console.log("Attempt to finish turn");
            var isMoveValid = (_b = (_a = this.lastClick) === null || _a === void 0 ? void 0 : _a.getChessPiece()) === null || _b === void 0 ? void 0 : _b.validateMove(this.lastClick.x, this.lastClick.y, currentClick.x, currentClick.y, 
            //Fix this to take the right player and not a new player
            new Player(true), currentClick);
            if (isMoveValid) {
                console.log("finish turn");
                if (this.lastClick) {
                    (_d = (_c = this.lastClick) === null || _c === void 0 ? void 0 : _c.getChessPiece()) === null || _d === void 0 ? void 0 : _d.incrementMoveCount();
                    currentClick.setChessPiece(this.lastClick.getChessPiece());
                    this.lastClick.removeChessPiece();
                }
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
        var _a, _b, _c, _d;
        if (field.getChessPiece() !== null) {
            var base_image_1 = new Image();
            console.log((_a = field.getChessPiece()) === null || _a === void 0 ? void 0 : _a.isWhite);
            base_image_1.src = (_d = (_b = field.getChessPiece()) === null || _b === void 0 ? void 0 : _b.getImageString((_c = field.getChessPiece()) === null || _c === void 0 ? void 0 : _c.isWhite)) !== null && _d !== void 0 ? _d : "";
            base_image_1.onload = function () {
                var _a;
                (_a = _this.context) === null || _a === void 0 ? void 0 : _a.drawImage(base_image_1, field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
            };
        }
    };
    /*
        Paints the background color of the context square.
    */
    Board.prototype.drawBackground = function (field, fieldSize) {
        if (this.context) {
            this.context.beginPath();
            if (field.isWhite) {
                this.context.fillStyle = "#EAC89E";
            }
            else {
                this.context.fillStyle = "#263549";
            }
            this.context.fillRect(field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
        }
    };
    /*
        Initialzing the board
    */
    Board.prototype.createBoard = function (fields) {
        fields.forEach(function (row) {
            row.forEach(function (field) {
                field.setupPieces();
            });
        });
    };
    Board.prototype.drawBoard = function (fields, fieldSize) {
        var _this = this;
        fields.forEach(function (row, idy) {
            var straightNumber = idy % 2 === 0;
            row.forEach(function (field, idx) {
                field.isWhite = (straightNumber ? idx + 1 : idx) % 2 === 0;
                _this.createSquare(field, fieldSize);
            });
        });
    };
    return Board;
}());
var ChessPiece = /** @class */ (function () {
    function ChessPiece(isWhite, isKilled) {
        this.moveCount = 0;
        this.isKilled = false;
        this.isWhite = false;
        this.isKilled = isKilled;
        this.isWhite = isWhite;
    }
    ChessPiece.prototype.incrementMoveCount = function () {
        this.moveCount++;
    };
    ChessPiece.prototype.getIsWhite = function () {
        return this.isWhite;
    };
    ChessPiece.prototype.getIsKilled = function () {
        return this.isKilled;
    };
    ChessPiece.prototype.setIsKilled = function () {
        this.isKilled = true;
    };
    ChessPiece.prototype.getMoveCount = function () {
        return this.moveCount;
    };
    return ChessPiece;
}());
var Field = /** @class */ (function () {
    function Field(x, y) {
        this.chessPiece = null;
        this.x = x;
        this.y = y;
        this.isWhite = false;
    }
    Field.prototype.hasChessPiece = function () {
        if (this.chessPiece !== null) {
            return this.chessPiece;
        }
        return null;
    };
    Field.prototype.setChessPiece = function (chessPiece) {
        if (!this.chessPiece) {
            this.chessPiece = chessPiece;
        }
    };
    Field.prototype.getChessPiece = function () {
        return this.chessPiece;
    };
    Field.prototype.setIsKilled = function () {
        var _a;
        (_a = this.chessPiece) === null || _a === void 0 ? void 0 : _a.setIsKilled();
    };
    Field.prototype.setupPieces = function () {
        //Horse
        if (this.x === 1 && this.y === 0 || this.x === 6 && this.y === 0) {
            this.setChessPiece(new Knight(true, false));
        }
        if (this.y === 7 && this.x == 1 || this.y === 7 && this.x === 6) {
            this.setChessPiece(new Knight(false, false));
        }
        //Runner
        if (this.y == 0 && this.x == 2 || this.y == 0 && this.x === 5) {
            this.setChessPiece(new Runner(true, false));
        }
        if (this.y == 7 && this.x == 2 || this.y == 7 && this.x === 5) {
            this.setChessPiece(new Runner(false, false));
        }
        //Queen
        if (this.y === 0 && this.x == 4) {
            this.setChessPiece(new Queen(true, false));
        }
        if (this.y === 7 && this.x == 3) {
            this.setChessPiece(new Queen(false, false));
        }
        //king
        if (this.y === 0 && this.x === 3) {
            this.setChessPiece(new King(true, false));
        }
        if (this.y === 7 && this.x == 4) {
            this.setChessPiece(new King(false, false));
        }
        //Pond
        if (this.y === 1) {
            this.setChessPiece(new Pond(true, false));
        }
        if (this.y === 6) {
            this.setChessPiece(new Pond(false, false));
        }
        //Tower
        if (this.y === 0 && this.x === 0 || this.y === 0 && this.x === 7) {
            this.setChessPiece(new Tower(true, false));
        }
        if (this.y === 7 && this.x === 0 || this.y === 7 && this.x === 7) {
            this.setChessPiece(new Tower(false, false));
        }
    };
    Field.prototype.removeChessPiece = function () {
        this.chessPiece = null;
        //console.log([this.x, this.y]);
    };
    return Field;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.width = 0;
        this.height = 0;
        this.boardPixelSize = 800;
        this.boardRectsOnXAndY = 8;
        this.gameTurn = 0;
        this.fields = [];
        //private
        this.players = [];
        this.canvas = document.querySelector("#root");
        var initContext = this.canvas.getContext("2d");
        if (this.canvas === null) {
            throw new Error("Canvas not supported");
        }
        if (initContext == null) {
            throw new Error("Context is null");
        }
        this.context = initContext;
        if (this.context === null) {
            throw new Error("Context null");
        }
        this.board = new Board(this.context);
    }
    Game.prototype.setupGame = function () {
        var _this = this;
        var _a, _b;
        this.initializePlayers();
        var fieldSize = this.boardPixelSize / this.boardRectsOnXAndY;
        this.width = this.canvas.width = this.boardPixelSize;
        this.height = this.canvas.height = this.boardPixelSize;
        //Create background for ui
        if (this.context) {
            this.context.strokeStyle = "white";
            this.context.rect(0, 0, this.width, this.height);
            this.context.fillStyle = "black";
            this.context.fill();
        }
        for (var i = 0; i < this.boardRectsOnXAndY; i++) {
            var row = [];
            for (var j = 0; j < this.boardRectsOnXAndY; j++) {
                row.push(new Field(j, i));
            }
            this.fields.push(row);
        }
        this.canvas.addEventListener('mousedown', function (e) {
            var _a, _b;
            var canvasX = e.offsetX;
            var canvasY = e.offsetY;
            (_a = _this.board) === null || _a === void 0 ? void 0 : _a.boardClicked(_this.fields, canvasY, canvasX);
            (_b = _this.board) === null || _b === void 0 ? void 0 : _b.drawBoard(_this.fields, fieldSize);
        });
        (_a = this.board) === null || _a === void 0 ? void 0 : _a.createBoard(this.fields);
        (_b = this.board) === null || _b === void 0 ? void 0 : _b.drawBoard(this.fields, fieldSize);
    };
    Game.prototype.initializePlayers = function () {
        var playerOne = new Player(true);
        var playerTwo = new Player(false);
        this.players.push(playerOne, playerTwo);
    };
    return Game;
}());
function start() {
    var game = new Game();
    game.setupGame();
}
window.onload = function () {
    console.log("called");
    start();
};
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    King.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/kingWhite.png";
        }
        return "./assets/kingBlack.png";
    };
    King.prototype.setPlayer = function (player) {
        return player;
    };
    King.prototype.validateMove = function (fromX, fromY, toX, toY, player, hasChesspiece) {
        return false;
    };
    return King;
}(ChessPiece));
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Knight.prototype.setPlayer = function (player) {
        return player;
    };
    Knight.prototype.validateMove = function (fromX, fromY, toX, toY, player, field) {
        console.log(player);
        var fieldChessPiece = field.getChessPiece();
        if (fieldChessPiece) {
            if (fieldChessPiece.getIsWhite()) {
                alert("Invalid move");
                return false;
            }
            if (!fieldChessPiece.getIsWhite()) {
                fieldChessPiece.setIsKilled();
                field.removeChessPiece();
            }
        }
        if ((fromX + 1 !== toX || fromY + 2 !== toY)
            && (fromX - 1 !== toX || fromY + 2 !== toY)
            && (fromX + 1 !== toX || fromY - 2 !== toY)
            && (fromX - 2 !== toX || fromY - 1 !== toY)
            && (fromX + 2 !== toX || fromY - 1 !== toY)
            && (fromX - 1 !== toX || fromY - 2 !== toY)
            && (fromX - 2 !== toX || fromY + 1 !== toY)
            && (fromX + 2 !== toX || fromY + 1 !== toY)) {
            return false;
        }
        return true;
    };
    Knight.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/horseWhite.png";
        }
        return "./assets/horseBlack.png";
    };
    return Knight;
}(ChessPiece));
var Player = /** @class */ (function () {
    function Player(isWhite) {
        this._isWhite = false;
        this._isWhite = isWhite;
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
    Pond.prototype.setPlayer = function (player) {
        return player;
    };
    Pond.prototype.canMoveDiagonal = function (fromX, toX, fromY, toY, player, field) {
        if (!field.hasChessPiece()) {
            return false;
        }
        if (player.isWhite()) {
            return ((fromY + 1 === toY && fromX + 1 === toX) || (fromY + 1 === toY && fromX - 1 === toX));
        }
        else {
            return ((fromY - 1 === toY && fromX - 1 === toX) || (fromY - 1 === toY && fromX + 1 === toX));
        }
    };
    Pond.prototype.canMoveForward = function (fromX, toX, fromY, toY, player, field) {
        console.log(field);
        if (player.isWhite()) {
            if (fromX !== toX) {
                console.log("1");
                return false;
            }
            if (this.getMoveCount() === 0) {
                if (fromY + 1 !== toY && fromY + 2 !== toY) {
                    console.log("2");
                    return false;
                }
            }
            else {
                if (fromY + 1 !== toY) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (fromX !== toX) {
                console.log("1");
                return false;
            }
            if (this.getMoveCount() === 0) {
                if (fromY - 1 !== toY && fromY - 2 !== toY) {
                    console.log("3");
                    return false;
                }
            }
            else {
                if (fromY - 1 !== toY) {
                    console.log("3");
                    return false;
                }
            }
            return true;
        }
    };
    Pond.prototype.validateMove = function (fromX, fromY, toX, toY, player, field) {
        /*
            
            The pond can only move 2 or 1 field forward.
            If it's not the first move it can move 1 forward.
            If there is a chessPiece diagonal then it may move diagonal 1 field.

        */
        return this.canMoveDiagonal(fromX, toX, fromY, toY, player, field) || this.canMoveForward(fromX, toX, fromY, toY, player, field);
    };
    Pond.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/pondWhite.png";
        }
        return "./assets/pondBlack.png";
    };
    Pond.prototype.setWhite = function () {
    };
    return Pond;
}(ChessPiece));
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Queen.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/queenWhite.png";
        }
        return "./assets/queenBlack.png";
    };
    Queen.prototype.setPlayer = function (player) {
        return player;
    };
    Queen.prototype.validateMove = function (fromX, fromY, toX, toY, player, hasChesspiece) {
        return false;
    };
    return Queen;
}(ChessPiece));
var Runner = /** @class */ (function (_super) {
    __extends(Runner, _super);
    function Runner(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Runner.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/runnerWhite.png";
        }
        return "./assets/runnerBlack.png";
    };
    Runner.prototype.setPlayer = function (player) {
        return player;
    };
    Runner.prototype.validateMove = function (fromX, fromY, toX, toY, player, hasChesspiece) {
        return false;
    };
    return Runner;
}(ChessPiece));
var Tower = /** @class */ (function (_super) {
    __extends(Tower, _super);
    function Tower(isWhite, isKilled) {
        return _super.call(this, isWhite, isKilled) || this;
    }
    Tower.prototype.getImageString = function (isWhite) {
        if (isWhite) {
            return "./assets/towerWhite.png";
        }
        return "./assets/tower.png";
    };
    Tower.prototype.setPlayer = function (player) {
        return player;
    };
    Tower.prototype.validateMove = function (fromX, fromY, toX, toY, player, hasChesspiece) {
        return false;
    };
    return Tower;
}(ChessPiece));
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
var Validate = /** @class */ (function () {
    function Validate() {
    }
    //Get data for the tile
    Validate.prototype.getTile = function (x, y) {
        console.log("field tile", new Field(x, y));
    };
    Validate.prototype.move = function (amount, direction) {
        console.log([amount, direction]);
    };
    return Validate;
}());
//# sourceMappingURL=game.js.map