class Game {
  
  width = 0;
  height = 0;
  context: CanvasRenderingContext2D;
  board: Board | undefined;
  canvas: HTMLCanvasElement;
  boardPixelSize = 800;
  boardRectsOnXAndY = 8;
  gameTurn = 0;
  fields: Field[][] = [];
  //private
  players: Map<any, any> = new Map();
  
  constructor() {
    this.canvas = <HTMLCanvasElement>document.querySelector("#root");
    const initContext: CanvasRenderingContext2D = this.canvas.getContext("2d")!;
    
    if (this.canvas === null) {
      throw new Error("Canvas not supported");
    }
    
    if (initContext == null) {
      throw new Error("Context is null")
    }
    
    this.context = initContext;
    
    if (this.context === null) {
      throw new Error("Context null")
    }
    
    this.board = new Board(this.context);
    
  }
  
  setupGame() {
    this.initializePlayers();
    
    const fieldSize = this.boardPixelSize / this.boardRectsOnXAndY;
    
    this.width = this.canvas.width = this.boardPixelSize;
    this.height = this.canvas.height = this.boardPixelSize;
    
    //Create background for ui
    if (this.context) {

      this.context.strokeStyle = "white";
      this.context.rect(0, 0, this.width, this.height);
      this.context.fillStyle = "black";
      this.context.fill();

    }
    
    for (let i = 0; i < this.boardRectsOnXAndY; i++) {
      let row: Field[] = []
      for (let j = 0; j < this.boardRectsOnXAndY; j++) {
        //row.push(new Field(j, i))
        row = [...row, new Field(j,i)]
      }
      this.fields = [...this.fields, row]
    }
  
    this.canvas.addEventListener('mousedown', (e) => {
      
      const canvasX = e.offsetX;
      const canvasY = e.offsetY;
  
      const tile = this.board?.getTile(this.fields,canvasY, canvasX);
      
      this.board?.boardClicked(this.fields, canvasY, canvasX);
      this.board?.drawBoard(this.fields, fieldSize);
      
      if (tile){
        this.board?.drawBackground(tile, 100, true)
        this.board?.drawImage(tile, 100)
      }
      
    });
    
    this.board?.createBoard(this.fields, this.players);
    this.board?.drawBoard(this.fields, fieldSize);
  }
  
  initializePlayers() {
    
    const playerOne = new Player(true);
    const playerTwo = new Player(true);
    
    this.players.set("playerOne", playerOne)
    this.players.set("playerTwo", playerTwo)

  }
  
}