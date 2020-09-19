import React from 'react';
import GameOver from './GameOver';
import { ShapeMovement } from './ShapeMovement';
import { table, shapeCoordinates, noStationaryPoint } from './Initialize';
import shapes from './Shapes';
import { Generator } from './Generator';
import { CellsValidation } from './CellsValidation';

const leftArrow = 37;
const rightArrow = 39;
const downArrow = 40;
const spacebar = 32;

const shapeMovement = new ShapeMovement();
const generator = new Generator();
const cellsValidation = new CellsValidation();

export default class App extends React.Component {
  timerId;

  constructor() {
    super();

    this.state = {
      table: table,
      shapeIndexes: shapeCoordinates,
      shapeStationaryPoint: noStationaryPoint, 
      isShapeDone: true,
      isBetweenDownMovement: false,
      isFirstRun: true,
      isGameOver: false
    }
  }

/* Move the shape down every second */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isBetweenDownMovement) {
      return false;
    } else {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => this.setState(shapeMovement.autoDown(this.state)), 1000);
      return true;
    }
  }

  /* Catch keybord events */
  handleKeyPress(key) {
    if (key.keyCode === leftArrow) {
      this.setState(shapeMovement.moveShapeLeft(this.state));
    } else if (key.keyCode === rightArrow) {
      this.setState(shapeMovement.moveShapeRight(this.state));
    } else if (key.keyCode === downArrow) {
      this.setState(shapeMovement.moveShapeDown(this.state));
    } else if (key.keyCode === spacebar) {
      this.setState(shapeMovement.rotateShape(this.state));
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
      const lastTable = this.state.table.map(cell => { // Make a deep copy of the table
        return [...cell];
      })
      const nextState = generator.generateShape(shapes, this.state);
      const nextShape = nextState.shapeIndexes;
      
      this.setState(nextState);
      if(cellsValidation.isOnTakenCell(nextShape, lastTable)) this.setState({ isGameOver: true });
    }
    if(this.state.isGameOver) {
      clearTimeout(this.timerId);
      return (<GameOver />);
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