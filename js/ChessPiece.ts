
abstract class ChessPiece {

 
    constructor(private isWhite: boolean, private isKilled: boolean){}

    abstract validateMove(fromX,fromY,toX,toY,player: Player);
    abstract getImage();
    abstract setWhite(white: boolean);
    
}