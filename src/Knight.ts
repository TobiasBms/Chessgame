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
    
    
    canMoveToPosition(fields: Field[][], x: number, y : number): boolean{
        fields.forEach(row => {
            row.forEach(field => {
                console.log(field.hasChessPiece())
            })
        })
        return true
    }
    
    validateMove(fromX:number, fromY: number, toX: number,toY: number, player: Player , field: Field){
        const fieldChessPiece = field.getChessPiece();
        
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

        return !((fromX + 1 !== toX || fromY + 2 !== toY)
          && (fromX - 1 !== toX || fromY + 2 !== toY)
          && (fromX + 1 !== toX || fromY - 2 !== toY)
          && (fromX - 2 !== toX || fromY - 1 !== toY)
          && (fromX + 2 !== toX || fromY - 1 !== toY)
          && (fromX - 1 !== toX || fromY - 2 !== toY)
          && (fromX - 2 !== toX || fromY + 1 !== toY)
          && (fromX + 2 !== toX || fromY + 1 !== toY));
        

        
    }
    
    getImageString(isWhite: boolean)
    {
        if(isWhite){
            return "./assets/horseWhite.png";
        }
    
        return "./assets/horseBlack.png";
        
    }

} 