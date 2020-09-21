export class TableFunctions{

    checkRows(table, shape, stationaryPoint, score) {
        let fullRows = this.getFullRows(this.eliminateDuplicates(this.getRowsToCheck(shape)).sort(), table); // !!!
        this.handleFullRows(fullRows, table);

        if(fullRows.length > 0){
            score.raiseScore(fullRows.length);
        } else { 
            score.setCombo(0);
        }

        return ({ table, shape, isBetweenDownMovement: false, isShapeDone: true, shapeStationaryPoint: stationaryPoint, score: score });
    }

    getRowsToCheck(shape) {
        let rows = new Array(shape.length);

        for(let i = 0; i < shape.length; i++) {
            rows[i] = shape[i][0];
        }

        return rows;
    }

    getFullRows(rows, table) {
        return rows.filter(row => this.isRowFull(row,table) === 1);
    }

    isRowFull(row, table) {

        for(let i = 0; i < table.length; i++) {
            if(table[row][i] === '') return 0;
        }

        return 1;
    }

    handleFullRows(rows, table) {
        rows.forEach(row => {
            this.clearRow(table, row);
            this.downTable(table, row);
        })
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