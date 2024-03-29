import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  searchPath
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavNotifications from './Topnav.Notifications';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: ''
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
        this.removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };

  addEventsSearch = () => {
    document.addEventListener('click', this.handleDocumentClickSearch, true);
  };

  removeEventsSearch = () => {
    document.removeEventListener('click', this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ''
      });
    }
  };

  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };

  handleSearchInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    const { history } = this.props;
    const { searchKeyword } = this.state;
    history.push(`${searchPath}/${searchKeyword}`);
    this.setState({
      searchKeyword: ''
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    const docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      // eslint-disable-next-line react/destructuring-assignment
      this.props.selectedMenuHasSubItems
    );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount, t } = this.props;
    const { searchKeyword, isInFullScreen } = this.state;
    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        <div className="search" data-search-path="/app/pages/search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={t('menu.search')}
            value={searchKeyword}
            onChange={e => this.handleSearchInputChange(e)}
            onKeyPress={e => this.handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={e => this.handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div>

        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <TopnavNotifications />
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">Sarah Kortney</span>
                <span>
                  <img alt="Profile" src="/assets/img/profile-pic-l.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem>
                <DropdownItem>Support</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems
  };
};
export default withTranslation()(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu, logoutUser }
  )(TopNav)
);
