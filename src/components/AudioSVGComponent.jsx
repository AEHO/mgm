'use strict';

/**
 * AudioSVGComponent ...
 */

const clone = (obj) => JSON.parse(JSON.stringify(obj));
const React = require('react');
const AudioSVGComponent = React.createClass({
  propTypes: {
    offsetX: React.PropTypes.number.isRequired,
    offsetY: React.PropTypes.number.isRequired,
    kind: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  },

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
    this._SVGRoot = this.getDOMNode().parentElement;
    this._TrueCoords = this._SVGRoot.createSVGPoint();
    this._GrabPoint = this._SVGRoot.createSVGPoint();
  },

  handleMouseDown (evt) {
    let {e, f} = evt.target.getCTM();

    this._GrabPoint.x = this._TrueCoords.x - Number(e);
    this._GrabPoint.y = this._TrueCoords.y - Number(f);

    this.setState({
      moving: true,
      transX: this.state.transX,
      transY: this.state.transY
    });
  },

  handleMouseMove (e) {
    let {x, y} = this._SVGRoot.currentTranslate;

    this._TrueCoords.x = (e.clientX - x)/this._SVGRoot.currentScale;
    this._TrueCoords.y = (e.clientY - y)/this._SVGRoot.currentScale;

    if (!this.state.moving)
      return;

    this.setState({
      moving: true,
      transX: this._TrueCoords.x - this._GrabPoint.x,
      transY: this._TrueCoords.y - this._GrabPoint.y
    });
  },

  handleMouseUp () {
    this.setState({
      moving: false,
      transX: this.state.transX,
      transY: this.state.transY
    });
  },

  render () {
    return (
        <circle className="AudioSVGComponent draggable"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                cx={this.props.offsetX} cy={this.props.offsetY}
                r="40"
                transform={`translate(${this.state.transX},${this.state.transY})`}
                fill="orange"
                stroke="navy" strokeWidth="10" />
    );
  }
});

module.exports = AudioSVGComponent;
