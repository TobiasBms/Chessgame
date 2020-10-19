
abstract class ChessPiece {

 
    constructor(private isWhite: boolean, private isKilled: boolean){}

    abstract canMove(fromX,fromY,toX,toY);
    abstract getImage();
    abstract setWhite(white: boolean);
    
}