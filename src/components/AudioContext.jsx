'use strict';

/**
 * AudioContext ...
 */

require('./AudioContext.sass');

const clone = (obj) => JSON.parse(JSON.stringify(obj));
const React = require('react');

var TrueCoords = null;
var GrabPoint = null;
var SVGRoot = null;

const AudioContext = React.createClass({
  getInitialState () {
    return {
      moving: false,
      transX: 0,
      transY: 0
    }
  },

  componentDidMount () {
    SVGRoot = this.getDOMNode();
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();
  },

  handleMouseDown (e) {
    let transMatrix = e.target.getCTM();

    GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
    GrabPoint.y = TrueCoords.y - Number(transMatrix.f);

    this.setState({
      moving: true,
      transX: this.state.transX,
      transY: this.state.transY
    });

  },

  handleMouseMove (e) {
    let newScale = SVGRoot.currentScale;
    let translation = SVGRoot.currentTranslate;

    TrueCoords.x = (e.clientX - translation.x)/newScale;
    TrueCoords.y = (e.clientY - translation.y)/newScale;

    if (!this.state.moving)
      return;

    this.setState({
      moving: true,
      transX: TrueCoords.x - GrabPoint.x,
      transY: TrueCoords.y - GrabPoint.y
    });
  },

  handleMouseUp () {
    let state = clone(this.state);

    state.moving = false;
    this.setState(state);
  },

  render () {
    return (
      <svg className="AudioContext" style={{background: '#e2e2e2'}}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp}
           viewBox={"0 0 460 460"} preserveAspectRatio="xMidYMid">
        <circle onMouseDown={this.handleMouseDown}
                className="draggable"
                cx="100" cy="100"
                r="40"
                transform={`translate(${this.state.transX},${this.state.transY})`}
                fill="orange"
                stroke="navy" strokeWidth="10" />
      </svg>
    );
  }
});

module.exports = AudioContext;
