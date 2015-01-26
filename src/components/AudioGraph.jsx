/**
 * AudioGraph ...
 */

require('./AudioGraph.sass');

const React = require('react');
const _output = 'OUTPUT';
const {AppActions} = require('../actions');

const AudioGraph = React.createClass({
  getInitialState () {
    return {
      input: [],
      processors: [],
      output: [],
    }
  },

  render () {
    return (
      <div className="AudioGraph">
        <h1>Toolbox</h1>
        <aside className="ToolBox container">
          <section>
            <h2>input</h2>
            <button onClick={AppActions.showSidebar}>Assets</button>
            <div>Oscilator</div>
          </section>
          <section>
            <h2>processing</h2>
            <div>Visualizer</div>
          </section>
          <section>
            <h2>output</h2>
            <div><p>Default</p></div>
          </section>
        </aside>

        <h1>Audio Graph</h1>
        <main className="AudioContext container">
          <section>
            <p>empty</p>
            <footer>input</footer>
          </section>

          <section>
            <p>empty</p>
            <footer>processing</footer>
          </section>

          <section>
            <p>empty</p>
            <footer>output</footer>
          </section>
        </main>

      </div>
    );
  }
});

module.exports = AudioGraph;
