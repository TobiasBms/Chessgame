var Board = /** @class */ (function () {
    function Board() {
    }
    Board.prototype.render = function () {
    };
    Board.prototype.update = function () {
    };
    return Board;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.width = 0;
        this.height = 0;
        this.board = new Board();
    }
    Game.prototype.render = function () {
        var canvas = document.querySelector("#root");
        var context = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        //Repaint ui
        context.strokeStyle = "#000000";
        context === null || context === void 0 ? void 0 : context.rect(0, 0, this.width, this.height);
        context.fillStyle = "#2F3941";
        context === null || context === void 0 ? void 0 : context.fill();
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
