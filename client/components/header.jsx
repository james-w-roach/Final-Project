import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="page-container">
          <div className="header-content">
            <h1>Travel Planner</h1>
            <div className="header-nav">
              <a className="header-anchor" href={''}>Create <i className="fas fa-plus"></i></a>
              <a className="header-anchor" href={'#itineraryList'}>Itineraries <i className="far fa-map"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
