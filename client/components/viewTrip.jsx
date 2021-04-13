import React from 'react';

export default class ViewTrip extends React.Component {
  render() {
    const { name, locations } = this.props.trip;
    const locationsList = locations.map(location => {
      return (
        <li className="trip-list-item" key={location.split(',')[0]}>
          <div>
            {location}
            <i className="fas fa-arrow-right"></i>
          </div>
          <div className="icons">
            0 <i className="fas fa-utensils"></i>
            0 <i className="fas fa-map-marker-alt"></i>
          </div>
        </li>
      );
    });
    return (
      <>
        <div className="main">
          <h1 className="name">{name}</h1>
          <ul>{locationsList}</ul>
        </div>
      </>
    );
  }
}
