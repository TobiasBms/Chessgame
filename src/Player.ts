class Player{

    private readonly _isWhite: boolean = false;
    chessPieces: ChessPiece[]  = []
    constructor(isWhite:boolean){
        this._isWhite = isWhite
    }

    isWhite(){
        return this._isWhite;
    }

    setPieces(chessPiece: ChessPiece) {
        this.chessPieces?.push(chessPiece)
    }
    
    getPieces(){
        console.log(this.chessPieces)
        return this.chessPieces
    }
    
    countChessPieces(): number {
        
        if (this.chessPieces) {
            return this.chessPieces?.length
        }
        return 0
    }
}