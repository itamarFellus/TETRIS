export class ShapeMovement {

    moveShapeLeft(state) {
        const table = [...state.table]; 
        const shape = [...state.shapeIndexes]; 
        let stationaryPoint = [...state.shapeStationaryPoint];

        if(stationaryPoint[0] !== -1) {
          stationaryPoint[1]--;
        }

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
        
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false, shapeStationaryPoint: stationaryPoint })
      }
    
      moveShapeRight(state) {
        const table = [...state.table];
        const shape = [...state.shapeIndexes];
        let stationaryPoint = [...state.shapeStationaryPoint];

        if(stationaryPoint[0] !== -1) {
          stationaryPoint[1]++;
        }

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
    
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false, shapeStationaryPoint: stationaryPoint })
      }
    
      moveShapeDown(state) {
        const table = [...state.table]; 
        const shape = [...state.shapeIndexes]; 
        let stationaryPoint = [...state.shapeStationaryPoint];

        if(stationaryPoint[0] !== -1) {
          stationaryPoint[0]++;
        }

        // If the shape is at the bottom of the table, set it to 'O' and render next life cycle
        if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
          || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });
          return ({ table, shape, isBetweenDownMovement: false, isShapeDone: true, shapeStationaryPoint: stationaryPoint });
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
    
        return ({ table, shape, isBetweenDownMovement: true, isShapeDone: false, shapeStationaryPoint: stationaryPoint });
      }
    
      autoDown(state) {
        const table = [...state.table];
        const shape = [...state.shapeIndexes];
        let stationaryPoint = [...state.shapeStationaryPoint];

        if(stationaryPoint[0] !== -1) {
          stationaryPoint[0]++;
        }
        
        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })
        
        // If the shape is at the bottom of the table, set it to 'O' and render next shape
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
    
        return ({ table, shape, isBetweenDownMovement: false , shapeStationaryPoint: stationaryPoint });
      }


      rotateShape(state) {
        const table = [...state.table];
        const shape = [...state.shapeIndexes];
        let stationaryPoint = [...state.shapeStationaryPoint];
        let diffX = 0;
        let diffY = 0;
        let outOfBoundsXLeft = 0;
        let outOfBoundsXRight = state.table.length;
        let outOfBoundsYLeft = 0;
        let outOfBoundsYRight = state.table.length;


        // If this shape is symetrical - return
        if(stationaryPoint[0] === -1) {
          return;
        }

        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })
        
        shape.forEach(shapeCell => { 
          diffX = stationaryPoint[0] - shapeCell[0]; // Save distance on X-Axis
          diffY = stationaryPoint[1] - shapeCell[1]; // Save distance on Y-Axis

          if(diffX !== 0 || diffY !== 0) { // Not the stationary point
            /* Normalize so that the stationary point is the (0,0) (imagine a calculus-like graph) */
            shapeCell[0] = shapeCell[0] - stationaryPoint[0];
            shapeCell[1] = shapeCell[1] - stationaryPoint[1];

            [shapeCell[0], shapeCell[1]] = [shapeCell[1], shapeCell[0]]; // Switch coordinates
            shapeCell[0] = shapeCell[0] * -1;

            shapeCell[0] = shapeCell[0] + stationaryPoint[0];
            shapeCell[1] = shapeCell[1] + stationaryPoint[1];

            if(shapeCell[0] < 0) { // Shape is over-left
              if(outOfBoundsXLeft > shapeCell[0]) {
                outOfBoundsXLeft = shapeCell[0];
              }
            } else if (shapeCell[0] > table.length) { // Shape is over-right
              if(outOfBoundsXRight < shapeCell[0]) {
                outOfBoundsXRight = shapeCell[0];
              }
            }

            if (shapeCell[1] > table.length) { // Shape is over-right
              if(outOfBoundsYRight < shapeCell[1]) {
                outOfBoundsYRight = shapeCell[1];
              }
            }
          }
        });
    
/************************* Unintentially changing stationary point *************************/

        while(outOfBoundsXLeft < 0) {
          shape.forEach(shapeCell => {
            shapeCell[0]++;
          });
          outOfBoundsXLeft++;
        }

        while(outOfBoundsXRight > table.length) {
          shape.forEach(shapeCell => {
            shapeCell[0]--;
          });
          outOfBoundsXRight--;
        }

        while(outOfBoundsYLeft < 0) {
          shape.forEach(shapeCell => {
            shapeCell[1]++;
          });
          outOfBoundsYLeft++;
        }

        while(outOfBoundsYRight > table.length) {
          shape.forEach(shapeCell => {
            shapeCell[1]--;
          });
          outOfBoundsYRight--;
        }

        // Paint rotated shape
        shape.forEach(indexsArray => {
          table[indexsArray[0]][indexsArray[1]] = 'X';
        })

        return ({ table: table, shape: shape });
      }

      isOnSameAxis(diffX, diffY) {
        if(diffX === 0 || diffY === 0) {
          return true;
        } else {
          return false;
        }
      }

      isOnYAxis(diffX) {
        if(diffX === 0) {
          return true;
        } else {
          return false;
        }
      }
}