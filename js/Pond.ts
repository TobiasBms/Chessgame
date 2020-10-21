class Pond extends ChessPiece{
    
    

    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }

    private canMoveDiagonal(fromX,toX, fromY,toY, player: Player){
       return ((fromY + 1 === toY && fromX + 1 === toX) || (fromY + 1 === toY && fromX - 1 === toX))
    }

    private canMoveForward(fromX,toX, fromY,toY, player: Player){
        
        if(player.isWhite()){
                
            if(fromX !== toX)
            {
                console.log("1");
                
                return false
            }

            if(fromY + 1 !== toY && fromY + 2 !== toY){
                console.log("2");   
                return false
            }

            return true;
            
        }else{
                if(fromX !== toX)
                {
                    return false
                } 

                if(fromY - 1 !== toY){
                    return false
                }

                if(fromY - 1 !== toY && fromY - 2 !== toY){  
                    return false
                }
                return true   
        }

    }

    validateMove(fromX, fromY, toX,toY, player: Player){
        
        /*
            
            The pond can only move 2 or 1 field forward.
            If it's not the first move it can move 1 forward.
            If there is a chessPiece diagonal then it may move diagonal 1 field.

        */
        return this.canMoveDiagonal(fromX,toX, fromY,toY, player) || this.canMoveForward(fromX, toX, fromY,toY, player) 
        
            
    }

    move(x,y){

    }
    
    getImage()
    {
        return "./assets/pond.jpg";
    }

    setWhite(){
        
    }
}