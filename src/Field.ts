
class Field
{
    chessPiece: ChessPiece | null;
    x: number;
    y: number;
    isWhite: boolean;

    constructor(x: number, y: number)
    {
        this.chessPiece = null
        this.x = x;
        this.y = y;
        this.isWhite =  false
    }

    hasChessPiece(): ChessPiece | null
    {
        if(this.chessPiece !== null){
            return this.chessPiece;
        }
        return null;
    }


    setChessPiece(chessPiece: ChessPiece | null)
    {
        if(!this.chessPiece){
            this.chessPiece = chessPiece;
        }
    }

    getChessPiece() : ChessPiece | null
    {
        return this.chessPiece
    }

    
    setIsKilled()
    {
        this.chessPiece?.setIsKilled();
    }
    
    setupPieces()
    {
        
        //Horse
        if(this.x === 1 && this.y === 0 || this.x === 6 && this.y === 0){
            this.setChessPiece(new Knight(true, false));       
        }
        
        if (this.y === 7 && this.x == 1 || this.y === 7 && this.x === 6){
            this.setChessPiece(new Knight(false, false));
        }
        
        //Runner
        if (this.y == 0 && this.x == 2 || this.y == 0 && this.x === 5){
            this.setChessPiece(new Runner(true, false))
        }
        if (this.y == 7 && this.x == 2 || this.y == 7 && this.x === 5){
            this.setChessPiece(new Runner(false, false))
        }
    
        //Queen
        if (this.y === 0 && this.x == 4){
            this.setChessPiece(new Queen(true, false))
        }
        if (this.y === 7 && this.x == 3){
            this.setChessPiece(new Queen(false, false))
        }
        
        //king
        if (this.y === 0 && this.x === 3){
            this.setChessPiece(new King(true, false))
        }
        if (this.y === 7 && this.x == 4){
            this.setChessPiece(new King(false, false))
        }
        
        //Pond
        if(this.y === 1){
            this.setChessPiece(new Pond(true, false));
        }
        
        if(this.y === 6){
            this.setChessPiece(new Pond(false, false));
        }
        
        //Tower
        if (this.y === 0 && this.x === 0 || this.y === 0 && this.x === 7){
            this.setChessPiece(new Tower(true, false))
        }
        if (this.y === 7 && this.x === 0 || this.y === 7 && this.x === 7){
            this.setChessPiece(new Tower(false, false))
        }

    }

    removeChessPiece()
    {
        this.chessPiece = null;
        //console.log([this.x, this.y]);
        
    }

}

