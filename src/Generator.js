export class Generator {

    generateShape(shapes, state) {
        // const shape = shapes[Math.floor(Math.random() * 6)];
        const shape = shapes[0];
        const shapeIndexArray = new Array(4);
        let stationaryPoint = [2];
        let isHaveStationaryPoint = false;
        let index = 0;
    
        for (let i = 0; i < 4; i++) {
          shapeIndexArray[i] = new Array(2).fill(0);
        }
    
        for (let i = 3; i >= 0; i--) {
          for (let j = 0; j < 4; j++) {
            if (shape[i][j] === 1 || shape[i][j] === 2) {
              shapeIndexArray[index][0] = i;
              shapeIndexArray[index][1] = j + 3; // Center shape in the middle of the table
              index++;
            }
            if(shape[i][j] === 2) { // Stationary point mark
                stationaryPoint[0] = i;
                stationaryPoint[1] = j + 3;
                isHaveStationaryPoint = true;
            }
          }
        }

        if(!isHaveStationaryPoint) {
          stationaryPoint[0] = -1;
          stationaryPoint[1] = -1;
        }
        
        return this.drawShape(shapeIndexArray, state, stationaryPoint);
      }
    
      drawShape(shapeIndexArray, state, stationaryPoint) {
        const table = [...state.table];
    
        shapeIndexArray.forEach(indexsArray => {
          table[indexsArray[0]][indexsArray[1]] = 'X';
        });
    
        return ({ 
            table,
            shapeIndexes: shapeIndexArray,
            shapeStationaryPoint: stationaryPoint,
            isShapeDone: false
           });
      }
}