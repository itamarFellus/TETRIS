import { TableFunctions } from './TableFunctions';
import { CellsValidation } from './CellsValidation';
const tableFunctions = new TableFunctions();
const cellsValidation = new CellsValidation();

export class ShapeMovement {

    moveShapeLeft(state) {
        const table = [...state.table]; 
        const shape = [...state.shapeIndexes]; 
        let stationaryPoint = [...state.shapeStationaryPoint];

        if(cellsValidation.isLeftCellTaken(shape, table)){
          return;
        }

        // If the shape is at the most-left part of the table - don't move it farther left
        if ((shape[0][1] === 0 || shape[1][1] === 0
          || shape[2][1] === 0 || shape[3][1] === 0)) {
            return;
          }

        if(stationaryPoint[0] !== -1) {
          stationaryPoint[1]--;
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

        if(cellsValidation.isRightCellTaken(shape, table)) {
          return;
        }

        // If the shape is at the most-right part of the table - don't move it farther right
        if ((shape[0][1] === (table[0].length) - 1) || (shape[1][1] === (table[0].length) - 1)
        || (shape[2][1] === (table[0].length) - 1) || (shape[3][1] === (table[0].length) - 1)) {
          return;
        }
        
        if(stationaryPoint[0] !== -1) {
          stationaryPoint[1]++;
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

        if(cellsValidation.isNextCellTaken(shape, table)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });
          return tableFunctions.checkRows(table, shape, stationaryPoint, state.score);
        } 

        // If the shape is at the bottom of the table, set it to 'O' and render next life cycle
        if (cellsValidation.isLastRow(shape, table)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });

          return tableFunctions.checkRows(table, shape, stationaryPoint, state.score);
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

        if(cellsValidation.isNextCellTaken(shape, table)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });
          return tableFunctions.checkRows(table, shape, stationaryPoint, state.score);
        } 
        
        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })
        
        // If the shape is at the bottom of the table, set it to 'O' and render next shape
        if (cellsValidation.isLastRow(shape, table)) {
          shape.forEach(indexsArray => {
            table[indexsArray[0]][indexsArray[1]] = 'O';
          });

          return tableFunctions.checkRows(table, shape, stationaryPoint, state.score);
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

        // If this shape is symetrical - return
        if(stationaryPoint[0] === -1) {
          return;
        }

        // Clear shape from table
        shape.forEach((indexsArray) => {
          table[indexsArray[0]][indexsArray[1]] = '';
        })

        this.rotate(shape, stationaryPoint, diffX, diffY);

        /* while rotating will result on collusion with another taken cell - rotate again */
        while(cellsValidation.isOnInvalidCell(shape, table)) {
          this.rotate(shape, stationaryPoint, diffX, diffY);
        } 

        this.pushBackToBoundaries(shape, stationaryPoint, table);

        // Paint rotated shape
        shape.forEach(indexsArray => {
          table[indexsArray[0]][indexsArray[1]] = 'X';
        });

        return ({ table: table, shape: shape, shapeStationaryPoint: stationaryPoint });
      }

      rotate(shape, stationaryPoint, diffX, diffY) {
        shape.forEach(shapeCell => { 
          diffX = stationaryPoint[0] - shapeCell[0]; // Save distance on X-Axis
          diffY = stationaryPoint[1] - shapeCell[1]; // Save distance on Y-Axis

          if(diffX !== 0 || diffY !== 0) { // Not the stationary point - rotate the cell!
            /* Normalize so that the stationary point is the (0,0) (imagine a calculus-like graph) */
            shapeCell[0] = shapeCell[0] - stationaryPoint[0];
            shapeCell[1] = shapeCell[1] - stationaryPoint[1];

            [shapeCell[0], shapeCell[1]] = [shapeCell[1], shapeCell[0]]; // Switch coordinates
            shapeCell[0] = shapeCell[0] * -1;

            shapeCell[0] = shapeCell[0] + stationaryPoint[0];
            shapeCell[1] = shapeCell[1] + stationaryPoint[1];
          }
        });
      }

      pushBackToBoundaries(shape, stationaryPoint, table) {
        let maxOutOfBoundsLeft = 0;
        let maxOutOfBoundsRight = 0;
        let maxOutOfBoundsTop = 0;
        let maxOutOfBoundsBottom = 0;

        /* Save the maximum out-of-bounds distance */
        shape.forEach(shapeCell => {
          if(shapeCell[1] < 0) {
            if(maxOutOfBoundsLeft > shapeCell[1]) maxOutOfBoundsLeft = Math.abs(shapeCell[1]);
          } else if (shapeCell[1] >= table[0].length) {
            if(maxOutOfBoundsRight < shapeCell[1] + 1) maxOutOfBoundsRight = shapeCell[1] + 1;
          }
          if(shapeCell[0] >= table.length) {
            if(maxOutOfBoundsBottom < shapeCell[0] + 1) maxOutOfBoundsBottom = shapeCell[0] + 1;
          } else if(shapeCell[0] < 0) {
            if(maxOutOfBoundsTop > shapeCell[0]) maxOutOfBoundsTop = Math.abs(shapeCell[0]);
          }
        });

        /* Push the shape back to the table */
        if(maxOutOfBoundsLeft > 0) {
          shape.forEach(shapeCell => {
            shapeCell[1] = shapeCell[1] + maxOutOfBoundsLeft;
          });
          stationaryPoint[1] = stationaryPoint[1] + maxOutOfBoundsLeft;
        } else if(maxOutOfBoundsRight > 0) {
          shape.forEach(shapeCell => {
            shapeCell[1] = shapeCell[1] - maxOutOfBoundsRight + table[0].length;
          });
          stationaryPoint[1] = stationaryPoint[1] - maxOutOfBoundsRight + table[0].length;
        }
        if(maxOutOfBoundsBottom > 0) {
          shape.forEach(shapeCell => {
            shapeCell[0] = shapeCell[0] - maxOutOfBoundsBottom + table.length;
          });
          stationaryPoint[0] = stationaryPoint[0] - maxOutOfBoundsBottom + table.length;
        } else if (maxOutOfBoundsTop > 0) {
          shape.forEach(shapeCell => {
            shapeCell[0] = shapeCell[0] + maxOutOfBoundsTop;
          });
          stationaryPoint[0] = stationaryPoint[0] + maxOutOfBoundsTop;
        }

        return;
      }
}