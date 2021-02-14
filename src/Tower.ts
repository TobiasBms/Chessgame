class Tower extends ChessPiece {
  
  constructor(isWhite: boolean, isKilled: boolean) {
    super(isWhite, isKilled)
  }
  
  
  getImageString(isWhite: boolean): string {
    if (isWhite) {
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
  
  //givet en brik kan den rykke x antal i en retning tager fields

  canMoveToPosition(fields: Field[][], fromX: number, toX: number, fromY: number, toY: number): boolean {
    
    if (fromX !== toX && fromY !== toY){
      return false
    }
    
    fields.forEach(row => {
      console.log(row[toX])
    })
    
    return true
    //const range = fields.map(row => row).filter(field => field.)
    /*
    range.splice(0, 1)
    
    range.forEach(field => {
      console.log(field.hasChessPiece())
    })*/
    
    
  }
  
  validateMove(fromX: number, fromY: number, toX: number, toY: number, player: Player, field: Field): boolean {
    if (field !== null && field.hasChessPiece()) {
      return false
    }
    
    return fromX === toX || fromY === toY;
  }
  
}