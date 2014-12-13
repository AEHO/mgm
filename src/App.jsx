/**
 * BaseLayout
 */

var React = require('react');
var {RouteHandler, Link} = require('react-router');

var App = React.createClass({
  render () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="dnd">Drag n Drop</Link></li></ul>
        </header>
        <RouteHandler />
      </div>
    );
  },
});

module.exports = App;
