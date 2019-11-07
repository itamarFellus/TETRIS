import React from 'react';
import { table, shapeCoordinates } from './Initialize';
// import { arrayExpression } from '@babel/types';
// import generate from '@babel/generator';
// import { stat } from 'fs';

export default class App extends React.Component {
  constructor() {
    super();

    this.moveShapeLeft = this.moveShapeLeft.bind(this);

    this.state = {
      table: table,
      shapeIndexes: shapeCoordinates,
      isMissingShape: true,
      isBetweenDownMovement: false,
      isFirstRun: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isBetweenDownMovement) {
      return false;
    } else {
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

  handleKeyPress(key) {
    if (key.keyCode === 37) {
      this.moveShapeLeft();
    } else if (key.keyCode === 39) {
      this.moveShapeRight();
    } else if (key.keyCode === 40) {
      this.moveShapeDown()
    } else if (key.keyCode === 18) {
      console.log("test")
    }
    return;
  }

  moveShapeLeft() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];

    shape.forEach((indexsArray) => {
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

    if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
      || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
      shape.forEach(indexsArray => {
        table[indexsArray[0]][indexsArray[1]] = 'O';
      });
      console.log(shape);
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

    this.setState({ table, shape, isBetweenDownMovement: true, isMissingShape: false })
  }

  autoDown() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];
    if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
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

    this.setState({ table, shape, isBetweenDownMovement: false })
  }

  handleFirstRun() {
    this.setState({ isFirstRun: false });
  }

  render() {
    if (this.state.isMissingShape) {
      this.generateShape();
    }
    if (this.state.isFirstRun) {
      this.handleFirstRun();
      return null;
    } else {
      return (
        <div className="container" tabIndex='0' onKeyDown={this.handleKeyPress.bind(this)}
          ref={tableFocus => tableFocus && tableFocus.focus()}>
          {this.renderRows()}
        </div >
      );
    }
  }
}