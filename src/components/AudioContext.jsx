'use strict';

/**
 * AudioContext ...
 */

require('./AudioContext.sass');

const clone = (obj) => JSON.parse(JSON.stringify(obj));
const React = require('react');
const AudioContext = React.createClass({
  getInitialState () {
    return {
      moving: false,
      currentX: 0,
      currentY: 0,
      currentMatrix: [1, 0, 0, 1, 0, 0]
    }
  },

  handleMouseDown (e) {
    let state = clone(this.state);

    state.currentX = e.clientX;
    state.currentY = e.clientY;
    state.moving = true;

    this.setState(state);
  },

  handleMouseMove (e) {
    if (!this.state.moving)
      return;

    let state = clone(this.state);
    let dx = e.clientX - state.currentX;
    let dy = e.clientY - state.currentY;

    state.currentMatrix[4] += dx;
    state.currentMatrix[5] += dy;
    state.currentX = e.clientX;
    state.currentY = e.clientY;

    this.setState(state);
  },

  handleMouseOut () {
    let state = clone(this.state);

    state.moving = false;
    this.setState(state);
  },

  handleMouseUp () {
    let state = clone(this.state);

    state.moving = false;
    this.setState(state);
  },

  render () {
    let currentMatrix = this.state.currentMatrix.join(' ');

    return (
      <svg className="AudioContext" style={{background: '#e2e2e2'}}
           viewBox={"0 0 460 460"} preserveAspectRatio="xMidYMid">
        <circle onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onMouseOut={this.handleMouseOut}
                className="draggable"
                cx="100" cy="100"
                r="40"
                transform={`matrix(${currentMatrix})`}
                fill="orange"
                stroke="navy" strokeWidth="10" />
      </svg>
    );
  }
});

module.exports = AudioContext;
