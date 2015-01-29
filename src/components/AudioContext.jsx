'use strict';

/**
 * AudioContext ...
 */

require('./AudioContext.sass');

const React = require('react');

const clone = (obj) => JSON.parse(JSON.stringify(obj));
const AudioSVGComponent = require('./AudioSVGComponent.jsx');
const AudioContext = React.createClass({
  getInitialState () {
    return {
      elems: []
    }
  },

  handleDrop (e) {
    let {offsetX, offsetY} = e.nativeEvent;
    let {kind, id} = JSON.parse(e.dataTransfer.getData('text/plain'));
    let state = clone(this.state);

    state.elems.push({kind, id, offsetX, offsetY});

    this.setState(state);
  },

  render () {
    let elems = this.state.elems.map((elem) =>
      <AudioSVGComponent offsetX={elem.offsetX}
                         offsetY={elem.offsetY}
                         kind={elem.kind}
                         id={elem.id}/>
      );

    return (
      <svg className="AudioContext" style={{background: '#e2e2e2'}}
           onDrop={this.handleDrop} >
        {elems}
      </svg>
    );
  }
});

module.exports = AudioContext;
