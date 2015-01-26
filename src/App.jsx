/**
 * BaseLayout
 */

require('./App.sass');
require('./Page.sass');

const React = require('react');
const AssetsBar = require('./components/AssetsBar.jsx');
const debounce = require('./utils/debounce');
const cx = require('./utils/cx');
const {AppActions} = require('./actions');
const {storesGlueMixin} = require('./mixins');
const {AppStore} = require('./stores');
const {RouteHandler, Link} = require('react-router');

const App = React.createClass({
  getInitialState () {
    return {
      showNav: false
    }
  },

  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  handleDragOver () {
    if (!this.state.showSidebar && !this.state.movingInternalAsset)
      AppActions.showSidebar();
  },

  handleAssetsClick () {
    if (this.state.showSidebar)
      AppActions.hideSidebar();
    else
      AppActions.showSidebar();
  },

  componentWillMount () {
    this.handleMouseOverNav = debounce(() => {
      this.setState({
        showNav: false
      });
    }, 2000, this, () => {
      AppActions.consumeFirstTimeNav();

      this.setState({
        showNav: true
      });
    });
  },

  render () {
    const appClass = cx({
      'App': true,
      'show-sidebar': this.state.showSidebar
    });

    const navClass = cx({
      'first-time': this.state.firstTimeNav,
      'show': this.state.showNav
    });

    return (
      <div className={appClass} onDragOver={this.handleDragOver}>
        <nav onMouseOver={this.handleMouseOverNav}
             className={navClass}>
          <ul>
            <li><Link to="app"><img src="assets/home.svg" /></Link></li>
            <li><img src="assets/folder.svg" onClick={this.handleAssetsClick} /></li>
            <li><img src="assets/at.svg" /></li>
          </ul>
        </nav>

        <AssetsBar />

        <RouteHandler />
      </div>
    );
  },
});

module.exports = App;
