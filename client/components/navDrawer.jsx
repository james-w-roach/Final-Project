import React from 'react';

export default class NavDrawer extends React.Component {
  render() {
    let content = 'Log Out';
    let loginHref = '';
    if (!this.props.loggedIn) {
      content = 'Log In';
      loginHref = '#login';
    }
    return (
      <div className={this.props.navDrawerClass}>
        <a className="drawer-anchor" href='#create' onClick={this.props.showDrawer}>Create <i className="fas fa-plus"></i></a>
        <a className="drawer-anchor" href='#itineraries' onClick={this.props.showDrawer}>Trips <i className="far fa-map"></i></a>
        <a className="drawer-anchor"
          onClick={() => {
            if (this.props.loggedIn) {
              this.props.onSignOut();
            }
            this.props.showDrawer();
          }}
          href={loginHref}>{content} <i className="fas fa-user"></i></a>
      </div>
    );
  }
}
