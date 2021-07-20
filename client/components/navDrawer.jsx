import React from 'react';

export default class NavDrawer extends React.Component {
  render() {
    let content = 'Log Out';
    let loginHref = '';
    let createHref = '#create';
    let listHref = '#itineraryList';
    if (!this.props.loggedIn) {
      content = 'Log In';
      loginHref = '#login';
      createHref = '#login';
      listHref = '#login';
    } else {
      loginHref = '';
    }
    return (
      <div className={this.props.navDrawerClass}>
        <a className="drawer-anchor" href={createHref}>Create <i className="fas fa-plus"></i></a>
        <a className="drawer-anchor" href={listHref}>Trips <i className="far fa-map"></i></a>
        <a className="drawer-anchor"
          onClick={() => {
            if (this.props.loggedIn) {
              this.props.onSignOut();
            }
          }}
          href={loginHref}>{content} <i className="fas fa-user"></i></a>
      </div>
    );
  }
}
