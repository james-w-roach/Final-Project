import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <a className="navbar-anchor" href={'#create'}>Create <i className="fas fa-plus"></i></a>
        <a className="navbar-anchor" href={'#itineraryList'}>Itineraries <i className="far fa-map"></i></a>
      </div>
    );
  }
}
