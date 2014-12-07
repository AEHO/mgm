require('./Index.scss');

var assign = require('object-assign');
var React = require('react');
var VideoTabs = require('./index/VideoTabs.jsx');
var MobileVideoTabs = require('./index/MobileVideoTabs.jsx');
var VideoAddModal = require('./VideoAddModal.jsx');
var Modal = require('./Modal.jsx');
var {AppStore} = require('../stores');
var {AppActions} = require('../actions');
var {storesGlueMixin} = require('../mixins');

var Index = React.createClass({
	mixins: [storesGlueMixin(AppStore)],

	getStateFromStores: AppStore.getAppState,
  startMobilePlayMode () {  
    AppActions.mobilePlayMode();
  },

	render () {
    var main;
		var modal = this.state.modal.showing ?
			<VideoAddModal /> : null;
    if(window.location.hash === '#mobile'){
      var mobileContent = this.state.playMode ? 
        <MobileVideoTabs /> :
        <div>
          <button>upload</button>
          <button onClick={AppActions.enterMobilePlayMode}>play</button>
        </div>;

      main = <main>
        <h1 className="main-title">Vixer</h1>
        {mobileContent}
      </main>
    }else{
      main = <main className="Main">
        <h1 className="main-title">Vixer</h1>
        <h2 className="subtitle">Adicione vídeos, clique em gravar e comece a mixar!</h2>
        <VideoTabs />
        {modal}
      </main>
    }
		return (
      main
		);
	}
});

module.exports = Index;
