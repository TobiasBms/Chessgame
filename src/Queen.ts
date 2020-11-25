class Queen extends ChessPiece{
  
  constructor(isWhite:boolean, isKilled: boolean) {
    super(isWhite, isKilled);
  }
  getType(): string {
    return "Queen";
  }
  getImageString(isWhite: boolean): string {
    if (isWhite){
      return "./assets/queenWhite.png";
    }
    return "./assets/queenBlack.png";

  }
  
  setPlayer(player: Player): Player {
    return player;
  }
  
  validateMove(fromX: number, fromY: number, toX: number, toY: number, player: Player, hasChesspiece: Field): boolean {
    return false;
  }
  
}