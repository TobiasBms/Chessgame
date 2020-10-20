
class Game{
    
    width: number = 0;
    height: number = 0;
    context = null;
    board: Board;
    canvas = <HTMLCanvasElement>document.querySelector("#root");
    boardPixelSize = 800;
    boardRectsOnXAndY = 8;
    constructor(){
        
        this.context = this.canvas.getContext("2d");
        this.board = new Board(this.context)  
        
    }
    
    setupGame(){

        let fieldSize = this.boardPixelSize / this.boardRectsOnXAndY

        this.width = this.canvas.width = this.boardPixelSize;
        this.height = this.canvas.height = this.boardPixelSize; 

        //Create background for ui
        this.context.strokeStyle = "white";
        this.context.rect(0,0,this.width, this.height);
        this.context.fillStyle = "black" 
        this.context.fill();
        
        let fields = [];

        for (let i = 0; i < this.boardRectsOnXAndY; i++) {
            let row = [];
            for (let j = 0; j < this.boardRectsOnXAndY; j++) {
                row.push(new Field(j,i));
            }
            
            fields.push(row);
        }  

        this.canvas.addEventListener('mousedown', (e) => {

            let canvasX = e.offsetX; // Canvas clikced X cord
            let canvasY = e.offsetY; // Canvas Clicked Y cord

            this.board.boardClicked(fields,canvasY, canvasX, fieldSize);
            this.board.drawBoard(fields, fieldSize);
        });


        this.board.createBoard(fields, fieldSize);
        this.board.drawBoard(fields, fieldSize);
    }

    render(){
        
    }

    

    userInput(){
    
    }

    startGame(){
        
    }

}