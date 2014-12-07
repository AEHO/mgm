var React = require('react');

var VideoAddModal = require('./VideoAddModal.jsx');
var Modal = require('./Modal.jsx');
var {AppActions} = require('../actions');
var {AppStore} = require('../stores');
var {storesGlueMixin} = require('../mixins');

var Index = React.createClass({
	mixins: [storesGlueMixin(AppStore)],

	getStateFromStores: AppStore.getAppState,

	handleClick () {
		AppActions.openModal();
	},

	render () {
		var modal = this.state.modal.showing ? 
			<VideoAddModal /> :
			null;

		return (
			<main>
				<h1>Index</h1>
				{modal}
				<button className="closeBtn" onClick={this.handleClick}>open modal</button>
			</main>
		);
	}
});

module.exports = Index;
