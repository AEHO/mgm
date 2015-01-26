/**
 * AssetsBar: demo page regarding Drag N Drop
 */

require('./AssetsBar.sass');

const assign = require('object-assign');
const {AssetsActions, AppActions} = require('../actions');
const React = require('react/addons');
const {CSSTransitionGroup} = React.addons;
const VQ = require('../utils/VQ');
const {AssetsStore, AppStore} = require('../stores');
const updateWithKey = require('../utils/updateWithKey');
const DropArea = require('./DropArea.jsx');
const VideoItem = require('./VideoItem.jsx');
const {storesGlueMixin} = require('../mixins');
var _vq;

var AssetsBar = React.createClass({
  mixins: [storesGlueMixin(AssetsStore, AppStore)],

  getStateFromStores () {
    return assign({}, AssetsStore.getStoreState(), AppStore.getStoreState());
  },

  handleFilesSelect (fileList) {
    var files = this.state.files.slice();

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      files.push(file);

      if (file.type.match(/video\/*./))
        _vq.add(file);
    }

    AssetsActions.updateAssets(files);
  },

  handleVQChange (file) {
    AssetsActions.updateAssets(
      updateWithKey(this.state.files, file, 'lastModified')
    );
  },

  componentDidMount () {
    _vq = new VQ(this.refs.videoElem.getDOMNode(),
                 this.refs.canvasElem.getDOMNode());
    _vq.addChangeListener(this.handleVQChange);
  },

  handleBackgroundClick () {
    AppActions.hideSidebar();
  },

  handleDragOver () {
    if (this.state.movingInternalAsset)
      AppActions.hideSidebar();
  },

  render () {
    const files = this.state.files.map((file, i) => {
      return <li key={i}><VideoItem file={file}/></li>
    });

    const emptyListText = files.length ?
      null :
      <p>Empty assets list. Drop something above or select from your computer!</p>;

    const sidebarClass = this.state.showSidebar ?
      'AssetsBar show-sidebar' :
      'AssetsBar';

    const backgroundClass = this.state.showSidebar ?
      'background show' :
      'background';

    const contentClass = this.state.showSidebar ?
      'content show' :
      'content';

    return (
      <aside className={sidebarClass}>
        <div className={backgroundClass}
             onClick={this.handleBackgroundClick}
             onDragOver={this.handleDragOver}></div>
        <main className={contentClass}>
          <h1>Assets</h1>
          <DropArea onFilesDrop={this.handleFilesSelect} />

          <ul><CSSTransitionGroup transitionName="file">{files}</CSSTransitionGroup></ul>
          {emptyListText}

          <canvas ref="canvasElem"></canvas>
          <video ref="videoElem"></video>
        </main>
      </aside>
    );
  }
});

module.exports = AssetsBar;
