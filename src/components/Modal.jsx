require('./Modal.scss');
var React = require('react');
var {AppActions} = require('../actions');
var {storesGlueMixin} = require('../mixins');
var {AppStore} = require('../stores');

var Modal = React.createClass({
	propTypes: {
		children: React.PropTypes.node.isRequired,
		title: React.PropTypes.string.isRequired
	},

	mixins: [storesGlueMixin(AppStore)],

	getStateFromStores: AppStore.getAppState,

	handleClose () {
		AppActions.closeModal();
	},

	render () {
		return (
			<div className="Modal">
				<header>
					<p>{this.props.title}</p>
					<button onClick={this.handleClose}>X</button>
				</header>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Modal;
