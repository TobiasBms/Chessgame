class Runner extends ChessPiece{
  constructor(isWhite: boolean, isKilled: boolean) {
    super(isWhite, isKilled);
  }
  getImageString(isWhite: boolean): string {
    if (isWhite){
      return "./assets/runnerWhite.png";
    }
    return "./assets/runnerBlack.png";
  }
  
  
  canMoveToPosition(fields: Field[][],x: number, y : number): boolean{
    fields.forEach(row => {
      row.forEach(field => {
        console.log(field.hasChessPiece())
      })
    })
    return true
  }
  
  setPlayer(player: Player): Player {
    return player;
  }
  getType(): string {
    return "Runner";
  }
  
  validateMove(fromX: number, fromY: number, toX: number, toY: number, player: Player, hasChesspiece: Field): boolean {
    return false;
  }
  
}