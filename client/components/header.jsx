import React from 'react';

export default class Header extends React.Component {
  render() {
    let content = 'Log Out';
    let loginHref = '';
    if (!this.props.loggedIn) {
      content = 'Log In';
      loginHref = '#login';
    }
    return (
      <div className="header">
        <a className="h1-anchor" href={''}><div className='h1-anchor-line h1-upper'></div><h1>Voyager</h1><div className='h1-anchor-line h1-lower'></div></a>
        <div className="header-nav">
          <a className="header-anchor" href="#create">Create<div className='anchor-line'></div></a>
          <a className="header-anchor" href="#itineraries" onClick={() => {
            this.props.switchView('itineraries');
          }}>Itineraries<div className='anchor-line'></div></a>
          <a className="header-anchor"
            onClick={() => {
              if (this.props.loggedIn) {
                this.props.onSignOut();
              }
            }}
            href={loginHref}>{content}<div className='anchor-line'></div></a>
        </div>
        <i className="fas fa-bars drawer-button" id="drawer-button" onClick={this.props.showDrawer}></i>
      </div>
    );
  }
}
