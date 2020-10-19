class Pond extends ChessPiece{
    
    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }

    canMove(){}
    
    getImage()
    {
        return "./assets/pond.jpg";
    }

    setWhite(){}
}