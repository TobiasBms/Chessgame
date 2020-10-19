/*
Painting and initializing the board.
*/ 
class Board{

    fields: [][] = [];
    context = null;

    /*
        Context gets used through the 
        methods to be able to interact with Canvas.
    */
    constructor(context){
        this.context = context;
        
    }

    /*
        Paints and initialze and image for each square
        on the board.
    */

    createSquare(field: Field, fieldSize){
        this.drawBackground(field,fieldSize);
        this.drawImage(field,fieldSize);
    }

    /*
        Paints a specific image to the field. 
    */

    drawImage(field: Field, fieldSize){
            
  
        if(field.chessPiece !== null){
            
            let base_image = new Image();
            base_image.src = field.chessPiece.getImage(); 
            
            base_image.onload = () => {
                this.context.drawImage(base_image, field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);
            }

        }

    }

    /*
        Paints the background color of the context square.
    */

    drawBackground(field: Field, fieldSize)
    {
        
        this.context.beginPath();

        if(field.isBlack){
            this.context.fillStyle = "#EAC89E";
        }else{
            this.context.fillStyle = "#263549";
        }

        this.context.fillRect(field.x * fieldSize, field.y * fieldSize, fieldSize, fieldSize);

    }


    movePiece()
    {

    }

    /*
        Initialzing the board
    */
   
    createBoard(fields, fieldSize){         
        fields.forEach((row, idy) => {
            let straightNumber = idy % 2 === 0;

            row.forEach((field, idx) => {          

                field.isBlack = (straightNumber ? idx + 1 : idx) % 2 === 0;                
                field.init();
                this.createSquare(field,fieldSize);
            });
        });

    }

}