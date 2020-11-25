class ImageCache  {
  static map: Map<any, any> = new Map()
  
  static getKey(chessPiece: ChessPiece): string{
      return chessPiece.getType() + chessPiece.isWhite
  }
  
  static hasImage(chessPiece: ChessPiece): boolean{
    return this.map.has(this.getKey(chessPiece))
  }
  
  static getImage(chessPiece: ChessPiece): HTMLImageElement | undefined {
    return this.map.get(this.getKey(chessPiece));
  }
  
  static setImage(chessPiece: ChessPiece, image: HTMLImageElement, ) {
    this.map.set(this.getKey(chessPiece), image)
  }

}