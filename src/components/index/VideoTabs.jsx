var React = require('react');

var {PadStore} = require('../../stores');
var {PadActions, AppActions} = require('../../actions');
var cx = require('../../utils/cx.js');

require('./VideoTabs.scss');

var SortableItem = React.createClass({
  propTypes: {
    dataId: React.PropTypes.number.isRequired
  },

  update: function(to, from) {
    var data = this.props.data.items;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },

  sortEnd: function() {
    this.props.sort(this.props.data.items, undefined);
    PadActions.sortVideos(
      this.props.data.items.map((item) => {return {src: item._store.props.src}}));
  },

  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset ?
      e.currentTarget.dataset.id :
      e.currentTarget.getAttribute('data-id');
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/html', null);
    } catch (ex) {
      e.dataTransfer.setData('text', '');
    }
  },

  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },

  dragOver: function(e) {
    e.preventDefault();
    var over = e.currentTarget;
    var relX = e.clientX - over.getBoundingClientRect().left;
    var relY = e.clientY - over.getBoundingClientRect().top;
    var height = over.offsetHeight / 2;
    var placement = this.placement ? this.placement(relX, relY, over) : relY > height;
    this.move(over, placement);
  },

  isDragging: function() {
    return this.props.data.dragging == this.props.dataId;
  },

  render () {
    return (
      <li
        onDragEnd={this.sortEnd}
        onDragOver={this.dragOver}
        onDragStart={this.sortStart}
        draggable={true}
        data-id={this.props.dataId}
        className={
          this.isDragging() ? "video-tab dragging" : "video-tab"
        }>
        {this.props.item}
      </li>
    );
  }
});

var Video = React.createClass({
  propsTypes: {
    src: React.PropTypes.string
  },

  getInitialState () {
    return { playing: false };
  },

  componentDidMount () {
    var _this = this;
    this.getDOMNode().onended = function(e) {
      _this.setState({ playing: false });
      e.target.currentTime = 0;
    }
  },

  handleClick (e) {
    e.target.currentTime = 0;
    e.target.play();
    this.setState({ playing: true });
  },

  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.dataId != this.props.dataId |
            nextState.playing != this.state.playing);
  },

  componentDidUpdate (prevProps) {
    if(prevProps.dataId != this.props.dataId){
      this.getDOMNode().load();
    }
  },

  render () {
    var classNames = cx({
      'video': true,
      'playing': this.state.playing
    });

    return (
      <video data-id={this.props.dataId} onClick={this.handleClick} className={classNames}>
        <source src={this.props.src} />
      </video>
    );
  }
});

var VideoTabs = React.createClass({
  getInitialState () {
    var items = PadStore.getPadState().videos.map((video, i) => {
      return(
        <Video dataId={i} src={video.src} />
      );
    });

    return {
      data: {items}
    }
  },

  componentDidMount: function () {
    PadStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount: function () {
    PadStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    var items = PadStore.getPadState().videos.map((video, i) => {
      return(
        <Video dataId={i} src={video.src} />
      );
    });

    this.setState({data: {items}});
  },

  sort: function(items, dragging) {
    var data = this.state.data;
    data.items = items;
    data.dragging = dragging;
    this.setState({data: data});
  },

  handleClickAssetAdd () {
    AppActions.openModal();
  },

  render() {
    var videoTabs = this.state.data.items.map((item, i) => {
      return <SortableItem
              key={i}
              dataId={i}
              item={item}
              sort={this.sort}
              data={this.state.data} />
    });

    return (
      <ul className="video-tabs">
        {videoTabs}
        <li draggable={false} className="video-tab">
          <img onClick={this.handleClickAssetAdd} className="big-plus" src="./assets/plus.svg"/>
        </li>
      </ul>
    );
  }

});

module.exports = VideoTabs;
