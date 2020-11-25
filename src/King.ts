class King extends ChessPiece{
  constructor(isWhite: boolean, isKilled: boolean) {
    super(isWhite, isKilled);
  }
  getImageString(isWhite: boolean): string {
    if (isWhite){
      return "./assets/kingWhite.png";
    }
    return "./assets/kingBlack.png";
  }
  getType(): string {
    return "King";
  }
  setPlayer(player: Player): Player {
    return player;
  }
  
  validateMove(fromX: number, fromY: number, toX: number, toY: number, player: Player, hasChesspiece: Field): boolean {
    return false;
  }
  
}