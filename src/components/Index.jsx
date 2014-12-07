require('./Index.scss');

var assign = require('object-assign');
var React = require('react');
var VideoTabs = require('./index/VideoTabs.jsx');
var VideoAddModal = require('./VideoAddModal.jsx');
var Modal = require('./Modal.jsx');
var {AppStore} = require('../stores');
var {storesGlueMixin} = require('../mixins');

var Index = React.createClass({
	mixins: [storesGlueMixin(AppStore)],

	getStateFromStores: AppStore.getAppState,

	render () {
		var modal = this.state.modal.showing ?
			<VideoAddModal /> : null;

		return (
			<main>
				<h1 className="main-title">Vixer</h1>
        <h2 className="subtitle">Adicione vídeos, clique em gravar e comece a mixar!</h2>
        <VideoTabs />
				{modal}
			</main>
		);
	}
});

module.exports = Index;
