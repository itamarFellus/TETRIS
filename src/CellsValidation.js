export class CellsValidation {
    
    isOutOfBoundsY(shape, table) {
        for(let i = 0; i < shape.length; i++) {
          if(shape[i][0] < 0 || shape[i][0] >= table.length) return 1;
        }
        return 0;
      }

      isLastRow(shape, table){
        if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
          || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) return 1;
          return 0;
      }

      isNextCellTaken(shape, table) {
        for(let i = 0; i < shape.length; i++) {
          if(shape[i][0] === table.length - 1) return 0;
          if(table[shape[i][0] + 1][shape[i][1]] === 'O') return 1; 
        }
        return 0;
      }

      isLeftCellTaken(shape,table) {
        for(let i = 0; i < shape.length; i++) {
          if(shape[i][1] === table[0].length - 1) return 0;
          if(table[shape[i][0]][shape[i][1] - 1] === 'O') return 1;
        }
        return 0;
      }

      isRightCellTaken(shape, table) {
        for(let i = 0; i < shape.length; i++) {
          if(shape[i][1] === 0) return 0;
          if(table[shape[i][0]][shape[i][1] + 1] === 'O') return 1;
        }
        return 0;
      }

      isOnTakenCell(shape, table) {
        for(let i = 0; i < shape.length; i++) {
          if(table[shape[i][0]][shape[i][1]] === 'O') {
            return 1;
          } 
        }

        return 0;
      }
}