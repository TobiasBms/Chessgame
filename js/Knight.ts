class Knight extends ChessPiece{
    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }

    canMove(){}
    
    getImage()
    {
        return "./assets/knight.png";
    }

    setWhite(){}
} 