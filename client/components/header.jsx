import React from 'react';

export default class Header extends React.Component {
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
      <div className="header">
        <div className="page-container">
          <div className="header-content">
            <a className="h1-anchor" href={''}><h1>Voyager</h1></a>
            <div className="header-nav">
              <a className="header-anchor" href={createHref}>Create <i className="fas fa-plus"></i></a>
              <a className="header-anchor" href={listHref}>Itineraries <i className="far fa-map"></i></a>
              <a className="header-anchor"
                onClick={() => {
                  if (this.props.loggedIn) {
                    this.props.onSignOut();
                  }
                }}
              href={loginHref}>{content} <i className="fas fa-user"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
