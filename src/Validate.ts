enum Direction {
  UP,
  LEFT,
  RIGHT,
  DOWN
}

class Validate{
  
  //Use this method to get the tile data, eg. getChesspiece
  getTile( x:number, y: number){
    return(new Field(x,y))
  }
  
 move(amount: number, direction: number, fields: Field[][]){
   console.log([amount, direction, fields])
 }
 
}