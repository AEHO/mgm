var React = require('react');
var App = require('./App.jsx');
var {DndPage, IndexPage} = require('./components/pages');
var {Route, DefaultRoute} = require('react-router');

var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App},
    React.createElement(Route, {name: "dnd", path: "dnd", handler: DndPage}),
    React.createElement(DefaultRoute, {handler: IndexPage})
  )
);

module.exports = routes;