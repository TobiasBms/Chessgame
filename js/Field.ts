
class Field
{

    chessPiece: ChessPiece = null;
    x: number;
    y: number;
    isBlack: boolean;

    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    setChessPiece(chessPiece: ChessPiece) 
    {
        
        if(!this.chessPiece){
            this.chessPiece = chessPiece;
        }else{
            throw new Error('Something bad happened with Chesspiece class');
        }

    }
    
    getChessPiece() : ChessPiece 
    {
        return this.chessPiece
    }

    init()
    {
        if(this.x === 0 && this.y === 0){ 
            this.setChessPiece(new Knight(this.isBlack, false));
        }
        
        if(this.y === 1){
            this.setChessPiece(new Pond(this.isBlack, false));
        }

    }

}

