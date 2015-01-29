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
      transX: 0,
      transY: 0
    }
  },

  _TrueCoords: null,
  _GrabPoint: null,
  _SVGRoot: null,

  componentDidMount () {
    this._SVGRoot = this.getDOMNode();
    this._TrueCoords = this._SVGRoot.createSVGPoint();
    this._GrabPoint = this._SVGRoot.createSVGPoint();
  },

  handleMouseDown (e) {
    let transMatrix = e.target.getCTM();

    this._GrabPoint.x = this._TrueCoords.x - Number(transMatrix.e);
    this._GrabPoint.y = this._TrueCoords.y - Number(transMatrix.f);

    this.setState({
      moving: true,
      transX: this.state.transX,
      transY: this.state.transY
    });
  },

  handleMouseMove (e) {
    let newScale = this._SVGRoot.currentScale;
    let translation = this._SVGRoot.currentTranslate;

    this._TrueCoords.x = (e.clientX - translation.x)/newScale;
    this._TrueCoords.y = (e.clientY - translation.y)/newScale;

    if (!this.state.moving)
      return;

    this.setState({
      moving: true,
      transX: this._TrueCoords.x - this._GrabPoint.x,
      transY: this._TrueCoords.y - this._GrabPoint.y
    });
  },

  handleMouseUp () {
    let state = clone(this.state);

    state.moving = false;
    this.setState(state);
  },

  handleDrop (e) {
    console.log(JSON.parse(e.dataTransfer.getData('text/plain')));
  },

  render () {
    return (
      <svg className="AudioContext" style={{background: '#e2e2e2'}}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp}
           onDrop={this.handleDrop} >
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
