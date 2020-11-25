
abstract class ChessPiece {
    
    moveCount: number = 0;
    isKilled: boolean = false
    isWhite: boolean = false
   
    protected constructor(isWhite: boolean, isKilled: boolean){
        this.isKilled = isKilled;
        this.isWhite = isWhite
    }
    
    
    abstract validateMove(fromX: number,fromY:number,toX:number,toY: number,player: Player, hasChesspiece: Field): boolean;
    abstract getImageString(isWhite: boolean): string;
    abstract setPlayer(player: Player): Player;
    abstract getType(): string;
    
    incrementMoveCount(){
        this.moveCount++
    }

    getIsWhite(){        
        return this.isWhite
    }

    getIsKilled(){
        return this.isKilled
    }

    setIsKilled(){
        this.isKilled = true;
    }

    getMoveCount(){
        return this.moveCount;
    }
    
    

}