import React from 'react';
import { table, shapeCoordinates } from './Initialize';
import shapes from './Shapes';
// import { arrayExpression } from '@babel/types';
// import generate from '@babel/generator';
// import { stat } from 'fs';

export default class App extends React.Component {
  timerId;

  constructor() {
    super();

    this.moveShapeLeft = this.moveShapeLeft.bind(this);

    this.state = {
      table: table,
      shapeIndexes: shapeCoordinates,
      isShapeDone: true,
      isBetweenDownMovement: false,
      isFirstRun: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isBetweenDownMovement) {
      return false;
    } else {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => this.autoDown(), 1000);
      return true;
    }
  }

  generateShape() {
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
    this.drawShape(shapeIndexArray);

    return;
  }

  drawShape(shapeIndexArray) {
    const table = [...this.state.table];

    shapeIndexArray.forEach(indexsArray => {
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shapeIndexes: shapeIndexArray, isShapeDone: false })
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
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[1]--;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: true, isShapeDone: false })
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

    this.setState({ table, shape, isBetweenDownMovement: true, isShapeDone: false })
  }

  moveShapeDown() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];

    if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
      || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
      shape.forEach(indexsArray => {
        table[indexsArray[0]][indexsArray[1]] = 'O';
      });
      return this.setState({ table, shape, isBetweenDownMovement: false, isShapeDone: true });
    }

    shape.forEach((indexsArray) => {
      table[indexsArray[0]][indexsArray[1]] = '';
    })

    shape.forEach(indexsArray => {
      indexsArray[0]++;
      table[indexsArray[0]][indexsArray[1]] = 'X';
    })

    this.setState({ table, shape, isBetweenDownMovement: true, isShapeDone: false })
  }

  autoDown() {
    const table = [...this.state.table];
    const shape = [...this.state.shapeIndexes];
    //break
    if ((shape[0][0] === (table.length) - 1) || (shape[1][0] === (table.length) - 1)
      || (shape[2][0] === (table.length) - 1) || (shape[3][0] === (table.length) - 1)) {
      shape.forEach(indexsArray => {
        table[indexsArray[0]][indexsArray[1]] = 'O';
      });
      return this.setState({ table, shape, isBetweenDownMovement: false, isShapeDone: true });
    }

    shape.forEach((indexsArray) => {
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

  renderRows() {
    if (this.state.isFirstRun) {
      this.handleFirstRun();
      return null;
    } else {
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
  }

  render() {
    if (this.state.isShapeDone) {
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