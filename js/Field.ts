

class Field
{

    chessPiece: ChessPiece = null;
    x: number;
    y: number;

    constructor(x,y){
        this.x = x;
        this.y = y;
        
    }

    
    setChessPiece(chessPiece: ChessPiece) {
        if(!this.chessPiece){
            this.chessPiece = chessPiece;
        }else{
            console.log("Chesspiece fejler");
            
        }
    }
    

    getChessPiece() : ChessPiece {
        return this.chessPiece
    }


    init(x,y,isBlack){
        
    }
    



}