var Board = /** @class */ (function () {
    function Board(height, width, fields) {
        this.width = 0;
        this.height = 0;
        this.fields = [];
        this.height = height;
        this.width = width;
        this.fields = fields;
    }
    Board.prototype.generateBoard = function () {
        return this.width + this.height;
    };
    return Board;
}());
var rect = new Board(5, 4, 4);
