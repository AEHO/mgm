/**
 * BaseLayout
 */

require('./App.sass');
require('./Page.sass');

const React = require('react');
const AssetsBar = require('./components/AssetsBar.jsx');
const {AppActions} = require('./actions');
const {storesGlueMixin} = require('./mixins');
const {AppStore} = require('./stores');
const {RouteHandler, Link} = require('react-router');

const App = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  handleDragOver () {
    !this.state.showSidebar && AppActions.showSidebar();
  },

  handleAssetsClick () {
    if (this.state.showSidebar)
      AppActions.hideSidebar();
    else
      AppActions.showSidebar();
  },

  render () {
    const klass = this.state.showSidebar ?
      'App show-sidebar' :
      'App';

    return (
      <div className={klass} onDragOver={this.handleDragOver}>
        <nav>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><button onClick={this.handleAssetsClick}>Assets</button></li>
          </ul>
        </nav>

        <AssetsBar />

        <RouteHandler />
      </div>
    );
  },
});

module.exports = App;
