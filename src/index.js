var Index = require('./components/Index.jsx');
var React = require('react');

React.render(
	React.createElement(Index, null),
	document.body
);

window.React = React;
