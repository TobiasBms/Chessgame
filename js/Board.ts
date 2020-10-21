/*
Painting and initializing the board.
*/ 
class Board{

    context = null;
    lastClick: Field;

    /*
        Context gets used through the 
        methods to be able to draw to the Canvas.
    */
    constructor(context)
    {

        this.context = context;
        
    }

    /*
        Paints and initialze and image for each square
        on the board.
    */

    createSquare(field: Field, fieldSize)
    {

        this.drawBackground(field,fieldSize);
        this.drawImage(field,fieldSize);

    }

    boardClicked(fields, x,y, fieldSize)
    {
        
        let tileW = 100;

        let ratioX = x / tileW;
        let ratioY = y / tileW;

        let xFloored = Math.floor(ratioX);
        let yFloored = Math.floor(ratioY);
        
        
        /*if(fields[xFloored][yFloored].chessPiece instanceof Pond){
            
            fields[xFloored][yFloored].chessPiece.validateMove(this.lastClick.x, this.lastClick.y,yFloored, xFloored);
            
        }*/
        
        let currentClick = fields[xFloored][yFloored];
        
        if(!this.lastClick && currentClick.hasChessPiece())
        {
                
                this.lastClick = currentClick;
                
        }else{
            currentClick.setChessPiece(this.lastClick.getChessPiece());
            this.lastClick.removeChessPiece();
            this.lastClick = null;  
        }
        
    }

    /*
        Paints a specific image to the field. 
    */

    drawImage(field: Field, fieldSize)
    {
            
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

    /*
        Initialzing the board
    */
   
    createBoard(fields, fieldSize)
    {         
        
        fields.forEach((row, idy) => {

            row.forEach((field, idx) => {                          
                field.setupPieces();
            });

        });

    }

    drawBoard(fields, fieldSize)
    {
      
        fields.forEach((row, idy) => {

            let straightNumber = idy % 2 === 0;

            row.forEach((field, idx) => {        

                field.isBlack = (straightNumber ? idx + 1 : idx) % 2 === 0;                
                this.createSquare(field,fieldSize);

            });

        });

    }

}