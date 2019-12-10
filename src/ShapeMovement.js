export class ShapeMovement {

    moveShapeLeft(state) {
        const table = [...state.table]; 
        const shape = [...state.shapeIndexes]; 

        // If the shape is at the most-left part of the table - don't move it farther left
        if ((shape[0][1] === 0 || shape[1][1] === 0
          || shape[2][1] === 0 || shape[3][1] === 0)) {
            return;
          }

        // Earse the shape from the table; [0] = row, [1] = column
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = ''; 
        })
    
        // Move the shape left and repaint the shape
        shape.forEach(indexsArray => {
          indexsArray[1]--; 
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })
        
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false })
      }
    
      moveShapeRight(state) {
        const table = [...state.table];
        const shape = [...state.shapeIndexes];
    
        // If the shape is at the most-right part of the table - don't move it farther right
        if ((shape[0][1] === (table[0].length) - 1) || (shape[1][1] === (table[0].length) - 1)
        || (shape[2][1] === (table[0].length) - 1) || (shape[3][1] === (table[0].length) - 1)) {
            return;
          }

        // Earse the shape from the table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = ''; // [0] = row, [1] = column
        })
        
        // Move the shape right and repaint the shape
        shape.forEach(indexsArray => {
          indexsArray[1]++; 
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })
    
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false })
      }
    
      moveShapeDown(state) {
        const table = [...state.table]; 
        const shape = [...state.shapeIndexes]; 
    
        // If the shape is at the bottom of the table, set it to 'O' and render next life cycle
        if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
          || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });
          return ({ table, shape, isBetweenDownMovement: false, isShapeDone: true });
        }
    
        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })
    
        // Move the shape 1 row down and repaint it
        shape.forEach(indexsArray => {
          indexsArray[0]++;
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })
    
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false });
      }
    
      autoDown(state) {
        const table = [...state.table];
        const shape = [...state.shapeIndexes];
        
        // If the shape is at the bottom of the table, set it to 'O' and render next life cycle
        if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
          || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {

          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });

          return ({ table, shape, isBetweenDownMovement: false, isShapeDone: true });
        }
    
        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })
    
        // Move the shape 1 row down and repaint it
        shape.forEach(indexsArray => {
          indexsArray[0]++;
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })
    
        return ({ table, shape, isBetweenDownMovement: false });
      }
}