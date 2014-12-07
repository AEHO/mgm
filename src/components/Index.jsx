var React = require('react');
var VideoTabs = require('./index/VideoTabs.jsx'); 

require('./Index.scss');

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
				<h1 className="main-title">LOBN</h1>        
        <h2 className="subtitle">Adicione vídeos, clique em gravar e comece a mixar!</h2>
        <VideoTabs videos={
          [{src: "./assets/mov_bbb.mp4"},{src: "./assets/mov_bbb.mp4"},{src: "./assets/dizzy.webm"}]
        }/>
				{modal}
				<button className="closeBtn" onClick={this.handleClick}>open modal</button>
			</main>
		);
	}
});

module.exports = Index;
