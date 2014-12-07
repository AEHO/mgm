require('./Index.scss');

var assign = require('object-assign');
var React = require('react');
var VideoTabs = require('./index/VideoTabs.jsx');
var VideoAddModal = require('./VideoAddModal.jsx');
var Modal = require('./Modal.jsx');
var {AppStore, PadStore} = require('../stores');
var {storesGlueMixin} = require('../mixins');

var Index = React.createClass({
	mixins: [storesGlueMixin(AppStore)],

	getStateFromStores: AppStore.getAppState,

  handleFileChange (e) {
    var file = e.target.files[0];

    var fd = new FormData();
    fd.append('name', file.name);
    fd.append('contents', file);

    var request = new XMLHttpRequest();
    request.open("POST", '/upload/mobile', true);
    request.onload = (oEvent) => {
      console.log(request.responseText);
    };

    request.send(fd);
  },

  handleFileSelectClick () {
    this.refs.fileInp.getDOMNode().click();
  },

	render () {
		var modal = this.state.modal.showing ?
			<VideoAddModal /> : null;

    var main = window.location.hash === 'mobile' ?
      <main className="Main">
        <h1 className="main-title">Vixer</h1>
        <h2 className="subtitle">Adicione vídeos, clique em gravar e comece a mixar!</h2>
        <VideoTabs />
        {modal}
      </main> :
      <main>
        <h1 className="main-title">Vixer</h1>
        <div>
          <button className="fileSelect" onClick={this.handleFileSelectClick}>Select Files</button>
          <input className="fileInp" ref="fileInp" type="file"
                 accept="video/*" multiple onChange={this.handleFileChange} />
        </div>
        <button>play</button>
      </main>;

		return (
      main
		);
	}
});

module.exports = Index;
