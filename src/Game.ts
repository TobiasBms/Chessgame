
class Game{
    
    width: number = 0;
    height: number = 0;
    context: CanvasRenderingContext2D;
    board: Board | undefined;
    canvas: HTMLCanvasElement;
    boardPixelSize: number = 800;
    boardRectsOnXAndY: number = 8;
    gameTurn = 0;
    fields: Field[][] = [];
    //private
    players: Array<Player> = [];

    constructor(){
            this.canvas = <HTMLCanvasElement>document.querySelector("#root")
            const initContext: CanvasRenderingContext2D = this.canvas.getContext("2d")!;
            
            if (this.canvas === null){
                throw new Error("Canvas not supported");
            }
            
            if (initContext == null){
                throw new Error("Context is null")
            }
            
            this.context = initContext
            
            if (this.context === null){
                throw new Error("Context null")
            }
            this.board = new Board(this.context)

    }
    
 
    setupGame(){
        this.initializePlayers();

        let fieldSize = this.boardPixelSize / this.boardRectsOnXAndY

        this.width = this.canvas.width = this.boardPixelSize;
        this.height = this.canvas.height = this.boardPixelSize; 

        //Create background for ui
        if (this.context){
            this.context.strokeStyle = "white";
            this.context.rect(0,0,this.width, this.height);
            this.context.fillStyle = "black"
            this.context.fill();
        }
    
        for (let i = 0; i < this.boardRectsOnXAndY; i++) {
            const row: Field[] = []
            for (let j = 0; j < this.boardRectsOnXAndY; j++) {
                row.push(new Field(j,i))
            }
            this.fields.push(row)
        }


            this.canvas.addEventListener('mousedown', (e) => {

            let canvasX = e.offsetX;
            let canvasY = e.offsetY;

            this.board?.boardClicked(this.fields,canvasY, canvasX);
            this.board?.drawBoard(this.fields, fieldSize);

        });
        
        this.board?.createBoard(this.fields);
        this.board?.drawBoard(this.fields, fieldSize);
    }
    
    initializePlayers()
    {
        
        let playerOne = new Player(true);
        let playerTwo = new Player(false);

        this.players.push(playerOne,playerTwo)
        
    }

    

}