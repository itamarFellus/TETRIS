import React from 'react';
import { Consumer } from './Provider';

export class Example extends React.Component {
  render() {
    return (
      <Consumer>
        {
          (value) => {
            return (
              <div>{value}{this.props.value}</div>
            )
          }
        }
      </Consumer>
    )
  }
}

export class ExampleWithoutContext extends React.Component {
  render() {
    return (
      <div>{this.props.value}</div>
    )
  }
}