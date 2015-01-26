var React = require('react');
var App = require('./App.jsx');
var {IndexPage, WebAudioPage} = require('./components/pages');
var {Route, DefaultRoute} = require('react-router');

var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App},
    React.createElement(DefaultRoute, {handler: IndexPage}),
    React.createElement(Route, {name: "webaudio", path: "/webaudio", handler: WebAudioPage})
  )
);

module.exports = routes;
