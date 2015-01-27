require('whatwg-fetch');
require('es6-promise').polyfill();

var routes = require('./routes');
var React = require('react');
var RRouter = require('react-router');

RRouter.run(routes, (Handler) => {
  React.render(<Handler/>, document.body);
});

window.React = React;
