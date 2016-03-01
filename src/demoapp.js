/* eslint-disable id-match */
import React from 'react';
// Simulation of a basic App.
export default class DemoApp extends React.Component {

  static get propTypes() {
    return {
      i13n: React.PropTypes.object,
    };
  }

  render() {
    return (
      <p>
        This plugin does not provide any visual output
      </p>
    );
  }
}
