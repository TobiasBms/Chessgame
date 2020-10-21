
class Field
{

    private chessPiece: ChessPiece = null;
    x: number;
    y: number;
    isBlack: boolean;

    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    hasChessPiece(): ChessPiece
    {
        if(this.chessPiece === null){
            return;
        }
        return this.chessPiece;
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

    setupPieces()
    {
        if(this.x === 0 && this.y === 0){ 
            this.setChessPiece(new Knight(this.isBlack, false));
        }
        
        if(this.y === 1){
            this.setChessPiece(new Pond(this.isBlack, false));
        }

        if(this.y === 6){
            this.setChessPiece(new Pond(this.isBlack, false));
        }

    }

    removeChessPiece()
    {
        this.chessPiece = null;
        console.log([this.x, this.y]);
        
    }

}

