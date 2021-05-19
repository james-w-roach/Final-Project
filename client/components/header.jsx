import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="page-container">
          <div className="header-content">
            <a className="h1-anchor" href={''}><h1>Voyager</h1></a>
            <div className="header-nav">
              <a className="header-anchor" href={'#create'}>Create <i className="fas fa-plus"></i></a>
              <a className="header-anchor" href={'#itineraryList'}>Itineraries <i className="far fa-map"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
