import shapes from './Shapes';

    const numberOfRows = 10;
    const numberOfColumns = 16;
    const table = new Array(numberOfColumns);
    
    //initialize table
    for (let column = 0; column < numberOfColumns; column++) {
      table[column] = new Array(numberOfRows).fill("");
    }
    
    //initialize shapes
    const shape = shapes[Math.floor(Math.random() * 5)];
    const shapeCoordinates = new Array(4);
    for(let i = 0; i < 4; i++){
      shapeCoordinates[i] = new Array(2);
    }
    shapeCoordinates.forEach(key => key.fill(0) );
    
    let k = 0;
    for(let i = 3; i >= 0; i--) {
      for(let j = 0; j < 4; j++) {
        if(shape[i][j] === 1){
          shapeCoordinates[k][0]= i;
          shapeCoordinates[k][1]= j + 3;
          k++;
        }
      }
    }
  
    export { table, shapeCoordinates };
    