export class TableFunctions{

    checkRows(table, shape, stationaryPoint) {
        let rows = this.eliminateDuplicates(this.getRowsToCheck(shape)).reverse();
        
        rows.forEach(row => {
            if(this.isRowFull(row, table)) {
                this.handleFullRow(row, table);
            }
        });

        return ({ table, shape, isBetweenDownMovement: false, isShapeDone: true, shapeStationaryPoint: stationaryPoint });
    }

    getRowsToCheck(shape) {
        let rows = new Array(shape.length);

        for(let i = 0; i < shape.length; i++) {
            rows[i] = shape[i][0];
        }

        return rows;
    }

    isRowFull(row, table) {

        for(let i = 0; i < table.length; i++) {
            if(table[row][i] === '') return 0;
        }

        return 1;
    }

    handleFullRow(row, table) {
        if(this.isRowFull(row, table)){
            this.clearRow(table, row);
            this.downTable(table, row);
        } 
    }

    clearRow(table, row) {
        for(let i = 0; i < table[0].length; i++) {
            table[row][i] = '';
        }
    }

    downTable(table, row){
        for(let i = row; i > 0; i--) {
            for(let j = 0; j < table[0].length; j++) {
                table[i][j] = table[i - 1][j];
            }
        }
    }

    eliminateDuplicates(rows) {
        const rowsSet = new Set(rows);
        return [...rowsSet];
    }
}