export class Generator {
    generateShape(shapes, state) {
        const shape = shapes[Math.floor(Math.random() * 5)];
        const shapeIndexArray = new Array(4);
        let index = 0;
    
        for (let i = 0; i < 4; i++) {
          shapeIndexArray[i] = new Array(2).fill(0);
        }
    
        for (let i = 3; i >= 0; i--) {
          for (let j = 0; j < 4; j++) {
            if (shape[i][j] === 1) {
              shapeIndexArray[index][0] = i;
              shapeIndexArray[index][1] = j + 3;
              index++;
            }
          }
        }
        
        return this.drawShape(shapeIndexArray, state);
      }
    
      drawShape(shapeIndexArray, state) {
        const table = [...state.table];
    
        shapeIndexArray.forEach(indexsArray => {
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })
    
        return ({ table, shapeIndexes: shapeIndexArray, isShapeDone: false });
      }
}