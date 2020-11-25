class Tower extends ChessPiece{
  
  constructor(isWhite: boolean, isKilled: boolean){
    super(isWhite, isKilled)
  }
 
  getImageString(isWhite: boolean): string {
    if (isWhite){
      return "./assets/towerWhite.png"
    }
     return "./assets/tower.png"

  }
  getType(): string {
    return "Tower";
  }
  setPlayer(player: Player): Player {
    return player
  }
  
  validateMove(fromX: number, fromY: number, toX: number, toY: number, player: Player, hasChesspiece: Field): boolean {
    return false;
  }
  
}