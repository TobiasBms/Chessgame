class Knight extends ChessPiece{
    constructor(isWhite: boolean, isKilled: boolean){
        super(isWhite, isKilled)
    }

    validateMove(){}
    
    getImage()
    {
        return "./assets/knight.png";
    }

    setWhite(){}
} 