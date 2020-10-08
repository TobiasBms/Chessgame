
class Game{
    
    width: number = 0;
    height: number = 0;
    context = null;
    board: Board;
    canvas = <HTMLCanvasElement>document.querySelector("#root");

    constructor(){
        
        this.context = this.canvas.getContext("2d");
        this.board = new Board(this.context)
    }
    
    setupGame(){

    }

    render(){
        let boardPixelSize = 800;
        let boardSize = 8;
        this.width = this.canvas.width = boardPixelSize;
        this.height = this.canvas.height = boardPixelSize; 
        
        //Create background for ui
        this.context.strokeStyle = "white";
        this.context?.rect(0,0,this.width, this.height);
        this.context.fillStyle = "black" 
        this.context?.fill();
        
        let fields = [];

        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(new Field(j,i));
            }
             
            fields.push(row); 
        }
        

        this.board.createBoard(fields, boardPixelSize / boardSize);
        
    }
    
    userInput(){

    }

    startGame(){
        console.log(this.board);
    }

}