
abstract class ChessPiece {
    
    moveCount: number = 0;
        
    constructor(private isWhite: boolean, private isKilled: boolean){}

    abstract validateMove(fromX,fromY,toX,toY,player: Player);
    abstract getImage();
    abstract setWhite(white: boolean);

    incrementMoveCount(){
        this.moveCount++
    }

    getMoveCount(){
        return this.moveCount;
    }



}