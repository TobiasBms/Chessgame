class Board{

    fields: [][] = [];
    context = null;

    constructor(context){
        this.context = context;
    }

    
    createSquare(x,y,isBlack, fieldSize){
        this.context.beginPath();
        
        if(isBlack){
            this.context.fillStyle = "red";
        }else{
            this.context.fillStyle = "blue";
        }

        this.context.strokeRect(x * fieldSize, y * fieldSize, fieldSize, fieldSize);
        this.context.fillRect(x * fieldSize, y * fieldSize, fieldSize, fieldSize);   
    
    }

    createBoard(fields, fieldSize){    
        
        fields.forEach((row, idy) => {
            let straightNumber = idy % 2 === 0;

            row.forEach((field, idx) => {          
                let isBlack = (straightNumber ? idx + 1 : idx) % 2 === 0;
                fields[idy][idx].init(idy,idx, isBlack);
                this.createSquare(idy,idx,isBlack, fieldSize);
            });
        });

    }

}