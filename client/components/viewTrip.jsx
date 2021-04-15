import React from 'react';

export default class ViewTrip extends React.Component {
  render() {
    const { name, locations } = this.props.trip;
    const locationsList = locations.map(location => {
      return (
        <li className="trip-list-item" key={location.name.split(',')[0]} onClick={() => this.props.toggleView(location)}>
          <div>
            {location.name}
            <i className="fas fa-arrow-right list-arrow"></i>
          </div>
          <div className="icons">
            {location.restaurants.length} <i className="fas fa-utensils"></i>
            {location.poi.length} <i className="fas fa-map-marker-alt"></i>
          </div>
        </li>
      );
    });
    return (
      <>
        <div className="main">
          <div className="name">
            <i onClick={() => this.props.toggleView()} className="fas fa-arrow-left back-arrow"></i>
            <h1>{name}</h1>
          </div>
          <ul>{locationsList}</ul>
        </div>
      </>
    );
  }
}
