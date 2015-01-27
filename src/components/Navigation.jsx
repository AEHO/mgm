/**
 * Navigation
 */

require('./Navigation.sass');
const React = require('react');
const debounce = require('../utils/debounce');
const cx = require('../utils/cx');
const {AppActions} = require('../actions');
const {storesGlueMixin} = require('../mixins');
const {AppStore} = require('../stores');
const {Link} = require('react-router');

const Navigation = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  getInitialState () {
    return {
      showNav: false
    }
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

  handleAssetsClick () {
    if (this.state.showSidebar)
      AppActions.hideSidebar();
    else
      AppActions.showSidebar();
  },

  render () {
    const navClass = cx({
      'Navigation': true,
      'first-time': this.state.firstTimeNav,
      'show': this.state.showNav
    });

    return (
      <nav onMouseOver={this.handleMouseOverNav}
           className={navClass}>
        <ul>
          <li><Link to="app"><img src="assets/home.svg" /></Link></li>
          <li><img src="assets/folder.svg" onClick={this.handleAssetsClick} /></li>
          <li><img src="assets/at.svg" /></li>
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;
