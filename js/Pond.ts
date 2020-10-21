class Pond extends ChessPiece{
    
    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }


    validateMove(fromX, fromY, toX,toY){
        
        /*
            
            The pond can only move 2 or 1 field forward.
            If it's not the first move it can move 1 forward.
            If there is a chessPiece diagonal then it may move diagonal 1 field.

        */

        if(fromX === toX || toY === fromY + 1){
            console.log("Valid move");
        }

    }

    move(x,y){

    }
    
    getImage()
    {
        return "./assets/pond.jpg";
    }

    setWhite(){}
}