/**
 * Entry point
 */

var {IndexPage, DndPage} = require('./components/pages/');
var RRouter = require('react-router');
var React = require('react');

var {Route, DefaultRoute, RouteHandler, Link} = RRouter;

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

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="dnd" path="dnd" handler={DndPage}/>
    <DefaultRoute handler={IndexPage}/>
  </Route>
);


RRouter.run(routes, (Handler) => {
  React.render(<Handler/>, document.body);
});

window.React = React;
