/*
Painting and initializing the board.
*/

class Board {
  
  context: CanvasRenderingContext2D | null;
  lastClick: Field | null;
  
  /*
      Context gets used through the
      methods to be able to draw to the Canvas.
  */
  constructor(context: CanvasRenderingContext2D) {
    this.lastClick = null;
    this.context = context;
    
  }
  
  /*
      Paints and initialze and image for each square
      on the board.
  */
  
  createSquare(field: Field, fieldSize: number) {
    this.drawBackground(field, fieldSize);
    this.drawImage(field, fieldSize);
  
  }
  
  getTile(fields: Field[][], x: number, y: number): Field {
    let tileW = 100;
  
    let ratioX = x / tileW;
    let ratioY = y / tileW;
  
    let xFloored = Math.floor(ratioX);
    let yFloored = Math.floor(ratioY);
    console.log(fields[xFloored][yFloored])
    return fields[xFloored][yFloored]
    
  }
  
  boardClicked(fields: Field[][], x: number, y: number) {
    let tileW = 100;
    
    let ratioX = x / tileW;
    let ratioY = y / tileW;
    
    let xFloored = Math.floor(ratioX);
    let yFloored = Math.floor(ratioY);
    
    let currentClick = fields[xFloored][yFloored];
    
    if (!this.lastClick && currentClick.hasChessPiece()) {
      this.lastClick = currentClick;
      console.log("start turn");

    } else {
      console.log("Attempt to finish turn");
      
      let isMoveValid = this.lastClick?.getChessPiece()?.validateMove(
        this.lastClick.x,
        this.lastClick.y,
        currentClick.x,
        currentClick.y,
        new Player(true),
        currentClick
      );
      
      if (isMoveValid) {
        console.log("finish turn");
        if (this.lastClick) {
          this.lastClick?.getChessPiece()?.incrementMoveCount();
          currentClick.setChessPiece(this.lastClick.getChessPiece());
          this.lastClick.removeChessPiece();
        }
        this.lastClick = null;
        
      } else {
        this.lastClick = null;
      }
      
    }
    
  }
  
  /*
      Paints a specific image to the field.
  */
  drawImage(field: Field, fieldSize: number) {
    
    const chessPiece = field.getChessPiece()
    
    if (chessPiece === null) return
    
    const base_image = new Image();
    
    base_image.src = chessPiece.getImageString(chessPiece.isWhite!) ?? "";

    if (!ImageCache.hasImage(chessPiece)) {

      base_image.onload = () => {
         ImageCache.setImage(chessPiece, base_image);
         this.context?.drawImage(base_image, field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
      }
      
    } else {
      this.context?.drawImage(ImageCache.getImage(chessPiece)!, field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
    }
    
  }
  
  /*
      Paints the background color of the context square.
  */
  
  drawBackground(field: Field, fieldSize: number, clicked: boolean = false) {
    if (this.context) {
      this.context.beginPath();
      
      if (field.isWhite) {
        this.context.fillStyle = "#EAC89E";
        
      } else {

        this.context.fillStyle = "#263549";
        
      }
      
      if (clicked){
        this.context.fillStyle = "green"
      }
    
      this.context.fillRect(field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
      
    }
    
  }
  
  /*
      Initialzing the board
  */
  
  createBoard(fields: any[], players: Map<string, Player>) {
    
    const playerOne = players.get("playerOne")
    const playerTwo = players.get("playerTwo")
    
    fields.forEach((row: any[]) => {
      row.forEach((field) => {
        field.setupPieces();
        if (playerOne && playerTwo){
          if (field.getChessPiece() !== null && field.getChessPiece().isWhite){
            playerOne.setPieces(field.getChessPiece())
            
            }
          else if(field.getChessPiece() !== null && !(field.getChessPiece().isWhite)){
            playerTwo.setPieces(field.getChessPiece())
          }
        }
      
      });
 
    });
  }
  
  
  drawBoard(fields: Field[][], fieldSize: number) {
    fields.forEach((row: Field[], idy) => {
      let straightNumber = idy % 2 === 0;
      
      row.forEach((field, idx) => {
        field.isWhite = (straightNumber ? idx + 1 : idx) % 2 === 0;
        this.createSquare(field, fieldSize)
      });
      
    });
    
    
  }
  
}