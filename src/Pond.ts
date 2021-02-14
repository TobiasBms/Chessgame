class Pond extends ChessPiece{
    
    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }

    setPlayer(player: Player){
        return player
     
    }
    
    getType(): string {
        return "Pond";
    }
    
    private canMoveDiagonal(fromX: number,toX: number, fromY: number,toY: number, player: Player,field: Field){
        if(!field.hasChessPiece()){
            return false;
        }
        if(player.isWhite()){
            return ((fromY + 1 === toY && fromX + 1 === toX) || (fromY + 1 === toY && fromX - 1 === toX))
        }else{
            return ((fromY - 1 === toY && fromX - 1 === toX) || (fromY - 1 === toY && fromX  + 1 === toX))
        }
        
    }
    
    canMoveToPosition(fields: Field[][], x: number, y : number): boolean{
      /*  fields.forEach(row => {
            row.forEach(field => {
                console.log(field.hasChessPiece())
            })
        })*/
        return true
    }
    
    private canMoveForward(fromX:number,toX: number, fromY: number,toY: number, player: Player, field: Field){
        if(player.isWhite()){
            
            if(fromX !== toX)
            {
                console.log("1");
                return false
            }
            
            if(this.getMoveCount() === 0){
                if(fromY + 1 !== toY &&  fromY + 2 !== toY){
                    console.log("2");
                    return false
                }
            }else{
                if(fromY + 1 !== toY){
                    return false
                }
            }
            
            return true;
            
        }else{
                if(fromX !== toX)
                {
                    console.log("1");
                    return false
                } 
                
                if(this.getMoveCount() === 0){
                    if(fromY - 1 !== toY && fromY - 2 !== toY){  
                        console.log("3");
                        
                        return false
                    }
                }  else{
                    if(fromY - 1 !== toY){  
                        console.log("3");
                        
                        return false
                    }
                }
                return true   
        }

    }

    validateMove(fromX: number, fromY:number, toX:number,toY: number, player: Player, field: Field){
        
        return this.canMoveDiagonal(fromX,toX, fromY,toY, player,field) || this.canMoveForward(fromX, toX, fromY,toY, player, field)
            
    }

    
    getImageString(isWhite: boolean)
    {
        if (isWhite){
            return "./assets/pondWhite.png";
        }
        
        return "./assets/pondBlack.png";
    
    }

}