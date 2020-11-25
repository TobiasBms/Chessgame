class Knight extends ChessPiece{
    constructor(isWhite: boolean, isKilled: boolean){
            super(isWhite, isKilled)
    }

    setPlayer(player: Player){
           return player
    }
    
    getType(): string {
        return "Knight";
    }
    
    validateMove(fromX:number, fromY: number, toX: number,toY: number, player: Player , field: Field){
        console.log(player)
        let fieldChessPiece = field.getChessPiece();
        
        if(fieldChessPiece){
            
            if(fieldChessPiece.getIsWhite()){
                alert("Invalid move")
                return false;
            }

            if(!fieldChessPiece.getIsWhite()){
                fieldChessPiece.setIsKilled();
                field.removeChessPiece();
            }

        } 

        if(
        (fromX + 1 !== toX || fromY + 2 !== toY) 
        && (fromX - 1 !== toX || fromY + 2 !== toY) 
        && (fromX + 1 !== toX ||fromY - 2 !== toY)
        && (fromX - 2 !== toX || fromY - 1 !== toY)
        && (fromX + 2 !== toX || fromY - 1 !== toY)
        && (fromX - 1 !== toX || fromY - 2 !== toY)
        && (fromX - 2 !== toX || fromY + 1 !== toY)
        && (fromX + 2 !== toX || fromY + 1 !== toY)){    
            return false;
        }
        

        return true;
    }
    
    getImageString(isWhite: boolean)
    {
        if(isWhite){
            return "./assets/horseWhite.png";
        }
    
        return "./assets/horseBlack.png";
        
    }

} 