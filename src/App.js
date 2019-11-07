import React from 'react';
import shapes from './Shapes';
// import generate from '@babel/generator';
// import { stat } from 'fs';

const numberOfRows = 10;
const numberOfColumns = 16;
const table = new Array(numberOfColumns);

for (let column = 0; column < numberOfColumns; column++) {
  table[column] = new Array(numberOfRows).fill("");
}

export default class App extends React.Component {
  constructor() {
    super();

    this.moveShapeLeft = this.moveShapeLeft.bind(this);
    

    this.state = {
      table: table,
      shapeIndexes: [[0, 4], [0, 5], [1, 4], [1, 5]] ,
      isMissingShape: true ,
      isBetweenDownMovement: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isBetweenDownMovement){
      return false;
    } else {
      if(this.state.isMissingShape) {
        this.generateShape();
      }
      setTimeout(() => this.autoDown(), 1000);
      return true;
    }
  }

  generateShape() {
    const table = [...this.state.table];

    this.state.shapeIndexes.forEach(indexsArray => {
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, isMissingShape: false })
  }

  renderRows() {
    return (
      <div>
        {this.state.table.map((row, counter) => {
          return (<div className="row" key={counter}>{row.map((cell, index) => {
            return (<div className="empty" key={index}>{cell}</div>)
          })}</div>)
        })
        }
      </div>
    )
  }

  handleKeyPress(key) {
    if (key.keyCode === 37) {
      this.moveShapeLeft();
    } else if (key.keyCode === 39) {
      this.moveShapeRight();
    } else if (key.keyCode === 40) {
      this.moveShapeDown()
    }
    return;
  }

  moveShapeLeft() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];

    shape.forEach((indexsArray) => {
      console.log(indexsArray);
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[1]--;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: false })
  }

  moveShapeRight() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];

    shape.forEach((indexsArray) => {
      console.log(indexsArray);
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[1]++;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: false })
  }

  moveShapeDown() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];

    if((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1) 
    || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
      shape.forEach(indexsArray => {
        table[indexsArray[0]][indexsArray[1]] = 'O';
      });
      return this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: true });
    }

    shape.forEach((indexsArray) => {
      console.log(indexsArray);
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[0]++;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: true })
  }

  autoDown() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];
    //break
    console.log('have to stop somehow...');
    if((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1) 
    || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
      console.log('have to stop somehow...');
      shape.forEach(indexsArray => {
        table[indexsArray[0]][indexsArray[1]] = 'O';
      });
      return this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: true });
    }

    shape.forEach((indexsArray) => {
      console.log(indexsArray);
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[0]++;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: false })
  }

  render() {
    // if (this.state.isMissingShape) {
    //   this.generateShape();
    // }

    return (
      <div className="container" tabIndex='0' onKeyDown={this.handleKeyPress.bind(this)} ref={tableFocus => tableFocus && tableFocus.focus()}>
        {this.renderRows()}
      </div >
    );

  }
}

// export default App;
