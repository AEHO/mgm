/**
 * AudioGraph ...
 */

require('./AudioGraph.sass');

const React = require('react');
const assign = require('object-assign');
const {AppActions} = require('../actions');

const AudioGraph = React.createClass({
  getInitialState () {
    return {
      input: [],
      processors: [],
      output: [],
    }
  },

  handleDragStart (e) {
    e.stopPropagation();

    console.log('hue');
  },

  handleDrop (e) {
    e.preventDefault();

    var state = assign({}, this.state);
    state.input.push(e.dataTransfer.files[0]);

    this.setState(state);
  },

  render () {
    return (
      <div className="AudioGraph">
        <h1>Toolbox</h1>
        <aside className="ToolBox container">
          <section>
            <h2>input</h2>
            <div>
              <img onDragStart={this.handleDragStart} className="Item" src="assets/folder.svg" />
              <img className="Item" src="assets/waves.svg" />
              <img className="Item" src="assets/soundcloud.svg" />
              <img className="Item" src="assets/mic.svg" />
            </div>
          </section>
          <section>
            <h2>processing</h2>
            <div>
              <img className="Item" src="assets/graph.svg" />
              <img className="Item" src="assets/gain-control.svg" />
              <img className="Item" src="assets/filter-magic.svg" />
            </div>
          </section>
          <section>
            <h2>output</h2>
            <div>
              <img className="Item" src="assets/speaker.svg" />
            </div>
          </section>
        </aside>

        <h1>Audio Graph</h1>
        <main className="AudioContext container" onDrop={this.handleDrop}>
          <section>
            <p>drop something here</p>
          </section>
        </main>

      </div>
    );
  }
});

module.exports = AudioGraph;
