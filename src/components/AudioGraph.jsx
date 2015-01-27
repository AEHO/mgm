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
    AppActions.movingInternalAsset();
  },

  handleDragEnd (e) {
    AppActions.notMovingInternalAsset();
  },

  handleInputDrop (e) {
    e.preventDefault();

    var state = assign({}, this.state);
    state.input.push(e.dataTransfer.files[0]);

    this.setState(state);
  },

  handleAssetsFolderClick () {
    AppActions.showSidebar();
  },

  render () {
    return (
      <div className="AudioGraph">
        <h1>Toolbox</h1>
        <aside className="ToolBox container">
          <section>
            <h2>input</h2>
            <div>
              <img draggable={false}
                   onClick={this.handleAssetsFolderClick}
                   className="Item clickable" src="assets/folder.svg" />
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/waves.svg" />
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/soundcloud.svg" />
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/mic.svg" />
            </div>
          </section>
          <section>
            <h2>processing</h2>
            <div>
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/graph.svg" />
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/gain-control.svg" />
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/filter-magic.svg" />
            </div>
          </section>
          <section>
            <h2>output</h2>
            <div>
              <img onDragStart={this.handleDragStart}
                   onDragEnd={this.handleDragEnd}
                   className="Item" src="assets/speaker.svg" />
            </div>
          </section>
        </aside>

        <h1>Audio Graph</h1>
        <main className="AudioContext container" onDrop={this.handleInputDrop}>
          <section>
            <p>drop something here</p>
          </section>
        </main>

      </div>
    );
  }
});

module.exports = AudioGraph;
