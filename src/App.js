import React from 'react';
import { ShapeMovement } from './ShapeMovement';
import { table, shapeCoordinates } from './Initialize';
import shapes from './Shapes';
import { Provider } from './Provider';

const shapeMovement = new ShapeMovement();

export default class App extends React.Component {
  timerId;

  constructor() {
    super();

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
      this.timerId = setTimeout(() => this.setState(shapeMovement.autoDown(this.state)), 1000);
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
      this.setState(shapeMovement.moveShapeLeft(this.state));
    } else if (key.keyCode === 39) {
      this.setState(shapeMovement.moveShapeRight(this.state));
    } else if (key.keyCode === 40) {
      this.setState(shapeMovement.moveShapeDown(this.state));
    }
    return;
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
        <Provider value="Itamar And Tal are about to learn about React's Context.">
          <div className="container" tabIndex='0' onKeyDown={this.handleKeyPress.bind(this)}
            ref={tableFocus => tableFocus && tableFocus.focus()}>
            {this.renderRows()}
          </div >
          {/* <Example /> */}
          {/* <ExampleWithoutContext value="Itamar And Tal are about to learn about React's Context." /> */}
        </Provider>
      );
    }
  }
}