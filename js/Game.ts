
class Game{
    
    width: number = 0;
    height: number = 0;
    
    board: Board;

    constructor(){
        this.board = new Board()
        
    }

    render(){
        
        const canvas = <HTMLCanvasElement> document.querySelector("#root");
        const context = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight; 
        
        //Repaint ui
        context.strokeStyle = "#000000";
        context?.rect(0,0,this.width, this.height);
        context.fillStyle = "#2F3941"
        context?.fill();
    }
    
    userInput(){

    }

    startGame(){
        console.log(this.board);
    }

}