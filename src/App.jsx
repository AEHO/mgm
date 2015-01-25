/**
 * BaseLayout
 */

var React = require('react');
var AssetsBar = require('./components/AssetsBar.jsx');
var {RouteHandler, Link} = require('react-router');

var App = React.createClass({
  getInitialState () {
    return {
      showAssets: false
    }
  },

  handleAssetsClick () {
    this.setState({
      showAssets: !this.state.showAssets
    });
  },

  render () {
    var assets = this.state.showAssets ? <AssetsBar /> : null;

    return (
      <div>
        <nav>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><button onClick={this.handleAssetsClick}>Assets</button></li>
          </ul>
        </nav>

        {assets}

        <RouteHandler />
      </div>
    );
  },
});

module.exports = App;
