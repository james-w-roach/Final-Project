import React from 'react';

export default class ViewTrip extends React.Component {
  render() {
    const { name, locations } = this.props.trip;
    const locationsList = locations.map(location => {
      return (
        <li className="trip-list-item" key={location.split(',')[0]}>
          {location}
          0 <i className="fas fa-utensils"></i>
          0 <i className="fas fa-map-marker-alt"></i>
        </li>
      );
    });
    return (
      <>
        <h1>{name}</h1>
        <ul>{locationsList}</ul>
      </>
    );
  }
}
