import React from 'react';
import { ShapeMovement } from './ShapeMovement';
import { table, shapeCoordinates, noStationaryPoint } from './Initialize';
import shapes from './Shapes';
import { Generator } from './Generator';

const shapeMovement = new ShapeMovement();
const generator = new Generator();

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

  handleKeyPress(key) {
    if (key.keyCode === 37) {
      this.setState(shapeMovement.moveShapeLeft(this.state));
    } else if (key.keyCode === 39) {
      this.setState(shapeMovement.moveShapeRight(this.state));
    } else if (key.keyCode === 40) {
      this.setState(shapeMovement.moveShapeDown(this.state));
    } else if (key.keyCode === 32) {
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
      this.setState(generator.generateShape(shapes, this.state));
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